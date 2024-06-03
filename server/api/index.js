const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://karan7417:karan9927@todayq.scwz7lf.mongodb.net/?retryWrites=true&w=majority&appName=TodayQ",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongoose connection is open.");
  })
  .catch((err) => {
    console.error(`Mongoose connection error has occurred: ${err}`);
  });

// Routes
const offeringsRoutes = require("../routes/offerings");
app.use("/api/offerings", offeringsRoutes);
const transactionRoute = require("../routes/checkout");
app.use("/api", transactionRoute);

app.use("*", (req, res) => {
  res.json({
    message: "Invalid API Request !",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
