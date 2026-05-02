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

let activeIndex = 0;

export function renderCategoryList() {
  const list = document.querySelector(".category-panel__list");
  if (!list) {
    console.warn("⚠️ .category-panel__list не найдена");
    return;
  }

  // 1. Рендерим ссылки внутри <li> для семантики
  list.innerHTML = CATEGORIES.map(
    (cat, i) => `
    <li>
      <a href="#" class="category-panel__item ${i === 0 ? "active" : ""}" data-index="${i}">
        ${cat.label}
      </a>
    </li>
  `,
  ).join("");

  // 2. Делегирование клика
  list.addEventListener("click", (e) => {
    const link = e.target.closest(".category-panel__item");
    if (!link) return;

    e.preventDefault(); // ✅ Блокируем переход по # и прыжок страницы

    const newIndex = parseInt(link.dataset.index, 10);
    if (newIndex === activeIndex) return; // Клик по уже активной

    // Переключаем UI
    list
      .querySelectorAll(".category-panel__item")
      .forEach((el) => el.classList.remove("active"));
    link.classList.add("active");
    activeIndex = newIndex;

    console.log(
      `✅ Категория: ${CATEGORIES[activeIndex].label} | slug: ${CATEGORIES[activeIndex].slug}`,
    );

    // 📢 Оповещаем систему (нужно для Этапа 3)
    window.dispatchEvent(
      new CustomEvent("categoryChange", {
        detail: { index: activeIndex, slug: CATEGORIES[activeIndex].slug },
      }),
    );
  });
}

export function getActiveCategory() {
  return {
    index: activeIndex,
    slug: CATEGORIES[activeIndex].slug,
    label: CATEGORIES[activeIndex].label,
  };
}
