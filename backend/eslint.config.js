const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Common in Express middleware/error handlers: (req, res, next) or
      // (err, req, res, next) where not every param is used in every branch.
      "no-unused-vars": ["warn", { args: "none" }],
    },
  },
  {
    ignores: ["node_modules/**"],
  },
];
