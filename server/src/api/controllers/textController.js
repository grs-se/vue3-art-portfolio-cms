const Text = require("../models/textModel");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.setArtworkUserIds = (req, res, next) => {
	// Allow nested routes
	if (!req.body.artwork) req.body.artwork = req.params.artworkId;
	// if (!req.body.user) req.body.user = req.user.id;
	req.body.user = req.user.id;
	next();
};

exports.getAllTexts = factory.getAll(Text, "text");
exports.getTextById = factory.getOneById(Text, "text");
// exports.getTextByHeading = factory.getOneByName(Text, 'text');
exports.getTextByHeading = catchAsync(async (req, res, next) => {
	const text = await Text.findOne({ slug: req.params.slug });

	if (!text) {
		return next(new AppError("There is no text with that title", 404));
	}

	res.status(200).json({
		status: "success",
		results: text.length,
		data: text,
	});
});
// res.status(200).render('artist-statement', {
//   status: 'success',
//   title: `${text.heading}`,
//   text
// });
// });
exports.createText = factory.createOne(Text);
exports.updateText = factory.updateOneIfOwner(Text, "user");
exports.deleteText = factory.deleteOneIfOwner(Text, "user");
// exports.updateText = factory.updateOne(Text);
// exports.deleteText = factory.deleteOne(Text);
/*
exports.getAllTexts = factory.getAll(Text, {
  paramName: 'artworkId',
  foreignField: 'artwork'
});
*/

// exports.getAllTexts = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.artworkId) filter = { artwork: req.params.artworkId };

//   const texts = await Text.find(filter);
//   // RENDER JSON
//   res.status(200).json({
//     status: 'success',
//     results: texts.length,
//     data: {
//       texts
//     }
//   });
//   // next();
// });

// exports.getAlltexts = (...exhibits) => {
//   return catchAsync(async (req, res, next) => {
//     console.log(req.query);
//     const { text } = req.params;

//     if (!exhibits.includes(text)) {
//       return next(
//         new AppError('No text found with that category name', 404)
//       );
//     }
//     const texts = await text.find();
//     // RENDER JSON
//     res.status(200).json({
//       status: 'success',
//       results: texts.length,
//       data: {
//         texts
//       }
//     });
//   });
// };
