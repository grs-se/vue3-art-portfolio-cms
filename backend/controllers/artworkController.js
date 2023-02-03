const multer = require("multer");
const sharp = require("sharp");
const Artwork = require("../models/artworkModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new AppError("Not an image! Please upload only images", 400), false);
	}
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// upload fields = mix of files
exports.uploadArtworkImages = upload.fields([
	{ name: "imageCover", maxCount: 1 },
	{ name: "imageDetails", maxCount: 5 }
]);

// // upload single
// upload.single('imageDetails');
// // upload multiple of the same array
// upload.array('imageDetails', 5);

exports.resizeArtworkImages = catchAsync(async (req, res, next) => {
	if (!req.files.imageCover || !req.files.imageDetails) return next();

	// 1) Cover image
	req.body.imageCover = `artwork-${req.params.id}-${Date.now()}-cover.jpeg`;
	await sharp(req.files.imageCover[0].buffer)
		.resize(2000, 1333)
		.toFormat("jpeg")
		.jpeg({ quality: 90 })
		// .toFile(`public/img/artworks/${req.body.imageCover}`);
		.toFile(`public/assets/img/artworks/${req.body.imageCover}`);

	// 2) Images
	req.body.imageDetails = [];

	await Promise.all(
		req.files.imageDetails.map(async (file, i) => {
			const filename = `artwork-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

			await sharp(file.buffer)
				.resize(2000, 1333)
				.toFormat("jpeg")
				.jpeg({ quality: 90 })
				// .toFile(`public/img/artworks/${filename}`);
				.toFile(`public/assets/img/artworks/${filename}`);

			req.body.imageDetails.push(filename);
		})
	);

	next();
});

exports.uploadImages = async (req, res) => {
	try {
		res.json;
	} catch (err) {
		return res.status(500).json({});
	}
};

exports.aliasTopArtworks = (req, res, next) => {
	req.query.limit = "5";
	req.query.sort = "-ratingsAverage,price";
	req.query.fields = "title,price,medium,dimensions,date,ratingsAverage";
	next();
};

exports.setArtworkId = (req, res, next) => {
	if (req.params.artworkId) req.query.artwork = req.params.artworkId;
	next();
};

exports.getArtworkByTitle = catchAsync(async (req, res, next) => {
	const artwork = await Artwork.findOne({ slug: req.params.slug }).populate({
		path: "texts",
		fields: "review rating user"
	});

	if (!artwork) {
		return next(new AppError("There is no artwork with that title", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			data: artwork
		}
	});
});

// exports.getAllArtworks = (Artwork) =>
//   catchAsync(async (req, res, next) => {
//     const category = req.categories;

//     const apiFeatures = new APIFeatures(
//       Artwork.find({ categories: category || { $exists: true } }),
//       req.query
//     )
//       .filter()
//       .sort()
//       .limitFields()
//       .paginate();
//     const docs = await apiFeatures.query;

//     res.status(200).json({
//       status: 'success',
//       results: docs.length,
//       data: {
//         [getCollectionName(Artwork)]: docs
//       }
//     });
//   });

exports.getAllArtworks = factory.getAll(Artwork);

exports.getArtworkById = factory.getOneById(Artwork);
// exports.getArtwork = factory.getOne(Artwork);
exports.createArtwork = factory.createOne(Artwork);
exports.updateArtwork = factory.updateOne(Artwork);
exports.deleteArtwork = factory.deleteOne(Artwork);

////////////
// Aggregation Pipeline
// Ideas for aggregation pipeline use:
// 1) Get Artwork Financial Statistics: monthly income generated from actual sales, monthly income generated if all artworks made during that month sold, yearly total, framing and display costs, shipping costs, etc.
exports.getArtworkFinStats = catchAsync(async (req, res) => {
	const year = req.params.year * 1; // 2022

	const stats = await Artwork.aggregate([
		{
			$match: {
				date: {
					$gte: new Date(`${year}-01-01`),
					$lte: new Date(`${year}-12-31`)
				}
			}
		},
		{
			$group: {
				_id: { $month: "$date" },
				numArtworks: { $sum: 1 },
				artworks: { $push: `${"$title"}` },
				numRatings: { $sum: "$ratingsQuantity" },
				ratingPersonal: { $avg: "$ratingPersonal " },
				avgRating: { $avg: "$ratings" },
				avgPrice: { $avg: "$price" },
				minPrice: { $min: "$price" },
				maxPrice: { $max: "$price" },
				monthlySales: { $sum: "$sales" },
				monthlyTotalPrice: { $sum: "$price" }
				// popularTags: {},
				// popularPalette: {}
			}
		},
		{
			$addFields: { month: "$_id" }
		},
		{
			$project: {
				_id: 0 // 0 = doesn't show, 1 = show
			}
		},
		{
			$sort: {
				month: 1
				// monthlyTotalPrice: -1 // 1 = ascending order, -1 = descending order
				// avgPrice: 1
			}
		}
	]);

	res.status(200).json({
		status: "success",
		data: {
			stats
		}
	});
});

//////////
exports.getMonthlyPlan = catchAsync(async (req, res) => {
	const year = req.params.year * 1; // 2022

	const plan = await Artwork.aggregate([
		// {
		//   $unwind: '$date'
		// }
		{
			$match: {
				date: {
					$gte: new Date(`${year}-01-01`),
					$lte: new Date(`${year}-12-31`)
				}
			}
		},
		{
			$group: {
				_id: { $month: "$date" },
				numArtworks: { $sum: 1 },
				artworks: { $push: "$title" }
			}
		},
		{
			$addFields: { month: "$_id" }
		},
		{
			$project: {
				_id: 0 // 0 = doesn't show, 1 = show
			}
		},
		{
			$sort: {
				numArtworkStarts: -1
			}
		}
	]);

	res.status(200).json({
		status: "success",
		data: {
			plan
		}
	});
});

/*
exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; // 2022

    const plan = await Artwork.aggregate([
      {
        // unwind destructures an array
        $unwind: '$description'
      },
      {
        $match: {
          year: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$year' },
          numArtworks: { $sum: 1 },
          artworks: { $push: '$title' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0 // 0 = doesn't show, 1 = show
        }
      },
      {
        $sort: {
          numArtworkStarts: -1
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
*/
