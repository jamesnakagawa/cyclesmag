import * as THREE from 'three';

export function drawHead(selector) {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.z = 200;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    // var backlight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    // backLight.position.set(100, 0, -100);


    scene.add(keyLight);


    var objLoader = new THREE.OBJLoader();
    objLoader.setPath('/static');
    objLoader.load('head.obj', function (object) {

        scene.add(object);
        object.position.y -= 60;

    });



    var animate = function () {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render(scene, camera);
    };

    animate();
}