const _countdown = (function(){
    const parseDate = (dateStr) => {
        const [dd, mm, yyyy] = dateStr.split('/');
        return new Date(yyyy, parseInt(mm)-1, dd);
    };

    const getWord = (n, forms) => {
        let u = n % 10;
        if (u == 1) return forms[0];
        if (u > 1 && u <5) return forms[1];
        return forms[2];
    };

    const renderCount = (countObj, diff) => {
        const {cd, ud, ch, uh, cm, um} = countObj;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor(diff / (1000 * 60));

        const d = days;
        const h = hours - days * 24;
        const m = mins - hours * 60;

        cd.textContent = d;
        ud.textContent = getWord(d, ['день', 'дня', 'дней']);

        ch.textContent = h;
        uh.textContent = getWord(h, ['час', 'часа', 'часов']);

        cm.textContent = m;
        um.textContent = getWord(m, ['минута', 'минуты', 'минут']);
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

            const countdownDate = parseDate(countdownDateStr);

            const diff = countdownDate - new Date();
            if (diff > 0) {
                renderCount(countObj, countdownDate - new Date());

                const tId = setInterval(() => {
                    
                    const diff = countdownDate - new Date();
                    renderCount(countObj, diff);
                    if (diff < 0) {
                        clearInterval(tId);
                        heroText.remove();
                        heroTimer.remove();
                    }

                }, (60 * 1000));
            } else {
                heroText.remove();
                heroTimer.remove();
            };            
        };        
    };

    return {init};
})();