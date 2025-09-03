// import js from '@eslint/js';
// import globals from 'globals';
// import { defineConfig } from 'eslint/config';
// import { includeIgnoreFile } from '@eslint/compat';
// import stylistic from '@stylistic/eslint-plugin';
// import { fileURLToPath } from 'url';

// const gitIgnorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

// export default defineConfig([
//   includeIgnoreFile(gitIgnorePath),
//   stylistic.configs.recommended,
//   {
//     files: ['**/*.{js,mjs,cjs}'],
//     plugins: { js },
//     extends: ['js/recommended'],
//   },
//   {
//     files: ['**/*.{js,mjs,cjs}'],
//     languageOptions: { globals: globals.browser },
//   },
// ]);

import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import { includeIgnoreFile } from '@eslint/compat'
import stylistic from '@stylistic/eslint-plugin'
import { fileURLToPath } from 'url'

const gitIgnorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default defineConfig([
  includeIgnoreFile(gitIgnorePath),
  stylistic.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
  },
])
