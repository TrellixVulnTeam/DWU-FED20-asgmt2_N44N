const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "Basic Membership" },
  notes: [{}],
  token: String,
  tokenExpiration: Date,
});

const User = mongoose.model("user", userSchema)

module.exports = User;