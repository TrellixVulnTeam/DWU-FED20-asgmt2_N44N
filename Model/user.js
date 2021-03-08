const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  role: { type: String, default: "Basic Membership" },
  memberSince: Date,
  membership: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membership",
    },
  ],
  notes: [{}],
  token: String,
  tokenExpiration: Date,
});

userSchema.methods.addMembership = function (membershipId) {

  if (this.membership.length > 0) {
    return;
  } else {
    this.membership.push(membershipId);
    this.role = "Premium Membership"
    this.save();
  }
};

userSchema.methods.cancelMembership = function() {
  this.membership.pop()
  this.role = "Basic Membership"
  this.save();
}

const User = mongoose.model("User", userSchema);

module.exports = User;
