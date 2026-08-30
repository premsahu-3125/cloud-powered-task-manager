const { randomUUID } = require("crypto");

const { PRIORITIES, CATEGORIES, STATUSES } = require("../middleware/validateTask");

/**
 * Builds a task document in the exact shape we'll store in Cloudant:
 *
 * {
 *   "_id": "task:<uuid>",
 *   "type": "task",
 *   "userId": "...",
 *   "title": "...",
 *   "description": "...",
 *   "priority": "High" | "Medium" | "Low",
 *   "category": "College" | "Assignment" | ... ,
 *   "status": "Pending" | "Completed",
 *   "dueDate": "2026-08-30" | null,
 *   "createdAt": "ISO timestamp",
 *   "updatedAt": "ISO timestamp"
 * }
 *
 * Keeping this shape identical between the in-memory store (Phase 2) and
 * Cloudant (Phase 3) is what makes swapping the storage layer later a
 * small, low-risk change instead of a rewrite.
 */
function buildTaskDocument({ userId, title, description, priority, category, status, dueDate }) {
  const now = new Date().toISOString();
  return {
    _id: `task:${randomUUID()}`,
    type: "task",
    userId,
    title: title.trim(),
    description: (description || "").trim(),
    priority: priority || "Medium",
    category: category || "Other",
    status: status || "Pending",
    dueDate: dueDate || null,
    createdAt: now,
    updatedAt: now,
  };
}

// Returns a *new* object with only the mutable fields applied — never lets
// a caller overwrite _id, type, userId, or createdAt through an update.
function applyTaskUpdate(existingTask, updates) {
  return {
    ...existingTask,
    title: updates.title !== undefined ? updates.title.trim() : existingTask.title,
    description: updates.description !== undefined ? updates.description.trim() : existingTask.description,
    priority: updates.priority || existingTask.priority,
    category: updates.category || existingTask.category,
    status: updates.status || existingTask.status,
    dueDate: updates.dueDate !== undefined ? (updates.dueDate || null) : existingTask.dueDate,
    updatedAt: new Date().toISOString(),
  };
}

module.exports = { buildTaskDocument, applyTaskUpdate, PRIORITIES, CATEGORIES, STATUSES };
