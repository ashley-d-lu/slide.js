"use strict";
const log = console.log;

class Slider {
    /* Helper functions */

    openOrClose = (event) => {
        log(event.target)
        if (this.elements.includes(event.target)) {
            if (this.isClosed) {
                this.openSet(event);
            } else {
                this.closeSet(event);
            }
        }
    }

    updateSelectedElement = (selectedElement, index) => {
        log('updated selected');

        if (!this.clickToOpen) {
            this.elements[this.selectedElementIndex].removeEventListener('mouseover', this.openSet);
            selectedElement.addEventListener('mouseover', this.openSet);
        }

        this.elements.splice(index, 1)[0];
        this.elements.splice(0, 0, selectedElement);
        this.updateZIndex();

        selectedElement.add
    }

    updateZIndex = () => {
        const length = this.elements.length;
        for (let i = 0; i < length; i++) {
            this.elements[i].style.zIndex = length - i;
        }
    }

    /* **************** */

    constructor(container) {
        this.container = container;
        this.width = container.getBoundingClientRect().width;
        this.height = container.getBoundingClientRect().height;
        this.elements = [...container.children];
        this.numElements = this.elements.length;
        this.isClosed = true;
        this.selectedElementIndex = 0;
        this.clickToOpen = false;
        this.animationSpeed = 350;

        log(this.container)
        log(this.elements);

        this.updateZIndex();

        for (let i = 0; i < this.elements.length; i++) {
            if (i !== this.selectedElementIndex) {
                this.elements[i].style.top = '0px'
                this.elements[i].style.left = '0px';
                this.elements[i].style.display = 'none';
            }
        }

        if (this.clickToOpen) {
            container.addEventListener('click', this.openOrClose);
        } else {
            this.elements[this.selectedElementIndex].addEventListener('mouseover', this.openSet);
            container.addEventListener('click', this.closeSet);
            container.addEventListener('mouseleave', this.closeSet);
        }

    }

    openSet = (event) => {
        if (this.isClosed && this.elements.includes(event.target)) {
            const top = this.height / this.numElements;
            const left = this.width / this.numElements;
            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].style.display = 'inline-block';
                $(`#${this.elements[i].id}`).animate({
                    top: `${top * i}px`,
                    left: `${left * i}px`,
                    opacity: '1'
                }, this.animationSpeed);
            }
            this.isClosed = false;
        }
    }

    closeSet = (event) => {
        if (!this.isClosed && (this.elements.includes(event.target) || !this.clickToOpen)) {

            if (event.type === 'click') {
                const index = this.elements.indexOf(event.target)
                this.updateSelectedElement(this.elements[index], index);
            }

            for (let i = 0; i < this.elements.length; i++) {
                if (i === this.selectedElementIndex) {
                    this.elements[i].style.display = 'inline-block';
                    $(`#${this.elements[i].id}`).animate({
                        top: `${0}px`,
                        left: `${0}px`,
                        opacity: '1'
                    }, this.animationSpeed);
                } else {
                    $(`#${this.elements[i].id}`).animate({
                        top: `${0}px`,
                        left: `${0}px`,
                        opacity: '0'
                    }, this.animationSpeed, () => {
                        this.elements[i].style.display = 'none';
                    });
                }
            }
            this.isClosed = true;
        }
    }
}
