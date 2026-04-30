# 📚 Bookshop — Техническое Задание (v1.1)

> ✅ Согласовано: Гибридная методология • Без тёмной темы • Рефакторинг слайдера

---

## 🎯 Цель проекта

Сверстать и реализовать главную страницу интернет-магазина книг **Bookshop** с:

- Динамической подгрузкой данных из **Google Books API**
- Переиспользуемым **слайдером** (автопереключение + точки)
- Корзиной с сохранением в **localStorage**
- Оптимизированной сборкой через **Webpack 5**

---

## 🔧 Функциональные требования

### 1️⃣ Шапка сайта (Header) — BEM

| Элемент       | Требование                              | Реализация                                   |
| ------------- | --------------------------------------- | -------------------------------------------- |
| Логотип       | Кликабельный (`#`)                      | `.header__logo`                              |
| Навигация     | Пустые ссылки, неактивны                | `.header__nav`, `.header__link`              |
| Кнопки        | Поиск, авторизация, корзина — неактивны | `.header__btn`, `.header__btn--cart`         |
| Бейдж корзины | Показывает количество товаров           | `.header__cart-badge` (обновляется через JS) |
| Поведение     | Фиксация при скролле                    | `position: sticky` + JS-фоллбэк              |

### 2️⃣ Слайдер (Hero Slider) — BEM + ES6-модуль

| Требование    | Реализация                                                          |
| ------------- | ------------------------------------------------------------------- |
| Автопрокрутка | Каждые **5000 мс** (параметр `interval`)                            |
| Цикличность   | После последнего → первый (`loop: true`)                            |
| Навигация     | Точки под слайдером (`.slider__dot`)                                |
| Адаптивность  | Относительные размеры + `aspect-ratio`                              |
| Оптимизация   | `loading="lazy"` для изображений                                    |
| Архитектура   | Класс `Slider` в `src/js/modules/components/Slider.js`              |
| API           | Публичные методы: `next()`, `prev()`, `updateSlides()`, `destroy()` |

### 3️⃣ Боковая панель (справа от слайдера)

- Цветные блоки-ссылки (адреса `#`)
- Вёрстка: `.promo-blocks`, `.promo-blocks__item`
- На мобильных: перенос под слайдер (media query)

### 4️⃣ Категории и список книг

#### Список категорий — BEM

```scss
.categories {
  /* блок */
}
.categories__list {
  /* элемент */
}
.categories__item {
  /* элемент */
}
.categories__item--active {
  /* модификатор активной категории */
}
```

- По умолчанию активна **первая категория**
- Клик по неактивной → смена активной → сброс пагинации → загрузка книг

#### Список книг — CSS Modules (`BookList.module.scss`)

| Требование         | Реализация                                 |
| ------------------ | ------------------------------------------ |
| Ленивая загрузка   | Первые 6 книг → кнопка «Load more» → +6    |
| Пагинация          | Параметр `startIndex` в запросе к API      |
| Обработка ошибок   | Показать сообщение, если API вернул ошибку |
| Индикация загрузки | Спиннер/скелетон при запросе               |

### 5️⃣ Карточка книги — BEM

```scss
.book-card {
  /* блок */
}
.book-card__image,
.book-card__title,
.book-card__authors,
.book-card__rating,
.book-card__stars,
.book-card__description,
.book-card__price,
.book-card__btn {
  /* элементы */
}
.book-card__btn--in-cart {
  /* модификатор состояния */
}
```

| Поле      | Источник                                     | Обработка                                                                               |
| --------- | -------------------------------------------- | --------------------------------------------------------------------------------------- |
| Обложка   | `volumeInfo.imageLinks.thumbnail`            | Если нет → плейсхолдер `/assets/images/placeholder-book.svg`                            |
| Автор(ы)  | `volumeInfo.authors`                         | Массив → строка через `, `                                                              |
| Заголовок | `volumeInfo.title`                           | —                                                                                       |
| Рейтинг   | `volumeInfo.averageRating` + `ratingsCount`  | Показать **только если** `averageRating` существует; формат: `★★★★☆ (136)`              |
| Описание  | `volumeInfo.description`                     | Обрезать до **3 строк** (`-webkit-line-clamp: 3`) + многоточие                          |
| Цена      | `saleInfo.listPrice.amount` + `currencyCode` | Показать **только если** есть в `saleInfo`; формат: `$11.99`                            |
| Кнопка    | —                                            | Toggle: добавить/удалить из корзины + визуальное изменение (`.book-card__btn--in-cart`) |

