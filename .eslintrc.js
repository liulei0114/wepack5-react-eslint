module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    "object-curly-newline": [2, {
      "minProperties": 1,
      "multiline": true,
    }],
  },
  settings: {
    "react": {
      "version": "detect"
    }
  },
  ignorePatterns: ["node_modules/"],
}
