const express = require("express");

const { httpAddNewUser, httpLogoutUser } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/signin", httpAddNewUser);
userRouter.post("/logout", httpLogoutUser);

module.exports = userRouter;
