const Review = require("../models/reviewModel");
const factory = require("./handlerFactory");
// const catchAsync = require('./../utils/catchAsync');

exports.setArtworkUserIds = (req, res, next) => {
	// Allow nested routes
	if (!req.body.artwork) req.body.artwork = req.params.artworkId;
	// if (!req.body.user) req.body.user = req.user.id;
	req.body.user = req.user.id;
	next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOneById(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review, "user");
exports.deleteReview = factory.deleteOne(Review, "user");
