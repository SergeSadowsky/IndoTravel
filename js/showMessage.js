export const STATUS = {err: 'error', warn: 'warning', info: 'information'};

export const removeMessage = (el) => {
    const oldDiv = el.querySelector('#show__message');
    if(oldDiv) {
        oldDiv.remove();
    };
};

export const showMessage = (el, message, type = STATUS.info) => {
    // const oldDiv = el.querySelector('#show__message');
    // if(oldDiv) {
    //     oldDiv.remove();
    // };
    removeMessage(el);
    const div = document.createElement('div');
    div.id = 'show__message';
    div.style.cssText = 'display:flex;justify-content:space-between;width:100%;margin-top:20px;';
    const p = document.createElement('p');
    p.style.cssText = 'margin:auto;'
    switch (type) {
        case STATUS.err:
            p.textContent = message;
            p.style.color = 'red';              
            break;

        case STATUS.warn:
            p.textContent = message;
            p.style.color = '#FCB500';
            p.style.fontWeight = '600';               
            break;
    
        default:
            p.textContent = message;
            p.style.color = '#FCB500'; 
            p.style.fontWeight = '600';            
            break;
    };
    div.append(p);
    el.append(div);
};

export const showModal = (message, type = STATUS.info) => {
    const overlay = document.createElement('div');
    const modal = document.createElement('div');
    const header = document.createElement('h2');
    const messageP = document.createElement('p');
    const button = document.createElement('button');

    overlay.style.cssText = `
        background-color: rgba(0, 0, 0, 0.6);
        bottom: 0;
        height: 100%;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        transition: 0.3s ease-in-out;
        width: 100%;
        z-index: 1;`;

    modal.style.cssText= `
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        max-width:850px;
        width:100%;
        height:450px;
        background:#FFFFFF;
        border: 1px solid #AFAFAF;
        border-radius:30px;
        padding:60px 100px;
        display:flex;
        flex-direction: column;
        gap: 60px;
        align-items: center;`;
    
    header.style.cssText = `
        font-family: Merriweather;
        font-weight: 400;
        font-size: 34px;
        line-height: 150%;`;

    messageP.style.cssText = `
        font-weight: 700;
        font-size: 16px;
        line-height: 130%;
        color: #303030;
        margin-bottom: 10px;`;
    
    messageP.textContent = message;
    
    modal.append(header, messageP, button);
    overlay.append(modal);
    document.body.append(overlay);

    switch (type) {
        case STATUS.err:
            header.textContent = 'Упс...Что-то пошло не так.';
            button.classList.add('button');
            button.style.padding = '24px 112px';
            button.style.borderRadius = '12px';
            button.textContent = 'Забронировать';
            break;

        case STATUS.warn:
              
            break;
    
        default:
            header.textContent = 'Ваша заявка успешно отправлена.';
            button.style.cssText = `
                content: '';
                width: 80px;
                height: 80px;
                background-color: rgb(94, 230, 89);
                background-size: 50%;
                background-image: url("img/forms/checkmark.svg");
                background-repeat: no-repeat;
                background-position: center;
                border-radius: 40px;
            `
            break;
    };

    button.addEventListener('click', () => {
        overlay.remove();
    });

    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) e.target.remove();
    });
};