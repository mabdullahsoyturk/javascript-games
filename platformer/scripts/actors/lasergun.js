import Vec from "../vec.js";
import State from "../state.js";
import Bullet from "./bullet.js";

class Lasergun {

    constructor(pos, speed, angle) {
        this.pos = pos;
        this.speed = speed;
        this.angle = angle;
        this.size = new Vec(0.2, 0.8);
        this.firingAngle = 30;
    }

    get type() { return "lasergun"; }

    static create(pos) {
        return new Lasergun(pos, new Vec(0, 0), 0);
    }

    update(time, state) {
        const newLasergun = new Lasergun(this.pos, this.speed,(this.angle + 50*time)%360 );
        this.fire(state);

        return newLasergun;
    }

    collide(state) {
        let filtered = state.actors.filter(a => a !== this); // deactivate lasergun when touched
        return new State(state.level, filtered, state.status);
    }

    fire(state) {
        if (Math.round(this.angle) % this.firingAngle === 0) {
            state.actors.push(Bullet.create(this.pos, this.angle));
        }
    }
}

export default Lasergun;