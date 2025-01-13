const express = require("express");
const connectDB = require("./config/db");
const cron = require("node-cron");
const fetchCryptoData = require("./jobs/fetchCryptoData");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger-config");
const app = express();

connectDB();

const statsRoute = require("./routes/stats");
const deviationRoute = require("./routes/deviation");

app.use(statsRoute);
app.use(deviationRoute);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

cron.schedule("0 */2 * * *", () => {
  console.log("Running fetchCryptoData job");
  fetchCryptoData();
});

fetchCryptoData();

app.listen(3000, () => console.log("Server running on port 3000"));
