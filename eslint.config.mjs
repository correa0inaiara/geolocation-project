import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { 
    files: ['**/*.{js,mjs,cjs,ts}'] 
  },
  { 
    files: ['**/*.js', '**/*.ts'], 
    languageOptions: { 
      ecmaVersion: 5,
      sourceType: "script" 
    } 
  },
  { 
    languageOptions: { 
      globals: globals.browser 
    } 
  },
  {
    rules: {
      "@typescript-eslint/no-this-alias": ["error", { "allowedNames": ["self"] } ]
    }
  },
  // {
  //   rules: {
  //     "allowAsImport": ["error", true]
  //   }
  // },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
