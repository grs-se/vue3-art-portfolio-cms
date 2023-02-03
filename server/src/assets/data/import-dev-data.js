const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Artwork = require("../../api/models/artworkModel");
const User = require("../../api/models/userModel");
const path = require("path");
const Text = require("../../api/models/textModel");
const Review = require("../../api/models/reviewModel");
const Exhibition = require("../../api/models/exhibitionModel");
const Artist = require("../../api/models/artistModel");

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful"));

// READ JSON FILE
const artworks = JSON.parse(
	fs.readFileSync(`${__dirname}/artworks.json`, "utf-8")
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const texts = JSON.parse(fs.readFileSync(`${__dirname}/texts.json`, "utf-8"));
const reviews = JSON.parse(
	fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);
const exhibitions = JSON.parse(
	fs.readFileSync(`${__dirname}/exhibitions.json`, "utf-8")
);
const artists = JSON.parse(
	fs.readFileSync(`${__dirname}/artists.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
	try {
		await Artwork.create(artworks);
		await User.create(users, { validateBeforeSave: false });
		await Text.create(texts);
		await Review.create(reviews);
		await Exhibition.create(exhibitions);
		await Artist.create(artists);
		console.log("Data successfully loaded!");
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

// DELETE DATA FROM DB
const deleteData = async () => {
	try {
		await Artwork.deleteMany();
		await User.deleteMany();
		await Text.deleteMany();
		await Review.deleteMany();
		await Exhibition.deleteMany();
		await Artist.deleteMany();
		console.log("Data successfully deleted!");
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

if (process.argv[2] === "--import") {
	importData();
} else if (process.argv[2] === "--delete") {
	deleteData();
}

console.log(process.argv);
