const Transaction = require('../models/Transaction');

// @desc    Enregistrer une vente (ESP32)
// @route   POST /api/transactions
exports.addTransaction = async (req, res) => {
  try {
    const { date, heure, pieces, litres, montant } = req.body;

    // Validation simple
    if (!date || !heure || pieces === undefined || litres === undefined || montant === undefined) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const transaction = await Transaction.create({ date, heure, pieces, litres, montant });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer les transactions avec filtres
// @route   GET /api/transactions
exports.getTransactions = async (req, res) => {
  try {
    const { date, month, year } = req.query;
    let filter = {};

    if (date) {
      filter.date = date;
    } else if (month) {
      // Filtre sur le début de la chaîne (ex: '2026-06')
      filter.date = { $regex: `^${month}` };
    } else if (year) {
      filter.date = { $regex: `^${year}` };
    }

    // Trier par date (décroissante) puis heure (décroissante)
    const transactions = await Transaction.find(filter)
      .sort({ date: -1, heure: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};