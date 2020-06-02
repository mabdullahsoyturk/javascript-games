import Vec from "../vec.js";

class Player {
    constructor() {
        this.pos = new Vec(10, 10);
        this.speed = new Vec(0, 0);
        this.size = new Vec(1 ,1);
        this.gravity = 30;
        this.jumpSpeed = 17;
    }

    get type() { return "player"; }

    update(time, state, keys) {
        let pos = this.pos;
        let ySpeed = this.speed.y + time * this.gravity;
        let movedY = pos.plus(new Vec(0, ySpeed * time));
        if (!state.isOutside(movedY, this.size, "player")) {
            pos = movedY;
        } else {
            state.status = 'lost';
        }
        if (keys.ArrowUp && ySpeed > 0) {
            ySpeed = -this.jumpSpeed;
        }
        this.pos = pos;
        this.speed = new Vec(0, ySpeed);
        return this;
    }
}

export default Player;