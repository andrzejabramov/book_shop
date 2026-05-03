const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin"); // 👈 Добавил

module.exports = merge(common, {
  mode: "production",
  devtool: false,

  output: {
    filename: "js/[name].[contenthash:8].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
    publicPath: "./",
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
          { use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] },
        ],
      },
    ],
  },

  plugins: [
    // 👇 Копируем ВСЕ картинки из public/ в dist/ при каждой сборке
    new CopyPlugin({
      patterns: [
        {
          from: "public/img",
          to: "img",
          globOptions: { ignore: ["**/book-*.png", "**/bookshop.fig"] },
        },
      ],
    }),
    new MiniCssExtractPlugin({ filename: "css/[name].[contenthash:8].css" }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
});
