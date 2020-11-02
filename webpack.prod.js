const { merge } = require("webpack-merge");
const webpackCommonConfig = require("./webpack.common");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { chunk } = require("lodash");

module.exports = merge(webpackCommonConfig, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
    path: path.resolve(__dirname, "server/dist"),
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
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        main: {
          name: "mian",
          chunks: "initial",
          priority: -40,
        },
        vue: {
          name: "vue",
          test: /[\\/]node_modules[\\/](^vue)[\\/]/,
          chunks(chunk) {
            return chunk.name.match(/vue/g);
          },
          priority: -10,
        },
        lodash: {
          name: "lodash",
          test: /[\\/]node_modules[\\/](^lodash)[\\/]/,
          chunks(chunk) {
            return chunk.name.match(/lodash/g);
          },
          priority: -20,
        },
        chunkVendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks(chunk) {
            console.log(chunk.name);
            return chunk.name !== "lodash" || chunks.name !== "vue";
          },
          priority: -30,
        },
      },
    },
  },
});
