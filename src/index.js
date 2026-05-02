// 1. Подключаем базовые стили
import "./styles/main.scss";

// 2. Подключаем отладочную сетку (удалим позже)
//import "./styles/debug.scss";
import { initSlider } from "./js/modules/slider.js";
//import { renderCategoryList } from "./js/modules/category-list.js";
import { initCatalog } from "./js/modules/catalog-controller.js";

// 3. Точка входа для JS-логики
console.log("✅ Bookshop app initialized");
console.log("🎨 Styles injected via Webpack style-loader");

// Запуск после готовности DOM
document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  //renderCategoryList();
  initCatalog();
});
