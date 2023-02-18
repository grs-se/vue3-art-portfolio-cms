const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");

const getCollectionName = Model => Model.collection.collectionName;
const getModelName = Model => Model.modelName.toLowerCase();

exports.setNestedRouteFilterCategories = ([...categories]) => {
	return catchAsync(async (req, res, next) => {
		const { category } = req.params;
		if (!categories.includes(category)) {
			return next(new AppError(`Invalid category / Forbidden.`, 403));
		}
		req.categories = category;
		next();
	});
};

exports.getAll = (Model, view, viewMode) =>
	catchAsync(async (req, res, next) => {
		const category = req.categories;

		const apiFeatures = new APIFeatures(
			Model.find({ categories: category || { $exists: true } }),
			req.query
		)
			.filter()
			.sort()
			.limitFields()
			.paginate();
		const docs = await apiFeatures.query;

		// const doc = await apiFeatures.query.explain();

		//   res.status(200).render(view, {
		//     status: 'success',
		//     title: `${getCollectionName(Model)}`,
		//     results: docs.length,
		//     viewMode,
		//     docs
		//   });
		// });

		res.status(200).json({
			status: "success",
			results: docs.length,
			data: {
				[getCollectionName(Model)]: docs
			}
		});
	});

exports.getOneByName = (Model, view, popOptions) => {
	catchAsync(async (req, res, next) => {
		// const doc = await Model.findOne({ slug: req.params.slug });
		let query = Model.findOne({ slug: req.params.slug });
		if (popOptions) query = query.populate(popOptions);
		const doc = await query;

		if (!doc) {
			return next(new AppError(`Invalid ${getModelName(Model)} name`, 404));
		}

		res.status(200).json({
			status: "success",
			data: {
				[getCollectionName(Model)]: doc
			}
		});
	});
};

exports.getOneById = (Model, popOptions, view) =>
	catchAsync(async (req, res, next) => {
		let query = Model.findById(req.params.id);
		if (popOptions) query = query.populate(popOptions);
		const doc = await query;

		if (!doc) {
			return next(new AppError(`Invalid ${getModelName(Model)} ID`, 404));
		}

		res.status(200).json({
			status: "success",
			data: {
				[getCollectionName(Model)]: doc
			}
		});
	});

exports.createOne = Model =>
	catchAsync(async (req, res) => {
		const doc = await Model.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				[getCollectionName(Model)]: doc
			}
		});
	});

exports.updateOne = Model =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		if (!doc) {
			return next(
				new AppError(`Invalid ${getModelName(Model)} ID / Forbidden`, 404)
			);
		}

		res.status(200).json({
			status: "success",
			data: {
				[getCollectionName(Model)]: doc
			}
		});
	});

exports.updateOneIfOwner = (Model, idField) =>
	catchAsync(async (req, res, next) => {
		const { id: userId } = req.user;
		const { id } = req.params;

		const doc = await Model.findOneAndUpdate(
			{ _id: id, [idField]: { _id: userId } },
			req.body,
			{
				new: true,
				runValidators: true
			}
		).exec();

		if (!doc) {
			return next(
				new AppError(`Invalid ${getModelName(Model)} ID / Forbidden`, 404)
			);
		}

		res.status(200).json({
			status: "success",
			data: {
				[getCollectionName(Model)]: doc
			}
		});
	});

exports.deleteOne = Model =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndDelete(req.params.id);

		if (!doc) {
			next(new AppError(`Invalid ${getModelName(Model)} ID / Forbidden`, 403));
		}

		res.status(204).json({
			status: "success",
			data: null
		});
	});

exports.deleteOneIfOwner = (Model, idField) =>
	catchAsync(async (req, res, next) => {
		const { id: userId } = req.user;
		const { id } = req.params;

		const doc = await Model.findOneAndDelete({
			_id: id,
			[idField]: { _id: userId }
		}).exec();

		if (!doc) {
			next(new AppError(`Invalid ${getModelName(Model)} ID / Forbidden`, 403));
			return;
		}

		res.status(204).json({
			status: "success",
			data: null
		});
	});
