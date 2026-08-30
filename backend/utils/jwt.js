const jwt = require("jsonwebtoken");
const env = require("../config/env");

// A token only ever carries the user's id — never the password hash or
// anything else sensitive. Controllers/middleware read `decoded.userId`.
function signToken(userId) {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

// Throws if the token is missing, malformed, expired, or signed with a
// different secret — callers (the auth middleware) turn that into a 401.
function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

module.exports = { signToken, verifyToken };
