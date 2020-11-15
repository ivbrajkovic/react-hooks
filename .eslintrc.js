module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  // extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
    "prettier/@typescript-eslint",
  ], // extends: ["airbnb-typescript"],
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
    // "linebreak-style": ["error", "windows"],
    // "object-curly-newline": ["error", { multiline: true }],
    "import/no-extraneous-dependencies": 0,
    "no-plusplus": 0,
  },
};
