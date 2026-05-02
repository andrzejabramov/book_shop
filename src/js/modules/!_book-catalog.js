// 16 категорий по ТЗ
const CATEGORIES = [
  { slug: "fiction", label: "Fiction" },
  { slug: "science_fiction", label: "Sci-Fi" },
  { slug: "fantasy", label: "Fantasy" },
  { slug: "mystery", label: "Mystery" },
  { slug: "romance", label: "Romance" },
  { slug: "thriller", label: "Thriller" },
  { slug: "history", label: "History" },
  { slug: "biography", label: "Biography" },
  { slug: "self_help", label: "Self-Help" },
  { slug: "business", label: "Business" },
  { slug: "science", label: "Science" },
  { slug: "technology", label: "Technology" },
  { slug: "art", label: "Art" },
  { slug: "philosophy", label: "Philosophy" },
  { slug: "psychology", label: "Psychology" },
  { slug: "travel", label: "Travel" },
];

const state = {
  activeIndex: 0,
  offset: 0,
  isLoading: false,
};

// Генерация контента карточки (используем ТВОИ классы .card__*)
function fillCard(cardEl, book) {
  const starSvg = (filled) => `
    <svg class="card__star ${filled ? "" : "card__star--empty"}" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>`;

  cardEl.innerHTML = `
    <div class="card__image-wrap">
      <img src="${book.coverUrl}" alt="${book.title}" class="card__image" loading="lazy">
    </div>
    <div class="card__content">
      <h3 class="card__title">${book.title}</h3>
      <p class="card__author">${book.author}</p>
      <p class="card__desc">${book.description}</p>
      <div class="card__footer">
        <span class="card__price">${book.price}</span>
        <div class="card__rating">
          ${[1, 2, 3, 4, 5].map((i) => starSvg(i <= book.rating)).join("")}
        </div>
      </div>
    </div>`;
}

// Получение книг из Open Library Subjects API
async function fetchBooks(offset) {
  const slug = CATEGORIES[state.activeIndex].slug;
  const res = await fetch(
    `https://openlibrary.org/subjects/${slug}.json?limit=6&offset=${offset}`,
  );
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();

  return (data.works || []).map((w) => ({
    id: w.key,
    title: w.title || "Untitled",
    author: w.authors?.[0]?.name || "Unknown Author",
    coverUrl: w.cover_id
      ? `https://covers.openlibrary.org/b/id/${w.cover_id}-M.jpg`
      : "https://via.placeholder.com/200x300?text=No+Cover",
    price: `$${(Math.random() * 25 + 5).toFixed(2)}`,
    rating: Math.floor(Math.random() * 3) + 3,
    description:
      "A captivating read blending profound themes with unforgettable characters.",
  }));
}

// Рендер списка категорий
function renderCategories() {
  const list = document.querySelector(".category-panel__list");
  if (!list) return;

  list.innerHTML = CATEGORIES.map(
    (cat, i) => `
    <li class="category-panel__item ${i === 0 ? "active" : ""}" data-index="${i}">
      ${cat.label}
    </li>
  `,
  ).join("");
}

// Заполнение существующих карточек
async function loadBooks(reset = false) {
  if (state.isLoading) return;
  state.isLoading = true;
  if (reset) state.offset = 0;

  const cards = document.querySelectorAll(".card-grid .card");
  if (!cards.length) {
    console.warn("⚠️ Не найдены .card внутри .card-grid");
    state.isLoading = false;
    return;
  }

  // Показываем лоадер на первых карточках
  if (reset) {
    cards.forEach((card, i) => {
      if (i < 6)
        card.innerHTML =
          '<div style="padding:20px;text-align:center">Loading...</div>';
    });
  }

  try {
    const books = await fetchBooks(state.offset);

    // Заполняем карточки по очереди (максимум 6 за раз)
    books.forEach((book, i) => {
      if (cards[i]) {
        fillCard(cards[i], book);
      }
    });

    state.offset += 6;
  } catch (err) {
    console.error("❌ Fetch error:", err);
    if (reset) {
      cards.forEach((card) => {
        card.innerHTML =
          '<div style="padding:20px;text-align:center;color:#EF4444">Error</div>';
      });
    }
  } finally {
    state.isLoading = false;
  }
}

// Инициализация каталога
export function initCatalog() {
  renderCategories();
  loadBooks(true); // Загрузка первых 6 книг в существующие .card

  // Клик по категории
  document
    .querySelector(".category-panel__list")
    ?.addEventListener("click", (e) => {
      const item = e.target.closest(".category-panel__item");
      if (!item) return;

      const newIndex = parseInt(item.dataset.index);
      if (newIndex === state.activeIndex) return;

      state.activeIndex = newIndex;
      state.offset = 0;
      document
        .querySelectorAll(".category-panel__item")
        .forEach((el) => el.classList.remove("active"));
      item.classList.add("active");

      loadBooks(true);
    });

  // Клик по "Load more"
  document.querySelector(".load-more-btn")?.addEventListener("click", () => {
    if (!state.isLoading) loadBooks(false);
  });
}
