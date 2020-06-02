import Vec from "../vec.js";

class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
        this.gravity = 30;
        this.jumpSpeed = 17;
        this.size = new Vec(1 ,1);
    }

    get type() { return "player"; }

    static create(pos) {
        return new Player(new Vec(10, 10), new Vec(0, 0));
    }

    update(time, state, keys) {
        let pos = this.pos;
        let ySpeed = this.speed.y + time * this.gravity;
        let movedY = pos.plus(new Vec(0, ySpeed * time));
        if (state.level.isOutside(movedY, this.size, "player")) {
            //  TODO: collide?
        } else {
            pos = movedY;
        }
        if (keys.ArrowUp && ySpeed > 0) {
            ySpeed = -this.jumpSpeed;
        }
        return new Player(pos, new Vec(0, ySpeed));
    }
}

export default Player;