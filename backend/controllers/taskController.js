const taskService = require("../services/taskService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.listTasks(req.userId);
  res.status(200).json({ tasks });
});

// GET /api/tasks/:id
const getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.userId, req.params.id);
  if (!task) throw new AppError("Task not found.", 404);
  res.status(200).json({ task });
});

// POST /api/tasks
const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, category, status, dueDate } = req.body;
  const task = await taskService.createTask(req.userId, {
    title,
    description,
    priority,
    category,
    status,
    dueDate,
  });
  res.status(201).json({ task });
});

// PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, priority, category, status, dueDate } = req.body;
  const task = await taskService.updateTask(req.userId, req.params.id, {
    title,
    description,
    priority,
    category,
    status,
    dueDate,
  });
  if (!task) throw new AppError("Task not found.", 404);
  res.status(200).json({ task });
});

// PATCH /api/tasks/:id/status
const updateTaskStatus = asyncHandler(async (req, res) => {
  const task = await taskService.updateTaskStatus(req.userId, req.params.id, req.body.status);
  if (!task) throw new AppError("Task not found.", 404);
  res.status(200).json({ task });
});

// DELETE /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  const deleted = await taskService.deleteTask(req.userId, req.params.id);
  if (!deleted) throw new AppError("Task not found.", 404);
  res.status(200).json({ message: "Task deleted." });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
