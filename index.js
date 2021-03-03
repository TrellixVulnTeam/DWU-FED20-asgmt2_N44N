const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const sassMiddleware = require("node-sass-middleware");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  sassMiddleware({
    src: path.join(__dirname, "SCSS"),
    dest: path.join(__dirname, "public", "css"),
    debug: true,
    outputStyle: "compressed",
    prefix: "/public/css",
  })
);
app.use("/public/css", express.static(path.join(__dirname, "public")));

const userRouter = require("./Routes/userRoute");
const homeRouter = require("./Routes/homeRoute");
app.use(userRouter);
app.use(homeRouter);

app.set("view engine", "ejs");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(process.env.DATABASE_URL, options, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  app.listen(5000, () => {
    console.log("Application Online");
  });
});
