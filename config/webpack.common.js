const path = require('path');
const emoji = require('remark-emoji')
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "../src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader", options: {
            sourceMap: true
          }
        }, {
          loader: "sass-loader", options: {
            sourceMap: true,
            includePaths: [
              "node_modules/sass-mq"
            ]
          }
        }]
      },
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: '@mdx-js/loader',
            options: {
              mdPlugins: [emoji]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      Containers: path.resolve(__dirname, '../src/components/containers'),
      Presentational: path.resolve(__dirname, '../src/components/presentational')
    }
  },
  plugins: [
    new CleanWebpackPlugin(['../dist']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html")
      // filename: "./index.html"
    }),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(process.env)
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};