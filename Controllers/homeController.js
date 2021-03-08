const Post = require("../Model/post")

const homeRender = async (req, res) => {

  const post = await Post.find({type: "Course"})

  res.render("home.ejs", { user: req.user, post: post });
};

const logout = (req, res) => {
  res.clearCookie("jwtToken").redirect("/login");
};

module.exports = { homeRender, logout };
