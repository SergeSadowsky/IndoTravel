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

    const hourTimer = (countObj, countdownDate, heroText, heroTimer) => {
        const thId = setInterval(() => {
            const diff = countdownDate - new Date();
            renderCount(countObj, diff, false);
            if (diff < 0) {
                clearInterval(thId);
                heroText.remove();
                heroTimer.remove();
            };
        }, 1000);
    }

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

    const init = (selector, selectorTimer, selectorText) => {
        const element = document.querySelector(selector);
        const heroTimer = document.querySelector(selectorTimer);
        const heroText = document.querySelector(selectorText);
        const countdownDateStr = element.dataset.timerDeadline;
        if(countdownDateStr) {    
            
            const cd = element.querySelector('.timer__count_days');
            const ud = element.querySelector('.timer__units_days');

            const ch = element.querySelector('.timer__count_hours');
            const uh = element.querySelector('.timer__units_hours');

            const cm = element.querySelector('.timer__count_minutes');
            const um = element.querySelector('.timer__units_minutes');

            const countObj = {cd, ud, ch, uh, cm, um};

            const countdownDate = parseDate(countdownDateStr, -3);

            const diff = countdownDate - new Date();
            if (diff > 0) {                      
                if(diff > (24 * 60 * 60 * 1000)) {                   
                    renderCount(countObj, countdownDate - new Date());
                    const tdId = setInterval(() => {                        
                        const diff = countdownDate - new Date();
                        renderCount(countObj, diff);
                        if (diff < (24 * 60 * 60 * 1000)) {
                            clearInterval(tdId);
                            hourTimer(countObj, countdownDate, heroText, heroTimer)
                        }
                    }, (60 * 1000));

                } else {
                    hourTimer(countObj, countdownDate, heroText, heroTimer)
                };                
            } else {
                heroText.remove();
                heroTimer.remove();
            };            
        };        
    };

    return {init};
})();
