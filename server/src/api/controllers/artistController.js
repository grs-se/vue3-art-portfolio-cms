const Artist = require("../models/artistModel");
const factory = require("./handlerFactory");
const AppError = require("./errorController");
const catchAsync = require("../utils/catchAsync");

exports.getAllArtists = factory.getAll(Artist, "artistResearch");
// exports.getArtist = factory.getOne(
//   Artist,
//   {
//     path: 'texts',
//     select: 'heading'
//   },
//   'artistResearch'
// );
exports.getArtist = factory.getOneById(Artist, "_mapbox");
exports.createArtist = factory.createOne(Artist);
exports.updateArtist = factory.updateOne(Artist);
exports.deleteArtist = factory.deleteOne(Artist);

exports.getArtistsWithin = catchAsync(async (req, res, next) => {
	const { distance, latlng, unit } = req.params;
	const [lat, lng] = latlng.split(",");

	const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

	if (!lat || !lng) {
		next(
			new AppError(
				"Please provide a latitude and longitude in the format lat, lng.",
				400
			)
		);
	}

	const artists = await Artist.find({
		location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
	});

	//   console.log(distance, lat, lng, unit);
	//   console.log(artists);

	res.status(200).json({
		status: "success",
		results: artists.length,
		data: {
			data: artists,
		},
	});
});

exports.getDistances = catchAsync(async (req, res, next) => {
	const { latlng, unit } = req.params;
	const [lat, lng] = latlng.split(",");

	const multiplier = unit === "mi" ? 0.000621371 : 0.001;

	if (!lat || !lng) {
		next(
			new AppError(
				"Please provide a latitude and longitude in the format lat, lng.",
				400
			)
		);
	}

	const distances = await Artist.aggregate([
		{
			$geoNear: {
				near: {
					type: "Point",
					coordinates: [lng * 1, lat * 1],
				},
				distanceField: "distance",
				distanceMultiplier: multiplier,
			},
		},
		{
			$project: {
				distance: 1,
				name: 1,
			},
		},
	]);

	res.status(200).json({
		status: "success",
		data: {
			data: distances,
		},
	});
});
