import Vec from "./vec.js";
import Mixer from "./actors/mixer.js";

export default class State {

    static mapSize = new Vec(35,25);

    constructor(player, competitor, ball, status) {
        this.actors = [player, competitor, ball, new Mixer('top'), new Mixer('bottom')];
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

    get mixers() {
        return this.actors.filter(a => a.type === "mixer");
    }

    update(time, keys) {
        this.ball.update(time, this, keys);
        this.player.update(time, this, keys);
        this.competitor.update(time, this, this.ball.yCenterPos);
        this.mixers.forEach(mixer => {
            mixer.update(time);
        })
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


    // rect -> Pos(x,y), size(x,y)
    isRectCollideWithCircle(rect, circle) {
        const rectCorner1 = rect.pos;
        const rectCorner2 = rect.pos.plus(new Vec(rect.size.x, 0));
        const rectCorner3 = rect.pos.plus(new Vec(rect.size.x, rect.size.y));
        const rectCorner4 = rect.pos.plus(new Vec(0, rect.size.y));

        if (this.isLineCollideWithCircle(circle, rectCorner1, rectCorner2)) {
            return true;
        } else if (this.isLineCollideWithCircle(circle, rectCorner1, rectCorner4)) {
            return true;
        } else if (this.isLineCollideWithCircle(circle, rectCorner2, rectCorner3)) {
            return true;
        } else if (this.isLineCollideWithCircle(circle, rectCorner3, rectCorner4)) {
            return true;
        }
        return false;
    }

    //http://www.jeffreythompson.org/collision-detection/line-circle.php

    isPointInsideCircle(circle, point) {
        const distance = this.dist(circle.centerPos, point)
        return distance <= circle.radius;
    }

    // linePoint1 -> Vec(x1,y1)
    // linePoint2 -> Vec(x2,y2)
    isLineCollideWithCircle(circle, linePoint1, linePoint2) {

        // is either end INSIDE the circle?
        // if so, return true immediately
        const isPoint1InsideCircle = this.isPointInsideCircle(circle, linePoint1);
        const isPoint2InsideCircle = this.isPointInsideCircle(circle, linePoint2);
        if (isPoint1InsideCircle || isPoint2InsideCircle) return true;


        const x1 = linePoint1.x;
        const y1 = linePoint1.y;
        const x2 = linePoint2.x;
        const y2 = linePoint2.y;

        const cx = circle.centerPos.x;
        const cy = circle.centerPos.y;

        // get length of the line
        // const distX = x1 - x2;
        // const distY = y1 - y2;
        const len = this.dist(linePoint1, linePoint2);

        // get dot product of the line and circle
        const dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

        // find the closest point on the line
        const closestX = x1 + (dot * (x2-x1));
        const closestY = y1 + (dot * (y2-y1));

        // is this point actually on the line segment?
        // if so keep going, but if not, return false
        const onSegment = this.isPointOnTheLine(new Vec(closestX,closestY), linePoint1, linePoint2);
        if (!onSegment) return false;


        // get distance to closest point
        const distance = this.dist(circle.centerPos, new Vec(closestX, closestY));
        return distance <= circle.radius;
    }


    dist(point1, point2) {
        const distX = point1.x - point2.x;
        const distY = point1.y - point2.y;
        return Math.sqrt( (distX*distX) + (distY*distY) );
    }


    isPointOnTheLine(point, linePoint1, linePoint2) {
        const px = point.x;
        const py = point.y;
        const x1 = linePoint1.x;
        const y1 = linePoint1.y;
        const x2 = linePoint2.x;
        const y2 = linePoint2.y;


        // get distance from the point to the two ends of the line
        const d1 = this.dist(px,py, x1,y1);
        const d2 = this.dist(px,py, x2,y2);

        // get the length of the line
        const lineLen = this.dist(linePoint1, linePoint2);

        // since floats are so minutely accurate, add
        // a little buffer zone that will give collision
        const buffer = 0.1;    // higher # = less accurate

        // if the two distances are equal to the line's
        // length, the point is on the line!
        // note we use the buffer here to give a range,
        // rather than one #
        return d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer;
    }
}
