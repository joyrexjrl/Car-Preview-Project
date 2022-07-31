let sceneDisWinModel, cameraDisWinModel, rendererDisWinModel;


function disWinModelLoader(modelLocation, modelScale){
    var elementIDDisWin = 'model-display-window';
    var modelLocationDisWin = modelLocation;

    var disWinWindowed = document.getElementById(elementIDDisWin);
    var disWinWindowedWidth = document.getElementById(elementIDDisWin).clientWidth;
    var disWinWindowedHeight = document.getElementById(elementIDDisWin).clientHeight;
    var disWinModelScale = modelScale;

    const spotlightColor = 0x111111;

    sceneDisWinModel = new THREE.Scene();
    sceneDisWinModel.background = new THREE.Color(0x555555);

    cameraDisWinModel = new THREE.PerspectiveCamera(40,disWinWindowedWidth / disWinWindowedHeight,1,5000);
    cameraDisWinModel.rotation.y = 45/180*Math.PI;
    cameraDisWinModel.position.x = 800;
    cameraDisWinModel.position.y = 300;
    cameraDisWinModel.position.z = 200;

    window.addEventListener('resize', function(){
        var WIDTH = disWinWindowedWidth,
            HEIGHT = disWinWindowedHeight;
        rendererDisWinModel.setSize(WIDTH,HEIGHT);
        cameraDisWinModel.aspect = WIDTH / HEIGHT;
        cameraDisWinModel.updateProjectionMatrix();
        renderDisWin();
    });

    rendererDisWinModel = new THREE.WebGLRenderer({antialias:true});
    rendererDisWinModel.setSize(disWinWindowedWidth,disWinWindowedHeight);
    //document.body.appendChild(disWinWindowed);
    disWinWindowed.appendChild(rendererDisWinModel.domElement);

    controlsDisWin = new THREE.OrbitControls(cameraDisWinModel, rendererDisWinModel.domElement);
    controlsDisWin.addEventListener('change', renderDisWin);

    hlightDisWin = new THREE.AmbientLight(spotlightColor,100);
    sceneDisWinModel.add(hlightDisWin);

    directionalLightDisWin = new THREE.DirectionalLight(spotlightColor,100); //0xc5c5c5
    directionalLightDisWin.position.set(0,1,0);
    directionalLightDisWin.castShadow = true;
    sceneDisWinModel.add(directionalLightDisWin);                      

    let loaderDisWin = new THREE.GLTFLoader();
    loaderDisWin.load(modelLocationDisWin, function(gltf){        
        disWinModel = gltf.scene.children[0];
        disWinModel.scale.set(disWinModelScale, disWinModelScale, disWinModelScale);
        
        // center the model in view code
        const boxDisWin = new THREE.Box3().setFromObject(disWinModel);
        const vectorDisWin = new THREE.Vector3();
        boxDisWin.getCenter(vectorDisWin);
        disWinModel.position.set(-vectorDisWin.x, -vectorDisWin.y, -vectorDisWin.z);

        sceneDisWinModel.add(gltf.scene);
        renderDisWin();
    });
}

function renderDisWin(){
    rendererDisWinModel.render(sceneDisWinModel, cameraDisWinModel);
}

//disWinModelLoader("", "");