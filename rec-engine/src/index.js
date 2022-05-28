// https://www.kaggle.com/rounakbanik/the-movies-dataset/data
// Exercise: Content-based - Include credits data with crew and cast too
// Exercise: Content-based - Make features weighted based on popularity or actors
// Exercise: Collaborative Filtering - Model-based CF with SVD
import cors from "cors";
import express from "express";
import fs from "fs";
import csv from "fast-csv";

import prepareRatings from "./preparation/ratings";
import prepareMovies from "./preparation/movies";
import predictWithLinearRegression from "./strategies/linearRegression";
import predictWithContentBased from "./strategies/contentBased";
import {
  predictWithCfUserBased,
  predictWithCfItemBased,
} from "./strategies/collaborativeFiltering";
import { getMovieIndexByTitle } from "./strategies/common";
import {
  AddRegressionMovies,
  AddContentBasedMovies,
  AdditemBasedMovies,
  AdduserBasedMovies,
} from "./model/recommendations/rec.model";
import { mongoConnect } from "./services/mongo";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

let noOfMovies = 15;
let MOVIES_META_DATA = {};
let MOVIES_KEYWORDS = {};
let RATINGS = [];

let moviesMetaDataPromise = new Promise((resolve) =>
  fs
    .createReadStream("./src/data/movies_metadata.csv")
    .pipe(csv({ headers: true }))
    .on("data", fromMetaDataFile)
    .on("end", () => resolve(MOVIES_META_DATA))
);

let moviesKeywordsPromise = new Promise((resolve) =>
  fs
    .createReadStream("./src/data/keywords.csv")
    .pipe(csv({ headers: true }))
    .on("data", fromKeywordsFile)
    .on("end", () => resolve(MOVIES_KEYWORDS))
);

let ratingsPromise = new Promise((resolve) =>
  fs
    .createReadStream("./src/data/ratings_small.csv")
    .pipe(csv({ headers: true }))
    .on("data", fromRatingsFile)
    .on("end", () => resolve(RATINGS))
);

function fromMetaDataFile(row) {
  MOVIES_META_DATA[row.id] = {
    id: row.id,
    adult: row.adult,
    budget: row.budget,
    genres: softEval(row.genres, []),
    homepage: row.homepage,
    language: row.original_language,
    title: row.original_title,
    overview: row.overview,
    popularity: row.popularity,
    studio: softEval(row.production_companies, []),
    release: row.release_date,
    revenue: row.revenue,
    runtime: row.runtime,
    voteAverage: row.vote_average,
    voteCount: row.vote_count,
    imdbId: row.imdb_id,
    poster: row.poster_path,
  };
}

function fromKeywordsFile(row) {
  MOVIES_KEYWORDS[row.id] = {
    keywords: softEval(row.keywords, []),
  };
}

function fromRatingsFile(row) {
  RATINGS.push(row);
}

console.log("Unloading data from files ... \n");

Promise.all([
  moviesMetaDataPromise,
  moviesKeywordsPromise,
  ratingsPromise,
]).then(init);

