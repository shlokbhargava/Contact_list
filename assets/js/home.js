console.log('My script has been loaded');

function toggle(){
    var displayButton = document.getElementById("delete-button");
    if(displayButton.style.display === "none"){
        displayButton.style.display = "block";
    }
    else{
        displayButton.style.display = "none";
    }

}