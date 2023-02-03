const mongoose = require('mongoose');
const slugify = require('slugify');

// const Artwork = require('./artworkModel');

const exhibitionSchema = new mongoose.Schema({
  title: String,
  artworks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Artwork'
    }
  ],
  slug: String,
  contacts: Array,
  title: String,
  location: String,
  gallery: String,
  duration: Number
});

exhibitionSchema.pre('save', function(next) {
  if (this.title) this.slug = slugify(this.title, { lower: true });
  next();
});

// QUERY MIDDLEWARE
exhibitionSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'artworks',
    select: '_id imageCover title medium date price'
  });

  next();
});

const Exhibition = mongoose.model('Exhibition', exhibitionSchema);

module.exports = Exhibition;
