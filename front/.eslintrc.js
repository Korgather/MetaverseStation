module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'testing-library'],
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:testing-library/react',
  ],
  rules: {},
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
