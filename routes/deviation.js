const express = require("express");
const Crypto = require("../models/crypto");
const router = express.Router();

router.get("/deviation", async (req, res) => {
  const { coin } = req.query;
  try {
    const data = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (data.length === 0) return res.status(404).send("Data not found");

    const prices = data.map((record) => record.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length;
    const deviation = Math.sqrt(variance);

    res.json({ deviation });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
