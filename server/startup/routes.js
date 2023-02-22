const artworkRouter = require('../routes/artworkRoutes');
const userRouter = require('../routes/userRoutes');
const exhibitionRouter = require('../routes/exhibitionRoutes');
const textRouter = require('../routes/textRoutes');
const reviewRouter = require('../routes/reviewRoutes');
const artistRouter = require('../routes/artistRoutes');
const purchaseRouter = require('../routes/purchaseRoutes');
const uploadRouter = require('../routes/uploadRoutes');

module.exports = function(app) {
	app.use('/gallery', artworkRouter);
	app.use('/users', userRouter);
	app.use('/text', textRouter);
	app.use('/reviews', reviewRouter);
	app.use('/exhibitions', exhibitionRouter);
	app.use('/artist-research', artistRouter);
	app.use('/sales', purchaseRouter);
	app.use('/upload', uploadRouter);
};
