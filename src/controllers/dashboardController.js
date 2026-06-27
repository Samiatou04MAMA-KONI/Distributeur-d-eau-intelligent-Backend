// controllers/dashboardController.js

const Transaction = require('../models/Transaction');
const { startOfDay, endOfDay, subDays, format } = require('date-fns');

// @route   GET /api/dashboard
// @desc    Statistiques du jour et évolution sur 7 jours
exports.getDashboardData = async (req, res) => {
  try {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Statistiques du jour
    const todayTransactions = await Transaction.find({ date: today });
    const totalLitres = todayTransactions.reduce((sum, t) => sum + (t.volume || 0), 0);
    const totalVentes = totalLitres * 50;      // 1 litre = 50 FCFA
    const totalPieces = totalLitres;           // 1 litre = 1 pièce de 50F
    const totalTransactions = todayTransactions.length;

    // Évolution sur 7 jours (du jour J-6 à aujourd'hui)
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const dailyTransactions = await Transaction.find({ date: dateStr });
      const dailyVolume = dailyTransactions.reduce((sum, t) => sum + (t.volume || 0), 0);
      const total = dailyVolume * 50; // montant en FCFA
      weeklyData.push({ date: dateStr, total });
    }

    res.json({
      today: { totalVentes, totalPieces, totalLitres, totalTransactions },
      weekly: weeklyData
    });
  } catch (error) {
    console.error('Erreur dashboard:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};