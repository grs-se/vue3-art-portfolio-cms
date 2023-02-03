const Artwork = require("../models/artworkModel");
const Purchase = require("../models/purchaseModel");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
	const artworks = await Artwork.find();

	res.status(200).render("overview", {
		title: "All artworks",
		artworks,
	});
});

exports.getArtwork = catchAsync(async (req, res, next) => {
	const artwork = await Artwork.findOne({ slug: req.params.slug }).populate({
		path: "texts",
		fields: "review rating user",
	});

	res.status(200).render("artwork", {
		title: `${artwork.title}`,
		artwork,
	});
});

exports.getLoginForm = (req, res) => {
	res
		.status(200)
		.set(
			"Content-Security-Policy",
			"connect-src 'self' https://cdnjs.cloudflare.com"
		)
		.render("login", {
			title: "Log into your account",
		});
};

exports.getAccount = (req, res) => {
	res.status(200).render("account", {
		title: "Your account",
		// user: req.user
	});
};

exports.getMyArtworks = catchAsync(async (req, res, next) => {
	const purchases = await Purchase.find({ user: req.user.id });

	const artworkIds = purchases.map((el) => el.artwork);
	const artworks = await Artwork.find({ _id: { $in: artworkIds } });

	res.status(200).render("galleryCards", {
		title: "My Artworks",
		artworks,
	});
});

exports.updateUserData = catchAsync(async (req, res, next) => {
	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		{
			name: req.body.name,
			email: req.body.email,
		},
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).render("account", {
		title: "Your account",
		user: updatedUser,
	});
});

exports.getLanding = (req, res) => {
	res.status(200).render("landing", {
		title: "Welcome",
		// user: req.user
	});
};
