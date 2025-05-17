const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  documents: {
    aadhar: { type: String, required: true },
    licence: { type: String, required: true },
    portfolio: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('Provider', providerSchema);
