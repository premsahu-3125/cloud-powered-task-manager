const { CloudantV1, IamAuthenticator } = require("@ibm-cloud/cloudant");
const env = require("./env");

let client = null;

/**
 * Lazily creates and caches a single Cloudant client for the app's
 * lifetime. Throws a clear, actionable error if credentials are missing
 * instead of letting the SDK fail with a cryptic network error later.
 */
function getCloudantClient() {
  if (client) return client;

  if (!env.cloudantUrl || !env.cloudantApiKey) {
    throw new Error(
      "Cloudant is not configured. Set CLOUDANT_URL and CLOUDANT_API_KEY in backend/.env " +
        '(see README.md "Setting up IBM Cloudant" section for how to get these from IBM Cloud).'
    );
  }

  client = new CloudantV1({
    authenticator: new IamAuthenticator({ apikey: env.cloudantApiKey }),
    serviceUrl: env.cloudantUrl,
  });

  return client;
}

/**
 * Makes sure the target database exists (creates it if this is the first
 * run) and that a Mango index on (type, userId) exists so listing a user's
 * tasks doesn't require scanning the whole database. Safe to call every
 * server start — both operations are no-ops if things already exist.
 */
async function ensureDatabaseReady() {
  const cloudant = getCloudantClient();
  const db = env.cloudantDatabase;

  try {
    await cloudant.getDatabaseInformation({ db });
    console.log(`Cloudant: connected to existing database "${db}"`);
  } catch (err) {
    if (err.status === 404) {
      await cloudant.putDatabase({ db });
      console.log(`Cloudant: created database "${db}"`);
    } else {
      throw err;
    }
  }

  try {
    await cloudant.postIndex({
      db,
      name: "type-userId-index",
      type: "json",
      index: { fields: ["type", "userId"] },
    });
    console.log('Cloudant: index on ("type", "userId") ready');
  } catch (err) {
    // Cloudant returns 200 with a "exists" result for a duplicate index
    // rather than an error in most cases, but guard anyway.
    console.warn("Cloudant: could not confirm index creation:", err.message);
  }

  try {
    await cloudant.postIndex({
      db,
      name: "type-email-index",
      type: "json",
      index: { fields: ["type", "email"] },
    });
    console.log('Cloudant: index on ("type", "email") ready');
  } catch (err) {
    console.warn("Cloudant: could not confirm email index creation:", err.message);
  }
}

module.exports = { getCloudantClient, ensureDatabaseReady };
