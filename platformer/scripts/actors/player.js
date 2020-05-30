class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }

    get type() { return "player"; }

    static create(pos) {
        // Because a player is one-and-a-half squares high, its initial position is set to be half a square above the position where the @ character appeared.
        // This way, its bottom aligns with the bottom of the square it appeared in.
        return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
    }
}

// The size property is the same for all instances of Player, so we store it on the prototype rather than on the instances themselves.
// We could have used a getter like type, but that would create and return a new Vec object every time the property is read, which would be wasteful.
// (Strings, being immutable, don’t have to be re-created every time they are evaluated.)
Player.prototype.size = new Vec(0.8, 1.5);

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function(time, state, keys) {
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
        pos = movedX;
    }


    // We check for walls again. If we don’t hit any, the new position is used. If there is a wall, there are two possible outcomes.
    // When the up arrow is pressed and we are moving down (meaning the thing we hit is below us), the speed is set to a relatively large, negative value.
    // This causes the player to jump. If that is not the case, the player simply bumped into something, and the speed is set to zero.
    let ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
        pos = movedY;
    } else if (keys.ArrowUp && ySpeed > 0) {
        ySpeed = -jumpSpeed;
    } else {
        ySpeed = 0;
    }
    return new Player(pos, new Vec(xSpeed, ySpeed));
};