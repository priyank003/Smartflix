const express = require("express");

const app = express();
const cors = require("cors");
const link = require("./models/links.mongo");
const userRouter = require("./routes/user/user.router");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/auth", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = app;
