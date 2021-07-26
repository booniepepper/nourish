'use strict';

const main = document.querySelector('main');

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

const domElem = tag => ({
  with: ({text, className}) => {
    const elem = document.createElement(tag);
    className && elem.classList.add(className);
    text && (elem.textContent = text);
    return elem;
  },
  empty: () => domElem(tag).with()
});

/* elements */

const control = {
  withTitle: name => ({
    withButton: buttonText => ({
      withBaseDelay: delay => {
        const className = name.toLocaleLowerCase().replace(/\W+/g, '-');
        console.log({className});

        const title = domElem('div').with({text: name, className: 'title'});

        const value = domElem('div').with({text: '0', className: 'value'});

        const button = domElem('button').with({text: buttonText});
        const disable = () => button.disabled = true;
        const enable = () => button.disabled = false;
        button.onclick = () => {
          disable();
          const n = value.textContent = Number(value.textContent) + 1;
          const seconds = scale(delay).by(1.07).of(n);
          after(seconds).do(enable);
        };

        const block = domElem('div').with({className: 'control-block'});
        const control = domElem('section').with({className: 'control'});

        [title, button, value, control].forEach(e =>
          e.classList.add(className)
        );

        control.appendChild(title);
        control.appendChild(button);
        control.appendChild(value);
        block.appendChild(control);
        main.appendChild(block);
      }
    })
  })
};

/* ...the rest of the stuff */

main.textContent = '';

control.withTitle('Patch of Fertile Soil').withButton('Scout').withBaseDelay(.1);
control.withTitle('Seed').withButton('Forage').withBaseDelay(.001);

