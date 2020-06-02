import Vec   from "../vec.js";
import State from "../state.js"; 

// They mostly just sit in their place. But to liven up the game a little, they are given a “wobble”, a slight vertical back-and-forth motion.
// To track this, a coin object stores a base position as well as a wobble property that tracks the phase of the bouncing motion.
// Together, these determine the coin’s actual position (stored in the pos property).
class Coin {
    constructor(pos, basePos, wobble) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
        this.size = new Vec(0.6, 0.6);
        this.wobbleSpeed = 8;
        this.wobbleDist = 0.07;
    }

    get type() { return "coin"; }

    static create(pos) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }

    update(time) {
        let wobble = this.wobble + time * this.wobbleSpeed;
        let wobblePos = Math.sin(wobble) * this.wobbleDist;
        return new Coin(this.basePos.plus(new Vec(0, wobblePos)),
            this.basePos, wobble);
    }

    collide(state) {
        let filtered = state.actors.filter(a => a !== this);
        let status = state.status;
        if (!filtered.some(a => a.type === "coin")) {
            status = "won";
        }
        return new State(state.level, filtered, status);
    }
}

export default Coin;