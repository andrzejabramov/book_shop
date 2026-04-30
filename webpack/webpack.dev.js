const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",

  // Переопределяем имя файла для dev: без хеша
  output: {
    filename: "js/[name].js",
  },

  devServer: {
    static: path.resolve(__dirname, "../public"),
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  // Блок module удалён, так как он теперь в common
});
