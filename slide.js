"use strict";
const log = console.log;

class Slider {
    /* Helper functions */

    handleOpenOrClose = (event) => {
        if (this.elements.includes(event.target)) {
            if (this.isClosed) {
                this.handleOpenSet(event);
            } else {
                this.handleCloseSet(event);
            }
        }
    }

    updateSelectedElement = (selectedElement, index) => {
        if (!this.clickToOpen) {
            this.elements[this.selectedElementIndex].removeEventListener('mouseover', this.handleOpenSet);
            selectedElement.addEventListener('mouseover', this.handleOpenSet);
        }

        this.elements.splice(index, 1)[0];
        this.elements.splice(this.selectedElementIndex, 0, selectedElement);
        this.updateZIndex();
    }

    updateZIndex = () => {
        if (this.keepOriginalOrder) {
            for (let i = 0; i < this.numElements; i++) {
                this.originalElements[i].style.zIndex = this.numElements - i;
            }
        } else if (this.selectedElementPosition === 'center') {
            log('here')
            for (let i = 0; i < Math.floor(this.numElements / 2); i++) {
                this.elements[i].style.zIndex = i;
                this.elements[this.numElements - 1 - i].style.zIndex = i;
            }
            this.elements[this.selectedElementIndex].style.zIndex = Math.floor(this.numElements / 2) + 1;
        } else {
            for (let i = 0; i < this.numElements; i++) {
                this.elements[i].style.zIndex = this.numElements - i;
            }
        }
    }

    handleOpenSet = (event) => {
        if (this.isClosed && this.elements.includes(event.target)) {
            this.openSet();
        }
    }

    handleCloseSet = (event) => {
        if (!this.isClosed && (this.elements.includes(event.target) || !this.clickToOpen)) {

            if (event.type === 'click') {
                const index = this.elements.indexOf(event.target)
                this.updateSelectedElement(this.elements[index], index);
            }
            
            this.closeSet();
        }
    }

    /* **************** */

    constructor(
        container, 
        direction, 
        selectedElementPosition, 
        keepOriginalOrder, 
        clickToOpen,
        animationSpeed,
        showSlideAnimation,
        showFadeAnimation,
        degree
    ) {
        this.container = container;
        this.elements = [...container.children];
        this.originalElements = [...container.children];
        this.numElements = this.elements.length;
        this.direction = direction;
        this.selectedElementPosition = selectedElementPosition;

        if (this.selectedElementPosition !== 'center') {
            this.selectedElementIndex = 0;
        } else { // center
            this.selectedElementIndex =  Math.floor(this.numElements / 2);
        }

        if (keepOriginalOrder !== undefined) {
            this.keepOriginalOrder = keepOriginalOrder
        } else {
            this.keepOriginalOrder = false;
        }
        
        if (clickToOpen !== undefined) {
            this.clickToOpen = clickToOpen;
        } else {
            this.clickToOpen = true;
        }

        this.containerWidth = container.getBoundingClientRect().width
        this.containerHeight = container.getBoundingClientRect().height;

        this.elementHeight = this.elements[0].getBoundingClientRect().height;
        this.elementWidth = this.elements[0].getBoundingClientRect().width;

        if (animationSpeed !== undefined) {
            this.animationSpeed = animationSpeed;
        } else {
            this.animationSpeed = 375;
        } 

        if (showSlideAnimation !== undefined) {
            this.showSlideAnimation = showSlideAnimation
        } else {
            showSlideAnimation = true;
        }

        if (showFadeAnimation !== undefined) {
            this.showFadeAnimation = showFadeAnimation
        } else {
            showFadeAnimation = true;
        }

        if (degree !== undefined && degree >= 0 && degree <= 90) {
            this.degree = degree;
        } else {
            this.degree = 45;
        }

        this.isClosed = true;
        this.closeSetOnDOMContentLoaded();
        this.updateZIndex(); 

        if (this.clickToOpen) {
            container.addEventListener('click', this.handleOpenOrClose);
        } else {
            this.elements[this.selectedElementIndex].addEventListener('mouseover', this.handleOpenSet);
            container.addEventListener('click', this.handleCloseSet);
            container.addEventListener('mouseleave', this.handleCloseSet);
        }

    }

