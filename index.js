const express = require("express");

require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
const port = process.env.PORT || 5000;

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));

app.use(errorHandler);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
