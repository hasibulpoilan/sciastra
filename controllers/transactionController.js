// controllers/transactionController.js
const UserTransaction = require('../models/UserTransaction');

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await UserTransaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await UserTransaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transactions', error });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await UserTransaction.findByPk(req.params.id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transaction', error });
  }
};
