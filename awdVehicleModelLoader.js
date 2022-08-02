let sceneAwdModel, cameraAwdModel, rendererAwdModel;

var elementIDAwd = 'awd-right-window';
var modelLocationAwd = 'awdVehicleModel/scene.gltf';

var awdWindowed = document.getElementById(elementIDAwd);
var awdWindowedWidth = document.getElementById(elementIDAwd).clientWidth;
var awdWindowedHeight = document.getElementById(elementIDAwd).clientHeight;
var awdModelScale = 200;

function awdVehicleLoader(){
    const spotlightColor = 0x111111;

    sceneAwdModel = new THREE.Scene();
    sceneAwdModel.background = new THREE.Color(0x555555);

    cameraAwdModel = new THREE.PerspectiveCamera(40,awdWindowedWidth / awdWindowedHeight,1,5000);
    cameraAwdModel.rotation.y = 45/180*Math.PI;
    cameraAwdModel.position.x = 800;
    cameraAwdModel.position.y = 300;
    cameraAwdModel.position.z = 200;

    window.addEventListener('resize', function(){
        var WIDTH = awdWindowedWidth,
            HEIGHT = awdWindowedHeight;
        rendererAwdModel.setSize(WIDTH,HEIGHT);
        cameraAwdModel.aspect = WIDTH / HEIGHT;
        cameraAwdModel.updateProjectionMatrix();
        renderAwdWin();
    });

    rendererAwdModel = new THREE.WebGLRenderer({antialias:true});
    rendererAwdModel.setSize(awdWindowedWidth,awdWindowedHeight);
    //document.body.appendChild(awdWindowed);
    awdWindowed.appendChild(rendererAwdModel.domElement);

    controlsAwd = new THREE.OrbitControls(cameraAwdModel, rendererAwdModel.domElement);
    controlsAwd.addEventListener('change', renderAwdWin);

    hlightAwd = new THREE.AmbientLight(spotlightColor,100);
    sceneAwdModel.add(hlightAwd);

    directionalLightAwd = new THREE.DirectionalLight(spotlightColor,100); //0xc5c5c5
    directionalLightAwd.position.set(0,1,0);
    directionalLightAwd.castShadow = true;
    sceneAwdModel.add(directionalLightAwd);                      

    let loaderAwd = new THREE.GLTFLoader();
    loaderAwd.load(modelLocationAwd, function(gltf){        
        awdVehicleCar = gltf.scene.children[0];
        awdVehicleCar.scale.set(awdModelScale, awdModelScale, awdModelScale);
        
        // center the model in view code
        const boxAwd = new THREE.Box3().setFromObject(awdVehicleCar);
        const vectorAwd = new THREE.Vector3();
        boxAwd.getCenter(vectorAwd);
        awdVehicleCar.position.set(-vectorAwd.x, -vectorAwd.y, -vectorAwd.z);

        sceneAwdModel.add(gltf.scene);
        renderAwdWin();
    });
}

function renderAwdWin(){
    rendererAwdModel.render(sceneAwdModel, cameraAwdModel);
}

awdVehicleLoader();