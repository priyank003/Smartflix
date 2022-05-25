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

const collabItemRecommenderSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  collabItemBased: [movieDataSchema],
});

module.exports = mongoose.model("collabItemRec", collabItemRecommenderSchema);
