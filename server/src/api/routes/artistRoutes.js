const express = require("express");
const authController = require("../controllers/authController");
const artistController = require("../controllers/artistController");

const router = express.Router();

// router.use(
//   authController.protect,
//   authController.restrictTo('admin', 'artist', 'gallerist')
// );

router
	.route("/artists-within/:distance/center/:latlng/unit/:unit")
	.get(authController.isLoggedIn, artistController.getArtistsWithin);

router
	.route("/distances/:latlng/unit/:unit")
	.get(artistController.getDistances);

router
	.route("/:id")
	.get(artistController.getArtist)
	.patch(artistController.updateArtist)
	.delete(artistController.deleteArtist);

router
	.route("/")
	.get(authController.isLoggedIn, artistController.getAllArtists)
	// .get(artistController.getArtist)
	.post(artistController.createArtist);

// router
//   .route('/research')
//   .get(artistController.getArtist)

module.exports = router;
