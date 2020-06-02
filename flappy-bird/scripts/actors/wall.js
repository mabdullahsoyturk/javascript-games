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
        const walls = [];
        const random = Math.random()*16 + 2;
        const compliment =  18 - random;
        walls.push(new Wall(new Vec(Level.size.x, 0), new Vec(2, random)));
        walls.push(new Wall(new Vec(Level.size.x, Level.size.y-compliment), new Vec(2, compliment)));
        return walls;
    }
}

Wall.prototype.collide = function(state) {
    return new State(state.level, state.actors, "lost", state.timer);
    // return state;
};

Wall.prototype.update = function(time, state) {
    let newPos = this.pos.plus(Wall.speed.times(time));
    if (!state.level.isOutside(newPos, this.size, "wall")) {
        return new Wall(newPos, this.size);
    } else {
        return null;
    }
};

export default Wall;