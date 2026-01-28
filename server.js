const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all route for frontend (Express 5)
app.get(/^\/.*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
