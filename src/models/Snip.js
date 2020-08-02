const mongoose = require('mongoose');
const ttl = require('mongoose-ttl');

const Snip = new mongoose.Schema(
  {
    id: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

Snip.plugin(ttl, { ttl: 15000 });

module.exports = mongoose.model('Snip', Snip);
