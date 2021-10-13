module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  // extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'prettier/@typescript-eslint',
  ], // extends: ["airbnb-typescript"],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: ['/*.*'],
  rules: {
    // "linebreak-style": ["error", "windows"],
    // "object-curly-newline": ["error", { multiline: true }],
    curly: ['error', 'multi-or-nest'],
    'import/no-extraneous-dependencies': 0,
    'no-plusplus': 0,
  },
};
