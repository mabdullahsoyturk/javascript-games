const player = $(".player");
const enemy = $(".enemy");
let isJumping = false;
let isGoingUp = false;
let isGoingDown = false;

let counter = 0;
const playgroundPosition = document.querySelector('.playground').getBoundingClientRect();
let level = 2;
$(document).on('keypress',function(e) {
    if(e.which === 119 || e.which === 32) {
        isJumping = true;
    }
});
requestAnimationFrame(mainLoop);

function mainLoop(time) {
    if(isJumping) {
        jump();
    }

    const enemyPosition = document.querySelector('.enemy').getBoundingClientRect();
    const playerPosition = document.querySelector('.player').getBoundingClientRect();

    if(!isElementInsidePlayGround(enemyPosition)) {
        createEnemy();
        level++;
    }

    moveEnemy(level);

    if (collision(enemyPosition,playerPosition)) {
        alert("Game Over");
        restart();
    }
    requestAnimationFrame(mainLoop);
}

function restart() {
    createEnemy();
    level = 2;
    requestAnimationFrame(mainLoop);
}

function moveEnemy(speed) {
    const leftInitial = enemy.css('left');
    enemy.css({
        left: '-=' + speed
    })
    const leftFinal = enemy.css('left');
    console.log(Number(leftFinal.substring(0,leftFinal.length-2)) - Number(leftInitial.substring(0,leftInitial.length-2)));

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
    const random = Math.random() * 50
    enemy.css('left', playgroundPosition.right-25);
    enemy.css('top', playgroundPosition.top+231-random);
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
