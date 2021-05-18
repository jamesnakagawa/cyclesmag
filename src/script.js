import LocomotiveScroll from 'locomotive-scroll';
// import LocomotiveScroll from '../../locomotive-scroll/src/scripts/Smooth';
import './style.sass';
import './locomotive.css';
import {drawBall} from './ball';
import {drawCube} from './cube';
// import {initText} from './text';
import {makeNoise} from './noise';

document.body.classList.remove('preload');
document.querySelector('.title').classList.add('active');

window.scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.7,
    direction: 'horizontal'
});
window.scroll.init();

drawBall('canvas.ball');
drawCube('canvas.box');
// makeNoise('noise');

//initText();
