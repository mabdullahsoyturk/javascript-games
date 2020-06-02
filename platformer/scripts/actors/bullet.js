import Vec from "../vec.js";
import State from "../state.js";

class Bullet {
    static speed = 3;
    constructor(pos, direction, angle, status) {
        this.pos = pos;
        this.direction = direction;
        this.angle = angle;
        this.status = status; // new, alive, died
        this.size = new Vec(0.2, 0.2);
    }
    get type() { return "bullet"; }

    static create(pos, angle) {
        const rads = -angle * Math.PI / 180;
        return new Bullet(pos, new Vec(this.speed*Math.sin(rads), this.speed*Math.cos(rads)), angle, 'new');
    }

    update(time, state) {
        let newPos = this.pos.plus(this.direction.times(time));
        if (!state.level.touches(newPos, this.size, "wall")) {
            return new Bullet(newPos, this.direction, this.angle, 'alive');
        } else {
            this.status = 'died';
            return this;
        }
    }

    collide(state) {
        return new State(state.level, state.actors, "lost");
    }
}

export default Bullet;