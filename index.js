const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const createSocketServer = require("./messageServer");
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("astegninet is loading...");
});

app.use("/api/tutees", require("./routes/tuteeRoutes"));
app.use("/api/tutors", require("./routes/tutorRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/request", require("./routes/requestRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));

app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/videocall", require("./routes/videoRoute"));

app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
  createSocketServer();
});
