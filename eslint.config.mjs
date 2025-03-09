import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import babelParser from '@babel/eslint-parser';
import jest from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: babelParser,
    },
  },
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-this-alias': ['error', { allowedNames: ['self'] }],
    },
  },
  {
    ignores: [
      '*.md',
      '.env.keys',
      '.env',
      '.dockerignore',
      '.babelrc',
      '.prettierignore',
      '*.yml',
      '*.config.js',
      '*.log',
      '*.json',
      'client/*',
      'swagger/*',
      'node-modules/*',
      'public/*',
      'coverage/*',
      'db_backup/*',
      'resources/*',
      '.husky/*',
      '.vscode/*',
    ],
  },
  // Configuration for test files
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: { jest },
    rules: {
      ...jest.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
