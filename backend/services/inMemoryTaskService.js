const { buildTaskDocument, applyTaskUpdate } = require("../models/taskModel");

/**
 * In-memory "database" for Phase 2.
 *
 * This file is deliberately the ONLY place that knows tasks live in an
 * array. In Phase 3, this whole file gets replaced by cloudantTaskService.js
 * with the exact same exported function names and signatures — so
 * controllers/taskController.js will not need to change at all.
 *
 * Every function is scoped by userId, which is what enforces "a user can
 * only see/edit their own tasks" at the data layer (in addition to the
 * ownership check already happening via req.userId in the controller).
 */
let tasks = [];

async function listTasks(userId) {
  return tasks.filter((t) => t.userId === userId);
}

async function getTaskById(userId, id) {
  return tasks.find((t) => t.userId === userId && t._id === id) || null;
}

async function createTask(userId, data) {
  const task = buildTaskDocument({ ...data, userId });
  tasks.push(task);
  return task;
}

async function updateTask(userId, id, data) {
  const index = tasks.findIndex((t) => t.userId === userId && t._id === id);
  if (index === -1) return null;
  const updated = applyTaskUpdate(tasks[index], data);
  tasks[index] = updated;
  return updated;
}

async function updateTaskStatus(userId, id, status) {
  const index = tasks.findIndex((t) => t.userId === userId && t._id === id);
  if (index === -1) return null;
  tasks[index] = { ...tasks[index], status, updatedAt: new Date().toISOString() };
  return tasks[index];
}

async function deleteTask(userId, id) {
  const index = tasks.findIndex((t) => t.userId === userId && t._id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

// Test-only helper — lets us reset state between manual test runs.
function _reset() {
  tasks = [];
}

module.exports = {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  _reset,
};
