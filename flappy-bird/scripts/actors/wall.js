import Vec from "../vec.js";
import Level from "../level.js";
import State from "../state.js";

class Wall {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
        this.speed = new Vec(-7, 0);
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

    update(time, state) {
        let newPos = this.pos.plus(this.speed.times(time));
        if (!state.level.isOutside(newPos, this.size, "wall")) {
            return new Wall(newPos, this.size);
        } else {
            return null;
        }
    }
}

export default Wall;