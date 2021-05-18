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

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.7,
    direction: 'horizontal'
});

scroll.init();

drawBall('canvas.ball');
drawCube('canvas.box');
// makeNoise('noise');

const timings = [500,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,100,100,500,40,40];
scroll.on('call', function(event_name, direction, obj) {
    if (event_name === 'flicker') {
        const timings_ = [...timings];
        (function light_switch() {
            const nextInterval = timings_.shift();
            const tail = () => {
                obj.el.classList.toggle('bright');
                light_switch();
            }
            if (nextInterval)
                setTimeout(tail, nextInterval);
        })();
        obj.el
    }
})

//initText();
