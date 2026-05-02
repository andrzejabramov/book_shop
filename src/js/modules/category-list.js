// Ровно 16 категорий по ТЗ
const CATEGORIES = [
  { label: "Fiction" },
  { label: "Sci-Fi" },
  { label: "Fantasy" },
  { label: "Mystery" },
  { label: "Romance" },
  { label: "Thriller" },
  { label: "History" },
  { label: "Biography" },
  { label: "Self-Help" },
  { label: "Business" },
  { label: "Science" },
  { label: "Technology" },
  { label: "Art" },
  { label: "Philosophy" },
  { label: "Psychology" },
  { label: "Travel" },
];

export function renderCategoryList() {
  const list = document.querySelector(".category-panel__list");
  if (!list) return;

  list.innerHTML = CATEGORIES.map(
    (cat, i) => `
    <li class="category-panel__item ${i === 0 ? "active" : ""}">
      ${cat.label}
    </li>
  `,
  ).join("");

  // Простое переключение активного класса (логика фильтра — позже)
  list.addEventListener("click", (e) => {
    const item = e.target.closest(".category-panel__item");
    if (!item) return;

    list
      .querySelectorAll(".category-panel__item")
      .forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
  });
}
