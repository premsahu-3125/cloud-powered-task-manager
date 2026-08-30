const { randomUUID } = require("crypto");

/**
 * User document shape, stored in the SAME Cloudant database as tasks,
 * distinguished by "type": "user" (the same pattern tasks use). This is
 * a normal, common approach in document databases — one database, many
 * document "types" instead of separate tables.
 *
 * {
 *   "_id": "user:<uuid>",
 *   "type": "user",
 *   "name": "...",
 *   "email": "...",       (lowercased, used as the uniqueness key)
 *   "passwordHash": "...", (bcrypt hash — the plaintext password is NEVER stored)
 *   "createdAt": "ISO timestamp"
 * }
 */
function buildUserDocument({ name, email, passwordHash }) {
  return {
    _id: `user:${randomUUID()}`,
    type: "user",
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };
}

// Never send passwordHash (or any internal Cloudant fields like _rev) to
// the frontend. Controllers should always pass user objects through this
// before putting them in a response.
function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

module.exports = { buildUserDocument, toPublicUser };
