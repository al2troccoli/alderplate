/*********************************
* Environment and imports
*********************************/
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var HandlebarsPlugin = require("handlebars-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const environment = process.env.NODE_ENV || "development";

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
    filename: '[name].js'
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/'
            }
        }]
      }
    ]
  },

  //ENVIRONEMENT MODE ----------------------------
  mode: 'development',

  //ENVIRONEMENT MODE ----------------------------
  devtool: 'source-map',

  //PLUGINS ----------------------------
  plugins: [
    /*new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new HtmlWebpackPlugin({
      title: "Generic Head Title",
      // the template you want to use
      template: path.join(__dirname, "src", "templates","generatedpartial", "head.hbs"),
      // the output file name
      filename: path.join(__dirname, "src", "templates", "partials", "head.hbs"),
      inject: "head"
    }),*/
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
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
        reload: true
      }
    ),
    new HandlebarsPlugin({
      // path to hbs entry file(s)
      entry: path.join(process.cwd(), "src", "templates", "*.hbs"),
      // output path and filename(s). This should lie within the webpacks output-folder
      // if ommited, the input filepath stripped of its extension will be used
      output: path.join(process.cwd(), "dist", "[name].html"),
      // globbed path to partials, where folder/filename is unique
      partials: [
        path.join(process.cwd(), "src", "templates", "partials", "*.hbs")
      ],

      // register custom helpers. May be either a function or a glob-pattern
      helpers: {
        nameOfHbsHelper: Function.prototype,
        projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
      },

      // hooks
      onBeforeSetup: function (Handlebars) {},
      onBeforeAddPartials: function (Handlebars, partialsMap) {},
      onBeforeCompile: function (Handlebars, templateContent) {},
      onBeforeRender: function (Handlebars, data) {},
      onBeforeSave: function (Handlebars, resultHtml, filename) {},
      onDone: function (Handlebars, filename) {}
    })
    /*new HandlebarsPlugin({

      htmlWebpackPlugin: {
      enabled: true, // register all partials from html-webpack-plugin, defaults to `false`
      prefix: "html" // default is "html"
      },

      entry: path.join(process.cwd(), "src", "templates", "*.hbs"),
      output: path.join(process.cwd(), "dist", "[name].html"),

      partials: [
        path.join(process.cwd(), "src", "templates", "*", "*.hbs")
      ]
    })*/
  ],

  /*********************************
  * Resolve
  *********************************/
  resolve: {

  }
  //OPTIMIZATION ----------------------------
  /* optimization: {
    splitChunks: {
      chunks: 'all'
    }
  } */
}

module.exports = config;