    openSetOnDOMContentLoaded = () => {
        this.openSet(true);
    }

    closeSetOnDOMContentLoaded = () => {
        this.closeSet(true);
    }

    openSet = (noAnimation) => {
        let top = 0;
        let left = 0;
        let t_shift = 0;
        let l_shift = 0;
        if (this.direction === 'vertical') {
            top = (this.containerHeight - this.elementHeight) / (this.numElements - 1);
        } else if (this.direction === 'horizontal') {
            left = (this.containerWidth - this.elementWidth) / (this.numElements - 1);
        } else { // diagonal  
            if (this.degree > 45) {
                top = (this.containerHeight - this.elementHeight) / (this.numElements - 1);
                left = top / Math.tan(this.degree * Math.PI / 180);
            } else {
                left = (this.containerWidth - this.elementWidth) / (this.numElements - 1);
                top = left * Math.tan(this.degree * Math.PI / 180);
            }
            if (this.selectedElementPosition === 'center') { 
                t_shift = (this.containerHeight - ((top * (this.numElements - 1)) + this.elementHeight)) / 2; 
                l_shift = (this.containerWidth - ((left * (this.numElements - 1)) + this.elementWidth)) / 2;    
            } else {
                if (this.selectedElementPosition.search('bottom') !== -1) {
                    t_shift = (this.containerHeight - ((top * (this.numElements - 1)) + this.elementHeight)); 
                } 
                if (this.selectedElementPosition.search('right') !== -1) {
                    l_shift = (this.containerWidth - ((left * (this.numElements - 1)) + this.elementWidth));   
                }
            }
        }

        let elements;
        if (this.keepOriginalOrder) {
            elements = this.originalElements;
        } else {
            elements = this.elements;
        }

        let animationSpeed;
        if (noAnimation || (!this.showSlideAnimation && !this.showFadeAnimation)) {
            animationSpeed = 0;
        } else {
            animationSpeed = this.animationSpeed;
        }

        for (let i = 0; i < this.numElements; i++) {
            let t = top * i;
            let l = left * i;;
            if (this.selectedElementPosition.search('bottom') !== -1 || this.direction === 'diagonal-up') {
                t = top * (this.numElements - 1 - i);
            }
            if (this.selectedElementPosition.search('right') !== -1) {
                l = left * (this.numElements - 1 - i);
            }
            if (this.direction.search('diagonal') !== -1 && this.degree > 45) {
                l = l + l_shift;
            } else if (this.direction.search('diagonal') !== -1 && this.degree <= 45) {
                t = t + t_shift;
            }

            elements[i].style.display = 'inline-block';

            // Show only slide animation, both, or none
            if (this.showSlideAnimation || noAnimation || (!this.showSlideAnimation && !this.showFadeAnimation)) { 

                const properties  = {
                    top: `${t}px`,
                    left: `${l}px`
                }
                if (this.showFadeAnimation) {
                    properties.opacity = '1'
                } else { // No fade
                    elements[i].style.opacity = '1';
                }
                $(`#${elements[i].id}`).animate(properties, animationSpeed);

            } else { // Show only fade animation

                $(`#${elements[i].id}`).animate({opacity: '0'}, animationSpeed, () => {
                    elements[i].style.top = `${t}px`;
                    elements[i].style.left = `${l}px`;
                    $(`#${elements[i].id}`).animate({opacity: '1'});
                });
                
            }
            
        } 

        this.isClosed = false;   
    }

