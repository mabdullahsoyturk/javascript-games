// They mostly just sit in their place. But to liven up the game a little, they are given a “wobble”, a slight vertical back-and-forth motion.
// To track this, a coin object stores a base position as well as a wobble property that tracks the phase of the bouncing motion.
// Together, these determine the coin’s actual position (stored in the pos property).
class Coin {
    constructor(pos, basePos, wobble) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
    }

    get type() { return "coin"; }

    static create(pos) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }
}

Coin.prototype.size = new Vec(0.6, 0.6);

Coin.prototype.collide = function(state) {
    let filtered = state.actors.filter(a => a !== this);
    let status = state.status;
    if (!filtered.some(a => a.type === "coin")) {
        status = "won";
    }
    return new State(state.level, filtered, status);
};

const wobbleSpeed = 8, wobbleDist = 0.07;

Coin.prototype.update = function(time) {
    let wobble = this.wobble + time * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(this.basePos.plus(new Vec(0, wobblePos)),
        this.basePos, wobble);
};