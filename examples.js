"use strict";

const cardsHorizLeft = document.querySelector('#cards-horiz-left');
const cardsHorizLeftSlider = new Slider(cardsHorizLeft, {
    direction: 'horizontal',
    selectedElementPosition: 'left'
});

const cardsHorizCenter = document.querySelector('#cards-horiz-center');
const cardsHorizCenterSlider = new Slider(cardsHorizCenter, {
    direction: 'horizontal',
    selectedElementPosition: 'center'
});

const cardsHorizRight = document.querySelector('#cards-horiz-right');
const cardsHorizRightSlider = new Slider(cardsHorizRight, {
    direction: 'horizontal',
    selectedElementPosition: 'right'
});

const cardsVerticalTop = document.querySelector('#cards-vertical-top');
const cardsVerticalTopSlider = new Slider(cardsVerticalTop, {
    direction: 'vertical',
    selectedElementPosition: 'top'
});

const cardsVerticalCenter = document.querySelector('#cards-vertical-center');
const cardsVerticalCenterSlider = new Slider(cardsVerticalCenter, {
    direction: 'vertical',
    selectedElementPosition: 'center'
});

const cardsVerticalBottom = document.querySelector('#cards-vertical-bottom');
const cardsVerticalBottomSlider = new Slider(cardsVerticalBottom, {
    direction: 'vertical',
    selectedElementPosition: 'bottom'
});


