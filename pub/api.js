"use strict";

const cardsHorizLeftSlider = new Slider('#cards-horiz-left', {
    direction: 'horizontal',
    selectedElementPosition: 'left'
});

const cardsHorizCenterSlider = new Slider('#cards-horiz-center', {
    direction: 'horizontal',
    selectedElementPosition: 'center'
});

const cardsHorizRightSlider = new Slider('#cards-horiz-right', {
    direction: 'horizontal',
    selectedElementPosition: 'right'
});

const cardsVerticalTopSlider = new Slider('#cards-vertical-top', {
    direction: 'vertical',
    selectedElementPosition: 'top'
});

const cardsVerticalCenterSlider = new Slider('#cards-vertical-center', {
    direction: 'vertical',
    selectedElementPosition: 'center'
});

const cardsVerticalBottomSlider = new Slider('#cards-vertical-bottom', {
    direction: 'vertical',
    selectedElementPosition: 'bottom'
});


const cardsDiagonal = document.querySelector('#cards-diagonal');
const cardsDiagonalClone = cardsDiagonal.cloneNode(true);
let cardsDiagonalSlider = new Slider('#cards-diagonal', {
    direction: 'diagonal',
    selectedElementPosition: 'top-left',
    degree: 45
});

document.querySelector('#topleft-btn').addEventListener('click', () => changeSelectedPos('top-left', undefined));
document.querySelector('#topright-btn').addEventListener('click', () => changeSelectedPos('top-right', undefined));
document.querySelector('#center-btn').addEventListener('click', () => changeSelectedPos('center', undefined));
document.querySelector('#bottomright-btn').addEventListener('click', () => changeSelectedPos('bottom-right', undefined));
document.querySelector('#bottomleft-btn').addEventListener('click', () => changeSelectedPos('bottom-left'));

document.querySelector('#degree-20-btn').addEventListener('click', () => changeSelectedPos(undefined, 20));
document.querySelector('#degree-45-btn').addEventListener('click', () => changeSelectedPos(undefined, 45));
document.querySelector('#degree-70-btn').addEventListener('click', () => changeSelectedPos(undefined, 70));

const changeSelectedPos = (position, degree) => {

    if (position === undefined) {
        position = cardsDiagonalSlider.selectedElementPosition;
    }

    if (degree === undefined) {
        degree = cardsDiagonalSlider.degree;
    }

    // Make a new slider with the new position
    const diagonalExample = document.querySelector('#diagonal-example');
    const flex = diagonalExample.children[diagonalExample.children.length - 1];
    flex.removeChild(document.querySelector('#cards-diagonal'));
    const cardsDiagonalClone2 = cardsDiagonalClone.cloneNode(true);
    flex.appendChild(cardsDiagonalClone2)
    cardsDiagonalSlider = new Slider('#cards-diagonal', {
        direction: 'diagonal',
        selectedElementPosition: position,
        degree: degree
    });

    if (position === 'center') {
        position = `'${position}',`.concat(' // default');;
    } else {
        position = `'${position}',`;
    }

    if (degree === 45) {
        degree = `${degree}`.concat(' // default')
    } else {
        degree = `${degree}`;
    }

    // Update code example
    document.querySelector('#diagonal-example-position-code').innerText =
    `            const slider = new Slider(containerSelector, {
                direction: 'diagonal',
                selectedElementPosition: ${position}
                degree: ${degree}
            });
    `;
}

const cardsDiagonalUpSlider = new Slider('#cards-diagonal-up', {
    direction: 'diagonal',
    selectedElementPosition: 'center',
    upOrDown: 'up'
});

const cardsDiagonalDownSlider = new Slider('#cards-diagonal-down', {
    direction: 'diagonal',
    selectedElementPosition: 'center',
    upOrDown: 'down'
});

const cardsclickToOpenFalseSlider = new Slider('#cards-clickToOpen-false', {
    direction: 'horizontal',
    clickToOpen: false
})

const cardsclickToOpenTrueSlider = new Slider('#cards-clickToOpen-true', {
    direction: 'horizontal',
    clickToOpen: true
})

const cardsKeepOriginalOrderFalseSlider = new Slider('#cards-keepOriginalOrder-false', {
    direction: 'horizontal',
    keepOriginalOrder: false
})

const cardsKeepOriginalOrderTrueSlider = new Slider('#cards-keepOriginalOrder-true', {
    direction: 'horizontal',
    keepOriginalOrder: true
})

