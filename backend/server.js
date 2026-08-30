const express = require("express");
const cors = require("cors");

const env = require("./config/env");
const { ensureDatabaseReady } = require("./config/cloudant");
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// --- Core middleware ---
app.use(
  cors({
    origin: env.corsOrigin,
  })
);
app.use(express.json());

// --- Health check (useful for Docker/CI/deployment checks later) ---
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", env: env.nodeEnv });
});

// --- Routes ---
app.use("/api/auth", authRoutes); // register/login are public; /me is protected internally
app.use("/api/tasks", auth, taskRoutes); // every task route requires a valid JWT

// --- 404 for unknown routes ---
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// --- Central error handler (must be last) ---
app.use(errorHandler);

async function start() {
  // A missing JWT secret is a security bug waiting to happen (tokens signed
  // with "undefined" are worthless), so we fail loudly here instead of
  // letting auth silently misbehave later.
  if (!env.jwtSecret) {
    throw new Error(
      "JWT_SECRET is not set in backend/.env. Generate one with " +
        "`openssl rand -base64 32` and add it before starting the server."
    );
  }

  const cloudantConfigured = Boolean(env.cloudantUrl && env.cloudantApiKey);

  if (cloudantConfigured) {
    // Creates the database and the query index if they don't exist yet.
    // If this fails (bad credentials, wrong URL, no network), we want the
    // server to refuse to start rather than silently serving traffic
    // against a broken data layer.
    await ensureDatabaseReady();
  }

  app.listen(env.port, () => {
    console.log(`Task Manager API listening on http://localhost:${env.port}`);
    console.log(`Environment: ${env.nodeEnv}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});

module.exports = app;
