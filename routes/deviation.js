const express = require("express");
const Crypto = require("../models/crypto");
const router = express.Router();

/**
 * @swagger
 * /deviation:
 *   get:
 *     summary: Get the standard deviation of the cryptocurrency prices
 *     parameters:
 *       - in: query
 *         name: coin
 *         schema:
 *           type: string
 *         required: true
 *         description: The cryptocurrency coin (e.g., bitcoin, ethereum)
 *     responses:
 *       200:
 *         description: A JSON object containing the standard deviation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deviation:
 *                   type: number
 *                   description: The standard deviation of the coin prices
 *       404:
 *         description: Data not found
 *       500:
 *         description: Server error
 */

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
