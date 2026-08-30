// Same pattern as taskService.js — swap between Cloudant and an in-memory
// fallback based on whether Cloudant is configured, logging which one is
// active either way.
const env = require("../config/env");

const cloudantConfigured = Boolean(env.cloudantUrl && env.cloudantApiKey);

if (cloudantConfigured) {
  console.log("User storage: IBM Cloudant");
} else {
  console.warn(
    "User storage: IN-MEMORY FALLBACK — accounts will NOT persist across restarts."
  );
}

module.exports = cloudantConfigured
  ? require("./cloudantUserService")
  : require("./inMemoryUserService");
