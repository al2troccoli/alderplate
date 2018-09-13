const path = require('path');
const VENDOR_LIBS = '';

const config = {
  entry: {
    bundle: './src/index.js'
    //vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }/*,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }*/
}

module.exports = config;