import pluginJs from '@eslint/js';
import PrettierConfig from 'eslint-config-prettier';
import PrettierPlugin from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  PrettierConfig,
  {
    plugins: {
      prettier: PrettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
