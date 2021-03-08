const User = require("../../Model/user");
const Membership = require("../../Model/membership");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const upgradeRender = (req, res) => {
  res.render("membership/upgrade.ejs", { user: req.user });
};

const upgradeSubmit = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    address,
    zip,
    country,
    phone,
    cardName,
    plan,
  } = req.body;

  const userId = { _id: req.user.user._id };
  const user = await User.findOne({ _id: userId });

  if (user.role === "Premium Membership") {
    res.render("profile.ejs", {
      user: req.user,
      msg: "You've already upgraded your account",
    });
    return
  }
    const upgradeMembership = await new Membership({
      title: "Payment Plan",
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      zip: zip,
      country: country,
      phone: phone,
      cardName: cardName,
      plan: plan,
    }).save();

    user.addMembership(upgradeMembership._id);

    const upgradedUser = await User.findOne({ _id: userId }).populate(
      "membership"
    );

    const msg = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Membership Upgraded",
      html: `<h1>Membership Confirmation<h1>
    <h2> Thank you, ${user.userName}, for upgrading your account! </h2>
    <p>We hope that the features now available for you will be of great help. Good luck on your quest to become an expert node.js-programmer!
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

    res.render("./membership/confirmation.ejs", {
      user: upgradedUser,
      membership: upgradeMembership,
      err: " ",
    });
};

module.exports = {
  upgradeRender,
  upgradeSubmit,
};
