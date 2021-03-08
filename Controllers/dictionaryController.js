const Post = require("../Model/post")

const dictionaryRender = async (req, res) => {
  const post = await Post.find({type: "Dictionary"})

  res.render("dictionary.ejs", { user: req.user, post: post });
};

const logout = (req, res) => {
  res.clearCookie("jwtToken").redirect("/login");
};

module.exports = { dictionaryRender, logout };
