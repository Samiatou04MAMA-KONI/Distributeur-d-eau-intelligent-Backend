const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
    min: 0
  },
  montant: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);