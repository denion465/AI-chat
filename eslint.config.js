import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.node },
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'indent': ['error', 2],
    },
  },
  pluginJs.configs.recommended,
];
