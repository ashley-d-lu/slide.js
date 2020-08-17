const slider = new Slider('#lightbox', {
    direction: 'horizontal',
    clickToOpen: true,
    keepOriginalOrder: true,
    lightbox: true,
    captions: [
        'Mountains, 2020',
        'Bridge, 2020',
        'Lake, 2020'
    ],
    onlyShowCaptionsOnHover: true
});
slider.openSetOnDOMContentLoaded();