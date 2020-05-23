const rotateRightButton = document.getElementById("rotateRight");
rotateRightButton.addEventListener("click", onRotate);

const rotateLeftButton = document.getElementById("rotateLeft");
rotateLeftButton.addEventListener("click", onRotate);

let rotationDegree = 0;

function onRotate(event) {
    const buttonId = event.target.id;
    
    const touchedGround = rotationDegree >= 45 || rotationDegree <= -45 ? true: false;
    displayMessage(touchedGround);

    rotationDegree = buttonId === 'rotateRightButton' ? rotationDegree + 5: rotationDegree - 5;
    rotateSeesaw();
}

function displayMessage(touchedGround) {
    const groundMessage = document.getElementById("groundMessage");
    groundMessage.style.display = touchedGround ? "block": "none";
}

function rotateSeesaw() {
    if(rotationDegree >= 45 || rotationDegree <= -45) return;

    const rotateString = "rotate(".concat(rotationDegree).concat("deg)");
    const seesawWrapper = document.getElementById("seesawWrapper");
    
    seesawWrapper.style.transform = rotateString;
}