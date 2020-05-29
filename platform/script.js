const playgroundPosition = document.querySelector('.playground').getBoundingClientRect();
const player = $(".player");
const enemy = $(".enemy");
let isMoving = false;
let isJumping = false;
let isGoingUp = false;
let isGoingDown = false;
let isGameOver = false;
let direction = '';
let counter = 0;
let level = 2;
let step = 0;
let keyMap = {87: false, 65: false, 68: false};

$(document).keydown(function(e) {
    if (e.keyCode in keyMap) {
        keyMap[e.keyCode] = true;
        if (keyMap[87]) {
            isJumping = true;
        }
        if (keyMap[65]) {
            isMoving = true;
            direction = 'left';
        } else if (keyMap[68]) {
            isMoving = true;
            direction = 'right';
        }
    }
}).keyup(function(e) {
    if (e.keyCode in keyMap) {
        keyMap[e.keyCode] = false;
    }
});

requestAnimationFrame(mainLoop);

function mainLoop(time) {

    const enemyPosition = document.querySelector('.enemy').getBoundingClientRect();
    const playerPosition = document.querySelector('.player').getBoundingClientRect();

    if(isJumping) {
        jump();
    }

    if (isMoving) {
        move(playerPosition, direction);
    }

    if(!isElementInsidePlayGround(enemyPosition) && !isGameOver) {
        createEnemy();
        level++;
    }

    moveEnemy(level);

    if (collision(enemyPosition, playerPosition)) {
        isGameOver = true;
        alert("Game Over");
        restart();
    } else {
        requestAnimationFrame(mainLoop);
    }
}

function restart() {
    player.css("left",'350px');
    createEnemy();
    level = 2;
    isGameOver= false;
    requestAnimationFrame(mainLoop);
}

function moveEnemy(speed) {
    enemy.css({
        left: '-=' + speed
    })
}

function move(playerPosition, direction) {
    if (step === 5) {
        isMoving = false;
        step = 0;
    }
    if (direction === 'right') {
        let tempPosition = playerPosition.toJSON();
        tempPosition.right += 5;
        if (isElementInsidePlayGround(tempPosition)) {
            player.css({
                left: '+=5'
            });
            step++;
        }
    } else if (direction === 'left') {
        let tempPosition = playerPosition.toJSON();
        tempPosition.left -= 5;
        if (isElementInsidePlayGround(tempPosition)) {
            player.css({
                left: '-=5'
            });
            step++;
        }
    }
    else {
        step = 5;
    }
}

function jump() {
    if (counter === 0) {
        isGoingUp = true;
        isGoingDown = false;
    } else if (counter === 100) {
        isGoingUp = false;
        isGoingDown = true;
    }

    if (isGoingUp) {
        counter+=5;
        player.css({
            top: '-=5'
        });
    } else if (isGoingDown) {
        counter-=5;
        player.css({
            top: '+=5'
        });
        if (counter === 0) {
            isJumping = false;
            isGoingDown = false;
        }
    }
}

function createEnemy() {
    enemy.css('left', playgroundPosition.right-25);
    enemy.css('top', playgroundPosition.top+231-Math.random() * 50);
}

function isElementInsidePlayGround(elementPosition) {
    return elementPosition.right < playgroundPosition.right &&
        elementPosition.left > playgroundPosition.left &&
        elementPosition.top > playgroundPosition.top &&
        elementPosition.bottom < playgroundPosition.bottom;
}

function collision(div1Pos, div2Pos) {
    const a = div1Pos;
    const b = div2Pos;
    return ! (a.bottom < b.top || a.top > b.bottom || a.right < b.left || a.left > b.right);
}
