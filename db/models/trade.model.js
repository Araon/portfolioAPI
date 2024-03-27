const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  userName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio'
  },
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock',
    required: true
  },
  type: {
    type: String,
    enum: ['buy', 'sell'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Trade', tradeSchema);
