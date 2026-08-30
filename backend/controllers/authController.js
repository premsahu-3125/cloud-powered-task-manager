const bcrypt = require("bcryptjs");

const userService = require("../services/userService");
const { toPublicUser } = require("../models/userModel");
const { signToken } = require("../utils/jwt");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const SALT_ROUNDS = 10;

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await userService.findByEmail(email);
  if (existing) {
    // 409 Conflict — the resource (an account with this email) already exists.
    throw new AppError("An account with this email already exists.", 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userService.createUser({ name, email, passwordHash });

  const token = signToken(user._id);
  res.status(201).json({ token, user: toPublicUser(user) });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findByEmail(email);
  // Same error message whether the email doesn't exist or the password is
  // wrong — this avoids confirming to an attacker which emails are registered.
  const invalidCredentialsError = new AppError("Invalid email or password.", 401);

  if (!user) throw invalidCredentialsError;

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) throw invalidCredentialsError;

  const token = signToken(user._id);
  res.status(200).json({ token, user: toPublicUser(user) });
});

// GET /api/auth/me — lets the frontend fetch the logged-in user's info
// (e.g. for the Profile page) using just the token, without re-sending credentials.
const getMe = asyncHandler(async (req, res) => {
  const user = await userService.findById(req.userId);
  if (!user) throw new AppError("User not found.", 404);
  res.status(200).json({ user: toPublicUser(user) });
});

module.exports = { register, login, getMe };
