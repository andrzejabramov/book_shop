// src/js/modules/catalog-controller.js

// === 🛒 CART MODULE (Без изменений) ===
const CART = {
  key: "bookshop_cart",
  items: [],
  load() {
    try {
      this.items = JSON.parse(localStorage.getItem(this.key)) || [];
    } catch {
      this.items = [];
    }
    this.updateBadge();
  },
  save() {
    localStorage.setItem(this.key, JSON.stringify(this.items));
    this.updateBadge();
  },
  add(book) {
    const existing = this.items.find((i) => i.id === book.id);
    if (existing) existing.quantity += 1;
    else
      this.items.push({
        id: book.id,
        title: book.title,
        price: book.price,
        quantity: 1,
      });
    this.save();
  },
  remove(bookId) {
    const idx = this.items.findIndex((i) => i.id === bookId);
    if (idx === -1) return;
    if (this.items[idx].quantity > 1) this.items[idx].quantity -= 1;
    else this.items.splice(idx, 1);
    this.save();
  },
  updateBadge() {
    const badge = document.querySelector(".header__cart-badge");
    const digit = badge?.querySelector(".header__badge-digit");
    const count = this.items.reduce((sum, i) => sum + i.quantity, 0);
    if (badge && digit) {
      digit.textContent = count;
      badge.classList.toggle("is-visible", count > 0);
    }
  },
  isInCart(bookId) {
    return this.items.some((i) => i.id === bookId);
  },
};

// === 🌐 API CONFIG ===
const API_BASE = "https://openlibrary.org/search.json";
const COVER_BASE = "https://covers.openlibrary.org/b/id/";
const FALLBACK_COVER = "/img/placeholder.png";

// === STATE ===
const STATE = {
  activeCategory: "",
  offset: 0,
  limit: 6,
  categories: [],
  template: null,
};

// === INIT ===
function init() {
  STATE.template = document.getElementById("card-template");
  if (!STATE.template) {
    console.error("❌ #card-template не найден в HTML!");
    return false;
  }

  // Категории пока берём из кэша или хардкода.
  // В продакшене можно подгружать из /search.json?mode=subjects, но для стабильности оставим:
  STATE.categories = [
    "fiction",
    "history",
    "science",
    "fantasy",
    "romance",
    "mystery",
  ];
  STATE.activeCategory = STATE.categories[0];
  return true;
}

// === RENDER CATEGORIES ===
function renderCategoryList() {
  const list = document.querySelector(".category-list");
  if (!list) return;

  list.innerHTML = STATE.categories
    .map(
      (cat) => `
      <li class="category-list__item ${cat === STATE.activeCategory ? "active" : ""}">
        <a href="#" data-cat="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</a>
      </li>`,
    )
    .join("");

  list.querySelectorAll(".category-list__item a").forEach((link) => {
    link.onclick = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const newCat = link.dataset.cat;
      if (!newCat || newCat === STATE.activeCategory) return;

      STATE.activeCategory = newCat;
      STATE.offset = 0;
      list
        .querySelectorAll(".category-list__item")
        .forEach((el) => el.classList.remove("active"));
      link.closest(".category-list__item").classList.add("active");
      await loadPage(true);
    };
  });
}

// === HELPERS ===
const getStarsHTML = (r) =>
  [1, 2, 3, 4, 5]
    .map(
      (i) =>
        `<svg class="card__star card__star--${i <= r ? "active" : "inactive"}" viewBox="0 0 12 12"><path d="M6 0l1.5 4.5H12l-3.5 2.5 1.5 4.5L6 8.5 2.5 11l1.5-4.5L0 4.5h4.5z"/></svg>`,
    )
    .join("");

const PLACEHOLDER = `
  <article class="card card--placeholder">
    <div class="card__cover"><img class="card__image" src="/img/book-1.png" alt="No data" style="opacity:0.3"></div>
    <div class="card__info">
      <p class="card__author" style="color:#ccc">---</p>
      <h3 class="card__name" style="color:#ccc">No more books</h3>
      <div class="card__rating"><div class="card__stars"></div><span class="card__reviews" style="color:#ccc">---</span></div>
      <p class="card__describe" style="color:#ccc">---</p>
      <span class="card__price" style="color:#ccc">---</span>
      <button class="card__btn load-more-btn" disabled style="opacity:0.5; cursor:not-allowed">Out of stock</button>
    </div>
  </article>`;

