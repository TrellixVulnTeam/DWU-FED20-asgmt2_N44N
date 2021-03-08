const User = require("../../Model/user");
const Membership = require("../../Model/membership");
const Database = require("../../Model/database")
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const cancelRender = (req, res) => {
  res.render("membership/cancel.ejs", { user: req.user });
};

const cancelSubmit = async (req, res) => {
    
  const userId = { _id: req.user.user._id };
  const user = await User.findOne({ _id: userId });

  await Membership.deleteOne({_id: user.membership});

  user.cancelMembership();

  const cancelreason = req.body;
  console.log(cancelreason);

  const msg = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: "Membership Upgraded",
    html: `<h1>Membership Canceled<h1>
  <h2> ${user.userName}, your Premium Membership has been canceled </h2>
  <p>We hope that the Node.js Online Course has been of great assistance to you. You are welcome to rejoin our Premium Membership family at any time. Feel free to continue to use our website with you Basic Membership
  <br><br>
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

  //res.render("profile.ejs", {user: req.user, msg: "Your membership has been canceled"})
  res.redirect("/logout")

  };

module.exports = {
  cancelRender,
  cancelSubmit,
};