const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  title: String,
  userId: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  zip: { type: Number },
  country: { type: String },
  phone: { type: Number },
  cardName: { type: String },
  plan: { type: String },
});

const Membership = mongoose.model("Membership", membershipSchema);

module.exports = Membership;
