const Transaction = require('../models/Transaction');

// @desc    Enregistrer une vente (ESP32)
// @route   POST /api/transactions
exports.addTransaction = async (req, res) => {
  try {
    const { volume, date } = req.body;

    // Validation : volume et date sont obligatoires
    if (volume === undefined || volume === null || !date) {
      return res.status(400).json({
        message: 'Le volume et la date sont obligatoires.'
      });
    }

    // Calcul automatique des champs dérivés
    const litres = volume;
    const pieces = volume;          // 1 litre = 1 pièce de 50 FCFA
    const montant = volume * 50;    // 1 litre = 50 FCFA

    // Création de la transaction
    const transaction = await Transaction.create({
      date,
      volume,
      litres,
      pieces,
      montant
    });

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

    // Tri uniquement par date (décroissante) – le champ heure n'existe plus
    const transactions = await Transaction.find(filter)
      .sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};