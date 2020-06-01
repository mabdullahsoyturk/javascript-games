import Vec   from "../vec.js";
import State from "../state.js"; 

class Lava {
    // When constructing a Lava actor, we need to initialize the object differently depending on the character it is based on.
    // Dynamic lava moves along at its current speed until it hits an obstacle.
    // At that point, if it has a reset property, it will jump back to its start position (dripping).
    // If it does not, it will invert its speed and continue in the other direction (bouncing).
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }

    get type() { return "lava"; }

    static create(pos, ch) {
        if (ch == "=") {
            return new Lava(pos, new Vec(2, 0));
        } else if (ch == "|") {
            return new Lava(pos, new Vec(0, 2));
        } else if (ch == "v") {
            return new Lava(pos, new Vec(0, 3), pos);
        }
    }
}

Lava.prototype.size = new Vec(1, 1);

Lava.prototype.collide = function(state) {
    return new State(state.level, state.actors, "lost");
};

Lava.prototype.update = function(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
        return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
        return new Lava(this.reset, this.speed, this.reset);
    } else {
        return new Lava(this.pos, this.speed.times(-1));
    }
};

export default Lava;