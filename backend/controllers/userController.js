const User = require('../models/User');
const PointHistory = require('../models/PointHistory');

// Add new user
exports.addUser = async (req, res) => {
  try {
    const user = await User.create({ name: req.body.name });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Claim points
exports.claimPoints = async (req, res) => {
  try {
    const points = Math.floor(Math.random() * 10) + 1;
    const user = await User.findById(req.body.userId);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.points += points;
    await user.save();
    
    // Save history
    await PointHistory.create({
      userId: user._id,
      points
    });

    res.json({ points, total: user.points });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get rankings
exports.getRankings = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    const rankings = users.map((user, index) => ({
      ...user._doc,
      rank: index + 1
    }));
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};