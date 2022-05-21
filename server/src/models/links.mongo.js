const mongoose = require("mongoose");

const linksSchema = new mongoose.Schema({
  imdbId: {
    type: String,
    required: true,
  },
  tmdbId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("link", linksSchema);
