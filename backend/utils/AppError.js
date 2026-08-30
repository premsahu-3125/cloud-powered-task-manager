// A controlled error we throw on purpose (bad input, not found, etc.).
// The error handler middleware sends `message` + `statusCode` straight to
// the client for these. Anything that is NOT an AppError is treated as an
// unexpected bug and gets a generic "Internal server error" response
// instead — so raw database/stack-trace details never leak to the frontend.
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = AppError;
