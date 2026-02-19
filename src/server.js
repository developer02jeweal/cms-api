require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");
const swaggerSpec = require("./docs/swagger");

const app = express();

/* ==============================
   DATABASE CONNECTION
================================ */
connectDB();

/* ==============================
   SECURITY MIDDLEWARE
================================ */
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

app.use(morgan("dev"));

/* ==============================
   BODY PARSER
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ==============================
   SWAGGER DOCUMENTATION
================================ */
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "CMS API Documentation",
  })
);

/* ==============================
   HEALTH CHECK
================================ */
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    timestamp: new Date(),
  });
});

/* ==============================
   ROUTES
================================ */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/companies", require("./routes/company.routes"));
app.use("/api/programs", require("./routes/program.routes"));
app.use("/api/program-instances", require("./routes/programInstance.routes"));


/* ==============================
   404 HANDLER
================================ */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ==============================
   GLOBAL ERROR HANDLER
================================ */
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ==============================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 CMS API running on port ${PORT}`);
});

/* ==============================
   GRACEFUL SHUTDOWN
================================ */
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await mongoose.connection.close();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
