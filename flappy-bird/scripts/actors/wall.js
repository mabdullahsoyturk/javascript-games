import Vec from "../vec.js";

class Wall {
    constructor(pos, wallHeight) {
        this.pos = pos;
        this.size = new Vec(2, wallHeight);
        this.speed = new Vec(-7, 0);
    }
    get type() { return "wall"; }

    update(time, state) {
        let newPos = this.pos.plus(this.speed.times(time));
        if (!state.isOutside(newPos, this.size, "wall")) {
            this.pos = newPos;
            return this;
        } else {
            return null;
        }
    }
}

export default Wall;