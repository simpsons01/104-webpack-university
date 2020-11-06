const path = require("path")
const { merge } = require("webpack-merge")
const webpackCommonConfig = require("./webpack.common")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(webpackCommonConfig, {
  mode: "development",
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    host: "127.0.0.1",
    contentBase: path.resolve(__dirname, "dist"),
    port: 8181,
    publicPath: '/dist',
    historyApiFallback: {
      verbose: true,
      disableDotRule: true,
      rewrites: [
        { 
          from: /\.(css|js|png|jpeg|gif)/, 
          to(context) {
            return "/dist" + context.parsedUrl.pathname;
          }
        },
        { from: /./, to: '/dist/index.html' },
      ]
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css"
    })
  ]
})
