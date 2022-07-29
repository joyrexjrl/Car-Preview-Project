let sceneFS, cameraFS, rendererFS;

function carModel(){
    const spotlightColor = 0xc4c4c4;

    sceneFS = new THREE.Scene();
    sceneFS.background = new THREE.Color(0x555555);

    cameraFS = new THREE.PerspectiveCamera(40,window.innerWidth / window.innerHeight,1,5000);
    cameraFS.rotation.y = 45/180*Math.PI;
    cameraFS.position.x = 800;
    cameraFS.position.y = 100;
    cameraFS.position.z = 1000;

    window.addEventListener('resize', function(){
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        rendererFS.setSize(WIDTH,HEIGHT);
        cameraFS.aspect = WIDTH / HEIGHT;
        cameraFS.updateProjectionMatrix();
        renderFS();
    });

    rendererFS = new THREE.WebGLRenderer({antialias:true});
    rendererFS.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(rendererFS.domElement);

    controlsFS = new THREE.OrbitControls(cameraFS, rendererFS.domElement);
    controlsFS.addEventListener('change', renderFS);

    hlightFS = new THREE.AmbientLight(0x404040,100);
    sceneFS.add(hlightFS);

    directionalLight = new THREE.DirectionalLight(spotlightColor,100);
    directionalLight.position.set(0,1,0);
    directionalLight.castShadow = true;
    sceneFS.add(directionalLight);

    light = new THREE.PointLight(spotlightColor,10);
    light.position.set(0,300,500);
    sceneFS.add(light);

    light2 = new THREE.PointLight(spotlightColor,10);
    light2.position.set(500,100,0);
    sceneFS.add(light2);

    light3 = new THREE.PointLight(spotlightColor,10);
    light3.position.set(0,100,-500);
    sceneFS.add(light3);

    light4 = new THREE.PointLight(spotlightColor,10);
    light4.position.set(-500,300,0);
    sceneFS.add(light4);                        

    let loader = new THREE.GLTFLoader();
    loader.load("carModel/scene.gltf", function(gltf){
        car = gltf.scene.children[0];
        car.scale.set(0.5,0.5,0.5);
        sceneFS.add(gltf.scene);
        renderFS();
    });    
}

function renderFS(){
    rendererFS.render(sceneFS, cameraFS);
}

carModel();