const cardsDiagonal = document.querySelector('#cards-diagonal');
const cardsDiagonalClone = cardsDiagonal.cloneNode(true);
let cardsDiagonalSlider = new Slider(cardsDiagonal, {
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
    document.querySelector('#diagonal-example').removeChild(document.querySelector('#cards-diagonal'));
    const cardsDiagonalClone2 = cardsDiagonalClone.cloneNode(true);
    document.querySelector('#diagonal-example').appendChild(cardsDiagonalClone2)
    cardsDiagonalSlider = new Slider(cardsDiagonalClone2, {
        direction: 'diagonal',
        selectedElementPosition: position,
        degree: degree
    });

    // Update code example
    document.querySelector('#diagonal-example-position-code').innerText =
        `            const slider = new Slider(container, {
                direction: 'diagonal',
                selectedElementPosition: '${position}',
                degree: ${degree}
            });
    `;
}

const cardsDiagonalUp = document.querySelector('#cards-diagonal-up');
const cardsDiagonalUpSlider = new Slider(cardsDiagonalUp, {
    direction: 'diagonal',
    selectedElementPosition: 'center',
    upOrDown: 'up'
});

const cardsDiagonalDown = document.querySelector('#cards-diagonal-down');
const cardsDiagonalDownSlider = new Slider(cardsDiagonalDown, {
    direction: 'diagonal',
    selectedElementPosition: 'center',
    upOrDown: 'down'
});

const cardsclickToOpenFalse = document.querySelector('#cards-clickToOpen-false');
const cardsclickToOpenFalseSlider = new Slider(cardsclickToOpenFalse, {
    direction: 'horizontal',
    clickToOpen: false
})

const cardsclickToOpenTrue = document.querySelector('#cards-clickToOpen-true');
const cardsclickToOpenTrueSlider = new Slider(cardsclickToOpenTrue, {
    direction: 'horizontal',
    clickToOpen: true
})

const cardsKeepOriginalOrderFalse = document.querySelector('#cards-keepOriginalOrder-false');
const cardsKeepOriginalOrderFalseSlider = new Slider(cardsKeepOriginalOrderFalse, {
    direction: 'horizontal',
    keepOriginalOrder: false
})

const cardsKeepOriginalOrderTrue = document.querySelector('#cards-keepOriginalOrder-true');
const cardsKeepOriginalOrderTrueSlider = new Slider(cardsKeepOriginalOrderTrue, {
    direction: 'horizontal',
    keepOriginalOrder: true
})

const cardsAnimationSpeed = document.querySelector('#cards-animationSpeed-600')
const cardsAnimationSpeedSlider = new Slider(cardsAnimationSpeed, {
    direction: 'horizontal',
    animationSpeed: 600
})

const cardsAnimationSpeed100 = document.querySelector('#cards-animationSpeed-100')
const cardsAnimationSpeed100Slider = new Slider(cardsAnimationSpeed100, {
    direction: 'horizontal',
    animationSpeed: 100
})

const cardsAnimationTrueTrue = document.querySelector('#cards-animation-true-true')
const cardsAnimationTrueTrueSlider = new Slider(cardsAnimationTrueTrue, {
    direction: 'horizontal',
    showSlideAnimation: true,
    showFadeAnimation: true
})

const cardsAnimationTrueFalse = document.querySelector('#cards-animation-true-false')
const cardsAnimationTrueFalseSlider = new Slider(cardsAnimationTrueFalse, {
    direction: 'horizontal',
    showSlideAnimation: true,
    showFadeAnimation: false
})

const cardsAnimationFalseTrue = document.querySelector('#cards-animation-false-true')
const cardsAnimationFalseTrueSlider = new Slider(cardsAnimationFalseTrue, {
    direction: 'horizontal',
    showSlideAnimation: false,
    showFadeAnimation: true
})

const cardsAnimationFalseFalse = document.querySelector('#cards-animation-false-false');
const cardsAnimationFalseFalseSlider = new Slider(cardsAnimationFalseFalse, {
    direction: 'horizontal',
    showSlideAnimation: false,
    showFadeAnimation: false
});

let count = 0;
const updateCounter = () => {
    count++;
    document.querySelector('#counter').innerText = `Counter: ${count}`;
}

const cardsOnSelElChanged = document.querySelector('#cards-onSelectedElementChanged');
const cardsOnSelElChangedSlider = new Slider(cardsOnSelElChanged, {
    direction: 'horizontal',
    onSelectedElementChanged: updateCounter
});

const cardsOpen = document.querySelector('#cards-open');
const cardsOpenSlider = new Slider(cardsOpen, {
    direction: 'horizontal'
});
cardsOpenSlider.openSetOnDOMContentLoaded();

const cardsFunctions = document.querySelector('#cards-functions');
const slider = new Slider(cardsFunctions, {
    direction: 'horizontal',
    selectedElementPosition: 'center'
});

// document.querySelector('#selected-elem-className').innerText = '<div class="card red" id="card3" style="position: absolute; display: inline-block; top: 151px; left: 151px; opacity: 1; z-index: 3;"></div>'
document.querySelector('#selected-elem-className').innerText = 'Currently selected element: card red';

const openButton = document.querySelector('#open-btn');
openButton.addEventListener('click', slider.openSet);

const closeButton = document.querySelector('#close-btn');
closeButton.addEventListener('click', slider.closeSet);

const selElemTextBox = document.querySelector('#selected-elem-className')

slider.onSelectedElementChanged = () => {
    const selectedElement = slider.getSelectedElement();
    console.log(selectedElement);
    selElemTextBox.innerText = `Currently selected element: ${selectedElement.className}`;
}

const displayStringVersionOfHTMLNode = (selectedElement) => {
    selectedElement = selectedElement.cloneNode(true);
    const tmp = document.createElement('div');
    tmp.appendChild(selectedElement);
    selElemTextBox.innerText = tmp.innerHTML;
}


const dropdown = document.querySelector('#dropdown-menu');
const dropdownSlider = new Slider(dropdown, {
    direction: 'vertical',
    selectedElementPosition: 'top',
    keepOriginalOrder: true,
    clickToOpen: true
});
// log(dropdownSlider)
dropdownSlider.openSetOnDOMContentLoaded();


const products = document.querySelector('#products');
const productsSlider = new Slider(products, {
    direction: 'horizontal',
    selectedElementPosition: 'center',
    keepOriginalOrder: true
});
productsSlider.openSetOnDOMContentLoaded();