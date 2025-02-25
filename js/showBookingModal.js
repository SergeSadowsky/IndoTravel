import { getWord } from './wordForm.js';
import loadStyle from './loadStyles.js';
import { sendDataPromise } from './sendData.js';

export const showBookingModal = async (data) => {
    await loadStyle('/css/modal.css');

    const overlay = document.createElement('div');
    overlay.className = 'overlay overlay_confirm';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    const modal = document.createElement('div');
    modal.className = 'modal';
    const modalTitle = document.createElement('h2');
    modalTitle.className = 'modal__title';
    modalTitle.textContent = 'Подтверждение заявки';
    const p1 = document.createElement('p');
    p1.className = 'modal__text';
    p1.textContent = `Бронирование путешествия в Индонезию на ${data.people} ${getWord(data.people, ['человек', 'человека', 'человек'])}`;
    const p2 = document.createElement('p');
    p2.className = 'modal__text';
    p2.textContent = `В даты: ${data.tourDate.split(',')[0]}`;
    const p3 = document.createElement('p');
    p3.className = 'modal__text';
    p3.innerHTML = `Cтоимость тура <span style="font-weight:700;">${data.price}</span>`;
    const buttons = document.createElement('div');
    buttons.className = 'modal__button';
    const btn1 = document.createElement('button');
    btn1.className = 'modal__btn modal__btn_confirm';
    btn1.textContent = 'Подтверждаю';
    const btn2 = document.createElement('button');
    btn2.className = 'modal__btn modal__btn_edit';
    btn2.textContent = 'Изменить данные';

    buttons.append(btn1, btn2);
    modal.append(modalTitle, p1, p2, p3, buttons);
    overlay.append(modal);
    document.body.append(overlay);

    return new Promise((resolve) => {
        btn1.addEventListener('click', () => {
            const dataObj = {
                title: `Резервация. ${data.client}`,
                body: { 
                    client: data.client,
                    phone: data.phone,
                    tourDate: data.tourDate.split(',')[0],
                    people: data.people,
                    price: data.price,
                },
            };
            sendDataPromise(dataObj)
            .then((data) => {
                console.log(data);
                overlay.remove();
                resolve(true);
            })
            .catch((err) => {
                let p = modal.querySelector('.footer__status-text');
                if(!p){
                    p = document.createElement('p');
                    p.style.marginTop='30px';
                    p.classList.add('modal__text', 'footer__status-text');
                    modal.append(p);
                };
                p.textContent = 'Не удалось отправить заявку. Пожалуйста, повторите отправку ещё раз.';
                p.style.color = 'red';
            });
        });
    
        btn2.addEventListener('click', () => {
            overlay.remove();
            resolve(false);
        })

        overlay.addEventListener('click', (e) => {
            if(e.target === overlay) {
                e.target.remove()
                resolve(false);
            };
        });
    });
};