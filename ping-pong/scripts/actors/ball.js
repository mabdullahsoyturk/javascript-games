import Vec from "../vec.js";
import State from "../state.js";

export default class Ball {
    constructor() {
        this.initalPosition = new Vec(Math.round(State.mapSize.x/2), Math.round(State.mapSize.y/2));
        this.pos = this.initalPosition;
        this.size = new Vec(0.7 ,0.7);
        this.velocity = 10;
        this.speed = this.initialSpeed();
        this.yCenterPos = this.pos.y + Math.round(this.size.y/2);
    }

    get type() { return "ball"; }

    get centerPos() {
        return new Vec(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2 );
    }

    get radius() {
        return this.size.x/2;
    }

    initialSpeed() {
        const initialAngle = Math.random() * 360;
        const rads = initialAngle * Math.PI / 180;
        return new Vec(Math.round(this.velocity * Math.sin(rads)), Math.round(this.velocity * Math.cos(rads)));
    }

    update(time, state) {
        let newPos = this.pos.plus(this.speed.times(time));
        this.yCenterPos = Math.round(newPos.y + this.size.y/2);

        if (state.isGoal(newPos, this.size)) {
            alert("Goal");
            this.pos = this.initalPosition;
            this.speed = this.initialSpeed();
        } else {
            const isTouched = state.isTouchedToWall(newPos, this.size) || state.isBallTouchedToActors(newPos);
            if (isTouched) {
                this.bounce(isTouched);
            }
            else if (state.isRectCollideWithCircle(state.mixers[0], this)) {
                console.log('Collideeeee');
            }
            this.pos = newPos;
        }

    }

    bounce(touchDirection) {
        if (touchDirection === 'top' || touchDirection === 'bottom') {
            this.speed = this.speed.reflect('horizontal');
        } else if (touchDirection === 'left' || touchDirection === 'right') {
            this.speed = this.speed.reflect('vertical');
        }
    }
}