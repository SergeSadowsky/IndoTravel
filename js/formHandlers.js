import { STATUS, showMessage, removeMessage, showModal } from "./showMessage.js";

// https://jsonplaceholder.typicode.com/posts
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';

const sendData  = (data, cb) => {        
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', SERVER_URL);
        xhr.setRequestHeader('Content-Type','Application/json');
    
        xhr.addEventListener('load', () => {
            if(xhr.status < 200 || xhr.status >= 300) {
                cb(new Error(xhr.status), xhr.response);
                return;
            };

            const data = JSON.parse(xhr.response);
            cb(null, data);
        });
    
        xhr.addEventListener('error', () => {
            cb(new Error(xhr.status), xhr.response);
        })

        xhr.send(JSON.stringify(data));
    } catch (err) {
        cb(new Error(err));
    };
};

const bookingForm = document.querySelector('.reservation__form');
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target;

    const data = {
        title: `Резервация. ${target.reservation__name.value}`,
        body: { 
            Client: target.reservation__name.value,
            Phone: target.reservation__phone.value,
            TourDate: target.reservation__date.value,
            People: target.reservation__people.value,
            Price: target.querySelector('.reservation__price').textContent,
        },
    };
    showMessage(target, 'Отправка...', STATUS.warn);
    sendData(data, (err, data) => {
        removeMessage(target);
        if(err){
            // showMessage(target, 'Оопс... Что-то пошло не так. Попробуйте позже.', STATUS.err);
            showModal('Не удалось отправить заявку. Пожалуйста, повторите отправку ещё раз.', STATUS.err);
        } else {
            target.reset();
            showModal('Наши менеджеры свяжутся с вами в течение 3-х рабочих дней.');
            // showMessage(target, 'Информация успешно отправлена. Наш менеджер свяжется с вами.');
        }
    });
});

const footerForm = document.querySelector('.footer__form');
footerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target;
    const data = {
        title: 'Вопрос по туру',
        body: `Email: ${target.querySelector('.footer__input').value}`,
    };
    let p = target.querySelector('.footer__status-text');
    if(!p){
        p = document.createElement('p');
        p.classList.add('footer__text', 'footer__status-text');
        target.append(p);
    };
    p.textContent = 'Отправка ...';
    p.style.color = '#FCB500';
    sendData(data, (err, data) => {
        if(err){
            p.textContent = 'Оопс... Случилась непредвиденная ошибка. Попробуйте ещё раз.';
            p.style.color = 'red';
        } else {
            target.reset;
            p.remove();
            target.querySelector('h2').textContent = 'Ваша заявка успешно отправлена';
            target.querySelector('.footer__text').textContent = 
                'Наши менеджеры свяжутся с вами в течение 3-х рабочих дней.';
            target.querySelector('.footer__input-wrap').remove()
        };
    });
});

