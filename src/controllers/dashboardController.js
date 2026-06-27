const Transaction = require('../models/Transaction');
const { subDays, format } = require('date-fns');

exports.getDashboardData = async (req, res) => {
  try {
    const today = format(new Date(), 'yyyy-MM-dd');

    const todayTransactions = await Transaction.find({ date: today });
    const totalLitres = todayTransactions.reduce((sum, t) => sum + (t.volume || 0), 0);
    const totalVentes = totalLitres * 50;
    const totalTransactions = todayTransactions.length;

    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const dateStr = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const dailyTransactions = await Transaction.find({ date: dateStr });
      const dailyVolume = dailyTransactions.reduce((sum, t) => sum + (t.volume || 0), 0);
      weeklyData.push({ date: dateStr, total: dailyVolume * 50 });
    }

    res.json({
      today: { totalVentes, totalLitres, totalTransactions },
      weekly: weeklyData
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};