const cardsAnimationSpeedSlider = new Slider('#cards-animationSpeed-600', {
    direction: 'horizontal',
    animationSpeed: 600
})

const cardsAnimationSpeed100Slider = new Slider('#cards-animationSpeed-100', {
    direction: 'horizontal',
    animationSpeed: 100
})

const cardsAnimationTrueTrueSlider = new Slider('#cards-animation-true-true', {
    direction: 'horizontal',
    showSlideAnimation: true,
    showFadeAnimation: true
})

const cardsAnimationTrueFalseSlider = new Slider('#cards-animation-true-false', {
    direction: 'horizontal',
    showSlideAnimation: true,
    showFadeAnimation: false
})

const cardsAnimationFalseTrueSlider = new Slider('#cards-animation-false-true', {
    direction: 'horizontal',
    showSlideAnimation: false,
    showFadeAnimation: true
})

const cardsAnimationFalseFalseSlider = new Slider('#cards-animation-false-false', {
    direction: 'horizontal',
    showSlideAnimation: false,
    showFadeAnimation: false
});

let count = 0;
const updateCounter = () => {
    count++;
    document.querySelector('#counter').innerText = `Counter: ${count}`;
}

const cardsOnSelElChangedSlider = new Slider('#cards-onElementSelected', {
    direction: 'horizontal',
    onElementSelected: updateCounter
});

const cardsOpenSlider = new Slider('#cards-open', {
    direction: 'horizontal'
});
cardsOpenSlider.openSetOnDOMContentLoaded();

const functionsSlider = new Slider('#cards-functions', {
    direction: 'horizontal',
    selectedElementPosition: 'center'
});

// document.querySelector('#selected-elem-className').innerText = '<div class="card red" id="card3" style="position: absolute; display: inline-block; top: 151px; left: 151px; opacity: 1; z-index: 3;"></div>'
document.querySelector('#selected-elem-className').innerText = 'Currently selected element: card red';

const openButton = document.querySelector('#open-btn');
openButton.addEventListener('click', functionsSlider.openSet);

const closeButton = document.querySelector('#close-btn');
closeButton.addEventListener('click', functionsSlider.closeSet);

const selElemTextBox = document.querySelector('#selected-elem-className')

functionsSlider.onElementSelected = () => {
    const selectedElement = functionsSlider.getSelectedElement();
    console.log(selectedElement);
    selElemTextBox.innerText = `Currently selected element: ${selectedElement.className}`;
}

// const displayStringVersionOfHTMLNode = (selectedElement) => {
//     selectedElement = selectedElement.cloneNode(true);
//     const tmp = document.createElement('div');
//     tmp.appendChild(selectedElement);
//     selElemTextBox.innerText = tmp.innerHTML;
// }


const dropdownSlider = new Slider('#dropdown-menu', {
    direction: 'vertical',
    selectedElementPosition: 'top',
    keepOriginalOrder: true,
    clickToOpen: true
});
dropdownSlider.openSetOnDOMContentLoaded();


const productsSlider = new Slider('#products', {
    direction: 'horizontal',
    selectedElementPosition: 'center',
    keepOriginalOrder: true
});
productsSlider.openSetOnDOMContentLoaded();

const hoverAnimationSlider = new Slider('#hoverAnimation', {
    direction: 'horizontal',
    clickToOpen: true,
    hoverAnimation: true
});
hoverAnimationSlider.openSetOnDOMContentLoaded();

const captionsSliders = new Slider('#captions', {
    direction: 'horizontal',
    captions: ['blue', 'yellow', 'red', 'green', 'orange']
});

const onlyShowCaptionsOnHoverSlider = new Slider('#onlyShowCaptionsOnHover', {
    direction: 'horizontal',
    captions: ['blue', 'yellow', 'red', 'green', 'orange'],
    onlyShowCaptionsOnHover: true
});

const scaleFactorSlider = new Slider('#scaleFactor', {
    direction: 'horizontal',
    scaleFactor: 0.5
});

const scaleFactor2Slider = new Slider('#scaleFactor2', {
    direction: 'horizontal',
    scaleFactor: 1.5
});

const lightboxExampleSlider = new Slider('#lightbox-example', {
    direction: 'horizontal',
    clickToOpen: true,
    lightbox: true
});
lightboxExampleSlider.openSetOnDOMContentLoaded();