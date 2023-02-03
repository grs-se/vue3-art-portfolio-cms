const express = require("express");
const exhibitionController = require("../controllers/exhibitionController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/exhibitions").get(exhibitionController.getAllExhibitions);

router
	.route("/:id")
	.get(exhibitionController.getExhibition)
	.patch(
		authController.protect,
		authController.restrictTo("artist", "admin", "gallerist"),
		exhibitionController.updateExhibition
	)
	.delete(
		authController.protect,
		authController.restrictTo("artist", "admin", "gallerist"),
		exhibitionController.deleteExhibition
	);

router
	.route("/uploadExhibition")
	.post(
		authController.protect,
		authController.restrictTo("artist", "admin", "gallerist"),
		exhibitionController.createExhibition
	);

module.exports = router;
