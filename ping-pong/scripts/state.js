import Vec from "./vec.js";

export default class State {

    static mapSize = new Vec(35,25);

    constructor(player, competitor, ball, status) {
        this.actors = [player, competitor, ball];
        this.status = status;  // Playing, Pausing, Lost, Win
        this.size = State.mapSize;
    }

    get player() {
        return this.actors.find(a => a.type === "player");
    }

    get competitor() {
        return this.actors.find(a => a.type === "competitor");
    }

    get ball() {
        return this.actors.find(a => a.type === "ball");
    }

    update(time, keys) {
        this.ball.update(time, this);
        this.player.update(time, this, keys);
        this.competitor.update(time, this, this.ball.yCenterPos);
    }

    overlap(pos, actor) {
        const tempBall = this.ball;
        tempBall.pos = pos;
        return tempBall.pos.x + tempBall.size.x > actor.pos.x &&
            tempBall.pos.x < actor.pos.x + actor.size.x &&
            tempBall.pos.y + tempBall.size.y > actor.pos.y &&
            tempBall.pos.y < actor.pos.y + actor.size.y;
    }

    isGoal(pos, size) {
        const xStart = Math.floor(pos.x);
        const xEnd = Math.ceil(pos.x + size.x);
        return xStart < 0 || xEnd > this.size.x;
    }

    isTouchedToWall(pos, size) {
        const yStart = Math.floor(pos.y);
        const yEnd = Math.ceil(pos.y + size.y);
        if (yStart < 0) {
            return 'top';
        } else if (yEnd > this.size.y) {
            return 'bottom';
        }
        return false;
    }

    isBallTouchedToActors(pos) {
        if (this.overlap(pos, this.player)) {
            return 'left';
        } else if (this.overlap(pos, this.competitor)) {
            return 'right';
        }
    }
}
