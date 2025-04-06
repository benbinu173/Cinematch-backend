// Importing required modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router");

// Importing MongoDB connection
require("./connection"); // ✅ Centralized MongoDB connection

// Create Express app
const pfServer = express();

// Middleware
pfServer.use(cors());
pfServer.use(express.json());

// ✅ Use the router for all defined routes
pfServer.use(router);

// Set the port
const PORT = process.env.PORT || 4000;

// Start the server
pfServer.listen(PORT, () => {
    console.log(`✅ Server is running successfully at PORT ${PORT}`);
    console.log("🔄 Waiting for MongoDB connection...");
});
