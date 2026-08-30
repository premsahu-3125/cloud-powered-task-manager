const express = require("express");
const taskController = require("../controllers/taskController");
const { validateTaskCreate, validateTaskUpdate, validateStatusUpdate } = require("../middleware/validateTask");

const router = express.Router();

// NOTE: req.userId is attached by auth middleware mounted in server.js
// (mockAuth for now, real JWT middleware from Phase 4 onward). Every
// handler here only ever touches tasks belonging to req.userId.

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", validateTaskCreate, taskController.createTask);
router.put("/:id", validateTaskUpdate, taskController.updateTask);
router.patch("/:id/status", validateStatusUpdate, taskController.updateTaskStatus);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
