const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,    // format 'YYYY-MM-DD'
  },
  heure: {
    type: String,
    required: true,    // format 'HH:MM'
  },
  pieces: {
    type: Number,
    required: true,
    min: 1
  },
  litres: {
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