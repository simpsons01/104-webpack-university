const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let output = {};

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  output = {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  };
} else {
  output = {
    filename: "[name].[contenthash].js",
    publicPath: "/",
    path: path.resolve(__dirname, "server/dist"),
  };
}

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output,
  resolve: {
    alias: {
      views: path.resolve(__dirname, "src/views"),
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "src/assets"),
    },
  },
  devServer: {
    host: "127.0.0.1",
    contentBase: path.resolve(__dirname, "dist"),
    port: 8181,
    hot: true,
    historyApiFallback: {
      index: "index.html",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{ loader: "vue-loader" }],
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(img|jpeg|jpg|png|gif)/,
        use: [{ loader: "file-loader" }],
      },
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      title: "104 webpack app",
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new VueLoaderPlugin(),
  ],
};
