// Express doesn't automatically catch rejected promises from async route
// handlers. Wrapping each handler in this means we can just `throw new
// AppError(...)` inside a controller instead of writing try/catch everywhere.
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
