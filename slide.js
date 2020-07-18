"use strict";
const log = console.log;

class Slider {
    /* Helper functions */

    handleOpenOrClose = (event) => {
        // log(event.target)
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
        if (this.selectedElementPosition === 'center') {
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

    constructor(container, direction, selectedElementPosition, clickToOpen, containerHeight, containerWidth, animationSpeed) {
        this.container = container;
        this.elements = [...container.children];
        this.numElements = this.elements.length;
        this.direction = direction;
        this.selectedElementPosition = selectedElementPosition;

        if (this.selectedElementPosition !== 'center') {
            this.selectedElementIndex = 0;
        } else { // center
            this.selectedElementIndex =  Math.floor(this.numElements / 2);
        }
        
        if (clickToOpen !== undefined) {
            this.clickToOpen = clickToOpen;
        } else {
            this.clickToOpen = true;
        }

        if (containerWidth) {
            this.containerWidth = containerWidth;   
            container.style.width = `${containerWidth}px`;       
        } else {
            this.containerWidth = container.getBoundingClientRect().width;
        }

        if (containerHeight) {
            this.containerHeight = containerHeight;
            container.style.height = `${containerHeight}px`;
        } else {
            this.containerHeight = container.getBoundingClientRect().height;
        }

        this.elementHeight = this.elements[0].getBoundingClientRect().height;
        this.elementWidth = this.elements[0].getBoundingClientRect().width;
        
        if (animationSpeed) {
            this.animationSpeed = animationSpeed;
        } else {
            this.animationSpeed = 350;
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
        log('open')
        let top = 0;
        let left = 0;
        if (this.direction === 'vertical') {
            top = (this.containerHeight - this.elementHeight) / (this.numElements - 1);
        } else if (this.direction === 'horizontal') {
            left = (this.containerWidth - this.elementWidth) / (this.numElements - 1);
        } else { // diagonal
            top = (this.containerHeight - this.elementHeight) / (this.numElements - 1);
            left = (this.containerWidth - this.elementWidth) / (this.numElements - 1);
        }
        // log(top, left);

        for (let i = 0; i < this.numElements; i++) {
            this.elements[i].style.display = 'inline-block';
            let t = top * i;
            let l = left * i;;
            if (this.selectedElementPosition.search('bottom') !== -1 || this.direction === 'diagonal-up') {
                t = top * (this.numElements - 1 - i);
            }
            if (this.selectedElementPosition.search('right') !== -1) {
                l = left * (this.numElements - 1 - i);
            }

            if (noAnimation) {
                this.elements[i].style.top = `${t}px`;
                this.elements[i].style.left = `${l}px`;
                this.elements[i].style.opacity = '1';
            } else {
                $(`#${this.elements[i].id}`).animate({
                    top: `${t}px`,
                    left: `${l}px`,
                    opacity: '1'
                }, this.animationSpeed);
            }
            
        } 

        this.isClosed = false;   
    }

    closeSet = (noAnimation) => {
        log('close')
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
        } else {
            if (this.selectedElementPosition.search('right') !== -1) {
                left = this.containerWidth - this.elementWidth
            }
            if (this.selectedElementPosition.search('bottom') !== -1) {
                top = this.containerHeight - this.elementHeight;
            }
        } 
        // log(top, left)

        for (let i = 0; i < this.numElements; i++) {
            this.elements[i].style.display = 'inline-block';
            if (noAnimation) {
                this.elements[i].style.top = `${top}px`;
                this.elements[i].style.left = `${left}px`;
                if (i === this.selectedElementIndex) {
                    this.elements[i].style.opacity = '1';
                } else {
                    this.elements[i].style.opacity = '0';
                }
            } else {
                if (i === this.selectedElementIndex) {
                    $(`#${this.elements[i].id}`).animate({
                        top: `${top}px`,
                        left: `${left}px`,
                        opacity: '1'
                    }, this.animationSpeed);
                } else {
                    $(`#${this.elements[i].id}`).animate({
                        top: `${top}px`,
                        left: `${left}px`,
                        opacity: '0'
                    }, this.animationSpeed, () => {
                        this.elements[i].style.display = 'none';
                    });
                }
            }
        }

        this.isClosed = true;
    }
}
