import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { 
    files: ['**/*.{js,mjs,cjs,ts}'], 
    languageOptions: { 
      globals: { ...globals.browser, ...globals.node } 
    },
    rules: {
      // Usuwanie nadmiarowych pustych linii
      'no-multiple-empty-lines': ['error', { max: 1 }]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
