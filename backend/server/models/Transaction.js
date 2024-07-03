const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    orderID: String,
    payerID: String,
    paymentID: String,
    // Add other fields as necessary
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
