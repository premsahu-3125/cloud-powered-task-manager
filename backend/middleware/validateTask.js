const AppError = require("../utils/AppError");

const PRIORITIES = ["Low", "Medium", "High"];
const CATEGORIES = ["College", "Assignment", "Project", "Exam", "Personal", "Other"];
const STATUSES = ["Pending", "Completed"];

function isValidDateString(value) {
  if (typeof value !== "string") return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

// Used for POST /api/tasks — title is mandatory, everything else is optional
// with sensible defaults applied in the controller.
function validateTaskCreate(req, res, next) {
  const { title, priority, category, status, dueDate } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return next(new AppError("Title is required.", 400));
  }

  if (priority !== undefined && !PRIORITIES.includes(priority)) {
    return next(new AppError(`Priority must be one of: ${PRIORITIES.join(", ")}.`, 400));
  }

  if (category !== undefined && !CATEGORIES.includes(category)) {
    return next(new AppError(`Category must be one of: ${CATEGORIES.join(", ")}.`, 400));
  }

  if (status !== undefined && !STATUSES.includes(status)) {
    return next(new AppError(`Status must be one of: ${STATUSES.join(", ")}.`, 400));
  }

  if (dueDate !== undefined && dueDate !== "" && !isValidDateString(dueDate)) {
    return next(new AppError("Due date must be a valid date.", 400));
  }

  next();
}

// Used for PUT /api/tasks/:id — same field rules as create, but title is
// still required because PUT replaces the whole task (not a partial patch).
function validateTaskUpdate(req, res, next) {
  validateTaskCreate(req, res, next);
}

// Used for PATCH /api/tasks/:id/status
function validateStatusUpdate(req, res, next) {
  const { status } = req.body;
  if (!status || !STATUSES.includes(status)) {
    return next(new AppError(`Status must be one of: ${STATUSES.join(", ")}.`, 400));
  }
  next();
}

module.exports = {
  validateTaskCreate,
  validateTaskUpdate,
  validateStatusUpdate,
  PRIORITIES,
  CATEGORIES,
  STATUSES,
};