function init([moviesMetaData, moviesKeywords, ratings]) {
  /* ------------ */
  //  Preparation //
  /* -------------*/

  const { MOVIES_BY_ID, MOVIES_IN_LIST, X } = prepareMovies(
    moviesMetaData,
    moviesKeywords
  );

  // let ME_USER_RATINGS = [
  //   addUserRating(
  //     ME_USER_ID,
  //     "Terminator 3: Rise of the Machines",
  //     "5.0",
  //     MOVIES_IN_LIST
  //   ),
  //   addUserRating(ME_USER_ID, "Jarhead", "4.0", MOVIES_IN_LIST),
  //   addUserRating(
  //     ME_USER_ID,
  //     "Back to the Future Part II",
  //     "3.0",
  //     MOVIES_IN_LIST
  //   ),
  //   addUserRating(ME_USER_ID, "Jurassic Park", "4.0", MOVIES_IN_LIST),
  //   addUserRating(ME_USER_ID, "Reservoir Dogs", "3.0", MOVIES_IN_LIST),
  //   addUserRating(ME_USER_ID, "Men in Black II", "3.0", MOVIES_IN_LIST),
  //   addUserRating(ME_USER_ID, "Bad Boys II", "5.0", MOVIES_IN_LIST),
  //   addUserRating(ME_USER_ID, "Sissi", "1.0", MOVIES_IN_LIST),
  //   addUserRating(ME_USER_ID, "Titanic", "1.0", MOVIES_IN_LIST),
  // ];

  const { ratingsGroupedByUser, ratingsGroupedByMovie } = prepareRatings([
    // ...ME_USER_RATINGS,
    ...ratings,
  ]);

  app.get("/prep/:userId", (req, res) => {
    let ME_USER_ID = req.params.userId;

    console.log(`Generating recommendation for user id ${ME_USER_ID}`);

    /* ----------------------------- */
    //  Linear Regression Prediction //
    //        Gradient Descent       //
    /* ----------------------------- */

    console.log("\n");
    console.log("(A) Linear Regression Prediction ... \n");

    console.log("(1) Training \n");
    const meUserRatings = ratingsGroupedByUser[ME_USER_ID];
    const linearRegressionBasedRecommendation = predictWithLinearRegression(
      X,
      MOVIES_IN_LIST,
      meUserRatings
    );

    console.log("(2) Prediction \n");
    console.log(
      sliceAndDice(
        ME_USER_ID,
        "regressionBased",
        linearRegressionBasedRecommendation,
        MOVIES_BY_ID,
        noOfMovies,
        true
      )
    );

    sliceAndDice(
      ME_USER_ID,
      "regressionBased",
      linearRegressionBasedRecommendation,
      MOVIES_BY_ID,
      noOfMovies,
      true
    );

    /* ------------------------- */
    //  Content-Based Prediction //
    //  Cosine Similarity Matrix //
    /* ------------------------- */

    console.log("\n");
    console.log("(B) Content-Based Prediction ... \n");

    console.log("(1) Computing Cosine Similarity \n");
    const title = "Pirates of the Caribbean: The Curse of the Black Pearl";
    const contentBasedRecommendation = predictWithContentBased(
      X,
      MOVIES_IN_LIST,
      title
    );

    console.log(`(2) Prediction based on "${title}" \n`);
    console.log(
      sliceAndDice(
        ME_USER_ID,
        "contentBased",
        contentBasedRecommendation,
        MOVIES_BY_ID,
        noOfMovies,
        true
      )
    );

    sliceAndDice(
      ME_USER_ID,
      "contentBased",
      contentBasedRecommendation,
      MOVIES_BY_ID,
      noOfMovies,
      true
    );

    /* ----------------------------------- */
    //  Collaborative-Filtering Prediction //
    //             User-Based              //
    /* ----------------------------------- */

    console.log("\n");
    console.log("(C) Collaborative-Filtering (User-Based) Prediction ... \n");

    console.log("(1) Computing User-Based Cosine Similarity \n");

    const cfUserBasedRecommendation = predictWithCfUserBased(
      ratingsGroupedByUser,
      ratingsGroupedByMovie,
      ME_USER_ID
    );

    console.log("(2) Prediction \n");
    console.log(
      sliceAndDice(
        ME_USER_ID,
        "collabUserBased",
        cfUserBasedRecommendation,
        MOVIES_BY_ID,
        noOfMovies,
        true
      )
    );
    sliceAndDice(
      ME_USER_ID,
      "collabUserBased",
      cfUserBasedRecommendation,
      MOVIES_BY_ID,
      noOfMovies,
      true
    );

    /* ----------------------------------- */
    //  Collaborative-Filtering Prediction //
    //             Item-Based              //
    /* ----------------------------------- */

    console.log("\n");
    console.log("(C) Collaborative-Filtering (Item-Based) Prediction ... \n");

    console.log("(1) Computing Item-Based Cosine Similarity \n");

    const cfItemBasedRecommendation = predictWithCfItemBased(
      ratingsGroupedByUser,
      ratingsGroupedByMovie,
      ME_USER_ID
    );

    console.log("(2) Prediction \n");
    console.log(
      sliceAndDice(
        ME_USER_ID,
        "collabItemBased",
        cfItemBasedRecommendation,
        MOVIES_BY_ID,
        noOfMovies,
        true
      )
    );

    sliceAndDice(
      ME_USER_ID,
      "collabItemBased",
      cfItemBasedRecommendation,
      MOVIES_BY_ID,
      noOfMovies,
      true
    );

    console.log("\n");
    console.log("End ...");

    res.status(200).json({
      message: "ok",
    });
  });

  app.post("/search/recommendation", (req, res) => {
    const { user_id, title } = req.body;

    /* ------------------------- */
    //  Content-Based Prediction //
    //  Cosine Similarity Matrix //
    /* ------------------------- */

    console.log(
      `generating recommendation for user ${user_id} based on ${title}`
    );
    console.log("\n");
    console.log("(B) Content-Based Prediction ... \n");

    console.log("(1) Computing Cosine Similarity \n");

    const contentBasedRecommendation = predictWithContentBased(
      X,
      MOVIES_IN_LIST,
      title
    );

    console.log(`(2) Prediction based on "${title}" for user ${user_id} \n`);
    console.log(
      contentSliceAndDice(
        user_id,
        "contentBased",
        contentBasedRecommendation,
        MOVIES_BY_ID,
        20,
        true
      )
    );

    const recommendedData = contentSliceAndDice(
      user_id,
      "contentBased",
      contentBasedRecommendation,
      MOVIES_BY_ID,
      20,
      true
    );

    res.status(200).json({
      message: "ok",
      movie_results: recommendedData,
    });
  });
}

