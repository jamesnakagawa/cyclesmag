import LocomotiveScroll from 'locomotive-scroll';
import './style.sass';
import './locomotive.css';
import {drawBall} from './ball';
import {drawCube} from './cube';
import {makeNoise} from './noise';
import {initializeGhost} from './ghost';

document.body.classList.remove('preload');
document.querySelector('.title').classList.add('active');

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.7,
    direction: 'horizontal'
});

scroll.init();

let ghosts = [];
document.querySelectorAll('.ghost').forEach(ghost => {
    ghosts.push(initializeGhost(ghost));
});
scroll.on('call', (event_name, direction) => {
    if (event_name === 'ghosts') {
        if (direction === 'enter') {
            ghosts.forEach(ghost => ghost.resume());
        } else if (direction === 'exit') {
            ghosts.forEach(ghost => ghost.pause());
        }
    }
    if (event_name.substring(0,4) === 'nav-') {
        if (direction === 'enter') {
            let num = parseInt(event_name.match(/\d+/)[0], 10) - 1;
            document.querySelectorAll('nav a').forEach((el, i) => {
                if (i === num) {
                    el.classList.add('active');
                } else {
                    el.classList.remove('active');
                }
            })
        }
    }
});

drawBall('canvas.ball');
drawCube('canvas.box', {width: 30, height: 80, scroll});
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
    }
});

let symbols = document.querySelector('.container.symbols');

let allSymbols = Array.from(symbols.querySelectorAll('.symbol'))

let increment = Math.PI * 2 / allSymbols.length;
const radius = 35;
let stepSize = Math.PI / 1440;
let startPos = 0;
function spin() {
    allSymbols.forEach((sym, i) => {
        let angle = i * increment + startPos;
        let y = Math.sin(angle) * radius;
        let x = Math.cos(angle) * radius;
        sym.style.transform = `translate(${x}vmin, ${y}vmin)`;
    });
    startPos += stepSize;
    requestAnimationFrame(spin);
}
spin();

allSymbols.forEach((sym, i) => {
    sym.addEventListener('mouseenter', function() {
        stepSize = 0;
    })
    sym.addEventListener('mouseleave', function() {
        stepSize = Math.PI / 1440;
    })
});

function adjustPopupHeight(popup) {
    let id = popup.dataset.id;
    let height = popup.querySelector('.text-wrapper')
        .getBoundingClientRect().height
    let element = document.createElement('style');
    document.head.appendChild(element);
    element.sheet.insertRule(`
        .container.symbols .frame .symbols .${id}:hover .popup-box {
            top: -${height / 2}px;
            max-height: ${height}px;
        }
    `);
}
document.querySelectorAll('.popup-box')
        .forEach(adjustPopupHeight);

document.querySelectorAll('nav a').forEach((el, i) => {
    const divEl = document.querySelector(`.horizontal-div > div:nth-child(${i + 1})`);
    el.addEventListener('click', () => {
        scroll.scrollTo(divEl)
    })
})