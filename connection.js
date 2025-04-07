require("dotenv").config(); // Load .env variables
const mongoose = require("mongoose");

const connectionString = process.env.DATABASE;

if (!connectionString) {
  console.error("❌ Error: Missing DATABASE URL in .env file");
  process.exit(1); // Stop execution if DATABASE is missing
}

// Modern, simplified Mongoose connection
mongoose.connect(connectionString)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error(`❌ MongoDB connection failed: ${err.message}`);
  });
