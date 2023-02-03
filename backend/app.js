const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { csp } = require("./utils/helmet_csp_config");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const compression = require("compression");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// 1) GLOBAL MIDDLEWARES

// Implement CORS
app.use(cors({ origin: "*" }));

// Set security HTTP headers
csp(app);

// Serving static files
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "dist")));

app.use(
	fileUpload({
		useTempFiles: true
	})
);

// Development logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
	max: 10000, // 1000 for development
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP, please try again in an hour!"
});
app.use("/api", limiter);
// limits requests to all routes starting with '/'

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
	hpp({
		whitelist: [
			"price",
			"ratingsQuantity",
			"ratingsAverage",
			"date",
			"medium",
			"dimensions"
		]
	})
);

app.use(compression());

// Test middleware
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	// console.log(req.cookies);
	next();
});

// ROUTES
require("./startup/routes")(app);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
