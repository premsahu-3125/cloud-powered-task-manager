const env = require("../config/env");

// Express recognizes this as an error handler because it takes 4 args.
// Must be registered LAST, after all routes.
function errorHandler(err, req, res, _next) {
  const isOperational = err.isOperational === true;
  const statusCode = isOperational ? err.statusCode : 500;
  const message = isOperational ? err.message : "Internal server error";

  // Always log the real error server-side, even when we hide it from the client.
  console.error(`[error] ${req.method} ${req.originalUrl} ->`, err);

  const body = { error: message };
  // Only leak stack traces in development, and only for unexpected bugs.
  if (!isOperational && env.nodeEnv === "development") {
    body.stack = err.stack;
  }

  res.status(statusCode).json(body);
}

module.exports = errorHandler;
