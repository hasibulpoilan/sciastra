// models/UserTransaction.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserTransaction = sequelize.define('UserTransaction', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
  },
  paymentMethod: {
    type: DataTypes.ENUM('credit_card', 'debit_card', 'UPI'),
    allowNull: false,
  },
});

module.exports = UserTransaction;
