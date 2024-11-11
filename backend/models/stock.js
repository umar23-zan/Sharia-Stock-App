const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  change: { type: String, required: true },
  changePercent: { type: String, required: true },
  lastUpdated: { type: String, required: true },
});

module.exports = mongoose.model('Stock', stockSchema);