import * as THREE from 'three';

export function cylinder(width, height) {
    const scene2 = new THREE.Scene();
    const camera2 = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer2 = new THREE.WebGLRenderer();
    renderer2.setSize(width, height);

    const james = document.getElementById('james');
    const ctx = james.getContext('2d');
    ctx.transform(-1, 1.1, 0, 1, 500, -50)
    ctx.font = '200px serif';
    ctx.fillStyle = '#000044';
    ctx.fillRect(0, 0, 500, 200);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('cycles', 10, -450);
    ctx.fillText('cycles', 10, -250);
    ctx.fillText('cycles', 10, -50);
    ctx.fillText('cycles', 10, 150);
    ctx.fillText('cycles', 10, 350);
    ctx.fillText('cycles', 10, 550);
    ctx.fillText('cycles', 10, 750);
    james.style.display = 'none';

    var texture = new THREE.CanvasTexture(james);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2,60);

    const cylinder_geometry = new THREE.CylinderGeometry(1, 0.1, 160, 64, 64, true);

    const cylinder_material = new THREE.MeshBasicMaterial({ 
        // color: 0xc00000,
        transparent: true,
        alphaMap: texture,
        side: THREE.DoubleSide
    });
    const cylinder = new THREE.Mesh( cylinder_geometry, cylinder_material );
    cylinder.rotation.x = Math.PI/2;
    scene2.add(cylinder);


    camera2.position.z = 5;

    (function animate() {
        requestAnimationFrame( animate );

        cylinder.rotation.y += 0.001;
        camera2.position.z += 0.0015;
        // cube.rotation.y += 0.01;

        renderer2.render( scene2, camera2 );
    })();

    return renderer2;
}