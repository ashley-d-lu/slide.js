/* Script for the buttons in the header */

'use strict'


const examplesButton = document.querySelector('#examples-btn');
const gettingStartedButton = document.querySelector('#gettingStarted-btn');
const apiButton = document.querySelector('#api-btn');


examplesButton.onclick = () => {
    location.href = '/slide.js/index.html';
};

gettingStartedButton.onclick = () => {
    location.href = '/slide.js/gettingStarted.html';
};

apiButton.onclick = () => {
    location.href = '/slide.js/api.html';
};


if (window.location.pathname === '/slides.js') {
    examplesButton.style.color = '#007bff';
    examplesButton.style.borderColor = '#007bff';
    examplesButton.style.backgroundColor = '#007bff11';
} else if (window.location.pathname === '/slides.js/gettingStarted.html') {
    gettingStartedButton.style.color = '#007bff';
    gettingStartedButton.style.borderColor = '#007bff';
    gettingStartedButton.style.backgroundColor = '#007bff11';
} else if (window.location.pathname === '/slides.js/api.html') {
    apiButton.style.color = '#007bff';
    apiButton.style.borderColor = '#007bff';
    apiButton.style.backgroundColor = '#007bff11';
}