"use strict";

const cards = document.querySelector('.container');
const slider = new Slider(cards, 'diagonal', 'bottom-right', false, 500, 500, 350, 70);
// const slider = new Slider (cards, 'diagonal-up', 'center');
log(slider)
// slider.openSetOnDOMContentLoaded();