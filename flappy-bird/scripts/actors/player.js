import Vec from "../vec.js";

class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }

    get type() { return "player"; }

    static create(pos) {
        return new Player(new Vec(10, 10), new Vec(0, 0));
    }
}

Player.prototype.size = new Vec(1, 1);

const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function(time, state, keys) {
    let pos = this.pos;
    let ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (state.level.touches(movedY, this.size, "wall")) {
        //  TODO: öldür veya collide vs burda olabilir.
    } else {
        pos = movedY;
    }
    if (keys.ArrowUp && ySpeed > 0) {
        ySpeed = -jumpSpeed;
    }
    return new Player(pos, new Vec(0, ySpeed));
};

export default Player;