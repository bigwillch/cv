const path = require('path')
const emoji = require('remark-emoji')
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "src/index.html"),
  filename: "./index.html"
});
module.exports = {
  entry: path.join(__dirname, "src/index.js"),
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
  plugins: [
    htmlWebpackPlugin,
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(process.env)
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001
  }
};
