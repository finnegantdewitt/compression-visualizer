module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'jsx-a11y',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'react-app',
    'react-app/jest',
    // enable more accessibility checks than react-app enables by default
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    '@typescript-eslint/indent': ['error', 2],
  },
};