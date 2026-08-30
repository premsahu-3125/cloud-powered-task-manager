const AppError = require("../utils/AppError");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function validateRegister(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return next(new AppError("Name is required.", 400));
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return next(new AppError("A valid email is required.", 400));
  }
  if (!password || typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    return next(new AppError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`, 400));
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || typeof email !== "string") {
    return next(new AppError("Email is required.", 400));
  }
  if (!password || typeof password !== "string") {
    return next(new AppError("Password is required.", 400));
  }

  next();
}

module.exports = { validateRegister, validateLogin, MIN_PASSWORD_LENGTH };
