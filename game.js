'use strict';

/* util */

const after = seconds => ({
  do: fn => setTimeout(fn, 1000 * seconds)
});

const afterEvery = seconds => ({
  do: fn => {
    const interval = setInterval(fn, 1000 * seconds);
    return {
      stop: () => clearInterval(interval)
    };
  }
});

const scale = base => ({
  by: multiplier => ({
    of: n => base * multiplier ** n
  })
});

/* elements */

const main = document.querySelector('main');

const button = document.createElement('button');
button.textContent = 'Grow';
main.innerText = '';
main.appendChild(button);

const counterDiv = document.createElement('div');
const counter = document.createTextNode(1);
counterDiv.appendChild(counter);
main.appendChild(counterDiv);
button.onclick = () => {
  button.disabled = true;
  const n = counter.textContent = Number(counter.textContent) + 1;
  const seconds = scale(.1).by(1.07).of(n);
  after(seconds).do(() => button.disabled = false);
};

