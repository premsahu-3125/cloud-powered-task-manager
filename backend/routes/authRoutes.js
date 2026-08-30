const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const { validateRegister, validateLogin } = require("../middleware/validateAuth");

const router = express.Router();

// Public
router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);

// Protected — proves the auth middleware works end-to-end
router.get("/me", auth, authController.getMe);

module.exports = router;
