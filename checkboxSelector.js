let modelDisplayer = new Set();

const topDisShutoffLeft = document.getElementById("fwd-left-window");
const topDisShutoffCenter = document.getElementById("rwd-center-model");
const topDisShutoffRight = document.getElementById("awd-right-window");

const fwdCheckbox = document.getElementById("fwd-checkbox");
const rwdCheckbox = document.getElementById("rwd-checkbox");
const awdCheckbox = document.getElementById("awd-checkbox");

const fwdDropdown = document.getElementById("fwd-dropdown");
const rwdDropdown = document.getElementById("rwd-dropdown");
const awdDropdown = document.getElementById("awd-dropdown");

const partsDropdown = document.getElementById("parts-dropdown");
const partsImageSelection = document.getElementById("parts-image");
const imageDisplayWindow = document.getElementById("model-display-window");

function changeBGImage(){
    imageDisplayWindow.style.backgroundImage = "url('')";

    if(partsImageSelection.value === "3-star-flange") imageDisplayWindow.style.backgroundImage = "url('images/gifs/3-STAR-FLANGE.gif')";
    else if(partsImageSelection.value === "4-bolt-flange") imageDisplayWindow.style.backgroundImage = "url('images/gifs/4-Bolt-Flange.gif')";
    else if(partsImageSelection.value === "4-star-flange") imageDisplayWindow.style.backgroundImage = "url('images/gifs/4-STAR-FLANGE.gif')";
    else if(partsImageSelection.value === "6-bolt-flange") imageDisplayWindow.style.backgroundImage = "url('images/gifs/6-Bolt-Flange.gif')";
    else if(partsImageSelection.value === "center-support-bearing") imageDisplayWindow.style.backgroundImage = "url('images/gifs/Center-Support-Bearing.gif')";
    else if(partsImageSelection.value === "driveshaft-tube") imageDisplayWindow.style.backgroundImage = "url('images/gifs/Driveshaft-Tube.gif')";
    else if(partsImageSelection.value === "flange-yoke-1944") imageDisplayWindow.style.backgroundImage = "url('images/gifs/FLANGE-YOKE-1944.gif')";
    else if(partsImageSelection.value === "flange-yoke-jk") imageDisplayWindow.style.backgroundImage = "url('images/gifs/FLANGE-YOKE-JK.gif')";
    else if(partsImageSelection.value === "flange-yoke") imageDisplayWindow.style.backgroundImage = "url('images/gifs/FLANGE-YOKE.gif')";
    else if(partsImageSelection.value === "slip-yoke") imageDisplayWindow.style.backgroundImage = "url('images/gifs/Slip-Yoke.gif')";
    else if(partsImageSelection.value === "stub-shaft") imageDisplayWindow.style.backgroundImage = "url('images/gifs/STUB-SHAFT.gif')";
    else if(partsImageSelection.value === "trans-yoke") imageDisplayWindow.style.backgroundImage = "url('images/gifs/Trans-Yoke.gif')";
    else if(partsImageSelection.value === "transfer-case") imageDisplayWindow.style.backgroundImage = "url('images/gifs/Transfer-Case.gif')";
    else if(partsImageSelection.value === "transmission-rear-end") imageDisplayWindow.style.backgroundImage = "url('images/gifs/Transmission-Rear-End.gif')";
    else if(partsImageSelection.value === "transmission-tail-housing") imageDisplayWindow.style.backgroundImage = "url('images/gifs/Transmission-Tail-Housing.gif')";
    else if(partsImageSelection.value === "weld-yoke") imageDisplayWindow.style.backgroundImage = "url('images/gifs/WELD-YOKE.gif')";
}

addEventListener('load', (event) => {
    var inputs = document.getElementsByTagName('input');
    for(var i = 0; i<inputs.length; i++){
        inputs[i].checked = false;
    }
})

function onlyOne(checkbox){
    var checkboxes = document.getElementsByName("drive-type");
    checkboxes.forEach((item) => {
        if(item !== checkbox) item.checked = false;        
    });
}

function vehicleType(){
    if(fwdCheckbox.checked == false && rwdCheckbox.checked == false && awdCheckbox.checked == false){        
        topDisShutoffLeft.classList.remove("hide-element");
        topDisShutoffCenter.classList.remove("hide-element");
        topDisShutoffRight.classList.remove("hide-element");

        fwdDropdown.classList.add("hide-element");
        rwdDropdown.classList.add("hide-element");
        awdDropdown.classList.add("hide-element");
        partsDropdown.classList.add("hide-element");

        //modelDisplayer.clear();
    }

    if(fwdCheckbox.checked){
        topDisShutoffLeft.classList.remove("hide-element");
        topDisShutoffCenter.classList.add("hide-element");
        topDisShutoffRight.classList.add("hide-element");

        fwdDropdown.classList.remove("hide-element");
        rwdDropdown.classList.add("hide-element");
        awdDropdown.classList.add("hide-element");
        partsDropdown.classList.remove("hide-element");

        //modelDisplayer.add(disWinModelLoader("fwdVehicleModel/scene.gltf", 0.3));
        //console.log(modelDisplayer);
        //renderDisWin();
    }else{
        //modelDisplayer.clear();
        //console.log(modelDisplayer);
    }

    if(rwdCheckbox.checked){
        topDisShutoffLeft.classList.add("hide-element");
        topDisShutoffCenter.classList.remove("hide-element");
        topDisShutoffRight.classList.add("hide-element");

        fwdDropdown.classList.add("hide-element");
        rwdDropdown.classList.remove("hide-element");
        awdDropdown.classList.add("hide-element");
        partsDropdown.classList.remove("hide-element");
    }

    if(awdCheckbox.checked){
        topDisShutoffLeft.classList.add("hide-element");
        topDisShutoffCenter.classList.add("hide-element");
        topDisShutoffRight.classList.remove("hide-element");

        fwdDropdown.classList.add("hide-element");
        rwdDropdown.classList.add("hide-element");
        awdDropdown.classList.remove("hide-element");
        partsDropdown.classList.remove("hide-element");
    }
}