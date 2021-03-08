const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
var path = require("path");
require("dotenv").config();

const userRouter = require("./Routes/userRoute");
const homeRouter = require("./Routes/homeRoute");
const adminRouter = require("./Routes/adminRoute");
const dictionaryRouter = require("./Routes/dictionaryRoute");
const profileRouter = require("./Routes/profileRoute");
const membershipRouter = require("./Routes/membershipRoute")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(userRouter);
app.use(homeRouter);
app.use(adminRouter);
app.use(dictionaryRouter);
app.use(profileRouter);
app.use(membershipRouter);

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
