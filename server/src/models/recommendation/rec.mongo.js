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

const recommenderSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },

  regressionBased: [movieDataSchema],
  contentBased: [movieDataSchema],
  collabUserBased: [movieDataSchema],
  collabItemBased: [movieDataSchema],
});

module.exports = mongoose.model("recommendation", recommenderSchema);
