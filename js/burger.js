export const _burger = (function(){
    const init = (menuButtonSelector, menuSelector) => {
        const button = document.querySelector(menuButtonSelector);
        const menu = document.querySelector(menuSelector);
        const menuList = menu.querySelector('.header__list')
        const body = document.querySelector('body');

        button.addEventListener('click', () => {
            menu.classList.toggle('header__menu_active');
            if(!menu.classList.contains('header__menu_active')){
                button.blur();
            }
        });

        menuList.addEventListener('click', () => {
            menu.classList.toggle('header__menu_active');
            button.blur();
        })

        body.addEventListener('click', (e) => {
            if(e.target !== button) {
                if(menu.classList.contains('header__menu_active')){
                    menu.classList.remove('header__menu_active');
                    button.blur();
                }
            };
        })
    };

    return {init}
})();
