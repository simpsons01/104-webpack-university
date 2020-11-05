const { merge } = require("webpack-merge")
const webpackCommonConfig = require("./webpack.common")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(webpackCommonConfig, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
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
        // Foo: {
        //   name(module, chunks) {
        //     console.log(chunks)
        //     return chunks.context
        //   },
        //   chunks: "async",
        //   test: /[\\/]src[\\/]/,
        //   minChunks: 2,
        //   priority: -30
        // },
        // utility: {
        //   name: "utility",
        //   chunks: "initial",
        //   test(module, chunks) {
        //     return module.context.match(/[\\/]src[\\/]/) 
        //   },
        //   minChunks: 1,
        //   priority: -20
        // }
      }
    }
  }
})
