const express = require("express");

const app = express();
const cors = require("cors");

const userRouter = require("./routes/user/user.router");
const recRouter = require("./routes/recommendation/rec.router");
const movieRouter = require("./routes/movie/movie.router");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/auth", userRouter);
app.use("/recommendation", recRouter);
app.use("/movie", movieRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = app;
