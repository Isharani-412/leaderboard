const mongoose = require('mongoose');

const PointHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('PointHistory', PointHistorySchema);