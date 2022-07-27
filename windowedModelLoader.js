let sceneWin, cameraWin, rendererWin;

var windowed = document.getElementById('windowed');
var windowedWidth = document.getElementById('windowed').clientWidth;
var windowedHeight = document.getElementById('windowed').clientHeight;

function botModel(){
    const spotlightColor = 0x111111;

    sceneWin = new THREE.Scene();
    sceneWin.background = new THREE.Color(0x333333);

    cameraWin = new THREE.PerspectiveCamera(40,windowedWidth / windowedHeight,1,5000);
    cameraWin.rotation.y = 45/180*Math.PI;
    cameraWin.position.x = 800;
    cameraWin.position.y = 300;
    cameraWin.position.z = 200;

    window.addEventListener('resize', function(){
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        rendererWin.setSize(WIDTH,HEIGHT);
        cameraWin.aspect = WIDTH / HEIGHT;
        cameraWin.updateProjectionMatrix();
        renderWin();
    });

    rendererWin = new THREE.WebGLRenderer({antialias:true});
    rendererWin.setSize(windowedWidth,windowedHeight);
    document.body.appendChild(windowed);
    windowed.appendChild(rendererWin.domElement);

    controls = new THREE.OrbitControls(cameraWin, rendererWin.domElement);
    controls.addEventListener('change', renderWin);

    hlight = new THREE.AmbientLight(spotlightColor,100);
    sceneWin.add(hlight);

    directionalLight = new THREE.DirectionalLight(spotlightColor,100); //0xc5c5c5
    directionalLight.position.set(0,1,0);
    directionalLight.castShadow = true;
    sceneWin.add(directionalLight);

    light = new THREE.PointLight(spotlightColor,10);
    light.position.set(0,300,500);
    sceneWin.add(light);

    light2 = new THREE.PointLight(spotlightColor,10);
    light2.position.set(500,100,0);
    sceneWin.add(light2);

    light3 = new THREE.PointLight(spotlightColor,10);
    light3.position.set(0,100,-500);
    sceneWin.add(light3);

    light4 = new THREE.PointLight(spotlightColor,10);
    light4.position.set(-500,300,0);
    sceneWin.add(light4);                        

    let loaderWin = new THREE.GLTFLoader();
    loaderWin.load("windowedModel/scene.gltf", function(gltf){        
        bot = gltf.scene.children[0];
        bot.scale.set(150,150,150);
        sceneWin.add(gltf.scene);
        renderWin();
    });
}

function renderWin(){
    rendererWin.render(sceneWin, cameraWin);
}

botModel();