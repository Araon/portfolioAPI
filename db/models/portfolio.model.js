const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  stocks: [{
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stock'
    },
    trades: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trade'
    }]
  }]
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
