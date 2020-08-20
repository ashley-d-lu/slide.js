"use strict";

class Slider {
    constructor(containerSelector, properties) {
        // Customizable properties
        const {
            direction, // the only required property
            selectedElementPosition,
            clickToOpen,
            keepOriginalOrder,
            animationSpeed,
            showSlideAnimation,
            showFadeAnimation,
            degree,
            upOrDown,
            onElementSelected,
            lightbox,
            captions,
            captionPosition,
            onlyShowCaptionsOnHover,
            hoverAnimation,
            scaleFactor
        } = properties;

        this.containerSelector = containerSelector;

        this.container = document.querySelector(containerSelector)
        this.container.style.position = 'relative';

        this.elements = [...this.container.children];
        this.elements.forEach(element => element.style.position = 'absolute');

        this.numElements = this.elements.length;

        this.direction = direction;

        if (selectedElementPosition !== undefined) {
            this.selectedElementPosition = selectedElementPosition;
        } else {
            this.selectedElementPosition = 'center';
        }

        if (this.selectedElementPosition !== 'center') {
            this.selectedElementIndex = 0;
        } else { // center
            this.selectedElementIndex = Math.floor(this.numElements / 2);
        }

        if (this.direction === 'diagonal' && upOrDown !== undefined) {
            if (this.selectedElementPosition == 'center') {
                if (upOrDown !== undefined && (upOrDown === 'up' || upOrDown === 'down')) {
                    this.direction = this.direction.concat('-');
                    this.direction = this.direction.concat(upOrDown);
                }
            }
        }

        if (keepOriginalOrder !== undefined) {
            this.keepOriginalOrder = keepOriginalOrder
        } else {
            this.keepOriginalOrder = false;
        }

        if (clickToOpen !== undefined) {
            this.clickToOpen = clickToOpen;
        } else {
            this.clickToOpen = false;
        }

        this.containerWidth = this.container.getBoundingClientRect().width
        this.containerHeight = this.container.getBoundingClientRect().height;

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
            this.showSlideAnimation = true;
        }

        if (showFadeAnimation !== undefined) {
            this.showFadeAnimation = showFadeAnimation
        } else {
            this.showFadeAnimation = true;
        }

        if (degree !== undefined && degree >= 0 && degree <= 90) {
            this.degree = degree;
        } else {
            this.degree = 45;
        }

        if (lightbox !== undefined) {
            this.lightbox = lightbox;
        } else {
            this.lightbox = false;
        }

        if (lightbox) {
            
            // Add expand/close icon button to all elements in this.elements
            for (let i = 0; i < this.numElements; i++) {

                // Hover area
                const hoverArea = document.createElement('div');
                hoverArea.style.position = 'absolute';
                hoverArea.style.top = '0px';
                hoverArea.style.right = '0px';
                hoverArea.style.height = '50px';
                hoverArea.style.width = '50px';
                hoverArea.style.padding = '7%';

                // Create containing div for the 'expand' and 'close' icon
                const div = document.createElement('div');
                div.style.position = 'absolute';
                div.style.top = '0px';
                div.style.right = '0px';
                div.style.margin = '10%';
                div.style.padding = '5%';
                div.style.height = '20px';
                div.style.width = '20px';
                div.style.borderRadius = '10%'
                div.style.backgroundColor = 'rgb(255, 255, 255, 0)';

                // Create icon img
                const icon = document.createElement('img');
                icon.src = './lightboxIcons/unfold_more-24px.svg';
                icon.style.transform = 'rotate(45deg)';
                icon.style.opacity = 0;
                icon.style.height = 'inherit';
                icon.style.width = 'inherit'

                div.appendChild(icon);
                hoverArea.appendChild(div);

                // Only show expand/close icon when hovering over the hoverArea
                hoverArea.addEventListener('mouseover', () => {
                    div.style.backgroundColor = 'rgb(255, 255, 255, 0.5)';
                    div.children[0].style.opacity = 0.8;
                })
                hoverArea.addEventListener('mouseleave', () => {
                    div.style.backgroundColor = 'rgb(255, 255, 255, 0)';
                    div.children[0].style.opacity = 0;
                })

                div.style.transitionDuration = '400ms';
                icon.style.transitionDuration = '400ms';

                // Enter full screen when the icon's containing div is clicked
                div.addEventListener('click', this.enterFullScreen);

                // Add to element
                this.elements[i].appendChild(hoverArea);
            }

            // Create modal element
            this.modal = document.createElement('div');
            this.modal.style.display = 'none';
            this.modal.style.position = 'fixed';
            this.modal.style.top = '0px';
            this.modal.style.left = '0px'
            this.modal.style.height = '100%';
            this.modal.style.width = '100%';
            this.modal.style.backgroundColor = 'rgb(0, 0, 0, 0)';
            this.modal.style.zIndex = this.numElements + 1;
            this.container.appendChild(this.modal);
        }

