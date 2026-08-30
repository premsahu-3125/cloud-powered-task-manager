// Controllers import from here, never from inMemoryTaskService or
// cloudantTaskService directly.
//
// If Cloudant credentials are present, we use the real cloud database.
// If not, we fall back to the in-memory store so the app is still runnable
// for quick local hacking on the frontend without an IBM Cloud account —
// but we say so loudly, every time, so nobody mistakes it for the real
// thing. This is a local convenience, not something to demo or rely on.
const env = require("../config/env");

const cloudantConfigured = Boolean(env.cloudantUrl && env.cloudantApiKey);

if (cloudantConfigured) {
  console.log("Task storage: IBM Cloudant");
  module.exports = require("./cloudantTaskService");
} else {
  console.warn(
    "Task storage: IN-MEMORY FALLBACK — CLOUDANT_URL / CLOUDANT_API_KEY are not set. " +
      "Tasks will NOT persist across restarts. See README.md \"Setting up IBM Cloudant\" to connect the real database."
  );
  module.exports = require("./inMemoryTaskService");
}
