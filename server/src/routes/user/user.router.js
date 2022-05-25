const express = require("express");

const {
  httpSigninUser,
  httpLogoutUser,
  httpUserRecPrep,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/signin", httpSigninUser);
userRouter.post("/signin/user/rec-prep", httpUserRecPrep);
userRouter.post("/logout", httpLogoutUser);

module.exports = userRouter;
