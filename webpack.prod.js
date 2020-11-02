const { merge } = require("webpack-merge")
const webpackCommonConfig = require("./webpack.common")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { chunk } = require("lodash")

module.exports = merge(webpackCommonConfig, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
    path: path.resolve(__dirname, "server/dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-transform-runtime"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        chunkVendors: {
          name: "chunk-vendors",
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          priority: 0
        },
        main: {
          name: "mian",
          chunks: "initial",
          priority: -10
        }
      }
    }
  }
})
