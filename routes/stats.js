const express = require("express");
const Crypto = require("../models/crypto");
const router = express.Router();

router.get("/stats", async (req, res) => {
  const { coin } = req.query;
  try {
    const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    if (!latestData) return res.status(404).send("Data not found");

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
