import './style.sass';
import {drawBall} from './ball';
import {drawCube} from './cube';
import {makeNoise} from './noise';
import {initializeGhost} from './ghost';
import {drawHead} from "./head";

/*****************************
 * Initialization            *
 *****************************
 */
document.body.classList.remove('preload');
document.querySelector('.title').classList.add('active', 'is-inview');

let ghosts = Array.from(document.querySelectorAll('.ghost')).map(g => initializeGhost(g));

/*****************************
 * Modal controller          *
 *****************************
 */
const modal = document.getElementById('modal');

function closeModal() {
    startAnims();
    modal.classList.remove('active')
    setTimeout(() => {
        modal.innerHTML = '';
        modal.setAttribute('class', '')
    }, 2000);
}
document.addEventListener('keydown',
    function closeOnEsc(e) {
        if (e.code === 'Escape') {
            closeModal();
        }
    }
);
function stopAnims() {
    ghosts.forEach(ghost => ghost.pause());
}
function startAnims() {
    ghosts.forEach(ghost => ghost.resume());
}
function initModal(selector, callback) {
    document.querySelector(`.show-${selector}`).addEventListener('click', function() {
        let tpl = document.getElementById(`container-${selector}`);
        modal.setAttribute('class', selector);
        modal.appendChild(tpl.content.cloneNode(true));
        modal.classList.add('show');
        setTimeout(() => modal.classList.add('active'), 50);
        stopAnims();
        let closeButton = modal.querySelector('.close');
        closeButton && closeButton.addEventListener('click', closeModal);
        callback && callback();
    });
}

initModal( 'fight', function() {
    // roundtrip
    setTimeout(() => modal.querySelector('.fight-or-flee').classList.add('is-inview'), 800);
    setTimeout(closeModal, 3000);
});

initModal('fear', function() {
    if (modal.querySelector('canvas.ball'))
        drawBall('canvas.ball');
});

initModal( 'poems');

initModal('box', function() {
    if (document.querySelector('canvas.box'))
        drawCube('canvas.box', {width: 30, height: 80});
})

initModal('noise', function() {
    makeNoise('noise');
})

/*****************************
 * Symbol wheel controller   *
 *****************************
 */

let symbols = document.querySelector('.container.ghosts');
let allSymbols = Array.from(symbols.querySelectorAll('.symbol'))
let increment = Math.PI * 2 / allSymbols.length;
const radius = 35;
let stepSize = Math.PI / 1440;
let startPos = 0;

(function spin() {
    allSymbols.forEach((sym, i) => {
        let angle = i * increment + startPos;
        let y = Math.sin(angle) * radius;
        let x = Math.cos(angle) * radius;
        sym.style.transform = `translate(${x}vmin, ${y}vmin)`;
    });
    startPos += stepSize;
    requestAnimationFrame(spin);
})();

allSymbols.forEach((sym, i) => {
    sym.addEventListener('mouseenter', function() {
        stepSize = 0;
    })
    sym.addEventListener('mouseleave', function() {
        stepSize = Math.PI / 1440;
    })
});

document.querySelectorAll('.popup-box').forEach(
    function adjustPopupHeight(popup) {
        let id = popup.dataset.id;
        let height = popup.querySelector('.text-wrapper')
            .getBoundingClientRect().height
        let element = document.createElement('style');
        document.head.appendChild(element);
        element.sheet.insertRule(`
        .container.ghosts .frame .symbols .${id}:hover .popup-box {
            top: -${height / 2}px;
            max-height: ${height}px;
        }
    `);
    }
);

/*****************************
 * 3D Head loader controller *
 *****************************
 */
const head = drawHead('.head-obj', 300, 300);

let rotation1 = {x: -0.5527097, y: 0.5060741, z: 0.0922722};
let rotation2 = {x: -0.1850667, y: 0.1853109, z: -0.0013261};
let rotation3 = {x: 0, y: 0, z: 0};
let symbols_container = document.querySelector('.symbols');
symbols_container.addEventListener('mouseover', function() {
    head.setRotation(rotation2);
});
symbols_container.addEventListener('mouseout', function() {
    head.setRotation(rotation1);
});
document.querySelector('.head-obj').addEventListener('dblclick', function() {
    head.setRotation(rotation3);
})