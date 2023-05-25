module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': [0, { js: 'always' }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/prefer-default-export': 'off',
  },
};
