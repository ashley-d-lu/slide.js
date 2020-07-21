"use strict";

const cards = document.querySelector('#card-container');
// // const slider = new VerticalSlider(cards, 'center', true, false, 350, false, true);
const slider = new HorizontalSlider(cards, 'center', false, false, 500, true, false);
// // const slider = new DiagonalSlider(cards, 20, 'top-left', true, false, 400, true, false);
// // const slider = new Slider(cards, 'vertical', 'top', true, false, 350, 70);
// // const slider = new Slider (cards, 'diagonal-up', 'center');
log(slider)
slider.openSetOnDOMContentLoaded();

const dropdown = document.querySelector('#dropdown-menu');
const dropdownSlider = new VerticalSlider(dropdown, 'top', true, true, undefined, true, true);
log(dropdownSlider)
dropdownSlider.openSetOnDOMContentLoaded();

const products = document.querySelector('#products');
const productsSlider = new HorizontalSlider(products, 'center', true, false, undefined, true, true);
productsSlider.openSetOnDOMContentLoaded();