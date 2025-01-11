# CryptoData

CryptoData is a Node.js application that fetches cryptocurrency data from the CoinGecko API and stores it in a MongoDB database. The application provides API endpoints to retrieve statistics and deviation data for specified cryptocurrencies.

## Features

- Fetches cryptocurrency data from CoinGecko API every two hours
- Stores cryptocurrency data in MongoDB
- Provides API endpoints to retrieve statistics and deviation data

## Prerequisites

- Node.js
- MongoDB (local or cloud)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/VinayCheripally/Cryptodata/
   cd Cryptodata
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a [.env] file in the root directory and add your MongoDB URI:
   ```plaintext
   MONGO_URI=your-mongodb-cloud-uri
   ```

## Running the Application

1. Start the application:

   ```sh
   node app.js
   ```

2. The application will fetch cryptocurrency data immediately and then every two hours.

## API Endpoints

- **GET /stats**: Retrieve statistics for a specified cryptocurrency.

  - Query Parameters:
    - `coin`: The cryptocurrency to retrieve statistics for (e.g., `bitcoin`, `ethereum`).

- **GET /deviation**: Retrieve deviation data for a specified cryptocurrency.
  - Query Parameters:
    - `coin`: The cryptocurrency to retrieve deviation data for (e.g., `bitcoin`, `ethereum`).
