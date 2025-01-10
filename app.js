const express = require("express");
const connectDB = require("./config/db");
const cron = require("node-cron");
const fetchCryptoData = require("./jobs/fetchCryptoData");

const app = express();

connectDB();

const statsRoute = require("./routes/stats");
const deviationRoute = require("./routes/deviation");

app.use(statsRoute);
app.use(deviationRoute);

cron.schedule("0 */2 * * *", () => {
  console.log("Running fetchCryptoData job");
  fetchCryptoData();
});

app.listen(3000, () => console.log("Server running on port 3000"));
