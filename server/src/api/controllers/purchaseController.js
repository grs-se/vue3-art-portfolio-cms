const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Artwork = require("../models/artworkModel");
const Purchase = require("../models/purchaseModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
	const artwork = await Artwork.findById(req.params.artworkId);
	// console.log(artwork);

	// const artwork = await Artwork.findOne(req.params.title);
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		success_url: `${req.protocol}://${req.get("host")}/?artwork=${
			req.params.artworkId
		}&user=${req.user.id}&price=${artwork.price}`,
		cancel_url: `${req.protocol}://${req.get("host")}/artwork/${artwork.slug}`,
		customer_email: req.user.email,
		client_reference_id: req.params.artworkId,
		line_items: [
			{
				name: `${artwork.title}`,
				description: artwork.description,
				images: [`${artwork.imageCover}`],
				amount: artwork.price * 100,
				currency: "gbp",
				quantity: 1,
			},
		],
	});

	res.status(200).json({
		status: "success",
		session,
	});
});

exports.createPurchaseCheckout = catchAsync(async (req, res, next) => {
	const { artwork, user, price } = req.query;

	if (!artwork || !user || !price) return next();
	await Purchase.create({ artwork, user, price });

	res.redirect(req.originalUrl.split("?")[0]);
});

exports.createPurchase = factory.createOne(Purchase);
exports.getPurchase = factory.getOneById(Purchase);
exports.getAllPurchases = factory.getAll(Purchase);
exports.updatePurchase = factory.updateOne(Purchase);
exports.deletePurchase = factory.deleteOne(Purchase);
