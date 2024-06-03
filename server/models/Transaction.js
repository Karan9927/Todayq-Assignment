const mongoose = require("mongoose");

// Define the transaction schema
const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    productIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product", // Reference to the Product model
      required: true,
    },
  },
  { timestamps: true }
); // Add timestamps for createdAt and updatedAt fields

// Create the Transaction model
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
