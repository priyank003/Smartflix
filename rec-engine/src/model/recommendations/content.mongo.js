import mongoose from "mongoose";

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
  poster: {
    type: String,
    required: true,
  },
});

const contentRecommenderSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  contentBased: [movieDataSchema],
});

module.exports = mongoose.model("contentRec", contentRecommenderSchema);
