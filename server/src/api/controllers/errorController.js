const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
	// const value = err.keyValue.title;
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

	// console.log(value);

	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);

	const message = `Invalid input data. ${errors.join(". ")}`;
	return new AppError(message, 400);
};

const handleJWTError = () =>
	new AppError("Invalid token, please log in again!", 401);

const handleJWTExpiredError = () =>
	new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, req, res) => {
	// A) API
	if (req.originalUrl.startsWith("/api")) {
		return res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	}
	// B) RENDERED WEBSITE
	console.log("ERROR 💥", err);
	return res.status(err.statusCode).json({
		title: "Something went wrong!",
		msg: err.message,
	});
	// return res.status(err.statusCode).render('error', {
	//   title: 'Something went wrong!',
	//   msg: err.message
	// });
};

const sendErrorProd = (err, req, res) => {
	// A) API
	if (req.originalUrl.startsWith("/api")) {
		// A) Operational, trusted error: send message to client
		if (err.isOperational) {
			return res.status(err.statusCode).json({
				status: err.status,
				message: err.message,
			});
		}
		// B) Programming or other unknown error: don't leak error details
		// 1) Log error
		console.log("ERROR 💥", err);
		// 2) Send generic message
		return res.status(500).json({
			status: "error",
			message: "Something went very wrong",
		});
	}
	// B) RENDERED WEBSITE
	// A) Operational, trusted error: send message to client
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			title: "Something went wrong!",
			msg: err.message,
		});
		// return res.status(err.statusCode).render('error', {
		//   title: 'Something went wrong!',
		//   msg: err.message
		// });
	}
	// B) Programming or other unknown error: don't leak error details
	// 1) Log error
	console.log("ERROR 💥", err);
	// 2) Send generic message
	return res.status(err.statusCode).json({
		title: "Something went wrong!",
		msg: "Please try again later.",
	});
	// return res.status(err.statusCode).render('error', {
	//   title: 'Something went wrong!',
	//   msg: 'Please try again later.'
	// });
};

//   const msg = err.isOperational
//     ? err.message
//     : 'this is unexpected -- please contact support';
//   !err.isOperational && console.error('error 🥵', err);

//   if (req.originalUrl.match(/^[/]api[/]v/)) {
//     return res.status(err.statusCode).json({
//       status: err.status,
//       message: msg,
//       stack: err.stack
//     });
//   } else {
//     return res.status(err.statusCode).render('error', {
//       status: err.status,
//       message: msg
//     });
//   }
// };

module.exports = (err, req, res, next) => {
	// console.log(err.stack);

	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, req, res);
	} else if (process.env.NODE_ENV === "production") {
		let error = Object.assign(err);
		// Creates a new object with "err" object as its prototype
		// let error = { ...err };
		// destructures the properties from "err" into a new object

		if (error.name === "CastError") error = handleCastErrorDB(error);
		if (error.code === 11000) error = handleDuplicateFieldsDB(error);
		if (error.name === "ValidationError")
			error = handleValidationErrorDB(error);
		if (error.name === "JsonWebTokenError") error = handleJWTError();
		if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

		// console.log(err.message, error.message);
		sendErrorProd(error, req, res);
	}
};
