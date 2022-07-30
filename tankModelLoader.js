let sceneWin, cameraWin, rendererWin;

var windowed = document.getElementById('fwd-model');
var windowedWidth = document.getElementById('fwd-model').clientWidth;
var windowedHeight = document.getElementById('fwd-model').clientHeight;

function tankModel(){
    const spotlightColor = 0x111111;

    sceneWin = new THREE.Scene();
    sceneWin.background = new THREE.Color(0x333333);

    cameraWin = new THREE.PerspectiveCamera(40,windowedWidth / windowedHeight,1,5000);
    cameraWin.rotation.y = 45/180*Math.PI;
    cameraWin.position.x = 800;
    cameraWin.position.y = 300;
    cameraWin.position.z = 200;

    window.addEventListener('resize', function(){
        var WIDTH = windowedWidth,
            HEIGHT = windowedHeight;
        rendererWin.setSize(WIDTH,HEIGHT);
        cameraWin.aspect = WIDTH / HEIGHT;
        cameraWin.updateProjectionMatrix();
        renderWin();
    });

    rendererWin = new THREE.WebGLRenderer({antialias:true});
    rendererWin.setSize(windowedWidth,windowedHeight);
    document.body.appendChild(windowed);
    windowed.appendChild(rendererWin.domElement);

    controlsWin = new THREE.OrbitControls(cameraWin, rendererWin.domElement);
    controlsWin.addEventListener('change', renderWin);

    hlightWin = new THREE.AmbientLight(spotlightColor,100);
    sceneWin.add(hlightWin);

    directionalLight = new THREE.DirectionalLight(spotlightColor,100); //0xc5c5c5
    directionalLight.position.set(0,1,0);
    directionalLight.castShadow = true;
    sceneWin.add(directionalLight);                      

    let loaderWin = new THREE.GLTFLoader();
    loaderWin.load("awdVehicleModel/scene.gltf", function(gltf){        
        bot = gltf.scene.children[0];
        bot.scale.set(150,150,150);
        sceneWin.add(gltf.scene);
        renderWin();
    });
}

function renderWin(){
    rendererWin.render(sceneWin, cameraWin);
}

tankModel();