### 6️⃣ Корзина — логика в `Cart.js`

- Хранение: `localStorage` (ключ: `bookshop_cart`)
- Структура элемента:
  ```js
  {
    id: "zyTCAlFPjgYC",        // volume.id
    title: "The Google story", // volumeInfo.title
    price: 11.99,              // saleInfo.listPrice.amount
    currency: "USD",           // saleInfo.listPrice.currencyCode
    cover: "https://..."       // imageLinks.thumbnail или плейсхолдер
  }
  ```
- Методы класса `Cart`:
  ```js
  add(book); // Добавить книгу
  remove(bookId); // Удалить книгу
  toggle(book); // Добавить/удалить (для кнопки Buy now)
  getAll(); // Получить массив книг
  getCount(); // Получить количество товаров (для бейджа)
  clear(); // Очистить корзину
  ```
- Бейдж в шапке обновляется автоматически при изменении корзины

---

## 🌐 Google Books API

### Базовый запрос

```
GET https://www.googleapis.com/books/v1/volumes
  ?q=subject:{category}
  &key={API_KEY}
  &printType=books
  &startIndex={offset}
  &maxResults=6
  &langRestrict=en
```

### Категории (конфигурируемые)

```js
// src/js/config/constants.js
export const CATEGORIES = {
  Business: "Business",
  Fiction: "Fiction",
  Technology: "Technology",
  Science: "Science",
  History: "History",
  Art: "Art",
};

export const API_CONFIG = {
  baseUrl: "https://www.googleapis.com/books/v1/volumes",
  maxResults: 6,
  langRestrict: "en",
  printType: "books",
};
```

### 🔐 API-ключ

- Хранить в `.env` (не коммитить!)
- Инжектировать в сборку через `webpack.DefinePlugin`:
  ```js
  // webpack.common.js
  new DefinePlugin({
    "process.env.GOOGLE_BOOKS_API_KEY": JSON.stringify(
      process.env.GOOGLE_BOOKS_API_KEY,
    ),
  });
  ```
- В коде использовать: `process.env.GOOGLE_BOOKS_API_KEY`

---

## 🎨 Стилизация: Гибридный подход

### ✅ Использовать BEM для:

- Переиспользуемых компонентов: `.header`, `.slider`, `.book-card`, `.categories`
- Глобальных утилит: сброс, шрифты, переменные, миксины

### ✅ Использовать CSS Modules для:

- Сложных компонентов с внутренней логикой: `BookList.module.scss`, `CartWidget.module.scss`
- Ситуаций, где нужна полная изоляция стилей

### 📁 Структура стилей:

```
src/styles/
├── main.scss                    # Точка входа: импорт всех стилей
├── base/
│   ├── _reset.scss             # Normalize + сброс
│   ├── _variables.scss         # CSS-переменные (:root)
│   ├── _mixins.scss            # Миксины (line-clamp, adaptive-font)
│   └── _typography.scss        # Шрифты, базовые стили текста
│
├── components/                  # BEM-компоненты (глобальные)
│   ├── _header.scss
│   ├── _slider.scss
│   ├── _promo-blocks.scss
│   ├── _categories.scss
│   ├── _book-card.scss
│   └── _cart-badge.scss
│
└── modules/                     # CSS Modules (локальные)
    ├── BookList.module.scss
    └── CartWidget.module.scss
```

### 🔧 Настройка Webpack для гибрида:

```js
// webpack/webpack.common.js — правило для SCSS
{
  test: /\.scss$/,
  oneOf: [
    {
      // CSS Modules: только файлы *.module.scss
      resourceQuery: /module/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
              exportLocalsConvention: 'camelCase'
            }
          }
        },
        'sass-loader'
      ]
    },
    {
      // Обычный SCSS (BEM): все остальные файлы
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }
  ]
}
```