// Utility

export function addUserRating(userId, searchTitle, rating, MOVIES_IN_LIST) {
  const { id, title } = getMovieIndexByTitle(MOVIES_IN_LIST, searchTitle);

  return {
    userId,
    rating,
    movieId: id,
    title,
  };
}

export function contentSliceAndDice(
  userId,
  strategy,
  recommendations,
  MOVIES_BY_ID,
  count,
  onlyTitle
) {
  recommendations = recommendations.filter(
    (recommendation) => MOVIES_BY_ID[recommendation.movieId]
  );

  recommendations = onlyTitle
    ? recommendations.map((mr) => ({
        title: MOVIES_BY_ID[mr.movieId].title,
        score: mr.score,
        imdbId: MOVIES_BY_ID[mr.movieId].imdbId,
        // poster: MOVIES_BY_ID[mr.movieId].poster,
      }))
    : recommendations.map((mr) => ({
        movie: MOVIES_BY_ID[mr.movieId],
        score: mr.score,
      }));

  return recommendations.slice(0, count);
}

export function sliceAndDice(
  userId,
  strategy,
  recommendations,
  MOVIES_BY_ID,
  count,
  onlyTitle
) {
  recommendations = recommendations.filter(
    (recommendation) => MOVIES_BY_ID[recommendation.movieId]
  );

  recommendations = onlyTitle
    ? recommendations.map((mr) => ({
        title: MOVIES_BY_ID[mr.movieId].title,
        score: mr.score,
        imdbId: MOVIES_BY_ID[mr.movieId].imdbId,
        // poster: MOVIES_BY_ID[mr.movieId].poster,
      }))
    : recommendations.map((mr) => ({
        movie: MOVIES_BY_ID[mr.movieId],
        score: mr.score,
      }));

  if (strategy == "regressionBased")
    AddRegressionMovies(userId, strategy, recommendations.slice(0, count));

  if (strategy == "contentBased")
    AddContentBasedMovies(userId, strategy, recommendations.slice(0, count));

  if (strategy == "collabUserBased")
    AdduserBasedMovies(userId, strategy, recommendations.slice(0, count));

  if (strategy == "collabItemBased")
    AdditemBasedMovies(userId, strategy, recommendations.slice(0, count));

  return recommendations.slice(0, count);
}

export function softEval(string, escape) {
  if (!string) {
    return escape;
  }

  try {
    return eval(string);
  } catch (e) {
    return escape;
  }
}

const PORT = process.env.PORT || 9000;

app.listen(PORT, async () => {
  await mongoConnect();
  console.log("RECCOMMENDATION ENGINE LISTENING ON PORT 9000");
});
