const express = require("express");
const artworkController = require("../controllers/artworkController");
const authController = require("../controllers/authController");
const imageUpload = require("../middleware/imageUpload");
const textRouter = require("./textRoutes");
const reviewRouter = require("./reviewRoutes");

const {
	setNestedRouteFilterCategories
} = require("../controllers/handlerFactory");
const { ARTWORK_NESTED_ROUTE_CATEGORIES } = require("../config/constants");

const router = express.Router();

// router.use(authController.isLoggedIn);

router.use(
	"/artwork/:artworkId/texts",
	artworkController.setArtworkId,
	textRouter
);

router.use(
	"/artwork/:artworkId/reviews",
	artworkController.setArtworkId,
	reviewRouter
);

router
	.route("/top-5-cheap")
	.get(artworkController.aliasTopArtworks, artworkController.getAllArtworks);

router
	.route("/artwork-stats/:year")
	.get(
		authController.protect,
		authController.restrictTo("artist", "admin", "gallerist"),
		artworkController.getArtworkFinStats
	);

router
	.route("/monthly-plan/:year")
	.get(
		authController.protect,
		authController.restrictTo("artist", "admin", "gallerist"),
		artworkController.getMonthlyPlan
	);

router
	.route("/uploadArtwork")
	.post(
		authController.protect,
		authController.restrictTo("artist", "admin", "gallerist"),
		artworkController.createArtwork
	);

// router
//   .route('/artwork/:slug')
//   .get(authController.protect, artworkController.getArtworkByTitle);

router
	.route("/artwork/:id")
	.get(artworkController.getArtworkById)

	.patch(
		authController.protect,
		authController.restrictTo("artist", "admin", "gallerist"),
		artworkController.uploadArtworkImages,
		artworkController.resizeArtworkImages,
		artworkController.updateArtwork
	)
	.delete(
		authController.protect,
		authController.restrictTo("artist", "admin", "gallerist", "mentor"),
		artworkController.deleteArtwork
	);

router.route("/:category").get(
	authController.isLoggedIn,
	// authController.protect,
	// authController.restrictTo('artist', 'admin', 'gallerist'),
	setNestedRouteFilterCategories(ARTWORK_NESTED_ROUTE_CATEGORIES),
	artworkController.getAllArtworks
);

router.route("/").get(
	authController.isLoggedIn,
	// authController.protect,
	// authController.restrictTo('artist', 'admin', 'gallerist'),
	artworkController.getAllArtworks
);

module.exports = router;
