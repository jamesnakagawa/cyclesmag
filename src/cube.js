import * as THREE from 'three';
// import initOrbit from 'three-orbit-controls';

// let OrbitControls = initOrbit(THREE);

export function makeRectangle() {
    //use texture loaders to create asset based things
    const textureLoader = new THREE.TextureLoader()

    const frontTexture = textureLoader.load('textures/doom.png');
    const backTexture = textureLoader.load('textures/doom.png');
    const upTexture = textureLoader.load('textures/doom.png');
    const downTexture = textureLoader.load('textures/doom.png');
    const rightTexture = textureLoader.load('textures/nutrition.png');
    const leftTexture = textureLoader.load('textures/nutrition.png');

    const frontMaterial = new THREE.MeshBasicMaterial({map: frontTexture, side: THREE.FrontSide});
    const backMaterial = new THREE.MeshBasicMaterial({map: backTexture, side: THREE.FrontSide});
    const upMaterial = new THREE.MeshBasicMaterial({map: upTexture, side: THREE.FrontSide});
    const downMaterial = new THREE.MeshBasicMaterial({map: downTexture, side: THREE.FrontSide});
    const rightMaterial = new THREE.MeshBasicMaterial({map: rightTexture, side: THREE.FrontSide});
    const leftMaterial = new THREE.MeshBasicMaterial({map: leftTexture, side: THREE.FrontSide});

    const materials = [
        frontMaterial,
        backMaterial,
        upMaterial,
        downMaterial,
        rightMaterial,
        leftMaterial
    ]

    const geometry = new THREE.BoxGeometry( 2, 3, 2 );

    // const material = new THREE.MeshBasicMaterial({ 
    //     map: frontMaterial,
    //     side: THREE.FrontSide
    // });

    return new THREE.Mesh(geometry, materials);
}

const defaultOpts = {
    width: window.innerWidth,
    height: window.innerHeight,
    scroll: {scrollTo() {}}
};

export function drawCube(selector, options = defaultOpts) {
    //use texture loaders to create asset based things
    const textureLoader = new THREE.TextureLoader()
    const innerMaterial = textureLoader.load('textures/doombg.PNG');

    innerMaterial.wrapS = THREE.RepeatWrapping;
    innerMaterial.wrapT = THREE.RepeatWrapping;
    innerMaterial.repeat.x = 10;
    innerMaterial.repeat.y = 10;

    // Debug
    //const gui = new dat.GUI()

    // Canvas
    const canvas = document.querySelector(selector)

    // Scene
    const scene = new THREE.Scene();

    // Objects
    const geometry = new THREE.BoxGeometry( 10, 10, 10 );

    const material = new THREE.MeshBasicMaterial({ 
        map: innerMaterial,
        side: THREE.BackSide,
    });

    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    const rectangle = makeRectangle();
    rectangle.position.x = 0
    rectangle.position.y = -3
    rectangle.position.z = 0
    scene.add(rectangle);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 0.08)
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    scene.add(pointLight)

    //light 2
    const pointLight2 = new THREE.PointLight(0xff0000, 0.05)
    pointLight2.position.set(1,1,1)
    pointLight2.intensity = 1

    scene.add(pointLight2)

    //const light1 = gui.addFolder('Light 1')

    // light1.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
    // light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
    // light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
    // light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

    // const pointLightHelper = new THREE.PointLightHelper(pointLight2, 0.6)
    // scene.add(pointLightHelper)

    //light 3

    // const pointLight3 = new THREE.PointLight(0xff0000, 0.1)
    // pointLight3.position.set(3,3,3)
    // pointLight3.intensity = 1

    // scene.add(pointLight3)

    // const light2 = gui.addFolder('Light 2')

    // light2.add(pointLight3.position, 'x').min(-3).max(3).step(0.01)
    // light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
    // light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
    // light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

    const light2Color = {
        color:0xff0000
     }

    // light2.addColor(light2Color, 'color')
    //     .onChange(() => {
    //         pointLight3.color.set(light2Color.color)
    //     })

    // const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 0.6)
    // scene.add(pointLightHelper2)

    /**
     * Sizes
     */
    const sizes = {
        width: window.innerWidth * options.width / 100,
        height: window.innerHeight * options.height / 100
    }
    const fullscreen = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    let aspectTarget = sizes.width / sizes.height;

    const resize = sizes => {
        // Update camera
        aspectTarget = sizes.width / sizes.height;

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    const boundResize = resize.bind(null, sizes);

    window.addEventListener('resize', resize.bind(null, sizes));

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 0
    camera.position.y = -3
    camera.position.z = 5
    scene.add(camera)

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    /**
     * Renderer
     */

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /**
     * Animate
     */
    document.addEventListener('mousemove', onDocumentMouseMove)

    let mouseX = 0
    let mouseY = 0

    let targetX = 0
    let targetY = 0

    const windowHalfX = window.innerWidth /2;
    const windowHalfY = window.innerHeight /2;

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX)
        mouseY = (event.clientY - windowHalfY)
    }

    let origZoomTarget = camera.position.z;
    let zoomTarget = origZoomTarget;
    canvas.addEventListener('click', () => {
        resize(fullscreen);

        window.removeEventListener('resize', boundResize);
        window.addEventListener('resize', resize.bind(null, fullscreen));

        options.scroll.scrollTo(canvas);

        canvas.style.top = 0;

        canvas.addEventListener('mousedown', () => {
            zoomTarget = 3
        });
        canvas.addEventListener('mouseup', () => {
            zoomTarget = origZoomTarget;
        });
    });

    // const clock = new THREE.Clock()

    const tick = () => {
        targetX = mouseX * 0.001
        targetY = mouseY * 0.001

        // const elapsedTime = clock.getElapsedTime()

        // Update objects
        //cube.rotation.y = .2 * elapsedTime

        cube.rotation.y += .5 * (targetX - cube.rotation.y)
        cube.rotation.x += .5 * (targetY - cube.rotation.x)
        cube.position.z += -.5 * (targetY - cube.rotation.x)
    
        rectangle.rotation.y = 30
        rectangle.rotation.y += 1.5 * (targetX - rectangle.rotation.y)
        rectangle.rotation.x +=  1.5 * (targetY - rectangle.rotation.x)
        rectangle.position.z += -.05 * (targetY - rectangle.rotation.x)

        camera.position.z += .05 * (zoomTarget - camera.position.z);
        camera.aspect += .05 * (aspectTarget - camera.aspect);
        camera.updateProjectionMatrix();

        // Update Orbital Controls
        // controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
}

