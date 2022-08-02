let sceneFwdModel, cameraFwdModel, rendererFwdModel;

var elementIDFwd = 'fwd-left-window';
var modelLocationFwd = 'fwdVehicleModel/scene.gltf';

var fwdWindowed = document.getElementById(elementIDFwd);
var fwdWindowedWidth = document.getElementById(elementIDFwd).clientWidth;
var fwdWindowedHeight = document.getElementById(elementIDFwd).clientHeight;
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
    //document.body.appendChild(fwdWindowed);
    fwdWindowed.appendChild(rendererFwdModel.domElement);

    controlsfwd = new THREE.OrbitControls(cameraFwdModel, rendererFwdModel.domElement);
    controlsfwd.addEventListener('change', renderFwdWin);

    hlightfwd = new THREE.AmbientLight(spotlightColor,100);
    sceneFwdModel.add(hlightfwd);

    directionalLightFwd = new THREE.DirectionalLight(spotlightColor,100); //0xc5c5c5
    directionalLightFwd.position.set(0,1,0);
    directionalLightFwd.castShadow = true;
    sceneFwdModel.add(directionalLightFwd);                      

    let loaderFwd = new THREE.GLTFLoader();
    loaderFwd.load(modelLocationFwd, function(gltf){
        fwdVehicleCar = gltf.scene.children[0];
        fwdVehicleCar.scale.set(fwdModelScale, fwdModelScale, fwdModelScale);

        // center the model in view code
        const boxFwd = new THREE.Box3().setFromObject(fwdVehicleCar);
        const vectorFwd = new THREE.Vector3();
        boxFwd.getCenter(vectorFwd);
        fwdVehicleCar.position.set(-vectorFwd.x, -vectorFwd.y, -vectorFwd.z);

        sceneFwdModel.add(gltf.scene);
        renderFwdWin();
    });
}

function renderFwdWin(){
    rendererFwdModel.render(sceneFwdModel, cameraFwdModel);
}

//fwdVehicleLoader();