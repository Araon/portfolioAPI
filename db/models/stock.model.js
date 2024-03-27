const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  stockId: {
    type: String,
    required: true,
    unique: true
  },
  stockName: {
    type: String,
    required: true,
    unique: false
  }
});

module.exports = mongoose.model('Stock', stockSchema);
