const { verifyToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");

/**
 * Protects a route by requiring a valid `Authorization: Bearer <token>`
 * header. On success, attaches `req.userId` — every controller reads that
 * and only ever touches data scoped to it. This replaces middleware/mockAuth.js.
 *
 * This is what stops one user from reading another user's tasks by
 * editing an ID in the request: the userId never comes from the request
 * itself, only from a token this server issued and can verify.
 */
function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new AppError("Authentication required.", 401));
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch {
    return next(new AppError("Invalid or expired session. Please log in again.", 401));
  }
}

module.exports = auth;
