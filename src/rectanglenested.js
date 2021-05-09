import * as THREE from 'three';
import initOrbit from 'three-orbit-controls';

let OrbitControls = initOrbit(THREE);

export function drawRectangle(selector) {
    //THREEJS

    //use texture loaders to create asset based things
    const textureLoader = new THREE.TextureLoader()
    const innerMaterial = textureLoader.load('textures/cube.jpg');

    // Debug
    //const gui = new dat.GUI()

    // Canvas
    const canvas = document.querySelector(selector)

    // Scene
    const scene = new THREE.Scene()

    // Objects
    const geometry2 = new THREE.BoxGeometry( 0.5, 0.25, 0.5 );

    const material2 = new THREE.MeshBasicMaterial({ 
        map: innerMaterial,
        side: THREE.FrontSide
    });

    const rectangle = new THREE.Mesh( geometry2, material2 );
    scene.add( rectangle );





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
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 0.5
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


    const clock = new THREE.Clock()

    const tick = () =>
    {
        targetX = mouseX * 0.001
        targetY = mouseY * 0.001

        const elapsedTime = clock.getElapsedTime()

        // Update objects
        //cube.rotation.y = .2 * elapsedTime

        rectangle.rotation.y += .5 * (targetX - rectangle.rotation.y)
        rectangle.rotation.x += .5 * (targetY - rectangle.rotation.x)
        rectangle.position.z += -.05 * (targetY - rectangle.rotation.x)
    

        // Update Orbital Controls
        // controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
}