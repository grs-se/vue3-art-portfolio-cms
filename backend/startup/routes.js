const artworkRouter = require("../routes/artworkRoutes");
const userRouter = require("../routes/userRoutes");
const exhibitionRouter = require("../routes/exhibitionRoutes");
const textRouter = require("../routes/textRoutes");
const reviewRouter = require("../routes/reviewRoutes");
const artistRouter = require("../routes/artistRoutes");
const purchaseRouter = require("../routes/purchaseRoutes");
const uploadRouter = require("../routes/uploadRoutes");

module.exports = function(app) {
	app.use("/api/v1/gallery", artworkRouter);
	app.use("/api/v1/users", userRouter);
	app.use("/api/v1/text", textRouter);
	app.use("/api/v1/reviews", reviewRouter);
	app.use("/api/v1/exhibitions", exhibitionRouter);
	app.use("/api/v1/artist-research", artistRouter);
	app.use("/api/v1/sales", purchaseRouter);
	app.use("/api/v1/uploadImages", uploadRouter);
};
