const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
require("dotenv").config();

const userRouter = require("./Routes/userRoute");
const homeRouter = require("./Routes/homeRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleware({
  src: path.join(__dirname, 'scss'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed',
  prefix:  '/public/css',
}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

app.use(userRouter);
app.use(homeRouter);

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