import Vec from "../vec.js";
import State from "../state.js";
import Bullet from "./bullet.js";

class Lasergun {

    static firingAngle = 30;
    constructor(pos, speed, angle) {
        this.pos = pos;
        this.speed = speed;
        this.angle = angle;
    }

    get type() { return "lasergun"; }

    static create(pos) {
        return new Lasergun(pos, new Vec(0, 0), 0);
    }
}

Lasergun.prototype.update = function(time, state) {
    const newLasergun = new Lasergun(this.pos, this.speed,(this.angle + 50*time)%360 );
    this.fire(time, state);

    return newLasergun;
};

Lasergun.prototype.collide = function(state) {
    return new State(state.level, state.actors, "lost");
};

Lasergun.prototype.fire = function(time, state) {
    if (Math.round(this.angle) % Lasergun.firingAngle === 0) {
        state.actors.push(Bullet.create(this.pos, this.angle));
    }
};

Lasergun.prototype.size = new Vec(0.2, 0.8);

export default Lasergun;