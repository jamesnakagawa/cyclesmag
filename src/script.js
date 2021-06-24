import LocomotiveScroll from 'locomotive-scroll';
import './style.sass';
import './locomotive.css';
import {drawBall} from './ball';
import {drawCube} from './cube';
import {makeNoise} from './noise';
import {initializeGhost} from './ghost';
import {drawHead} from "./head";

document.body.classList.remove('preload');
// document.querySelector('.title').classList.add('active');

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.7,
});

scroll.init();

let ghosts = Array.from(document.querySelectorAll('.ghost')).map(g => initializeGhost(g));

scroll.on('call', (event_name, direction) => {
    // if (event_name === 'ghosts') {
    //     if (direction === 'enter') {
    //         ghosts.forEach(ghost => ghost.resume());
    //     } else if (direction === 'exit') {
    //         ghosts.forEach(ghost => ghost.pause());
    //     }
    // }
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
    if (event_name === 'nav-9') {
        if (direction === 'enter') {
            document.body.classList.add('inverted');
        } else {
            document.body.classList.remove('inverted');
        }
    }
});

if (document.querySelector('canvas.ball'))
    drawBall('canvas.ball');
if (document.querySelector('canvas.box'))
    drawCube('canvas.box', {width: 30, height: 80, scroll});

// makeNoise('noise');

let symbols = document.querySelector('.container.ghosts');

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
    console.log(height);
    element.sheet.insertRule(`
        .container.ghosts .frame .symbols .${id}:hover .popup-box {
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

var tunnel = document.querySelector('img.tunnel')
if (tunnel) {
    tunnel.addEventListener('click', function() {
        tunnel.classList.add('clicked')
    })
}

const head = drawHead('.head-obj', 300, 300);

let rotation1 = {x: -0.5527097, y: 0.5060741, z: 0.0922722};
let rotation2 = {x: -0.1850667, y: 0.1853109, z: -0.0013261};
let symbols_container = document.querySelector('.symbols');
symbols_container.addEventListener('mouseover', function() {
    head.setRotation(rotation2);
});
symbols_container.addEventListener('mouseout', function() {
    head.setRotation(rotation1);
});