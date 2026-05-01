import { sliderData } from "../data/slider-data.js";

export function initSlider() {
  const container = document.getElementById("slider-container");
  if (!container || !sliderData.length) return;

  let activeIndex = 0;
  const intervalTime = 24 * 60 * 60 * 1000; // 24 часа

  // Вспомогательная функция: генерация inline-стилей для картинки
  function getImageStyle(slide) {
    // Слайд 0 управляется полностью через CSS (объект-позиция, contain и т.д.)
    if (slide.id === 0) return "";

    // Для слайдов 1+ используем инлайн-стили для гарантированного применения
    const scale = slide.scale !== undefined ? slide.scale : 1;
    const posY = slide.posY !== undefined ? slide.posY : "center";

    return `object-fit: cover; object-position: center ${posY}; transform: scale(${scale}); transform-origin: center center;`;
  }

  // 1. Рендер слайдов из JSON
  container.innerHTML = sliderData
    .map((slide, index) => {
      // Генерация текстовых блоков
      const blocksHTML = slide.blocks
        .map((block) => {
          const classes = ["slide__text", `slide__text--${block.style}`];
          if (block.variant)
            classes.push(`slide__text--${block.style}--${block.variant}`);
          if (block.transform) classes.push(`slide__text--${block.transform}`);
          if (block.pos.width !== "hug") classes.push("slide__text--fixed");

          const widthVal =
            block.pos.width === "hug" ? "max-content" : block.pos.width;
          const shadowStyle = block.shadow
            ? `text-shadow: ${block.shadow.x}px ${block.shadow.y}px 0 ${block.shadow.color};`
            : "";

          return `<span class="${classes.join(" ")}" 
                    style="width: ${widthVal}; margin: ${block.pos.margin}; ${shadowStyle}">
                ${block.text}
              </span>`;
        })
        .join("");

      // Генерация самого слайда
      return `
      <div class="slide slide--${slide.id} ${index === 0 ? "active" : ""}" 
           data-slide="${slide.id}"
           style="--slide-bg: ${slide.background};">
        <div class="slide__bg">
          <img src="${slide.img}" alt="" class="slide__image" draggable="false" 
               style="${getImageStyle(slide)}">
        </div>
        <div class="slide__content">${blocksHTML}</div>
      </div>`;
    })
    .join("");

  // 2. Создание пагинации (точки) ВНУТРИ .grid-separator
  const separator = document.querySelector(".grid-separator");
  if (separator) {
    separator.innerHTML = sliderData
      .map(
        (_, i) =>
          `<button class="grid-separator__dot ${i === 0 ? "active" : ""}" 
                   data-index="${i}" 
                   aria-label="Slide ${i + 1}"></button>`,
      )
      .join("");
  }

  // 3. Логика переключения слайда
  function goToSlide(index) {
    const slides = container.querySelectorAll(".slide");
    const dots = separator?.querySelectorAll(".grid-separator__dot");
    if (!slides.length || !dots) return;

    slides[activeIndex].classList.remove("active");
    dots[activeIndex].classList.remove("active");

    activeIndex = index;

    slides[activeIndex].classList.add("active");
    dots[activeIndex].classList.add("active");
  }

  // 4. Ручное переключение по точкам
  separator?.addEventListener("click", (e) => {
    if (e.target.classList.contains("grid-separator__dot")) {
      const index = parseInt(e.target.dataset.index);
      goToSlide(index);

      // Сбрасываем таймер, чтобы слайд не переключился сразу после клика
      clearInterval(autoSlide);
      autoSlide = setInterval(() => {
        goToSlide((activeIndex + 1) % sliderData.length);
      }, intervalTime);
    }
  });

  // 5. Автопереключение (раз в 24 часа)
  let autoSlide = setInterval(() => {
    goToSlide((activeIndex + 1) % sliderData.length);
  }, intervalTime);
}
