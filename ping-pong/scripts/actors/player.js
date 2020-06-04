import Vec from "../vec.js";
import State from "../state.js";

export default class Player {

    constructor() {
        this.pos = new Vec(0, Math.round(State.mapSize.y/2));
        this.size = new Vec(0.5 ,4);
        this.playerYSpeed = 17;
    }

    get type() { return "player"; }

    update(time, state, keys) {
        let ySpeed = 0;
        if (keys.ArrowUp) ySpeed -= this.playerYSpeed;
        if (keys.ArrowDown) ySpeed += this.playerYSpeed;

        let movedY = this.pos.plus(new Vec(0, ySpeed * time));
        if (!state.isTouchedToWall(movedY, this.size)) {
            this.pos = movedY;
        }
        return this;
    }
}