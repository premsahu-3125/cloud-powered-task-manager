const { getCloudantClient } = require("../config/cloudant");
const env = require("../config/env");
const { buildUserDocument } = require("../models/userModel");

const dbName = () => env.cloudantDatabase;

async function findByEmail(email) {
  const cloudant = getCloudantClient();
  const normalized = email.trim().toLowerCase();
  const response = await cloudant.postFind({
    db: dbName(),
    selector: { type: "user", email: normalized },
    limit: 1,
  });
  return response.result.docs[0] || null;
}

async function findById(id) {
  const cloudant = getCloudantClient();
  try {
    const response = await cloudant.getDocument({ db: dbName(), docId: id });
    if (response.result.type !== "user") return null;
    return response.result;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

async function createUser({ name, email, passwordHash }) {
  const cloudant = getCloudantClient();
  const user = buildUserDocument({ name, email, passwordHash });
  const response = await cloudant.postDocument({ db: dbName(), document: user });
  user._rev = response.result.rev;
  return user;
}

module.exports = { findByEmail, findById, createUser };
