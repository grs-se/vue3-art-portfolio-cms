const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { helmet, csp } = require("./api/utils/helmet_csp_config");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const compression = require("compression");

const AppError = require("./api/utils/appError");
const globalErrorHandler = require("./api/controllers/errorController");

const artworkRouter = require("./api/routes/artworkRoutes");
const userRouter = require("./api/routes/userRoutes");
const exhibitionRouter = require("./api/routes/exhibitionRoutes");
const textRouter = require("./api/routes/textRoutes");
const reviewRouter = require("./api/routes/reviewRoutes");
const artistRouter = require("./api/routes/artistRoutes");
const purchaseRouter = require("./api/routes/purchaseRoutes");
const uploadRouter = require("./api/routes/uploadRoutes");
const { readdirSync } = require("fs");

const app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

/*
if (process.env.NODE_ENV === "production") {

  app.use(express.static("public"));

  app.get("*", (req, res) => {

  res.sendFile(path.resolve(__dirname, '../public/index.html'));

 });

}
*/
/* PART OF PREVIOUSLY WORKING VERSION */
// Express static - just returns, it doesn't execute
// app.use(
//   '/api/v1/gallery',
//   express.static(path.join(__dirname, 'uploads', 'images', 'artworks'))
// );
/* end of PART OF PREVIOUSLY WORKING VERSION */

// console.log(path.join(__dirname, 'uploads', 'images', 'artworks'));

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'api/views'));

// app.get('/', (req, res) => {
//   fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
//     res.send(text);
//   });
// });

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
// });

// console.log(path.join(__dirname, '../frontend/public/index.html'));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());

app.options("*", cors());
app.use(helmet);

csp(app);

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

	next();
});

app.use(
	fileUpload({
		useTempFiles: true,
	})
);

// Serving static files
// app.use(express.static(path.join(__dirname, '../frontend/dist')));
// app.use(express.static(path.join(__dirname, '../frontend/public')));
// console.log(path.join(__dirname, '../frontend/public/images/artworks'));

// Development logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
	max: 10000, // 1000 for development
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
// limits requests to all routes starting with '/'

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Data sanitization
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
			"dimensions",
		],
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
// readdirSync('./routes').map(r => app.use('/', require('./routes/' + r)));
app.use("/api/v1/gallery", artworkRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/text", textRouter);
// app.use('/api/v1/artist-statement', artistStatementRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/exhibitions", exhibitionRouter);
app.use("/api/v1/artist-research", artistRouter);
app.use("/api/v1/sales", purchaseRouter);
app.use("/api/v1/uploadImages", uploadRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
