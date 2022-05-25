// const recommendation = require("./rec.mongo");
const regressionRec = require("./rec.mongo copy");
const contentRec = require("./content.mongo");
const collabItemRec = require("./itembased.mongo");
const collabUserRec = require("./userbased.mongo");

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

module.exports = {
  // getRecommendedMovies,
  getContentMovies,
  getItemCollabMovies,
  getRegressionMovies,
  getUserCollabMovies,
};
