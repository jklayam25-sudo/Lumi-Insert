module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'svelte3'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 'prettier/prettier': ['error', { semi: true, tabWidth: 2 }],
    semi: ['error', 'always'],
    indent: ['error', 2],
  },
  settings: {
    'svelte3/typescript': true,
  },
};
