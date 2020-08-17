const slider = new Slider('#lightbox', {
    direction: 'horizontal',
    clickToOpen: true,
    keepOriginalOrder: true,
    lightbox: true,
    captions: true
});
slider.openSetOnDOMContentLoaded();