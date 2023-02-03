const mongoose = require("mongoose");
const Artwork = require("./artworkModel");

const reviewSchema = new mongoose.Schema(
	{
		review: {
			type: String,
			required: [true, "Review can not be empty!"],
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		artwork: {
			type: mongoose.Schema.ObjectId,
			ref: "artwork",
			required: [true, "Review must belong to a artwork."],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "Review must belong to a user"],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Indexing here allows 1 user to only make 1 comment on that specific artwork
// reviewSchema.index({ artwork: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next) {
	// this.populate({
	//   path: 'artwork',
	//   select: 'name'
	// }).populate({
	//   path: 'user',
	//   select: 'name photo'
	// });

	this.populate({
		path: "user",
		select: "name",
	});
	next();
});

reviewSchema.statics.calcReviewStats = async function(artworkId) {
	const stats = await this.aggregate([
		{
			$match: { artwork: artworkId },
		},
		{
			$group: {
				_id: "$artwork",
				nRating: { $sum: 1 },
				avgRating: { $avg: "$rating" },
			},
		},
	]);
	// console.log(stats);

	if (stats.length > 0) {
		await Artwork.findByIdAndUpdate(artworkId, {
			ratingsQuantity: stats[0].nRating,
			ratingsAverage: stats[0].avgRating,
		});
	} else {
		await Artwork.findByIdAndUpdate(artworkId, {
			ratingsQuantity: 0,
			ratingsAverage: 4.5,
		});
	}
	console.log(stats);
};

reviewSchema.post(/save|^findOne/, async (doc, next) => {
	if (doc) {
		await doc.constructor.calcReviewStats(doc.artwork);
	}
	next();
});

/*
reviewSchema.post('save', function() {
  // this points to current review
  this.constructor.calcReviewStats(this.artwork);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.clone().findOne();
  // console.log(this.r);
  next();
});


reviewSchema.post(/^findOneAnd/, async function() {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcReviewStats(this.r.artwork);
});
*/
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
