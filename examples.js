"use strict";

const cards = document.querySelector('#card-container');
// const slider = new VerticalSlider(cards, 'top', true, false, 350);
// const slider = new HorizontalSlider(cards, 'top', false, false, 500, 500, 350);
const slider = new DiagonalSlider(cards, 20, 'top-right', true, false, 350);
// const slider = new Slider(cards, 'vertical', 'top', true, false, 350, 70);
// const slider = new Slider (cards, 'diagonal-up', 'center');
log(slider)
slider.openSetOnDOMContentLoaded();