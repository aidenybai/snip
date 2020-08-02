const mongoose = require('mongoose');

const Snip = new mongoose.Schema(
  {
    id: { type: String, required: true },
    url: { type: String, required: true },
    expireAt: {
      type: Date,
      default: new Date(Date.now() + 604800000).toISOString(),
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('Snip', Snip);
