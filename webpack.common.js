const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, "src/index.js"),
    path.resolve(__dirname, "src/index2.js"),
  ],
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
    new ESLintPlugin({
       context: path.resolve(__dirname, "src"),
       extensions: [".js", ".vue"]
    }),
    new VueLoaderPlugin()
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        lib: {
          name(module) {
            const matchModule = module.resource.match(/(jquery|lodash|vuex|vue-router|vue)/)
            return matchModule[0]
          },
          chunks: "initial",
          test: /[\\/]node_modules[\\/](jquery|lodash|vuex|vue-router|vue)/,
          minChunks: 1,
          priority: -10
        },
        chunkVendors: {
          name: "chunk-vendors",
          chunks: "initial",
          test: /[\\/]node_modules[\\/]/,
          priority: -20
        }
      }
    }
  }
}
