rotateRightButton = $("#rotateRight");
rotateRightButton.click(rotateRight);

rotateLeftButton = $("#rotateLeft");
rotateLeftButton.click(rotateLeft);

groundMessage = $("#groundMessage");

rotationDegree = 0;
touchedGround = false;

function rotateRight() {
    touchedGround = rotationDegree >= 45 ? true: false;
    if(touchedGround) {
        groundMessage.html("Seesaw touched the ground!!!");
        groundMessage.css("display", "block");
        return;
    }else {
        groundMessage.css("display", "none");
    }
    rotationDegree = rotationDegree + 5;
    rotateString = "rotate(".concat(rotationDegree).concat("deg)");
    $(".seesaw").css("transform", rotateString);
}

function rotateLeft() {
    touchedGround = rotationDegree <= -45 ? true: false;
    if(touchedGround) {
        groundMessage.html("Seesaw touched the ground!!!");
        groundMessage.css("display", "block");
        return;
    }else {
        groundMessage.css("display", "none");
    }
    rotationDegree = rotationDegree - 5;
    rotateString = "rotate(".concat(rotationDegree).concat("deg)");
    $(".seesaw").css("transform", rotateString);
}