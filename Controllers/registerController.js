const User = require("../Model/user");
const bcrypt = require("bcrypt");

const registerRender = (req, res) => {
  res.render("register.ejs");
};

const registerSubmit = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await new User({
      userName: userName,
      email: email,
      password: hashedPassword,
    }).save();

  } catch (err) {
    console.log("Fel");
    if (err) return res.render("register.ejs", { err: "" });
  }

  res.redirect("/login");
};

module.exports = {
  registerRender,
  registerSubmit,
};
