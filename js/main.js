import { _countdown } from './countdown.js';
import { _accordion } from './accord.js';
import { _burger } from './burger.js';
import { nf, tf } from './intl.js';
import { getWord } from './wordForm.js';
import './animation.js';

document.addEventListener('DOMContentLoaded', () => {
    _countdown.init('[data-timer-deadline]', 
        'До конца акции осталось:', 
        () => {document.querySelector('.hero__timer').remove()}
    );
});

document.addEventListener('DOMContentLoaded', () => {
    _accordion.init('#accordion');
});

document.addEventListener('DOMContentLoaded', () => {
    _burger.init('.header__menu-button', '.header__menu');
});

document.addEventListener('DOMContentLoaded', async () => {

    const range = (start, end) => 
        Array(end - start + 1).fill(0).map((el, index) => index + start);

    const clearSelect = (el) => {
        // const el = document.querySelector(selector);
        const options = el.querySelectorAll('option');
        options.forEach( (o, index) => {
            if(index !== 0) o.remove();
        })
    }; 

    const fillDateSelect = (el, data) => {
        data.forEach(element => {
            const option = document.createElement('option');
            option.value = element['date'];
            option.textContent = element['date'];
            // console.log('element: ', element);
            // option.dataset.minPeople = element['min-people'];
            // option.dataset.maxPeople = element['max-people'];
            el.append(option);
        });
    };

    const fillPeopleSelect = (select, tour) => {
        const start = parseInt(tour.minPeople);
        const end = parseInt(tour.maxPeople);
        range(start, end).forEach(el => {
            const option = document.createElement('option');
            option.value = el;
            option.textContent = el;
            select.append(option);
        });
    };

    class Tours {

        _tours = [];

        constructor(tours) {
            tours.forEach( t => {
                const tour = {
                    date: t['date'],
                    minPeople: parseInt(t['min-people']),
                    maxPeople: parseInt(t['max-people']),
                    price: parseFloat(t['price']),
                }
                this._tours.push(tour);
            })
        }

        get all() {
            return this._tours;
        }

        getTour(index) {
            return this._tours[index];
        }

        getStartDate(index) {
            const [dd, mm] = this._tours[index].date.slice(0, 5).split('.');
            return new Date(new Date().getFullYear(), mm - 1, +dd);
        }

        getEndDate(index) {
            const [dd, mm] = this._tours[index].date.slice(-5).split('.');
            return new Date(new Date().getFullYear(), mm - 1, +dd);
        }

        getTourInfoStr(index, quantity = 0) {
            const sd = tf(this.getStartDate(index));
            const ed = tf(this.getEndDate(index));
            let result = `${sd} - ${ed}`;
            if(quantity > 0) {
                result += `, ${quantity} ${getWord(quantity, ['человек', 'человека', 'человек'])}`;
            }
            return result;
        }

        getTourPrice(index, quantity) {
            if(quantity < this._tours[index].minPeople || 
                quantity > this._tours[index].maxPeople ) {
                    return undefined;
                }
            return this._tours[index].price * quantity;
        }

        getTourPriceStr(index, quantity) {
            return nf.format(this.getTourPrice(index, quantity));
        }
    }

    const result = await fetch('/data/data.json');
    const data = await result.json()
    console.log('data: ', data);

    const tours = new Tours(data);    
    
    const reservData = document.querySelector('.reservation__data');
    reservData.textContent = '';

    const reservPrice = document.querySelector('.reservation__price');
    reservPrice.textContent = '';

    const tourDate = document.querySelector('#tour__date');
    clearSelect(tourDate);

    const reservDate = document.querySelector('#reservation__date')
    clearSelect(reservDate)
    
    const tourPeople = document.querySelector('#tour__people');
    clearSelect(tourPeople);

    const reservPeople = document.querySelector('#reservation__people')
    clearSelect(reservPeople);

    fillDateSelect(tourDate, tours.all);
    fillDateSelect(reservDate, tours.all)

    tourDate.addEventListener('change', (e) => {
        const t = e.target;
        if(t.value !== '') {
            clearSelect(tourPeople);
            fillPeopleSelect(tourPeople, tours.getTour(t.selectedIndex -1));
        }
    });

    reservDate.addEventListener('change', (e) => {
        const t = e.target;
        if(t.value !== '') {
            clearSelect(reservPeople);
            fillPeopleSelect(reservPeople, tours.getTour(t.selectedIndex -1));
            reservData.textContent = tours.getTourInfoStr(t.selectedIndex - 1);
            reservPrice.textContent = '';            
        };
    });

    reservPeople.addEventListener('change', e => {
        const t = e.target;
        if(t.value !== '') {
            reservData.textContent = tours.getTourInfoStr(reservDate.selectedIndex - 1, +t.value);
            reservPrice.textContent = tours.getTourPriceStr(reservDate.selectedIndex - 1, +t.value);
        };        
    });

});
  