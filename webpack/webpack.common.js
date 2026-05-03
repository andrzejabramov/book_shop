const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[contenthash].js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      // JS / Babel
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
      // 🎨 SCSS / SASS (НОВОЕ ПРАВИЛО)
      // 🎨 SCSS / SASS
      {
        test: /\.scss$/,
        oneOf: [
          {
            // CSS Modules: только файлы *.module.scss
            resourceQuery: /module/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[name]__[local]--[hash:base64:5]",
                  },
                },
              },
              {
                loader: "sass-loader",
                options: {
                  api: "modern",
                  // ✅ Гасим варнинги про устаревший @import
                  sassOptions: {
                    silenceDeprecations: ["import"],
                  },
                },
              },
            ],
          },
          {
            // Обычный SCSS (BEM): все остальные файлы
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "sass-loader",
                options: {
                  api: "modern",
                  // ✅ Гасим варнинги про устаревший @import
                  sassOptions: {
                    silenceDeprecations: ["import"],
                  },
                },
              },
            ],
          },
        ],
      },
      // Картинки
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: { filename: "assets/images/[name][hash:8][ext]" },
      },
      // Шрифты
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: { filename: "assets/fonts/[name][hash:8][ext]" },
      },
    ],
  },
  resolve: { extensions: [".js", ".json"] },
};
