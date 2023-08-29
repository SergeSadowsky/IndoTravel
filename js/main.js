import { _countdown } from './countdown.js';
import { _accordion } from './accord.js';
import { _burger } from './burger.js';
// import { exchData } from './sendData.js';
import './formsSelectControls.js';
import './animation.js';
import './formHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
    _countdown.init('[data-timer-deadline]',
        'До конца акции осталось:',
        () => { document.querySelector('.hero__timer').remove() }
    );
});

document.addEventListener('DOMContentLoaded', () => {
    _accordion.init('#accordion');
});

document.addEventListener('DOMContentLoaded', () => {
    _burger.init('.header__menu-button', '.header__menu');
});

