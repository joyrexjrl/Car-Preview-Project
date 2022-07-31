let sceneRwdModel, cameraRwdModel, rendererRwdModel;

var elementIDRwd = 'rwd-center-model';
var modelLocationRwd = 'rwdVehicleModel/scene.gltf';

var rwdWindowed = document.getElementById(elementIDRwd);
var rwdWindowedWidth = document.getElementById(elementIDRwd).clientWidth;
var rwdWindowedHeight = document.getElementById(elementIDRwd).clientHeight;
var rwdModelScale = 1;

function rwdVehicleLoader(){
    const spotlightColor = 0x111111;

    sceneRwdModel = new THREE.Scene();
    sceneRwdModel.background = new THREE.Color(0x555555);

    cameraRwdModel = new THREE.PerspectiveCamera(40,rwdWindowedWidth / rwdWindowedHeight,1,5000);
    cameraRwdModel.rotation.y = 45/180*Math.PI;
    cameraRwdModel.position.x = 800;
    cameraRwdModel.position.y = 300;
    cameraRwdModel.position.z = 200;

    window.addEventListener('resize', function(){
        var WIDTH = rwdWindowedWidth,
            HEIGHT = rwdWindowedHeight;
        rendererRwdModel.setSize(WIDTH,HEIGHT);
        cameraRwdModel.aspect = WIDTH / HEIGHT;
        cameraRwdModel.updateProjectionMatrix();
        renderRwdWin();
    });

    rendererRwdModel = new THREE.WebGLRenderer({antialias:true});
    rendererRwdModel.setSize(rwdWindowedWidth,rwdWindowedHeight);
    //document.body.appendChild(rwdWindowed);
    rwdWindowed.appendChild(rendererRwdModel.domElement);

    controlsRwd = new THREE.OrbitControls(cameraRwdModel, rendererRwdModel.domElement);
    controlsRwd.addEventListener('change', renderRwdWin);

    hlightRwd = new THREE.AmbientLight(spotlightColor,100);
    sceneRwdModel.add(hlightRwd);

    directionalLightRwd = new THREE.DirectionalLight(spotlightColor,100); //0xc5c5c5
    directionalLightRwd.position.set(0,1,0);
    directionalLightRwd.castShadow = true;
    sceneRwdModel.add(directionalLightRwd);                      

    let loaderRwd = new THREE.GLTFLoader();
    loaderRwd.load(modelLocationRwd, function(gltf){        
        rwdVehicleCar = gltf.scene.children[0];
        rwdVehicleCar.scale.set(rwdModelScale, rwdModelScale, rwdModelScale);
        
        // center the model in view code
        const boxRwd = new THREE.Box3().setFromObject(rwdVehicleCar);
        const vectorRwd = new THREE.Vector3();
        boxRwd.getCenter(vectorRwd);
        rwdVehicleCar.position.set(-vectorRwd.x, -vectorRwd.y, -vectorRwd.z);

        sceneRwdModel.add(gltf.scene);
        renderRwdWin();
    });
}

function renderRwdWin(){
    rendererRwdModel.render(sceneRwdModel, cameraRwdModel);
}

rwdVehicleLoader();