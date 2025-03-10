// const path = require('path');

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: 'bundle.js', 
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
//   mode: 'development',
//   devServer: {
//     static: './dist',
//     hot: true,
//   },
//   resolve: {
//     extensions: ['.js'],
//   },
// };
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: './dist',
    hot: true,
  },
};