var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//DEPENDENCIES
const VENDOR_LIBS = ['jquery'];

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  //MODULES ----------------------------
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
  },
  //ENVIRONEMENT MODE ----------------------------
  mode: 'development',
  //PLUGINS ----------------------------
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  //OPTIMIZATION ----------------------------
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

module.exports = config;