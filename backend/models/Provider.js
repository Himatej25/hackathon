// models/Provider.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  venue: { type: Boolean },
  catering: { type: Boolean },
  photography: { type: Boolean },
  fun_activities: { type: Boolean }
});

// Hash password before saving
providerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Add method to compare password
providerSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Provider", providerSchema);
