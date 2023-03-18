const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors);

const port = process.env.PORT || 5000;

connectDB();
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
