// const recommendation = require("./rec.mongo");
const regressionRec = require("./rec.mongo copy");
const contentRec = require("./content.mongo");
const collabItemRec = require("./itembased.mongo");
const collabUserRec = require("./userbased.mongo");
const axios = require("axios").default;
// const getRecommendedMovies = async (userId) => {
//   try {
//     return await recommendation.find({ id: userId });
//   } catch (err) {
//     console.log(`Could not find recommendations ${err}`);
//   }
// };

const getRegressionMovies = async (userId) => {
  try {
    return await regressionRec.find({ id: userId });
  } catch (err) {
    console.log(`Could not find recommendations ${err}`);
  }
};
const getContentMovies = async (userId) => {
  try {
    return await contentRec.find({ id: userId });
  } catch (err) {
    console.log(`Could not find recommendations ${err}`);
  }
};
const getUserCollabMovies = async (userId) => {
  try {
    return await collabUserRec.find({ id: userId });
  } catch (err) {
    console.log(`Could not find recommendations ${err}`);
  }
};

const getItemCollabMovies = async (userId) => {
  try {
    return await collabItemRec.find({ id: userId });
  } catch (err) {
    console.log(`Could not find recommendations ${err}`);
  }
};

// const getMovieImage = async (recData) => {
//   await recData.map(async (movie) => {
//     const imgRes = await axios.get(
//       `https://api.themoviedb.org/3/find/${movie.imdbId}?api_key=ab414ecaafc012ffce4c584b0924aa87&language=en-US&external_source=imdb_id`
//     );
//     // const imgResData = await imgRes.json();

//     console.log(imgRes.movie_results[0].poster_path);
//     // try {
//     //   movie["poster"] = imgRes.movie_results[0].poster_path;
//     // } catch (err) {
//     //   console.log(err);
//     // }
//   });
// };

module.exports = {
  // getRecommendedMovies,

  getContentMovies,
  getItemCollabMovies,
  getRegressionMovies,
  getUserCollabMovies,
};
