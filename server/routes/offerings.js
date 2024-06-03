const express = require("express");
const router = express.Router();
const Offering = require("../models/Offering");

// Create a new offering
router.post("/add", async (req, res) => {
  try {
    const offering = new Offering(req.body);
    await offering.save();
    res.status(201).send(offering);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all offerings
router.get("/getofferings", async (req, res) => {
  try {
    const offerings = await Offering.find();
    res.status(200).send(offerings);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/getbyCategory", async (req, res) => {
  const { category } = req.query; // Extract the category from the query parameters
  try {
    const offerings = await Offering.find({ category }); // Find offerings with the specified category
    res.status(200).send(offerings);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
