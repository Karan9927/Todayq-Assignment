const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const Transaction = require("../models/Transaction");

// Initialize Razorpay with your API key and secret
const razorpay = new Razorpay({
  key_id: "rzp_test_P4uwIABIbIbZw6",
  key_secret: "BEd6KPRqIfvKjkH3RWz1xmZJ",
});

// Route to create a new Razorpay order
router.post("/create-order", async (req, res) => {
  const amount = req.body.amount;
  try {
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "order_receipt_1",
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    console.log("Order:", order);

    res.json(order); // Send the order details as JSON response
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order" });
  }
});

router.post("/transactions", async (req, res) => {
  try {
    const { transactionId, orderId, productIds, amount } = req.body;

    const newTransaction = new Transaction({
      transactionId,
      orderId,
      productIds,
      amount,
    });

    await newTransaction.save();

    res
      .status(201)
      .json({
        message: "Transaction created successfully",
        transaction: newTransaction,
      });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the transaction" });
  }
});

module.exports = router;
