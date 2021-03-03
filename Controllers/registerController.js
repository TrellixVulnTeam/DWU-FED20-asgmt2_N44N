const User = require("../Model/user");
const bcrypt = require("bcrypt");

const registerRender = (req, res) => {
  res.render("user/register.ejs");
};

const registerSubmit = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    await new User({
      userName: userName,
      email: email,
      password: hashedPassword,
    }).save()

  } catch (err) {
    console.log(err);
    if (err) return res.render("user/register.ejs", { err: err });
  }
};

module.exports = {
  registerRender,
  registerSubmit,
};
