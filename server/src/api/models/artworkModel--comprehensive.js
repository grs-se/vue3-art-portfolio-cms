const mongoose = require("mongoose");
const slugify = require("slugify");

const artworkSchema = new mongoose.Schema(
	{
		content: {
			categories: {
				type: [String],
				required: [true, "An Artwork must be assigned categories to filter by"],
				// enum: ["painting", "drawing", "studio", "observation"]
			},
			diaryNotes: {
				type: [String],
			},
			historicalContext: {
				type: String,
			},
			motifs: {
				type: [String],
			},
			subjectMatter: {
				type: String,
			},
			symbols: {
				type: [String],
			},
			tags: {
				type: [String],
				lowercase: true,
				trim: true,
			},
			themes: {
				type: [String],
			},
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
		},
		date: {
			type: String,
			productionDate: {
				type: Date,
				set: (val) => new Date(val).getTime(),
				dateStarted: {
					type: Date,
				},
				dateFinished: {
					type: Date,
				},
				// 2.5 Hours, 2 weeks
				durationGestation: {
					type: String,
				},
			},
			recordCreatedAt: {
				type: Date,
				default: Date.now(),
				select: false,
			},
		},
		description: {
			type: String,
			briefDescription: {
				type: String,
			},
			contentDescription: {
				type: String,
			},
			summaryDescription: {
				type: String,
			},
			physicalDescription: {
				type: String,
			},
			processDescription: {
				type: String,
			},
		},
		dimensions: {
			height: {
				cm: Number,
				px: Number,
			},
			width: {
				cm: Number,
				px: Number,
			},
			depth: {
				cm: Number,
				px: Number,
				required: false,
			},
		},
		exhibitions: {
			type: [String],
		},
		galleryType: {
			hero: {
				type: Boolean,
				default: false,
			},
			spotlight: {
				type: Boolean,
				default: false,
			},
		},
		images: {
			imageCover: {
				type: String,
				required: [true, "Artwork must have an image"],
			},
			imageDetails: [String],
			imageThumbnail: String,
		},
		index: {
			computedIndex: {
				type: Number,
			},
			manualIndex: {
				type: Number,
			},
		},
		locationCreated: {
			// London
			type: [String],
			lowercase: true,
			trim: true,
		},
		materialsAndTechniques: {
			medium: {
				// "Drawing", "painting", "sculpture"
				type: [String],
			},
			// "Oil on canvas"
			materials: {
				type: [String],
			},
			// "glazing", "plein-aire"
			techniques: {
				type: [String],
			},
			// "glazing", "plein-aire"
			methods: {
				type: [String],
			},
			// "Oil painting on canvas"
			materialsAndTechniques: {
				type: [String],
			},
		},
		meta: {},

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
			buyer: {
				name: String,
				telephone: Number,
				email: String,
				address: String,
			},
			owners: {
				type: [String],
				required: false,
				select: false,
			},
			priceSold: Number,
			sold: Boolean,
		},
		secretArtwork: {
			type: Boolean,
			default: false,
			select: false,
		},
		slug: String,
		// text: [
		//   {
		//     type: mongoose.Schema.ObjectId,
		//     ref: 'Text'
		//   }
		// ]
		socialMeta: {
			favs: Number,
			votes: Number,
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
				set: (val) => Math.round(val * 10) / 10,
			},
		},
		state: {
			destroyed: {
				type: Boolean,
				default: false,
			},
		},
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
