const mongoose = require("mongoose");

const movieDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  imdbId: {
    type: String,
    required: true,
  },
});

const collabUserRecommenderSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  collabUserBased: [movieDataSchema],
});

module.exports = mongoose.model("collabUserRec", collabUserRecommenderSchema);
