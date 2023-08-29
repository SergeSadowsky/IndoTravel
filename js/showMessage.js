export const STATUS = {err: 'error', warn: 'warning', info: 'information'};

export const showMessage = (el, message, type = STATUS.info) => {
    const oldDiv = el.querySelector('#show__message');
    if(oldDiv) {
        oldDiv.remove();
    };
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