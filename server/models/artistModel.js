const mongoose = require('mongoose');
// const Exhibition = require('./exhibitionModel');
// const validator = require('validator');
// const { title_CATEGORIES, title_LOCATIONS } = require('./../config');

const artistSchema = new mongoose.Schema({
  name: {
    names: [String]
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    countryOfOrigin: String,
    description: String
  },
  knownFor: [String],
  born: {
    dob: [String, Date],
    pob: String
  },
  died: {
    dod: [String, Date],
    age: [String, Number],
    pod: String
  },
  characteristics: [String],
  famousWorks: [
    {
      title: String,
      date: String,
      location: String,
      coords: String,
      image: String,
      dimensions: String,
      medium: String
    }
  ],
  quotes: [String],
  // artwork: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'MasterArt'
  //   }
  // ]
});

artistSchema.index({ location: '2dsphere' });

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
