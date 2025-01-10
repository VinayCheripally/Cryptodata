const axios = require("axios");
const Crypto = require("../models/crypto");

const fetchCryptoData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "bitcoin,matic-network,ethereum",
          vs_currencies: "usd",
          include_market_cap: "true",
          include_24hr_change: "true",
        },
      }
    );

    const coins = ["bitcoin", "matic-network", "ethereum"];
    coins.forEach(async (coin) => {
      const data = response.data[coin];
      const newCrypto = new Crypto({
        coin,
        price: data.usd,
        marketCap: data.usd_market_cap,
        change24h: data.usd_24h_change,
      });
      await newCrypto.save();
    });
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error);
  }
};

module.exports = fetchCryptoData;
