const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { users } = require('../config/db');
const { verifyToken } = require('../middleware/auth');

// In-memory transaction store
const transactions = [];

// GET /api/wallet — get wallet balance + transaction history (protected)
router.get('/', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });

  const userTransactions = transactions.filter(t => t.user_id === req.user.id);
  res.json({
    balance: user.wallet_balance || 0,
    transactions: userTransactions
  });
});

// POST /api/wallet/topup — add funds to wallet (protected)
router.post('/topup', verifyToken, (req, res) => {
  try {
    const { amount, payment_method } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'A valid positive amount is required.' });
    }

    const userIndex = users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found.' });

    users[userIndex].wallet_balance = (users[userIndex].wallet_balance || 0) + Number(amount);

    const tx = {
      id: uuidv4(),
      user_id: req.user.id,
      type: 'credit',
      amount: Number(amount),
      description: `Wallet top-up via ${payment_method || 'card'}`,
      balance_after: users[userIndex].wallet_balance,
      created_at: new Date().toISOString()
    };
    transactions.push(tx);

    res.json({ message: 'Wallet topped up successfully.', balance: users[userIndex].wallet_balance, transaction: tx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/wallet/pay — deduct from wallet for a ticket (protected)
router.post('/pay', verifyToken, (req, res) => {
  try {
    const { amount, description } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'A valid positive amount is required.' });
    }

    const userIndex = users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found.' });

    const currentBalance = users[userIndex].wallet_balance || 0;
    if (currentBalance < amount) {
      return res.status(400).json({ error: 'Insufficient wallet balance.' });
    }

    users[userIndex].wallet_balance = currentBalance - Number(amount);

    const tx = {
      id: uuidv4(),
      user_id: req.user.id,
      type: 'debit',
      amount: Number(amount),
      description: description || 'Ticket payment',
      balance_after: users[userIndex].wallet_balance,
      created_at: new Date().toISOString()
    };
    transactions.push(tx);

    res.json({ message: 'Payment successful.', balance: users[userIndex].wallet_balance, transaction: tx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
