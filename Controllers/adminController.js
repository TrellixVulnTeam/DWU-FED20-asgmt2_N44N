const Post = require("../Model/post");

const adminRender = async (req, res) => {
  const post = await Post.find()
  console.log(post);
  res.render("admin.ejs", { user: req.user, post: post });
};

const adminSubmit = async (req, res) => {
  const {
    type,
    category,
    title,
    body
  } = req.body;

  if (user.role === "Premium Membership") {
    res.render("profile.ejs", {
      user: req.user,
      msg: "You've already upgraded your account",
    });
    return
  }

  const newPost = await new Post({
    type: type,
    category: category,
    title: title,
    body: body,
  }).save()

  
  console.log(post);

  res.render("admin.ejs", {user: req.user});
};

module.exports = { adminRender, adminSubmit };
