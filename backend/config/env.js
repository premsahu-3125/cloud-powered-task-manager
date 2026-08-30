require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

// Centralizing env access here means every other file does
// `require("../config/env")` instead of touching `process.env` directly —
// one place to see every configuration value the app needs.
module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",

  // Not used until Phase 3/4 — declared now so the shape of the config
  // is visible from day one and .env.example stays in sync with reality.
  cloudantUrl: process.env.CLOUDANT_URL,
  cloudantApiKey: process.env.CLOUDANT_API_KEY,
  cloudantDatabase: process.env.CLOUDANT_DATABASE || "taskmanager",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};
