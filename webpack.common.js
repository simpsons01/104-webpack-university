const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  resolve: {
    alias: {
      views: path.resolve(__dirname, "src/views"),
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "src/assets"),
      utility: path.resolve(__dirname, "src/utility")
    }
  },
  module: {
    rules: [
      {
        test: /\.(img|jpeg|jpg|png|gif)/,
        use: [{ loader: "file-loader" }]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "104 webpack app",
      template: path.resolve(__dirname, "public/index.html")
    }),
    new VueLoaderPlugin()
  ]
}
