const express = require("express");
const { httpSearchMovies } = require("./movie.controller");

const movieRouter = express.Router();

movieRouter.post("/search", httpSearchMovies);

module.exports = movieRouter;
