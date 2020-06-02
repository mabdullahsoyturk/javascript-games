import Vec from "../vec.js";
import Level from "../level.js";
import State from "../state.js";

class Wall {

    static speed = new Vec(-7, 0);

    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    get type() { return "wall"; }

    static create() {
        return new Wall(new Vec(Level.size.x, Math.random()*Level.size.y), new Vec(2, 5));
    }
}

Wall.prototype.collide = function(state) {
    return new State(state.level, state.actors, "lost", state.timer);
};

Wall.prototype.update = function(time, state) {
    let newPos = this.pos.plus(Wall.speed.times(time));
    // if (!state.level.touches(newPos, this.size, "wall")) {
        return new Wall(newPos, this.size);
    // } else {
    //     return Wall.create();
    // }
};

export default Wall;