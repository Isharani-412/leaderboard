require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const users = require("./routes/users");

const app = express();

//  Setup CORS for localhost and Vercel frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://leaderboard-front-ntbo8tlbp-isharani-412s-projects.vercel.app' //  Replace this with your actual frontend URL on Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

//  Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/LeaderBoard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected Successfully!'))
.catch((err) => console.error('MongoDB Connection Error:', err));

//  Middleware
app.use(express.json());

//  Routes
app.use('/api/users', users);
app.use('/api/history', require('./routes/history'));

//  Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
