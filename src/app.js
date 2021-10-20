if (process.env.USER) require("dotenv").config();
const express = require("express");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const app = express();
const moviesRouter = require("./routes/movies");
const reviewsRouter = require("./routes/reviews");
const theatersRouter = require("./routes/theaters");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Base Directory");
})
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);
app.use("/movies", moviesRouter);

app.use(notFound)

app.use(errorHandler);

module.exports = app;