        this.inFullscreenMode = false;

        if (captions !== undefined) {
            this.captions = captions;
            this.hasCaptions = true;
        } else {
            this.captions = [];
            this.hasCaptions = false;
        }

        if (captionPosition !== undefined) {
            this.captionPosition = captionPosition;
        } else {
            this.captionPosition = 'center';
        }

        if (onlyShowCaptionsOnHover !== undefined) {
            this.onlyShowCaptionsOnHover = onlyShowCaptionsOnHover;
        } else {
            this.onlyShowCaptionsOnHover = false;
        }

        // Add captions
        if (this.hasCaptions) {
            for (let i = 0; i < this.elements.length; i++) {
                if (this.captions.length >= i) {
                    const caption = document.createElement('div');
                    caption.style.position = 'absolute';
                    caption.style.top = `100%`;
                    
                    if (this.captionPosition === 'center') {
                        caption.style.left = '50%';
                        caption.style.right - '50%';
                        caption.style.transform = 'translateX(-50%)';
                    } else if (this.captionPosition === 'right') {
                        caption.style.right = '1%';
                    } else {
                        caption.style.left = '1%';
                    }
                    
                    caption.innerText = this.captions[i];
                    caption.style.fontWeight = '500';
                    caption.style.fontSize = '14px';
                    caption.style.transitionDuration = '400ms';
    
                    this.elements[i].appendChild(caption);
    
                    if (this.onlyShowCaptionsOnHover) {
                        caption.style.opacity = '0';
    
                        // Only show caption when hovering over element
                        this.elements[i].addEventListener('mouseleave', () => {
                            caption.style.opacity = '0';
                        });
                        this.elements[i].addEventListener('mouseover', () => {
                            caption.style.opacity = '1';
                        });
                    }
                }
            }
        }
        
        if (hoverAnimation !== undefined) {
            this.hoverAnimation = hoverAnimation;
        } else {
            this.hoverAnimation = false;
        }

        if (this.hoverAnimation) { 
            this.updatePrevOffsetTop();
        }
        
