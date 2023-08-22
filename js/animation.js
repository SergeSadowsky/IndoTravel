const dEl = document.documentElement; 
const plane = document.createElement('div');

plane.style.cssText = `
  position: fixed;
  width: 50px;
  height: 50px;
  /* bottom: -50px; */
  right: 0;
  pointer-events: none;
  background: url('/img/anim/airplane.svg') center/contain no-repeat;
  /* transform: rotate(180deg); */
  transition: rotate 2s;
`;

document.body.append(plane);
plane.style.bottom = `-${plane.clientHeight}px`;

let lastScrollTop =
  window.pageYOffset || document.documentElement.scrollTop;

const calcPlanePos = () => {
    if(dEl.clientWidth < 758) {
        plane.style.display = 'none';
        return 
    } else {
        plane.style.display = 'block';
    };

    const scrollTopPosition =
        window.pageYOffset || document.documentElement.scrollTop;

    const maxTop = dEl.clientHeight + plane.clientHeight;
    const maxScroll = dEl.scrollHeight - dEl.clientHeight;
    const percent = (window.pageYOffset * 100) / maxScroll;

    const move = maxTop * (percent / 100);
    // console.log('percent: ', percent);
    // plane.style.transform = `translateY(${-move}px)`;

    if (scrollTopPosition >= lastScrollTop) {
    // console.log('scrolling down');
        plane.style.transform = `translateY(${-move}px) rotate(0deg)`;
        // plane.style.rotate = `0deg`;

    } else {
    // console.log('scrolling up');
        plane.style.transform = `translateY(${-move}px) rotate(180deg)`; 
        // plane.style.rotate = `180deg`;
    }
    lastScrollTop =
    scrollTopPosition <= 0 ? 0 : scrollTopPosition;
};

window.addEventListener('scroll', () => {
    requestAnimationFrame(calcPlanePos);
});
calcPlanePos();