> 💡 **Импорт CSS Modules в JS**:
>
> ```js
> import styles from "./BookList.module.scss"; // styles.list, styles.item
> ```
>
> 💡 **Импорт обычных стилей**:
>
> ```js
> import "../styles/components/_book-card.scss"; // глобально
> ```

---

## ⚙️ Технические требования

| Требование       | Реализация                                                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Модульность**  | ES6-модули, один компонент — один файл                                                                                                        |
| **Сборка**       | Webpack 5 + Babel 7 + Sass                                                                                                                    |
| **Минификация**  | `TerserPlugin` (JS), `CssMinimizerPlugin` (CSS) в prod                                                                                        |
| **Source maps**  | В dev-режиме: `eval-source-map`                                                                                                               |
| **Оптимизация**  | • `loading="lazy"` для изображений<br>• Debounce для обработчиков скролла/кликов<br>• Кэширование ответов API (опционально, `sessionStorage`) |
| **Адаптивность** | Mobile-first, брейкпоинты: 768px, 1024px                                                                                                      |
| **Доступность**  | `aria-label` для кнопок, фокус-стили, навигация с клавиатуры                                                                                  |
| **Браузеры**     | Последние 2 версии + Safari iOS 15+                                                                                                           |

---

## 🗂️ Структура проекта (финальная)

```
bookshop/
├── public/
│   ├── index.html                 # Семантическая разметка
│   ├── assets/
│   │   ├── images/
│   │   │   ├── placeholder-book.svg
│   │   │   ├── logo.svg
│   │   │   └── slider-*.jpg
│   │   └── icons/
│   └── favicon.ico
│
├── src/
│   ├── index.js                   # Точка входа: импорт app.js + стилей
│   │
│   ├── js/
│   │   ├── app.js                 # Инициализация приложения
│   │   │
│   │   ├── modules/
│   │   │   ├── api/
│   │   │   │   └── books-api.js   # Обёртка над fetch: getBooks(category, startIndex)
│   │   │   │
│   │   │   ├── components/        # BEM-компоненты
│   │   │   │   ├── Header.js      # Логика шапки (корзина, sticky)
│   │   │   │   ├── Slider.js      # Рефакторенный слайдер (класс)
│   │   │   │   ├── Categories.js  # Переключение категорий
│   │   │   │   ├── BookCard.js    # Рендер карточки (функция)
│   │   │   │   └── Cart.js        # Работа с localStorage
│   │   │   │
│   │   │   ├── widgets/           # CSS Modules-виджеты
│   │   │   │   ├── BookList.js    # Список книг + пагинация
│   │   │   │   └── CartWidget.js  # Виджет корзины (если вынесем)
│   │   │   │
│   │   │   └── utils/
│   │   │       ├── dom.js         # Хелперы: createElement, on, off
│   │   │       ├── debounce.js    # Утилита debounce
│   │   │       ├── truncate.js    # Обрезка текста до N строк
│   │   │       └── format.js      # Форматирование цены, рейтинга
│   │   │
│   │   └── config/
│   │       ├── constants.js       # Категории, настройки API
│   │       └── routes.js          # (на будущее) маршруты
│   │
│   ├── styles/
│   │   ├── main.scss              # @import всех компонентов
│   │   ├── base/                  # Сброс, переменные, миксины
│   │   ├── components/            # BEM-стили (глобальные)
│   │   └── modules/               # CSS Modules (*.module.scss)
│   │
│   └── env/
│       └── .env.example           # GOOGLE_BOOKS_API_KEY=your_key_here
│
├── webpack/
│   ├── webpack.common.js          # Базовая конфигурация
│   ├── webpack.dev.js             # Dev: HMR, source maps
│   ├── webpack.prod.js            # Prod: минификация, оптимизация
│   └── utils.js                   # Хелперы для конфигов
│
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .stylelintrc.json
├── package.json
├── README.md
└── .env                           # ⚠️ НЕ КОММИТИТЬ!
```

