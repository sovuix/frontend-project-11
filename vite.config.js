/** @type {import('vite').UserConfig} */

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  server: {
    cors: true,
  },
  resolve: {
    alias: {
      bootstrap: path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  build: {
    assetsInclude: ['**/*.css', '**/*.js'],
  },
};
