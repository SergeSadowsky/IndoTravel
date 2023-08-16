document.addEventListener('DOMContentLoaded', () => {
    _countdown.init('[data-timer-deadline]', 
        'До конца акции осталось:', 
        () => {document.querySelector('.hero__timer').remove()}
    );
  });
  