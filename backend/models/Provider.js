const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    aadhar_card: String,
    license: String,
    portfolio: [String]
});

module.exports = mongoose.model('Provider', ProviderSchema);