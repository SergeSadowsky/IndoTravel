import { showBookingModal } from "./showBookingModal.js";
import { sendData } from "./sendData.js";
import { STATUS, showMessage, removeMessage } from "./showMessage.js";
// import { STATUS, showMessage, removeMessage, showModal } from "./showMessage.js";

const bookingForm = document.querySelector('.reservation__form');

bookingForm.reservation__name.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^а-я\u0020]/ig,'');
});

bookingForm.reservation__phone.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d\+]/ig,'');
});

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const target = e.target;

    const reFIO = /([А-яа-я]+)([\u0020][А-яа-я]+){2,}/;
    if(!reFIO.test(target.reservation__name.value)){
        showMessage(target, 'Укажите фамилию, имя, отчество полностью.', STATUS.err);
        return;
    };
    
    // const data = {
    //     title: `Резервация. ${target.reservation__name.value}`,
    //     body: { 
    //         Client: target.reservation__name.value,
    //         Phone: target.reservation__phone.value,
    //         TourDate: target.reservation__date.value,
    //         People: target.reservation__people.value,
    //         Price: target.querySelector('.reservation__price').textContent,
    //     },
    // };
    // showMessage(target, 'Отправка...', STATUS.warn);
    // sendData(data, (err, data) => {
    //     removeMessage(target);
    //     if(err){
    //         // showMessage(target, 'Оопс... Что-то пошло не так. Попробуйте позже.', STATUS.err);
    //         showModal('Не удалось отправить заявку. Пожалуйста, повторите отправку ещё раз.', STATUS.err);
    //     } else {
    //         target.reset();
    //         showModal('Наши менеджеры свяжутся с вами в течение 3-х рабочих дней.');
    //         // showMessage(target, 'Информация успешно отправлена. Наш менеджер свяжется с вами.');
    //     }
    // });
    const data = { 
        client: target.reservation__name.value,
        phone: target.reservation__phone.value,
        tourDate: target.querySelector('.reservation__data').textContent,
        people: target.reservation__people.value,
        price: target.querySelector('.reservation__price').textContent,
    };
    const result = await showBookingModal(data);
    if (result) {
        Array.from(target.elements).forEach(el => el.disabled = true);
    };
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

