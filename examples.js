"use strict";

const cards = document.querySelector('#card-container');
// const slider = new VerticalSlider(cards, 'center', true, false, 350, false, true);
const slider = new HorizontalSlider(cards, 'center', true, false, 500, true, false);
// const slider = new DiagonalSlider(cards, 20, 'top-left', true, false, 400, true, false);
// const slider = new Slider(cards, 'vertical', 'top', true, false, 350, 70);
// const slider = new Slider (cards, 'diagonal-up', 'center');
log(slider)
slider.openSetOnDOMContentLoaded();