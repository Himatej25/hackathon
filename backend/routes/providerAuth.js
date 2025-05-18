// routes/providerAuth.js
const express = require("express");
const router = express.Router();
const Provider = require("../models/Provider");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, venue, catering, photography, fun_activities } = req.body;

  try {
    const existing = await Provider.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already registered" });

    const newProvider = new Provider({
      name,
      email,
      password,
      venue,
      catering,
      photography,
      fun_activities
    });

    await newProvider.save();
    res.status(201).json({ msg: "Provider registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// routes/providerAuth.js (continued)

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const provider = await Provider.findOne({ email });
    if (!provider) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await provider.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: provider._id }, "secretKey", { expiresIn: "1d" });

    res.json({ token, provider: { id: provider._id, name: provider.name, email: provider.email, serviceType: provider.serviceType }, msg: "Login sucessful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
