import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import typescriptEslintParser from '@typescript-eslint/parser'
import jest from 'eslint-plugin-jest';

export default tseslint.config(
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      }
    }
  },
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
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'no-warning-comments': 'off',
      'no-unused-vars': 'off',
      "@typescript-eslint/no-misused-promises": "off",
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-this-alias': ['error', { allowedNames: ['self'] }],
      "@typescript-eslint/non-nullable-type-assertion-style": "off"
    }
  },
  {
    ignores: [
      '*.md',
      '.env*',
      '.dockerignore',
      '.gitignore',
      '.prettierignore',
      '*.yml',
      '**/*.json',
      'logs/*',
      'docs/*',
      'mongo-data/*',
      'node_modules/*',
      'public/*',
      'coverage/*',
      '.husky/*',
      '.vscode/*',
    ]
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
