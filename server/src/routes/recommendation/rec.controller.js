const axios = require("axios").default;

const BASE_URL = "http://localhost:9000";

const {
  // getRecommendedMovies,

  getContentMovies,
  getRegressionMovies,
  getUserCollabMovies,
  getItemCollabMovies,
} = require("../../models/recommendation/rec.model");

const httpRecommendWithRegression = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  try {
    // await axios.get(`${BASE_URL}/${userId}/regression`);
    const data = await getRegressionMovies(userId);

    // await getMovieImage(data[0].regressionBased);

    return res.status(200).json(data[0].regressionBased);
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({
    message: "ok",
  });
};
const httpRecommendWithContent = async (req, res) => {
  const userId = req.params.userId;

  try {
    // await axios.get(`${BASE_URL}/${userId}/regression`);
    const data = await getContentMovies(userId);

    return res.status(200).json(data[0].contentBased);
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({
    message: "ok",
  });
};

const httpRecommendWithCollabi = async (req, res) => {
  const userId = req.params.userId;

  try {
    const data = await getItemCollabMovies(userId);

    return res.status(200).json(data[0].collabItemBased);
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({
    message: "ok",
  });
};
const httpRecommendWithCollabu = async (req, res) => {
  const userId = req.params.userId;

  try {
    const data = await getUserCollabMovies(userId);

    return res.status(200).json(data[0].collabUserBased);
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({
    message: "ok",
  });
};

module.exports = {
  httpRecommendWithCollabi,
  httpRecommendWithCollabu,
  httpRecommendWithContent,
  httpRecommendWithRegression,
};
