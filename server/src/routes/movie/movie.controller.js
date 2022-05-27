const { getSearchedMovie } = require("../../models/movies/movies.model");

const httpSearchMovies = async (req, res) => {
  const searchedMovie = req.body;
  console.log(searchedMovie);

  const data = await getSearchedMovie(searchedMovie);

  res.status(200).json({
    message: "ok",
    movieResults: data.slice(0, 5),
  });
};

module.exports = {
  httpSearchMovies,
};
