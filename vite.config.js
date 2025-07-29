// /** @type {import('vite').UserConfig} */
// export default {
//     server: {
//         cors: true,
//     }
// }

/** @type {import('vite').UserConfig} */
import path from 'path';

export default {
  server: {
    cors: true,
  },
  resolve: {
    alias: {
      'bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  build: {
    assetsInclude: ['**/*.css', '**/*.js'],
  },
};