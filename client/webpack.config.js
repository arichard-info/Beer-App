const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const DotenvWebpack = require("dotenv-webpack");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api": process.env.REACT_APP_PROXY || "http://localhost:5000",
    },
    port: 3000,
    host: process.env.REACT_APP_DOCKER ? "0.0.0.0" : "127.0.0.1",
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new DotenvWebpack({
      path: ".env",
    }),
  ],
};
