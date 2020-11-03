module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['@babel', 'prettier'],
  rules: {
    'import/prefer-default-export': 0,
    'prettier/prettier': 'error',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
}
