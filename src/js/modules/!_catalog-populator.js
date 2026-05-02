import { localBooks } from "../data/books-local.js";

// Безопасная генерация только SVG звёзд
function getStarsHTML(rating) {
  return [1, 2, 3, 4, 5]
    .map(
      (i) => `
    <svg class="card__star card__star--${i <= rating ? "active" : "inactive"}" viewBox="0 0 12 12">
      <path d="M6 0l1.5 4.5H12l-3.5 2.5 1.5 4.5L6 8.5 2.5 11l1.5-4.5L0 4.5h4.5z"/>
    </svg>`,
    )
    .join("");
}

export function initCatalog() {
  const grid = document.getElementById("card-grid");
  const template = document.getElementById("card-template");
  if (!grid || !template) return;

  const bookData = localBooks[0]; // Пока берём первую книгу для всех слотов
  const count = 6;

  for (let i = 0; i < count; i++) {
    // 1. Клонируем готовую DOM-разметку (стандартный браузерный API)
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".card");
    card.dataset.bookId = bookData.id;

    // 2. Подставляем значения в существующие узлы
    const img = card.querySelector(".card__image");
    img.src = bookData.cover;
    img.alt = bookData.title;

    card.querySelector(".card__author").textContent = bookData.author;
    card.querySelector(".card__name").textContent = bookData.title;
    card.querySelector(".card__stars").innerHTML = getStarsHTML(
      bookData.rating,
    );
    card.querySelector(".card__reviews").textContent = bookData.reviews;
    card.querySelector(".card__describe").textContent = bookData.description;
    card.querySelector(".card__price").textContent = bookData.price;

    // 3. Вставляем клон в сетку
    grid.appendChild(fragment);
  }

  // 4. Логика кнопок (Buy now ↔ In the cart)
  document.querySelectorAll(".card__btn.load-more-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isDefault = btn.dataset.state === "default";
      btn.textContent = isDefault ? "In the cart" : "Buy now";
      btn.dataset.state = isDefault ? "in-cart" : "default";
    });
  });
}
