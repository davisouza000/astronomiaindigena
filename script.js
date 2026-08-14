let scene, camera, renderer, starGeo, stars;

let velocities = [];

let accelerations = [];



function init() {

    scene = new THREE.Scene();



    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

    camera.position.z = 1;

    camera.rotation.x = Math.PI / 2;



    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);



    // Sistema de estrelas em movimento

    starGeo = new THREE.BufferGeometry();

    const positions = [];



    for (let i = 0; i < 6000; i++) {

        positions.push(

            Math.random() * 600 - 300,

            Math.random() * 600 - 300,

            Math.random() * 600 - 300

        );

        velocities.push(0);

        accelerations.push(0.02);

    }



    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));



    let loader = new THREE.TextureLoader();

    let sprite = loader.load('imagens/star.png');

   

    let starMaterial = new THREE.PointsMaterial({

        color: 0xffffff,

        size: 0.7,

        map: sprite,

        transparent: true,

        alphaTest: 0.05,

        blending: THREE.AdditiveBlending

    });



    stars = new THREE.Points(starGeo, starMaterial);

    scene.add(stars);



    animate();

}



function animate() {

    const positions = starGeo.attributes.position.array;



    for (let i = 0; i < 6000; i++) {

        let yIndex = i * 3 + 1;

       

        velocities[i] += accelerations[i];

        positions[yIndex] -= velocities[i];



        if (velocities[i] > 10) velocities[i] = 10;



        if (positions[yIndex] < -200) {

            positions[yIndex] = 200;

            velocities[i] = 0;

        }

    }



    starGeo.attributes.position.needsUpdate = true;

    stars.rotation.y += 0.002;



    renderer.render(scene, camera);

    requestAnimationFrame(animate);

}



init();



// Ajusta a tela automaticamente ao redimensionar a janela

window.addEventListener('resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});

