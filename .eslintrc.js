module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  // extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  extends: ["airbnb-typescript", "prettier", "prettier/@typescript-eslint"],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["/*.*"],
  rules: {
    "linebreak-style": ["error", "windows"],
    "object-curly-newline": ["error", { multiline: true }],
  },
};
