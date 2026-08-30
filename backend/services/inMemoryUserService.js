const { buildUserDocument } = require("../models/userModel");

/**
 * In-memory user store — same role as inMemoryTaskService.js: a fallback
 * for local hacking without Cloudant configured, sharing an identical
 * function contract with cloudantUserService.js so services/userService.js
 * can swap between them with no other code changes.
 */
let users = [];

async function findByEmail(email) {
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email === normalized) || null;
}

async function findById(id) {
  return users.find((u) => u._id === id) || null;
}

async function createUser({ name, email, passwordHash }) {
  const user = buildUserDocument({ name, email, passwordHash });
  users.push(user);
  return user;
}

function _reset() {
  users = [];
}

module.exports = { findByEmail, findById, createUser, _reset };