    closeSet = (noAnimation) => {
        let top = 0;
        let left = 0;    
        if (this.selectedElementPosition === 'center') {
            if (this.direction === 'vertical') {
                top = (this.containerHeight / 2) - (this.elementHeight / 2);
            } else if (this.direction === 'horizontal') {
                left = (this.containerWidth / 2) - (this.elementWidth / 2);  
            } else { // diagonal
                top = (this.containerHeight / 2) - (this.elementHeight / 2);
                left = (this.containerWidth / 2) - (this.elementWidth / 2);  
            }
        } else { // not center
            if (this.selectedElementPosition.search('right') !== -1) {
                left = this.containerWidth - this.elementWidth
            }
            if (this.selectedElementPosition.search('bottom') !== -1) {
                top = this.containerHeight - this.elementHeight;
            }
        } 

        let animationSpeed;
        if (noAnimation || (!this.showSlideAnimation && !this.showFadeAnimation)) {
            animationSpeed = 0;
        } else {
            animationSpeed = this.animationSpeed;
        }

        for (let i = 0; i < this.numElements; i++) {
            this.elements[i].style.display = 'inline-block';

            // Show only slide animation, both, or none
            if (this.showSlideAnimation || noAnimation || (!this.showSlideAnimation && !this.showFadeAnimation)) { 

                const properties = {
                    top: `${top}px`,
                    left: `${left}px`
                }
                let prevZIndex = 0;
                if (this.showFadeAnimation) {
                    properties.opacity = (i === this.selectedElementIndex) ? '1' : '0';
                } else { // No fade
                    if (i === this.selectedElementIndex) {
                        // Temporarily bring the selected element to the front
                        prevZIndex =  this.elements[i].style.zIndex;
                        this.elements[i].style.zIndex = 2147483647; // update set z index
                    }
                }
                $(`#${this.elements[i].id}`).animate(properties, animationSpeed, () => {
                    if (i !== this.selectedElementIndex) {
                        this.elements[i].style.display = 'none';
                    } else { // i === this.selectedElementIndex
                        if (!this.showFadeAnimation) { // No fade
                            this.elements[i].style.zIndex = prevZIndex; // revert z index
                        }
                    } 
                });

            } else if (this.showFadeAnimation) { // Show only fade animation

                $(`#${this.elements[i].id}`).animate({opacity: '0'}, animationSpeed, () => {
                    if (i !== this.selectedElementIndex) {
                        this.elements[i].style.display = 'none';
                    } else {
                        this.elements[i].style.top = `${top}px`;
                        this.elements[i].style.left = `${left}px`;
                        $(`#${this.elements[i].id}`).animate({
                            opacity: '1'
                        }, {
                            duation: animationSpeed,
                            queue: false
                        });
                    }
                });                
                
            }
        }

        this.isClosed = true;
    }
}

class VerticalSlider extends Slider {
    constructor(
        container, 
        selectedElementPosition,
        keepOriginalOrder, 
        clickToOpen,
        animationSpeed,
        showSlideAnimation,
        showFadeAnimation
        ) {
        super(
            container, 
            'vertical', 
            selectedElementPosition, 
            keepOriginalOrder, 
            clickToOpen, 
            animationSpeed,
            showSlideAnimation,
            showFadeAnimation
        );
    }
}

class HorizontalSlider extends Slider {
    constructor(
        container, 
        selectedElementPosition,
        keepOriginalOrder, 
        clickToOpen, 
        animationSpeed,
        showSlideAnimation,
        showFadeAnimation
    ) {
        super(
            container, 
            'horizontal', 
            selectedElementPosition, 
            keepOriginalOrder, 
            clickToOpen, 
            animationSpeed,
            showSlideAnimation,
            showFadeAnimation
        );
    }
}

class DiagonalSlider extends Slider {
    constructor(
        container, 
        degree, 
        selectedElementPosition, 
        keepOriginalOrder, 
        clickToOpen, 
        animationSpeed, 
        showSlideAnimation,
        showFadeAnimation,
        upOrDown
    ) {
        let direction = 'diagonal';
        if (selectedElementPosition == 'center') {
            if (upOrDown !== undefined && (upOrDown === 'up' || upOrDown === 'down')) {
                direction = direction.concat('-');
                direction = direction.concat(upOrDown);
            }
        }
        super(
            container, 
            direction, 
            selectedElementPosition, 
            keepOriginalOrder, 
            clickToOpen,
            animationSpeed, 
            showSlideAnimation,
            showFadeAnimation,
            degree
        );
    }
}