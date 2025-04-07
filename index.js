// Importing required modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router");

// Importing MongoDB connection
require("./connection"); // ✅ Centralized MongoDB connection

// Create Express app
const pfServer = express();

const path = require('path');
pfServer.use("/upload", express.static(path.join(__dirname, "uploads")));

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

pfServer.get("/", (req, res) => {
    res.send("Cinematch Backend is running ✅");
  });