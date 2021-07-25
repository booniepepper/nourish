'use strict';

const main = document.querySelector('main');

const button = document.createElement('button');
button.textContent = 'Grow';
main.innerText = '';
main.appendChild(button);

const counterDiv = document.createElement('div');
const counter = document.createTextNode(1);
counterDiv.appendChild(counter);
main.appendChild(counterDiv);
button.onclick = () => counter.textContent = Number(counter.textContent) + 1;

