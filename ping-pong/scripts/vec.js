export default class Vec {
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }

    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }

    reflect(direction) {
        if (direction === 'horizontal') {
            return new Vec(this.x, this.y * -1);
        } if (direction === 'vertical') {
            return new Vec(this.x * -1, this.y);
        }
    }
}
