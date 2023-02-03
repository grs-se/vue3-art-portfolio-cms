const mongoose = require("mongoose");
const sizeOf = require("image-size");
const slugify = require("slugify");
// const Exhibition = require('./exhibitionModel');
// const validator = require('validator');
// const { ARTWORK_CATEGORIES, ARTWORK_LOCATIONS } = require('./../config');

const artworkSchema = new mongoose.Schema(
	{
		imageCover: {
			type: String,
			required: [true, "Artwork must have an image"],
		},
		imageDetails: [String],
		imageThumbnail: String,
		title: {
			type: String,
			required: [true, "Please submit a title for the artwork"],
			unique: true,
			trim: true,
			maxLength: [
				120,
				"An Artwork title must have less or equal than 50 characters",
			],
			minLength: [1, "An Artwork must have less or equal than 1 characters"],
			// validate: [
			//   validator.isAlphanumeric,
			//   'Artwork name must only contain letters or numbers'
			// ]
		},
		index: {
			type: Number,
		},
		slug: String,
		dimensions: {
			height: {
				cm: Number,
				px: Number,
			},
			// required: [true, 'Please input height of image']
			width: {
				cm: Number,
				px: Number,
				// required: [true, 'Please input width of image']
			},
			depth: {
				cm: Number,
				px: Number,
				required: false,
			},
		},

		medium: {
			type: [String],
			palette: [String],
			// Write aggregatation pipeline function to render only images with a particular palette of colours, and ascertain the most popular colou palettes according to user purchases
			support: String,
			ground: String,
		},
		date: {
			type: Date,
			set: (val) => new Date(val).getTime(),
			dateStarted: {
				type: Date,
			},
			dateFinished: {
				type: Date,
			},
			recent: {
				type: Boolean,
			},
		},
		durationGestation: {
			type: Date,
		},
		description: {
			type: String,
			required: false,
		},
		sales: {
			price: {
				type: Number,
				default: 375,
			},
			priceRange: {
				type: String,
			},
			priceDiscount: {
				type: Number,
				select: false,
				validate: {
					validator: function(val) {
						// this only points to current doc on NEW document creation
						return val < this.price;
					},
					message: "Discount price ({VALUE}) should be below regular price",
				},
			},
			sold: Boolean,
			priceSold: Number,
			buyer: {
				name: String,
				telephone: Number,
				email: String,
				address: String,
			},
		},
		location: {
			type: [String],
			lowercase: true,
			trim: true,
			// enum: {
			//   values: ARTWORK_LOCATIONS,
			//   message: 'This is not a valid location.'
			// }
		},
		destroyed: Boolean,
		categories: {
			type: [String],
			required: [true, "An Artwork must be assigned filter categories"],
			// default: "all",
			// enum: {
			//   values: ARTWORK_CATEGORIES,
			//   default: 'all',
			//   message:
			//     'This is not a valid filter category. Please refer to list of valid options'
			// },
		},
		tags: {
			type: [String],
			required: [false],
			lowercase: true,
			trim: true,
			default: "artwork",
		},
		themes: {
			type: [String],
		},
		subject: {
			types: [String],
		},
		exhibitions: Array,
		meta: {
			favs: Number,
			votes: Number,
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, "Rating must be above 1.0"],
			max: [5, "Rating must be below 5.0"],
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		ratingPersonal: {
			type: Number,
			default: 4.5,
			min: [1, "Rating must be above 1.0"],
			max: [5, "Rating must be below 5.0"],
			set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			select: false,
		},
		locationCreated: {
			type: String,
			required: false,
		},
		owners: {
			type: [String],
			required: false,
			select: false,
		},
		secretArtwork: {
			type: Boolean,
			default: false,
			select: false,
		},
		spotlight: {
			type: Boolean,
			default: false,
		},
		hero: {
			type: Boolean,
			default: false,
		},
		// text: [
		//   {
		//     type: mongoose.Schema.ObjectId,
		//     ref: 'Text'
		//   }
		// ]
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		// id: false
	}
);

// artworkSchema.index({ price: 1 });
artworkSchema.index({ price: 1, date: -1 });
artworkSchema.index({ slug: 1 });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// artworkSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'text',
//     select: 'heading'
//   });
//   next();
// });

artworkSchema.pre("save", function(next) {
	if (this.title) this.slug = slugify(this.title, { lower: true });
	next();
});

