const User = require("../../Model/user");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registerRender = (req, res) => {
  res.render("user/register.ejs");
};

const registerSubmit = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      userName: userName,
      email: email,
      password: hashedPassword,
      memberSince: Date.now(),
    });
    await user.save();

    const msg = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Account Registered",
      html: `<h1>Registration Confirmation<h1>
        <h2> Thank you, ${user.userName}, for registering your new account! </h2>
        <p>We hope that the Node.JS Online Course will be of great help to you. Good luck on your quest to become an expert node.js-programmer!
        <br><br>
        <p>Please note that you can upgrade your membership to Premium and get access to more functions on our site!</p>
        <br>
        <br>
        Kind regards,
        <br>
        <b>NODE.JS ONLINE COURSE TEAM<b><p>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

    return res.render("user/login");
  } catch (err) {
    console.log(err);
    if (err) return res.render("user/register.ejs", { err: "" });
  }

  res.redirect("/login");
};

module.exports = {
  registerRender,
  registerSubmit,
};
