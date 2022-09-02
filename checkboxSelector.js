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
const imageDisplayWindow = document.getElementById("temp-image-display-window");

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