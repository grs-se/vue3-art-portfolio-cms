const express = require("express");
const textController = require("../controllers/textController");
const authController = require("../controllers/authController");
const {
	setNestedRouteFilterCategories,
} = require("../controllers/handlerFactory");
const { TEXT_NESTED_ROUTE_CATEGORIES } = require("../../config/config");

const router = express.Router({ mergeParams: true });

// POST /artwork/2345/texts
// POST /text
// router.route('/texts').get(textController.getAllTexts);

router.route("/:slug").get(textController.getTextByHeading);

// router.use(authController.protect);
// router.use(authController.restrictTo('artist', 'admin', 'gallerist'));

router
	.route("/upload")
	.post(
		authController.restrictTo("artist", "mentor", "admin", "gallerist"),
		textController.setArtworkUserIds,
		textController.createText
	);

// router
//   .route('/:category')
//   .get(
//     setNestedRouteFilterCategories(TEXT_NESTED_ROUTE_CATEGORIES),
//     textController.getAllTexts
//   );

router
	.route("/:id")
	.get(textController.getTextById)
	.patch(textController.updateText)
	.delete(textController.deleteText);

router.route("/").get(textController.getAllTexts);

// router
//   .route('/upload')
//   .post(
//     authController.protect,
//     authController.restrictTo('artist', 'admin', 'gallerist'),
//     textController.createText
//   );

module.exports = router;
