import LocomotiveScroll from 'locomotive-scroll';
import './style.css';
import {cylinder} from  './cylinder';
import {initHorizontalScroll} from './scroll';
import {drawBall} from './ball';
import {initText} from './text';
import {drawCube} from './cube';
import {makeNoise} from './noise';

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    direction: 'horizontal'
});

scroll.init();
setTimeout(() => scroll.update(), 2000);

drawBall('canvas.webgl');
const spiral = cylinder(500, 500).domElement;
spiral.classList.add('spiral')
document.querySelector('.container.cycles').appendChild(spiral);
// drawCube('canvas.box');
// makeNoise('noise');

//initHorizontalScroll('.horizontal-div');
//initText();
