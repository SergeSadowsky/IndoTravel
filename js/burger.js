export const _burger = (function(){
    
    const init = (menuButtonSelector, menuSelector) => {
        let opacity = 0;
        const button = document.querySelector(menuButtonSelector);
        const menu = document.querySelector(menuSelector);
        const menuList = menu.querySelector('.header__list')
        const body = document.querySelector('body');

        const fade = () => {
            opacity -= 0.02;
            menu.style.opacity = opacity;
            if (opacity > 0) {
                requestAnimationFrame(fade);
            };
        };

        const unfade = () => {
            opacity += 0.02;
            menu.style.opacity = opacity;
            menu.style.zIndex = 1;
            if (opacity < 1) {
                requestAnimationFrame(unfade);
            }; 
        };

        button.addEventListener('click', () => {
            menu.classList.toggle('header__menu_active');
            if(!menu.classList.contains('header__menu_active')){
                button.blur();
            };
            if (menu.style.opacity >= 1) {
                fade();
              } else {
                unfade();
              }
        });

        menuList.addEventListener('click', () => {
            menu.classList.toggle('header__menu_active');
            button.blur();
            if (menu.style.opacity >= 1) {
                fade();
            }
        })

        body.addEventListener('click', (e) => {
            if(e.target !== button) {
                if(menu.classList.contains('header__menu_active')){
                    menu.classList.remove('header__menu_active');
                    button.blur();
                };

                if (menu.style.opacity >= 1) {
                    fade();
                }
            };
        })
    };

    return {init}
})();
