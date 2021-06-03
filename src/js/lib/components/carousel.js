import $ from '../core';

$.prototype.carousel = function () {
  for (let i = 0; i < this.length; i++) {
    let width = +window.getComputedStyle(this[i].querySelector('.carousel-inner')).width.replace(/\D/gmi, '');
    const slides = this[i].querySelectorAll('.carousel-item');
    const slidesField = this[i].querySelector('.carousel-slides');
    const next = this[i].querySelector('[data-slide="next"]');
    const prev = this[i].querySelector('[data-slide="prev"]');
    const dots = this[i].querySelector('.carousel-indicators').children;

    // ЗАДАЕМ ДЛИНУ РОДИТЕЛЬСКОГО БЛОКА СЛАЙДЕРА
    slidesField.style.width = (100 * slides.length) + '%';

    // ЗАДАЕМ ШИРИНУ КАЖДОГО СЛАЙДА
    slides.forEach((item) => {
      item.style.width = `${width}px`;
    });

    let offset = 0;
    let slideIndex = 0;

    function dotsNav() {
      for (let j = 0; j < dots.length; j++) {
        dots[j].classList.remove('active');
      }

      dots[slideIndex].classList.add('active');
    }

    // СОБЫТИЯ НА НАЖАТИЯ КНОПОК В СЛАЙДЕРЕ
    $(next).click((e) => {
      e.preventDefault();

      if (offset == (width * (slides.length - 1))) {
        offset = 0;
      } else {
        offset += width;
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slides.length - 1) {
        slideIndex = 0;
      } else {
        slideIndex++;
      }

      dotsNav();
    });

    $(prev).click((e) => {
      e.preventDefault();

      if (offset == 0) {
        offset = (width * (slides.length - 1));
      } else {
        offset -= width;
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 0) {
        slideIndex = slides.length - 1;
      } else {
        slideIndex--;
      }

      dotsNav();
    });

    const sliderId = this[i].getAttribute('id');

    $(`#${sliderId} .carousel-indicators li`).click(e => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = +slideTo;
      offset = width * +slideTo;

      slidesField.style.transform = `translateX(-${offset}px)`;

      dotsNav();
    });
  }
};

$('.carousel').carousel();