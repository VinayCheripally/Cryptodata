const express = require("express");
const Crypto = require("../models/crypto");
const router = express.Router();

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get the latest cryptocurrency stats
 *     parameters:
 *       - in: query
 *         name: coin
 *         schema:
 *           type: string
 *         required: true
 *         description: The cryptocurrency coin (e.g., bitcoin, ethereum)
 *     responses:
 *       200:
 *         description: A JSON object containing the latest stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 *                   description: The current price of the coin
 *                 marketCap:
 *                   type: number
 *                   description: The market capitalization of the coin
 *                 24hChange:
 *                   type: number
 *                   description: The 24-hour price change of the coin
 *       404:
 *         description: Data not found
 *       500:
 *         description: Server error
 */

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
