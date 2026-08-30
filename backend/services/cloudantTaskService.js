const { getCloudantClient } = require("../config/cloudant");
const env = require("../config/env");
const { buildTaskDocument, applyTaskUpdate } = require("../models/taskModel");

/**
 * Real implementation of the task data layer, talking to IBM Cloudant.
 *
 * Every exported function here has the exact same name and signature as
 * services/inMemoryTaskService.js — that's what let Phase 2's controllers
 * keep working unmodified once services/taskService.js points here instead.
 *
 * Ownership rule: every read/write is scoped to `userId`, either through
 * the Mango selector (list) or by checking `doc.userId === userId` after
 * a direct `_id` lookup (get/update/delete) — a user can never touch a
 * document that isn't theirs, even if they guess another task's ID.
 */

const dbName = () => env.cloudantDatabase;

async function listTasks(userId) {
  const cloudant = getCloudantClient();
  const response = await cloudant.postFind({
    db: dbName(),
    selector: { type: "task", userId },
    limit: 1000,
  });
  return response.result.docs;
}

// Internal helper: fetch by _id, but return null (not the doc) if it
// doesn't belong to this user or isn't a task. Used by every other
// function below so ownership checking lives in exactly one place.
async function findOwnedTask(userId, id) {
  const cloudant = getCloudantClient();
  try {
    const response = await cloudant.getDocument({ db: dbName(), docId: id });
    const doc = response.result;
    if (doc.type !== "task" || doc.userId !== userId) return null;
    return doc;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

async function getTaskById(userId, id) {
  return findOwnedTask(userId, id);
}

async function createTask(userId, data) {
  const cloudant = getCloudantClient();
  const task = buildTaskDocument({ ...data, userId });
  const response = await cloudant.postDocument({ db: dbName(), document: task });
  task._rev = response.result.rev;
  return task;
}

async function updateTask(userId, id, data) {
  const existing = await findOwnedTask(userId, id);
  if (!existing) return null;

  const updated = applyTaskUpdate(existing, data);
  const cloudant = getCloudantClient();
  const response = await cloudant.putDocument({ db: dbName(), docId: id, document: updated });
  updated._rev = response.result.rev;
  return updated;
}

async function updateTaskStatus(userId, id, status) {
  const existing = await findOwnedTask(userId, id);
  if (!existing) return null;

  const updated = { ...existing, status, updatedAt: new Date().toISOString() };
  const cloudant = getCloudantClient();
  const response = await cloudant.putDocument({ db: dbName(), docId: id, document: updated });
  updated._rev = response.result.rev;
  return updated;
}

async function deleteTask(userId, id) {
  const existing = await findOwnedTask(userId, id);
  if (!existing) return false;

  const cloudant = getCloudantClient();
  await cloudant.deleteDocument({ db: dbName(), docId: id, rev: existing._rev });
  return true;
}

module.exports = {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
