const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Crypto API",
      version: "1.0.0",
      description: "API for fetching cryptocurrency data",
    },
    servers: [
      {
        url: "https://cryptodata-production.up.railway.app/",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
