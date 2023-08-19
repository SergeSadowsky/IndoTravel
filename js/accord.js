export const _accordion = (function(){

    const init = (selector) => {
        const accordion = document.querySelector(selector);
        const items = accordion.querySelectorAll('.travel__item');
        const buttons = accordion.querySelectorAll('.travel__item-title');
        const wrappers = accordion.querySelectorAll('.travel__item-text-wrapper');

        let maxHeight = 0;
        wrappers.forEach(wrapper => {
            if(maxHeight < wrapper.scrollHeight) {
                maxHeight = wrapper.scrollHeight;
            }
        }); 

        buttons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                for(let i = 0; i < items.length; i++){
                    if(index === i) {
                        wrappers[i].style.height = 
                            items[i].classList.contains('travel__item_active') ?
                            '' : `${maxHeight}px`;
                        items[i].classList.toggle('travel__item_active')
                    } else {
                        items[i].classList.remove('travel__item_active');
                        wrappers[i].style.height = '';
                    }
                }                
            })            
        });   
    };

    return {init}
})();