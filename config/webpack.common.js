const path = require('path');
const emoji = require('remark-emoji')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');


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
          loader: "style-loader", options: {
            insertInto: 'body'
          }
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
      },
      {
        test: /\.(woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      Containers: path.resolve(__dirname, '../src/components/containers'),
      Presentational: path.resolve(__dirname, '../src/components/presentational'),
      Redux: path.resolve(__dirname, '../src/redux')
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      inject: 'body'
      // filename: "./index.html"
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new ResourceHintWebpackPlugin(),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(process.env)
    }),
    new CopyWebpackPlugin([{ 
      from: path.join(__dirname, '../examples'),
      to: 'examples' 
    }])
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};