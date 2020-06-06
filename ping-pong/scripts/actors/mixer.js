import Vec from "../vec.js";
import State from "../state.js";

export default class Mixer {

    constructor(direction) {
        this.direction = direction;
        this.size = new Vec(0.5 ,4);
        if (direction === 'top') {
            this.pos = new Vec(Math.round(State.mapSize.x/2), 0);
        } else {
            this.pos = new Vec(Math.round(State.mapSize.x/2), State.mapSize.y-this.size.y);
        }
        this.angle = 23;
        this.rotateSpeed = 100;
        this.directionTemp = 1;
    }

    get type() { return "mixer"; }


    update(time, state) {
        if (Math.round(this.angle) === 90 || Math.round(this.angle) === 270 ||
            Math.round(this.angle) === -90 || Math.round(this.angle) === -270) {
            this.directionTemp *= -1;
        }
        this.angle = (this.angle + (this.directionTemp * time * this.rotateSpeed))%360;
        return this;
    }
}