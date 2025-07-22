const express = require('express');
const router = express.Router();
const PointHistory = require('../models/PointHistory');

// Get all points history
router.get('/', async (req, res) => {
  try {
    const history = await PointHistory.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;