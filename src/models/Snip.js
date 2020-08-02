const mongoose = require('mongoose');

const Snip = new mongoose.Schema(
  {
    id: { type: String, required: true },
    url: { type: String, required: true },
    clicks: { type: String, required: true },
    createdAt: { type: Date, expires: 432000000, default: Date.now }, // 5d
  },
  { timestamps: true }
);

module.exports = mongoose.model('Snip', Snip);
