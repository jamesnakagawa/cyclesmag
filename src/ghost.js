import {VectorControl} from "./vector_control";

export const initializeGhost = (ghost, start = true) => {
    let bbox = ghost.getBoundingClientRect();
    let bounds = {
        outside: -150,
        inside: 0,
    }
    let safeBounds = {
        outside: -100,
        inside: -20
    };
    let interval;

    let initBounds = () => {
        let xRange = window.innerWidth - bbox.width;
        let yRange = window.innerHeight * 2.5 - bbox.height;
        Object.assign(bounds, {
            top: -yRange / 2,
            left: -xRange / 2,
            bottom: yRange / 2,
            right: xRange / 2
        });
        Object.assign(safeBounds, {
            top: -(yRange - bbox.height) / 2,
            left: -(xRange - bbox.width) / 2,
            bottom: (yRange - bbox.height) / 2,
            right: (xRange - bbox.width) / 2
        });
    };
    initBounds();

    let x = Math.random() * (bounds.right - bounds.left) + bounds.left;
    let y = Math.random() * (bounds.bottom - bounds.top) + bounds.top;
    let z = 0;
    let move = new VectorControl(10, 10, 15, 4);
    let bias = {x: 0, y: 0, z: 0};
    let ghostInner = ghost.querySelector('.inner');
    let stick = false;

    const setTransform = (x, y, z) => {
        ghost.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    }
    setTransform(x, y, z);

    ghost.classList.add('initialized');

    let pause = () => {
        clearInterval(interval);
        interval = 0;
    };
    let resume = () => {
        if (!interval) {
            interval = setInterval(nextStep, 300);
            nextStep();
        }
    }
    let nextStep = () => {
        let vec = move.next();
        setTransform(x += vec.x, y += vec.y, z += vec.z);
        ghost.style.opacity = 0.5 - Math.max(z, 0) / 100 * 0.4;
        ghost.style.zIndex = Math.floor(z);

        bias.x = (x < bounds.left) ? 5 : (x > bounds.right) ? -5 : bias.x;
        bias.y = (y < bounds.top) ? 5 : (y > bounds.bottom) ? -5 : bias.y;
        bias.z = (z < bounds.outside) ? 5 : (z > bounds.inside) ? -5 : bias.z;

        if (x > safeBounds.left && x < safeBounds.right) bias.x = 0;
        if (y > safeBounds.top && y < safeBounds.bottom) bias.y = 0;
        if (z > safeBounds.outside && z < safeBounds.inside) bias.z = 0;

        move.setBias(bias.x, bias.y, bias.z);
    };
    let mouseover = () => {
        pause();
        setTransform(x, y, 0);
        ghost.classList.add('hover');
    };
    let mouseout = () => {
        resume();
        ghost.classList.remove('hover');
    };
    let click = () => {
        let fn = (stick ? 'add': 'remove') + 'EventListener';
        ghostInner[fn]('mouseout', mouseout);
        stick = !stick;
    };
    let clickedFlag = false;
    let moved = false;
    let mousedown = () => {
        clickedFlag = true;
    };
    let mouseup = () => {
        clickedFlag = false;
        // if the user dragged it at all, reverse the click event.
        if (moved) {
            click();
            mouseout();
            moved = false;
        }
    };
    let mousemove = e => {
        if (clickedFlag) {
            setTransform(x += e.movementX, y += e.movementY, z);
            moved = true
        }
    };
    ghostInner.addEventListener('mouseover', mouseover);
    ghostInner.addEventListener('mouseout', mouseout);
    ghostInner.addEventListener('click', click);
    window.addEventListener('resize', initBounds);
    ghostInner.addEventListener('mousedown', mousedown);
    document.addEventListener('mouseup', mouseup);
    document.addEventListener('mousemove', mousemove);

    if (start === true) resume();
    return {pause, resume};
};