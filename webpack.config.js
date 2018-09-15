var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

//DEPENDENCIES
const VENDOR_LIBS = ['jquery'];

//Browsersync 
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const PROXY = `http://${HOST}:${PORT}`;

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
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  //ENVIRONEMENT MODE ----------------------------
  mode: 'development',
  //PLUGINS ----------------------------
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new DuplicatePackageCheckerPlugin(),
    new CopyWebpackPlugin(
      [
        {
          from: path.join(__dirname, 'src', 'assets'),
          to: path.join(__dirname, 'dist', 'assets'),
        }
      ],
      { debug: 'warning' }
    ),
    new BrowserSyncPlugin(
      {
        host: HOST,
        port: PORT,
        proxy: PROXY
      },
      {
        reload: false
      }
    )
  ],
  //OPTIMIZATION ----------------------------
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

module.exports = config;