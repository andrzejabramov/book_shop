import { sliderData } from "../data/slider-data.js";

export function initSlider() {
  const container = document.getElementById("slider-container");
  if (!container || !sliderData.length) return;

  let activeIndex = 0;
  const intervalTime = 24 * 60 * 60 * 1000; // 24 часа

  // 1. Рендер слайдов из JSON
  container.innerHTML = sliderData
    .map(
      (slide, index) => `
    <div class="slide slide--${slide.id} ${index === 0 ? "active" : ""}" 
         data-slide="${slide.id}"
         style="--slide-scale: ${slide.scale}; --slide-bg: ${slide.background};">
      
      <div class="slide__bg">
        <img src="${slide.img}" alt="" class="slide__image" draggable="false">
      </div>
      
      <div class="slide__content">
        ${slide.blocks
          .map(
            (block) => `
          <span class="slide__text slide__text--${block.role}">${block.text}</span>
        `,
          )
          .join("")}
      </div>
    </div>
  `,
    )
    .join("");

  // 2. Создание пагинации ВНУТРИ .grid-separator
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