---

## 🚀 План реализации (обновлённый)

### Этап 0: Подготовка ✅

- [x] Утвердить ТЗ и методологию
- [ ] Инициализировать репозиторий: `git init`, `.gitignore`, первый коммит

### Этап 1: Настройка окружения

- [ ] `npm init -y` + установка зависимостей
- [ ] Настройка `.env` + `dotenv-webpack`
- [ ] Конфигурация Webpack (common/dev/prod)
- [ ] Базовый `index.html` + точка входа `src/index.js`

### Этап 2: Вёрстка компонентов (BEM)

- [ ] `base/`: сброс, переменные, шрифты
- [ ] `components/_header.scss` + `Header.js`
- [ ] `components/_slider.scss` + рефакторинг `Slider.js`
- [ ] `components/_book-card.scss` + `BookCard.js`
- [ ] `components/_categories.scss` + `Categories.js`

### Этап 3: Логика и интеграция

- [ ] `books-api.js`: обёртка над fetch с обработкой ошибок
- [ ] `Cart.js`: CRUD для localStorage
- [ ] `BookList.js` (CSS Module): рендер + пагинация + «Load more»
- [ ] Интеграция слайдера в `app.js` с автопереключением

### Этап 4: Оптимизация и сборка

- [ ] `loading="lazy"` для всех изображений
- [ ] Debounce для обработчиков
- [ ] Минификация в prod-сборке
- [ ] Проверка Lighthouse (Performance, Accessibility)

### Этап 5: Финализация

- [ ] Тестирование: корзина после перезагрузки, отсутствие рейтинга/цены
- [ ] Обновление `README.md` с инструкцией по запуску
- [ ] Финальный коммит + тег `v1.0`

---

## 📦 package.json (скелет с учётом гибрида)

```json
{
  "name": "bookshop",
  "version": "1.0.0",
  "description": "Book e-commerce SPA with Google Books API",
  "scripts": {
    "start": "webpack serve --config webpack/webpack.dev.js",
    "build": "webpack --config webpack/webpack.prod.js",
    "preview": "serve dist -p 3000",
    "lint": "eslint src/js",
    "lint:fix": "eslint src/js --fix",
    "stylelint": "stylelint src/styles/**/*.scss",
    "prepare": "husky install"
  },
  "devDependencies": {
    "@babel/core": "^7.24.0",
    "@babel/preset-env": "^7.24.0",
    "babel-loader": "^9.1.3",
    "css-loader": "^6.10.0",
    "dotenv-webpack": "^8.0.1",
    "eslint": "^8.57.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "husky": "^9.0.11",
    "mini-css-extract-plugin": "^2.8.1",
    "postcss": "^8.4.35",
    "postcss-loader": "^8.1.1",
    "sass": "^1.72.0",
    "sass-loader": "^14.1.1",
    "style-loader": "^3.3.4",
    "stylelint": "^16.2.1",
    "stylelint-config-standard-scss": "^13.0.0",
    "terser-webpack-plugin": "^5.3.10",
    "webpack": "^5.90.3",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.0.2",
    "webpack-merge": "^5.10.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

---

## 🔑 Чек-лист перед стартом кодинга

- [ ] Создать репозиторий на GitHub / GitLab
- [ ] Добавить `.gitignore` (исключить `node_modules/`, `dist/`, `.env`, `*.log`)
- [ ] Получить **Google Books API Key** в [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Создать `.env` на основе `.env.example`:
  ```env
  GOOGLE_BOOKS_API_KEY=AIzaSyD...your_key_here
  ```
- [ ] Убедиться, что ключ **не попал** в коммит: `git check-ignore -v .env`

---

## ❓ Открытые вопросы (на будущее)

1. Нужна ли валидация формы поиска (когда активируем кнопку)?
2. Добавлять ли анимации при добавлении в корзину (micro-interactions)?
3. Обрабатывать ли ошибки API (429 — лимит запросов, 403 — неверный ключ)?

> Эти вопросы можно решить по мере реализации, если останется время.

---

✅ **ТЗ согласовано и зафиксировано.**