// artworkSchema.pre('save', function(next) {
//   let i = 1;
//   this.index = i++;
//   next();
// });

// artworkSchema.pre('save', function(next) {
//   console.log(this.sales.priceRange);
//   next();
// });

artworkSchema.pre("save", function(next) {
	let { price } = this.sales;

	const minMaxPrice = (min, max) => {
		if (price >= min && price <= max)
			this.sales.priceRange = `£${min} to £${max}`;
	};

	const priceRanges = () => {
		minMaxPrice(0, 99);
		minMaxPrice(100, 250);
		minMaxPrice(250, 500);
		minMaxPrice(500, 750);
		minMaxPrice(750, 1000);
		if (price >= 1000) this.sales.priceRange = "£1000+";
	};
	priceRanges();
	next();
});

// artworkSchema.pre('save', function(next) {
//   let { height, width, depth } = this.dimensions;
//   function convertPxToCm() {
//     if (height.px) height.cm = (height.px / 100) * 37.7952755906;
//     if (width.px) width.cm = (width.px / 100) * 37.7952755906;
//     if (depth.px) depth.cm = (depth.px / 100) * 37.7952755906;
//   }
//   convertPxToCm();
//   console.log(height, width, depth);
//   next();
// });
// artworkSchema.pre('save', function(next) {
//   const dims = sizeOf(this.imageCover);

//   if (!this.dimensions.height) this.dimensions.height = dims.width;

//   if (!this.dimensions.width) this.dimensions.width = dims.width;
//   next();
// });

artworkSchema.pre("save", function(next) {
	const convertTitleCase = function(title) {
		const capitalise = (str) =>
			str[0] === "("
				? str[0] + str[1].toUpperCase() + str.slice(2)
				: str[0].toUpperCase() + str.slice(1);
		const exceptions = [
			"a",
			"an",
			"the",
			"but",
			"of",
			"or",
			"on",
			"in",
			"with",
			"da",
		];
		const titleCase = title
			.toLowerCase()
			.split(" ")
			.map((word) => (exceptions.includes(word) ? word : capitalise(word)))
			.join(" ");
		return capitalise(titleCase);
	};
	this.title = convertTitleCase(this.title);
	if (this.medium[0]) this.medium[0] = convertTitleCase(this.medium[0]);
	if (this.medium[1]) this.medium[1] = convertTitleCase(this.medium[1]);
	next();
});
/*
artworkSchema.pre('save', function(next) {
  const convertSentenceCase = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  if (this.medium) this.medium = convertSentenceCase(this.medium);
  next();
});
*/
// artworkSchema.pre('save', async function(next) {
//   const exhibitionsPromises = this.exhibitions.map(
//     async id => await Exhibition.findById(id)
//   );
//   this.exhibitions = await Promise.all(exhibitionsPromises);
//   next();
// });

// Virtual populate
artworkSchema.virtual("texts", {
	ref: "Text",
	foreignField: "artwork",
	localField: "_id",
});

artworkSchema.virtual("reviews", {
	ref: "Review",
	foreignField: "artwork",
	localField: "_id",
});

// QUERY MIDDLEWARE
artworkSchema.pre(/^find/, function(next) {
	this.find({ secretArtwork: { $ne: true } });

	this.start = Date.now();
	next();
});

// artworkSchema.post(/^find/, function(docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   // console.log(docs);
//   next();
// });

artworkSchema.pre("aggregate", function(next) {
	// Hide secret artworks if geoNear is NOT used
	if (!(this.pipeline().length > 0 && "$geoNear" in this.pipeline()[0])) {
		this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
	}
	next();
});

// const GEOSPATIAL_OPERATOR_TEST = /^[$]geo[a-zA-Z]*/;

// tourSchema.pre('aggregate', function(next) {
//   const geoAggregate = this.pipeline().filter(
//     // finding if the pipeline stage name has any geo operator using the regex. 'search' method on a string returns -1 if the match is not found else non zero value
//     stage => Object.keys(stage)[0].search(GEOSPATIAL_OPERATOR_TEST) !== -1
//   );

//   if (geoAggregate.length === 0) {
//     this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   }
//   next();
// });

// tourSchema.pre('aggregate', function (next) {
//   const things = this.pipeline()[0];
//   if (Object.keys(things)[0] !== '$geoNear') {
//     this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   }
//   next();
// });

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;
