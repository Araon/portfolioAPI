const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Stock', stockSchema);
