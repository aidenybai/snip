module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb-typescript-lite', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
  },
  rules: {
    'lines-between-class-members': 'off',
  },
};
