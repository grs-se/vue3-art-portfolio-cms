const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const purchaseSchema = new mongoose.Schema({
  artwork: {
    type: ObjectId,
    ref: 'Artwork',
    required: [true, 'Purchase must belong to an Artwork!']
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'Purchase must belong to a User!']
  },
  price: {
    type: Number,
    required: [true, 'Purchase must have a price!']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});

purchaseSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'artwork',
    select: 'title'
  });
  next();
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;