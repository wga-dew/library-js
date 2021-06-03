import $ from '../core';

$.prototype.accordion = function (headActive = 'accordion-head--active', contentActive = 'accordion-content--active') {
  for (let i = 0; i < this.length; i++) {
    $(this[i]).click(() => {
      $(this[i]).toggleClass(headActive);
      $(this[i].nextElementSibling).toggleClass(contentActive);

      if (this[i].classList.contains(headActive)) {
        const elemInner = this[i].nextElementSibling.children[0];
        const padding = +window.getComputedStyle(elemInner).getPropertyValue("padding").replace(/px/gmi, '');

        this[i].nextElementSibling.style.maxHeight = `${this[i].nextElementSibling.scrollHeight + padding * 2}px`;
      } else {
        this[i].nextElementSibling.style.maxHeight = '0px';
      }
    });
  }
};

$('.accordion-head').accordion();