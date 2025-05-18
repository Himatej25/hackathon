require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const morgan   = require('morgan');
const cors     = require('cors');
const path     = require('path');

const authRoutes = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 4000;


app.use(express.static(path.join(__dirname, '../Frontend')));

/* ---------- Middleware ---------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for HTML form posts
app.use(morgan('dev'));

/* ---------- Serve static HTML (optional) ---------- */
app.use(express.static(path.join(__dirname, 'public'))); // place your LoginUser.html in /public

/* ---------- Auth routes ---------- */
app.use('/api/auth', authRoutes);        // keeps /login and /register paths

/* ---------- MongoDB & start ---------- */
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/eventease');
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('DB connection error:', err.message);
  }
})();
