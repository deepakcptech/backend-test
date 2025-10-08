require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/database");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/logger");
// Import routes
const authRoutes = require("./routes/auth");

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);


// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 😊",
    timestamp: new Date().toISOString(),
  });
});

// Handle 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  logger.info("Server shutting down gracefully");
  process.exit(0);
});

module.exports = app;
