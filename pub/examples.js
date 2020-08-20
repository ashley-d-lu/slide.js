'use strict';

// Lightbox Example
const lightboxSlider = new Slider('#lightbox', {
    direction: 'horizontal',
    clickToOpen: true,
    keepOriginalOrder: true,
    lightbox: true,
    captions: [
        'Mountains, 2020',
        'Bridge, 2020',
        'Lake, 2020'
    ],
    captionPosition: 'right',
    onlyShowCaptionsOnHover: true,
    scaleFactor: 0.8
});
lightboxSlider.openSetOnDOMContentLoaded();


// Lightbox diagonal example
const lightboxDiagonalSlider = new Slider('#lightbox-diagonal', {
    direction: 'diagonal',
    clickToOpen: true,
    lightbox: true,
    captions: [
        'Mountains, 2020',
        'Bridge, 2020',
        'Lake, 2020'
    ],
    captionPosition: 'left',
    onlyShowCaptionsOnHover: true,
    scaleFactor: 0.5,
    degree: 25
});
lightboxDiagonalSlider.openSetOnDOMContentLoaded();


// Product display example
const productsSlider = new Slider('#products', {
    direction: 'horizontal',
    selectedElementPosition: 'left',
    keepOriginalOrder: true,
    captions: [
        'Green',
        "White",
        "Black",
        "Purple",
        "Yellow",
        "Red"
    ],
    hoverAnimation: true
});
productsSlider.openSetOnDOMContentLoaded();


// Dropdown menu example
const dropdownSlider = new Slider('#dropdown-menu', {
    direction: 'vertical',
    selectedElementPosition: 'top',
    keepOriginalOrder: true,
    clickToOpen: true
});
dropdownSlider.openSetOnDOMContentLoaded();


// const videoSlider = new Slider('#videos', {
//     direction: 'horizontal',
//     clickToOpen: true
// })