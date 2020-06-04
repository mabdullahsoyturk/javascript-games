import Vec from "../vec.js";
import State from "../state.js";

export default class Competitor {
    constructor() {
        this.size = new Vec(0.5 ,4);
        this.pos = new Vec(State.mapSize.x-this.size.x, Math.round(State.mapSize.y/2));
        this.competitorYSpeed = 17;
        this.yCenterPos = this.pos.y + this.size.y/2;
    }

    get type() { return "competitor"; }

    update(time, state, ballYCenterPos) {
        let ySpeed = 0;
        this.yCenterPos = Math.round(this.pos.y + this.size.y/2);

        if (ballYCenterPos > this.yCenterPos) ySpeed += this.competitorYSpeed;
        if (ballYCenterPos < this.yCenterPos) ySpeed -= this.competitorYSpeed;

        let movedY = this.pos.plus(new Vec(0, ySpeed * time));
        if (!state.isTouchedToWall(movedY, this.size)) {
            this.pos = movedY;
        }
        return this;
    }
}