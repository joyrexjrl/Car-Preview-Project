let sceneFwdModel, cameraFwdModel, rendererFwdModel;

var fwdWindowed = document.getElementById('model-display-window');
var fwdWindowedWidth = document.getElementById('model-display-window').clientWidth;
var fwdWindowedHeight = document.getElementById('model-display-window').clientHeight;
var fwdModelScale = 0.3;

function fwdVehicleLoader(){
    const spotlightColor = 0x111111;

    sceneFwdModel = new THREE.Scene();
    sceneFwdModel.background = new THREE.Color(0x555555);

    cameraFwdModel = new THREE.PerspectiveCamera(40,fwdWindowedWidth / fwdWindowedHeight,1,5000);
    cameraFwdModel.rotation.y = 45/180*Math.PI;
    cameraFwdModel.position.x = 800;
    cameraFwdModel.position.y = 300;
    cameraFwdModel.position.z = 200;

    window.addEventListener('resize', function(){
        var WIDTH = fwdWindowedWidth,
            HEIGHT = fwdWindowedHeight;
        rendererFwdModel.setSize(WIDTH,HEIGHT);
        cameraFwdModel.aspect = WIDTH / HEIGHT;
        cameraFwdModel.updateProjectionMatrix();
        renderFwdWin();
    });

    rendererFwdModel = new THREE.WebGLRenderer({antialias:true});
    rendererFwdModel.setSize(fwdWindowedWidth,fwdWindowedHeight);
    document.body.appendChild(rendererFwdModel.domElement);
    //fwdWindowed.appendChild(rendererFwdModel.domElement);

    controlsWin = new THREE.OrbitControls(cameraFwdModel, rendererFwdModel.domElement);
    controlsWin.addEventListener('change', renderFwdWin);

    hlightWin = new THREE.AmbientLight(spotlightColor,100);
    sceneFwdModel.add(hlightWin);

    directionalLight = new THREE.DirectionalLight(spotlightColor,100); //0xc5c5c5
    directionalLight.position.set(0,1,0);
    directionalLight.castShadow = true;
    sceneFwdModel.add(directionalLight);                      

    let loaderWin = new THREE.GLTFLoader();
    loaderWin.load("fwdVehicleModel/scene.gltf", function(gltf){        
        fwdVehicleCar = gltf.scene.children[0];
        fwdVehicleCar.scale.set(fwdModelScale, fwdModelScale, fwdModelScale);
        sceneFwdModel.add(gltf.scene);
        renderFwdWin();
    });
}

function renderFwdWin(){
    rendererFwdModel.render(sceneFwdModel, cameraFwdModel);
}

fwdVehicleLoader();