const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const User = require("../Model/user")

const loginRender = (req, res) => {
    res.render("login.ejs", {err:" "})
}

const loginSubmit = async (req, res) => {
    const {userName, password} = req.body

    const user = await User.findOne({ userName: userName });

    if (!user) return res.redirect("/register");

  const validUser = await bcrypt.compare(password, user.password);
  if (!validUser) return res.redirect("/login");

  console.log(validUser);

  const jwtToken = await jwt.sign({ user: user }, process.env.SECRET_KEY);

  if (jwtToken) {
    const cookie = req.cookies.jwtToken;

    if (!cookie) {
      res.cookie("jwtToken", jwtToken, { maxAge: 360000000, httpOnly: true });
    }

    return res.redirect("/");
  }

  return res.redirect("/login");
};
module.exports = {
  loginRender,
  loginSubmit,
};