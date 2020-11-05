const { merge } = require("webpack-merge")
const webpackCommonConfig = require("./webpack.common")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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
              presets: ["@babel/preset-env"]
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
          name: "chunk-vendor",
          chunks: "all",
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  }
})