// === 📥 API FETCH & MAP ===
async function fetchBooks(category, offset, limit) {
  const url = `${API_BASE}?subject=${encodeURIComponent(category)}&limit=${limit}&offset=${offset}&fields=title,author_name,cover_i,key`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  if (!data.docs || data.docs.length === 0) return [];

  // Маппинг API → наш формат
  return data.docs.map((doc) => ({
    id: doc.key.replace("/works/", ""), // Стабильный ID для корзины
    title: doc.title || "Untitled",
    author: doc.author_name?.[0] || "Unknown Author",
    cover: doc.cover_i ? `${COVER_BASE}${doc.cover_i}-M.jpg` : FALLBACK_COVER,
    rating: 4, // В search API нет рейтинга. Фикс 4 для UI-стабильности
    reviews: Math.floor(Math.random() * 500) + 20,
    description: "Available now. Click to add to cart.",
    price: `$${(Math.random() * 15 + 8).toFixed(2)}`, // API не отдаёт цены
    category,
  }));
}

// === 📄 LOAD PAGE (Async) ===
async function loadPage(resetGrid = false) {
  const grid = document.getElementById("card-grid");
  if (!grid || !STATE.template) return;

  if (resetGrid) grid.querySelectorAll(".card").forEach((c) => c.remove());

  // Индикатор загрузки
  const loader = document.createElement("p");
  loader.className = "loading-indicator";
  loader.textContent = "Loading books...";
  loader.style.cssText =
    "grid-column: 1/-1; text-align:center; color:#888; padding: 40px 0;";
  grid.appendChild(loader);

  try {
    const books = await fetchBooks(
      STATE.activeCategory,
      STATE.offset,
      STATE.limit,
    );
    loader.remove();

    if (books.length === 0) {
      for (let i = 0; i < STATE.limit; i++)
        grid.insertAdjacentHTML("beforeend", PLACEHOLDER);
      return;
    }

    books.forEach((book) => {
      const clone = STATE.template.content.cloneNode(true);
      const card = clone.querySelector(".card");
      card.querySelector(".card__image").src = book.cover;
      card.querySelector(".card__image").alt = book.title;
      card.querySelector(".card__author").textContent = book.author;
      card.querySelector(".card__name").textContent = book.title;
      card.querySelector(".card__stars").innerHTML = getStarsHTML(book.rating);
      card.querySelector(".card__reviews").textContent = book.reviews;
      card.querySelector(".card__describe").textContent = book.description;
      card.querySelector(".card__price").textContent = book.price;

      const btn = card.querySelector(".card__btn");
      const isInCart = CART.isInCart(book.id);
      btn.textContent = isInCart ? "In the cart" : "Buy now";
      btn.dataset.state = isInCart ? "in-cart" : "default";
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";

      btn.onclick = (e) => {
        e.stopPropagation();
        const currentState = btn.dataset.state;
        if (currentState === "in-cart") {
          CART.remove(book.id);
          btn.textContent = "Buy now";
          btn.dataset.state = "default";
        } else {
          CART.add(book);
          btn.textContent = "In the cart";
          btn.dataset.state = "in-cart";
        }
      };
      grid.appendChild(clone);
    });
    STATE.offset += STATE.limit;
  } catch (err) {
    console.error("❌ API Error:", err);
    loader.remove();
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#ff353a; padding:40px 0;">Failed to load books. Please refresh.</p>`;
  }
}

// === 🚀 EXPORT ===
export function initCatalog() {
  if (!init()) return;
  CART.load();
  renderCategoryList();
  loadPage(false).catch(console.error);

  document
    .querySelector(".row-placeholder .load-more-btn")
    ?.addEventListener("click", () => {
      loadPage(true).catch(console.error);
    });
}
