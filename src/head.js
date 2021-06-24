import * as THREE from 'three';
import {OBJLoader} from './OBJLoader';
import initOrbit from 'three-orbit-controls';

let OrbitControls = initOrbit(THREE);

export function drawHead(selector, width, height) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const canvas = document.querySelector(selector);
    renderer.setSize(width, height);
    canvas.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.rotateSpeed = 0.1;

    const keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);
    scene.add(keyLight);

    const backlight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    backlight.position.set(100, 0, -100);
    scene.add(backlight);

    let rotation1 = {x: -0.5527097, y: 0.5060741, z: 0.0922722};
    let rotation2 = {x: -0.1850667, y: 0.1853109, z: -0.0013261};
    let targetRotation = rotation1;

    const objLoader = new OBJLoader();
    objLoader.setPath('/');
    let head;
    objLoader.load('head.obj', object => {
        head = object;
        scene.add(object);
        object.position.y -= 0.1;
        // https://www.andre-gaschler.com/rotationconverter/
        // transform: rotate3d(10, 10, 1, 42deg)
        // note: y and angle are reversed.
        // output: euler angle, in radians
        Object.assign(object.rotation, targetRotation);
    });

    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        const easing = 0.3;
        if (head) {
            head.rotation.x += (targetRotation.x - head.rotation.x) * easing;
            head.rotation.y += (targetRotation.y - head.rotation.y) * easing;
            head.rotation.z += (targetRotation.z - head.rotation.z) * easing;
        }
        renderer.render(scene, camera);
    };

    animate();
    return {
        setRotation(rotation) {
            targetRotation = rotation;
        }
    }
}