const express = require('express');
const router = express.Router();
const User = require('../models/User');
const PointHistory = require('../models/PointHistory');

// Get all users with rankings
// Get 10 random users
// Get 10 random users
router.get('/rankings', async (req, res) => {
  try {
    const users = await User.aggregate([{ $sample: { size: 10 } }]); // Correct randomizer
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Add new user
router.post('/', async (req, res) => {
  const { name } = req.body;
  
  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Claim points for a user
router.post('/:id/claim', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const pointsAwarded = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += pointsAwarded;
    await user.save();

    // Record in history
    const history = new PointHistory({
      userId: user._id,
      userName: user.name,
      points: pointsAwarded
    });
    await history.save();

    res.json({
      pointsAwarded,
      message: `${pointsAwarded} points awarded to ${user.name}`
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;