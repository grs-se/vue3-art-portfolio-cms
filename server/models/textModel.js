const mongoose = require('mongoose');
const slugify = require('slugify');

// const { TEXT_CATEGORIES } = require('./../config');

const textSchema = new mongoose.Schema(
  {
    heading: {
      type: String
      // required: [true, 'Document must have a heading']
    },
    slug: String,
    subHeading: String,
    version: Number,
    content: {
      type: [String],
      required: [true, 'Document must have content']
    },
    categories: {
      type: [String],
      required: [true, 'A text must be assigned filter categories'],
      default: 'all',
      // enum: {
      //   values: TEXT_CATEGORIES,
      //   default: 'all',
      //   message:
      //     'This is not a valid filter category. Please refer to list of valid options'
      // },
      tags: {
        type: [String],
        required: [false],
        lowercase: true,
        trim: true
      }
    },
    rating: Number,
    createdAt: Date,
    dateWritten: String,
    datePublished: Date,
    publishedAt: String,
    wordCount: {
      type: Number
      //   wordCount: {
      //     counter: function(str) {
      //     return str.split(" ").length;
      //     }
      // }
    },
    // categories: [String],
    // type: [String],
    // signature: [String],
    locationWritten: String,
    // exhibitions: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Exhibition'
    //   }
    // ],
    secretText: {
      type: Boolean,
      default: false,
      select: false
    },
    artwork: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Artwork'
      }
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
    // id: false
  }
);

textSchema.pre('save', function(next) {
  if (this.heading) this.slug = slugify(this.heading, { lower: true });
  next();
});

// textSchema.pre(/^find/, function(next) {
//   function jsonEscape(str) {
//     return (
//       str
//         // .replace(/\n/g, '\\\\n')
//         // .replace(/\r/g, '\\\\r')
//         // .replace(/\t/g, '\\\\t');
//         .replace('\\n', '\n')
//     );
//   }

//   // const content = this.content;
//   this.content = JSON.parse(jsonEscape(this.content));
//   next();
// });

textSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name'
  }).populate({
    path: 'artwork',
    select: 'title'
  });
  // this.populate({
  //   path: 'artwork',
  //   select: 'title'
  // }).populate({
  //   path: 'user',
  //   select: 'name'
  // });
  next();
});

textSchema.pre(/^find/, function(next) {
  this.find({ secretText: { $ne: true } });

  this.start = Date.now();
  next();
});
// textSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'exhibitions'
//   });
// });

// text.pre(/^find/, function(next) {
//   function wordCount(str) {
//     str.split(' ').length;
//     return (this.wordCount = wordCount);
//   }
// });

// TODO
// Create function that can return the wordount of all word.docx converted to special json code, perhaps by removing all special characters and the counting.
// textSchema.pre('save', function(next) {
//   this.wordCount = this.content.split(' ').length;
//   next();
// });

const Text = mongoose.model('Text', textSchema);

module.exports = Text;