        // Add hover animations
        if (this.hoverAnimation) {
            this.elements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    if (!this.inFullscreenMode && !this.isClosed) {
                        $(`#${element.id}`).animate({
                            top: `${element.offsetTop - (0.075 * this.elementHeight)}px`
                        }, 200);
                    }
                });
                element.addEventListener('mouseleave', () => {
                    if (!this.inFullscreenMode && !this.isClosed) {
                        $(`#${element.id}`).animate({
                            top: `${element.prevOffsetTop}px`
                        }, 200);
                    }
                });
            });
        }

        if (scaleFactor !== undefined) {
            this.scaleFactor = scaleFactor;
            this.elements.forEach(element => {
                element.style.transitionDuration = `${this.animationSpeed}ms`;
            })
        }

        if (onElementSelected !== undefined) {
            this.onElementSelected = onElementSelected;
        } else {
            this.onElementSelected = () => {};
        }

        this.originalElements = [...this.elements];

        this.isClosed = true;
        this.closeSetOnDOMContentLoaded();
        this.updateZIndex();

        // Add event listeners to open/close the set set on click/hover
        this.addEventListeners();
        
    }

    /* ----------------------- Helper/Private functions ----------------------- */

    addEventListeners = () => {
        if (this.clickToOpen) {
            this.container.addEventListener('click', this.handleOpenOrClose);
        } else {
            this.elements[this.selectedElementIndex].addEventListener('mouseover', this.handleOpenSet);
            this.container.addEventListener('click', this.handleCloseSet);
            this.container.addEventListener('mouseleave', this.handleCloseSet);
        }
    }

    removeEventListeners = () => {
        if (this.clickToOpen) {
            this.container.removeEventListener('click', this.handleOpenOrClose);
        } else {
            this.elements[this.selectedElementIndex].removeEventListener('mouseover', this.handleOpenSet);
            this.container.removeEventListener('click', this.handleCloseSet);
            this.container.removeEventListener('mouseleave', this.handleCloseSet);
        }
    }

    handleOpenOrClose = (event) => {
        if (this.isClosed) {
            this.handleOpenSet(event);
        } else {
            this.handleCloseSet(event);
        }
    }

    afterCloseForHover = () => {
        this.elements[this.selectedElementIndex].removeEventListener('mouseleave', this.afterCloseForHover);
        this.elements[this.selectedElementIndex].addEventListener('mouseover', this.handleOpenSet); 
        this.container.addEventListener('mouseleave', this.handleCloseSet);
    }

    updateSelectedElement = (selectedElement, index) => {
        if (!this.clickToOpen) {
            this.elements[this.selectedElementIndex].removeEventListener('mouseover', this.handleOpenSet);
            if (index === this.selectedElementIndex) {
                this.indexDidNotChange = true;
                this.container.removeEventListener('mouseleave', this.handleCloseSet);
            } else {
                selectedElement.addEventListener('mouseover', this.handleOpenSet);
            }
           
        }

        this.elements.splice(index, 1)[0];
        this.elements.splice(this.selectedElementIndex, 0, selectedElement);
        this.updateZIndex();
        this.onElementSelected();
    }

    updateZIndex = () => {
        if (this.keepOriginalOrder) {
            for (let i = 0; i < this.numElements; i++) {
                this.originalElements[i].style.zIndex = this.numElements - i;
            }
        } else if (this.selectedElementPosition === 'center') {
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

    updatePrevOffsetTop = () => {
        this.elements.forEach(element => {
            element.prevOffsetTop = element.offsetTop;
        });
    }

    handleOpenSet = (event) => {
        let target = event.target;
        // if (event.type === 'click') {
            while (target.parentNode !== this.container && target !== this.container) {
                target = target.parentNode;
            }
        // }

        if (this.isClosed && this.elements.includes(target)) {
            this.openSet();
        }
    }

    handleCloseSet = (event) => {
        let target = event.target;
        if (event.type === 'click') {
            while (target.parentNode !== this.container && target !== this.container) {
                target = target.parentNode;
            }
        }

        if (!this.isClosed && (this.elements.includes(target) || !this.clickToOpen)) {

            if (event.type === 'click' && this.elements.includes(target)) {
                const index = this.elements.indexOf(target)
                this.updateSelectedElement(this.elements[index], index);
            }

            this.closeSet();
        }
    }

    enterFullScreen = (event) => {
        // Prevent other event handlers from being triggered
        event.stopPropagation();

        this.inFullscreenMode = true;

        // Remove original event listeners
        this.removeEventListeners();

        // Get icon's div and image
        let img;
        let div;
        if (event.target.tagName === 'IMG') {
            img = event.target;
            div = event.target.parentNode;
        } else {
            div = event.target;
            img = event.target.children[0];
        }

        // Change icon's image
        img.src = './lightboxIcons/unfold_less-24px.svg';

        // Change icon's event listener
        div.removeEventListener('click', this.enterFullScreen);
        div.addEventListener('click', this.exitFullScreen);

        // Get element we're expanding to full screen
        const element = div.parentNode.parentNode;

        // Record the element's previous top and left values to easily reverting the  
        // top and left positions when exiting fullscreen
        this.prevTop = element.style.top;
        this.prevLeft = element.style.left;

        // Change position to fixed so it's position is relative to the browser
        // instead of this.container
        element.style.position = 'fixed';

        // Set transition speed
        element.style.transitionDuration = '400ms';

        // Update zindex and record previous z index to easily revert when exiting fullscreen
        this.prevZIndex = element.style.zIndex;
        element.style.zIndex = 2147483647;

        // Center the element
        element.style.top = '50%';
        element.style.left = '50%';
        if (!this.hasCaptions) {
            element.style.transform = 'translate(-50%, -50%)';
            element.style.webkitTransform = 'translate(-50%, -50%)';
        } else {
            element.style.transform = 'translate(-50%, -52%)';
            element.style.webkitTransform = 'translate(-50%, -52%)';
        }

        let newHeight;
        let newWidth;

        // Calculate the new height and width
        if (this.elementHeight === this.elementWidth) {
            newHeight = '85vh';
            newWidth = '85vh';
        } else if (this.elementHeight > this.elementWidth) {
            const widthOverHeight = this.elementWidth / this.elementHeight;
            newHeight = '60vh';
            newWidth = `calc(60vh * ${widthOverHeight})`;
        } else {
            const heightOverWidth = this.elementHeight / this.elementWidth;
            newHeight = `calc(60vw * ${heightOverWidth})`;
            newWidth = '60vw';
        }

        // Set new height and width
        element.style.height = newHeight;
        element.style.width = newWidth;

        // If there is a caption ...
        if (this.hasCaptions) {
            const caption = element.children[element.children.length - 1];
            // Change color of caption to white
            caption.style.color = 'white';
            caption.style.fontWeight = '400';
            caption.style.fontSize = '16px';
        }

        // Open modal
        this.modal.style.display = 'block';
        this.modal.style.backgroundColor = 'rgb(0, 0, 0, 0.9)';

    }

    exitFullScreen = (event) => {
        // Prevent other event handlers from being triggered
        event.stopPropagation();

        // Get icon's div and image
        let img;
        let div;
        if (event.target.tagName === 'IMG') {
            img = event.target;
            div = event.target.parentNode;
        } else {
            div = event.target;
            img = event.target.children[0];
        }

        // Change icon's image
        img.src = './lightboxIcons/unfold_more-24px.svg';

        // Change icon's event listener
        div.removeEventListener('click', this.exitFullScreen);
        div.addEventListener('click', this.enterFullScreen);

        // Get element that is exiting fullscreen
        const element = div.parentNode.parentNode;

        // Get rid of centering properties
        element.style.transform = 'none';
        element.style.webkitTransform = 'none';

        // Reset position to 'absolute'
        element.style.position = 'absolute';

        // Reset the height, width, top, and left properties
        element.style.height = `${this.elementHeight}px`;
        element.style.width = `${this.elementWidth}px`;
        element.style.top = this.hoverAnimation ? element.prevOffsetTop : this.prevTop;
        element.style.left = this.prevLeft;

        // Revert z index
        element.style.zIndex = this.prevZIndex;

        // Get rid of transition property after the element exits fullscreen
        setTimeout(() => {
            element.style.transitionDuration = '0ms';

            // and reset transition property and scale (if needed) 
            if (this.scaleFactor !== undefined && !this.isClosed) {
                element.style.transform = `scale(${this.scaleFactor})`;
                element.style.transitionDuration = `${this.animationSpeed}ms`;
            }
        }, 201);

        // If there is a caption ...
        if (this.hasCaptions) {
            const caption = element.children[element.children.length - 1];
            // Change color of caption to black
            caption.style.color = 'black';
            caption.style.fontWeight = '500';
            caption.style.fontSize = '14px';
        }

        // Close modal
        this.modal.style.backgroundColor = 'rgb(0, 0, 0, 0)';
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, 400);
        
        // Re-add original event listeners
        this.addEventListeners();

        setTimeout(() => {
            this.inFullscreenMode = false;
        }, 401);
    }

    /* ----------------- End Helper/Private functions ----------------- */


    /* ---------------------- API Functions -------------------------- */

    openSetOnDOMContentLoaded = () => {
        this.openSet(undefined, true);
    }

    closeSetOnDOMContentLoaded = () => {
        this.closeSet(undefined, true);
    }

    openSet = (event, noAnimation) => {

        // Hide expand icons if the set opens on hover
        // if (this.lightbox && !this.clickToOpen) {
        //     this.elements.forEach(element => {
        //         const iconDiv = element.children[element.children.length - 1];
        //         iconDiv.style.display = 'none';
        //     })
        // }

        // Calculate <top> and <left> units used to calculate the top and left positions
        // of the ith element in the loop
        let top = 0;
        let left = 0;
        let t_shift = 0;
        let l_shift = 0;
        if (this.direction === 'vertical') {
            top = (this.containerHeight - this.elementHeight) / (this.numElements - 1);
        } else if (this.direction === 'horizontal') {
            left = (this.containerWidth - this.elementWidth) / (this.numElements - 1);
        } else { // diagonal  

            // If direction === 'diagonal', use trig to calculate <top> and <left>
            if (this.degree > 45) {
                top = (this.containerHeight - this.elementHeight) / (this.numElements - 1);
                left = top / Math.tan(this.degree * Math.PI / 180);
            } else {
                left = (this.containerWidth - this.elementWidth) / (this.numElements - 1);
                top = left * Math.tan(this.degree * Math.PI / 180);
            }

            // Calculate top and left shifts to be applied to all elements based on the selectedElementPosition
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

            // Calculate the top and left position of the ith element based on <i>,
            // <top>, <left>, <t_shift>, and <l_shift>
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

                const properties = {
                    top: `${t}px`,
                    left: `${l}px`
                }
                if (this.showFadeAnimation) {
                    properties.opacity = '1'
                } else { // No fade
                    elements[i].style.opacity = '1';
                }
                $(`#${elements[i].id}`).animate(properties, animationSpeed, () => {
                    if (this.hoverAnimation) { 
                        this.updatePrevOffsetTop();
                    }
                });

            } else { // Show only fade animation

                $(`#${elements[i].id}`).animate({
                    opacity: '0'
                }, animationSpeed, () => {
                    elements[i].style.top = `${t}px`;
                    elements[i].style.left = `${l}px`;
                    $(`#${elements[i].id}`).animate({
                        opacity: '1'
                    }, () => {
                        if (this.hoverAnimation) { 
                            this.updatePrevOffsetTop();
                        }
                    });
                });

            }

            // Scale the size
            if (this.scaleFactor !== undefined) {
                elements[i].style.transform = `scale(${this.scaleFactor})`;
            }
        }

        if (this.hoverAnimation) { 
            setTimeout(() => {
                this.isClosed = false;
            }, animationSpeed + 5);
        } else {
            this.isClosed = false;
        }
        
    }

    closeSet = (event, noAnimation) => {

        // Calculate <top> and <left> units used to calculte the top and left positions
        // of all elements
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
                        prevZIndex = this.elements[i].style.zIndex;
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
                    
                    if (this.hoverAnimation) { 
                        this.updatePrevOffsetTop();
                    }

                    if (this.scaleFactor !== undefined) {
                        this.elements[i].style.transform = 'scale(1)';
                    }
                });

            } else if (this.showFadeAnimation) { // Show only fade animation

                $(`#${this.elements[i].id}`).animate({
                    opacity: '0'
                }, animationSpeed, () => {
                    if (i !== this.selectedElementIndex) {
                        this.elements[i].style.display = 'none';
                    } else {
                        this.elements[i].style.top = `${top}px`;
                        this.elements[i].style.left = `${left}px`;
                        $(`#${this.elements[i].id}`).animate({
                            opacity: '1'
                        }, {
                            duration: animationSpeed,
                            queue: false
                        });
                    }

                    if (this.hoverAnimation) { 
                        this.updatePrevOffsetTop();
                    }

                    if (this.scaleFactor !== undefined) {
                        this.elements[i].style.transform = 'scale(1)';
                    }
                });

            }
        }

        if (!this.clickToOpen && this.indexDidNotChange) {
            setTimeout(() => {
                this.elements[this.selectedElementIndex].addEventListener('mouseleave', this.afterCloseForHover);
            }, this.animationSpeed + 1);
        }

        // // Unhide expand icons if the set opens on hover
        // if (this.lightbox && !this.clickToOpen) {
        //     this.elements.forEach(element => {
        //         const iconDiv = element.children[element.children.length - 1];
        //         iconDiv.style.display = 'block';
        //     })
        // }

        this.isClosed = true;
    }

    getSelectedElement = () => {
        return this.elements[this.selectedElementIndex];
    }

    /* -------------------- End API Functions ------------------------ */
}