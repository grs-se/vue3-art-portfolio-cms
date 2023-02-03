// const exhibition = require('../models/exhibitionModel');
const Exhibition = require("../models/exhibitionModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllExhibitions = catchAsync(async (req, res, next) => {
	const exhibitions = await Exhibition.find();
	// RENDER JSON
	res.status(200).json({
		status: "success",
		results: exhibitions.length,
		data: {
			exhibitions,
		},
	});
	// next();
});

// exports.getAllExhibitions = (...exhibits) => {
//   return catchAsync(async (req, res, next) => {
//     console.log(req.query);
//     const { exhibition } = req.params;

//     if (!exhibits.includes(exhibition)) {
//       return next(
//         new AppError('No exhibition found with that category name', 404)
//       );
//     }
//     const exhibitions = await Exhibition.find();
//     // RENDER JSON
//     res.status(200).json({
//       status: 'success',
//       results: exhibitions.length,
//       data: {
//         exhibitions
//       }
//     });
//   });
// };

exports.getExhibition = catchAsync(async (req, res, next) => {
	const exhibition = await Exhibition.findById(req.params.id);
	// exhibition.findOne({ _id: req.params.id });

	if (!exhibition) {
		return next(new AppError("No exhibition found with that ID", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			exhibition,
		},
	});
});

exports.createExhibition = catchAsync(async (req, res, next) => {
	const newExhibition = await Exhibition.create(req.body);

	console.log(newExhibition);

	res.status(201).json({
		status: "success",
		data: {
			exhibition: newExhibition,
		},
	});
	// next();
});

exports.updateExhibition = catchAsync(async (req, res, next) => {
	const exhibition = await Exhibition.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!exhibition) {
		return next(new AppError("No Exhibition found with that ID", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			exhibition,
		},
	});
});

exports.deleteExhibition = factory.deleteOne(Exhibition);
