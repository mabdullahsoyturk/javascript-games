const rotateRightButton = $("#rotateRight");
rotateRightButton.click(rotate);

const rotateLeftButton = $("#rotateLeft");
rotateLeftButton.click(rotate);

let rotationDegree = 0;

function rotate() {
    const buttonId = $(this).attr('id');
    
    const touchedGroundFromRight = rotationDegree >= 45 ? true: false;
    const touchedGroundFromLeft = rotationDegree <= -45 ? true: false;
    touchedToGround(touchedGroundFromLeft, touchedGroundFromRight);

    rotationDegree = buttonId === 'rotateRight' ? rotationDegree + 5: rotationDegree - 5;
    rotateSeesaw();
}

function touchedToGround(fromLeft, fromRight) {
    const groundMessage = $("#groundMessage");

    if(fromLeft) {
        groundMessage.html("Seesaw touched the ground from left!!!");
        groundMessage.css("display", "block");
    }else if(fromRight) {
        groundMessage.html("Seesaw touched the ground from right!!!");
        groundMessage.css("display", "block");
    }else {
        groundMessage.css("display", "none");
    }
}

function rotateSeesaw() {
    if(rotationDegree >= 45 || rotationDegree <= -45) return;

    rotateString = "rotate(".concat(rotationDegree).concat("deg)");
    $(".seesaw-wrapper").css("transform", rotateString);
}