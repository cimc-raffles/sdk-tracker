module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["alloy", "alloy/typescript"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-require-imports": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
  },
};
