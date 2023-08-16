const _countdown = (function(){
    const parseDate = (dateStr, offset) => {
        const [dd, mm, yyyy] = dateStr.split('/');
        console.log(new Date(Date.UTC(yyyy, parseInt(mm)-1, dd, offset)));
        return new Date(Date.UTC(yyyy, parseInt(mm)-1, dd, offset));
    };

    const getWord = (n, forms) => {
        let u = n % 10;
        if (n > 10 && n < 20) return forms[2];
        if (u == 1) return forms[0];
        if (u > 1 && u <5) return forms[1];
        return forms[2];
    };

    const hourTimer = (countObj, countdownDate, el, cb) => {
        const thId = setInterval(() => {
            const diff = countdownDate - new Date();
            renderCount(countObj, diff, false);
            if (diff < 0) {
                clearInterval(thId);
                el.remove();
                cb.remove();
            };
        }, 1000);
    };

    const renderHtml = (element, title) => {
        const tTitle = document.createElement('p');
        tTitle.className = 'timer__title';
        tTitle.textContent = title;//'До конца акции осталось:'

        const tdays = document.createElement('p');
        tdays.className = 'timer__item timer__item_days';
        const cd = document.createElement('span');
        cd.className = 'timer__count timer__count_days'; 
        const ud = document.createElement('span');
        ud.className = 'timer__units timer__units_days';
        tdays.append(cd, ud);

        const thours = document.createElement('p');
        thours.className = 'timer__item timer__item_hours';
        const ch = document.createElement('span');
        ch.className = 'timer__count timer__count_hours'; 
        const uh = document.createElement('span');
        uh.className = 'timer__units timer__units_hours'; 
        thours.append(ch, uh);

        const tminutes = document.createElement('p');
        tminutes.className = 'timer__item timer__item_minutes';
        const cm = document.createElement('span');
        cm.className = 'timer__count timer__count_minutes'; 
        const um = document.createElement('span');
        um.className = 'timer__units timer__units_minutes'; 
        tminutes.append(cm, um);

        element.append(tdays, thours, tminutes);
        return {cd, ud, ch, uh, cm, um}
    };

    const renderCount = (countObj, diff, day = true) => {
        const {cd, ud, ch, uh, cm, um} = countObj;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor(diff / (1000 * 60));
        const secs = Math.floor(diff / 1000);

        const d = days;
        const h = hours - days * 24;
        const m = mins - hours * 60;
        const s = secs - mins * 60;

        if(day) {
            cd.textContent = d;
            ud.textContent = getWord(d, ['день', 'дня', 'дней']);
    
            ch.textContent = h;
            uh.textContent = getWord(h, ['час', 'часа', 'часов']);
    
            cm.textContent = m;
            um.textContent = getWord(m, ['минута', 'минуты', 'минут']);
        } else {
            cd.textContent = h;
            ud.textContent = getWord(h, ['час', 'часа', 'часов']);
    
            ch.textContent = m;
            uh.textContent = getWord(m, ['минута', 'минуты', 'минут']);
    
            cm.textContent = s;
            um.textContent = getWord(s, ['секунда','секунды','секунд']);
        }
    };

    const init = (selector, title, cb) => {
        const el = document.querySelector(selector);
        const countdownDateStr = el.dataset.timerDeadline;
        if(countdownDateStr){
            const countdownDate = parseDate(countdownDateStr, -3);
            const diff = countdownDate - new Date();
            if (diff > 0) {
                const controls = renderHtml(el, title);                      
                if(diff > (24 * 60 * 60 * 1000)) {                   
                    renderCount(controls, countdownDate - new Date());
                    const tdId = setInterval(() => {                        
                        const diff = countdownDate - new Date();
                        renderCount(controls, diff);
                        if (diff < (24 * 60 * 60 * 1000)) {
                            clearInterval(tdId);
                            hourTimer(countObj, countdownDate, el, cb)
                        }
                    }, (60 * 1000));

                } else {
                    hourTimer(controls, countdownDate, el, cb)
                };                
            } else {
                el.remove();
                cb();
            };   
        };      
    };

    return {init};
})();
