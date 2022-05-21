const express = require("express");

const {
  httpRecommendWithCollabi,
  httpRecommendWithContent,
  httpRecommendWithCollabu,
  httpRecommendWithRegression,
} = require("./rec.controller");

const recRouter = express.Router();

recRouter.get("/:userId/rec-reg", httpRecommendWithRegression);
recRouter.get("/:userId/rec-con", httpRecommendWithContent);
recRouter.get("/:userId/rec-coli", httpRecommendWithCollabi);
recRouter.get("/:userId/rec-colu", httpRecommendWithCollabu);

module.exports = recRouter;
