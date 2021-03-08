const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) return res.render("landing.ejs", { err: "Login failed" });

  const validUser = jwt.verify(token, process.env.SECRET_KEY);
  req.user = validUser;

  if (validUser.user.role !== "Admin") {
    res.clearCookie("jwtToken");
    return res.render("user/login.ejs", {
      err: "You don't have authorization",
    });
  }
  next();
};

module.exports = verifyAdmin;
