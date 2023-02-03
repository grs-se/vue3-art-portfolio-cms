const express = require("express");
// const artworkController = require('../controllers/artworkController');
const authController = require("../controllers/authController");
const { uploadImages, listImages } = require("../controllers/uploadController");
const imageUpload = require("../middlewares/imageUpload");

const router = express.Router();

router.route("/").post(
	// authController.protect,
	// authController.restrictTo('artist', 'admin', 'gallerist'),
	imageUpload,
	uploadImages
);

router.route("/listImages").get(listImages);

module.exports = router;
