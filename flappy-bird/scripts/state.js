import Wall from "./actors/wall.js";
import Vec from "./vec.js";

class State {
    static mapSize = new Vec(35,25);

    constructor(player, status) {
        this.actors = [player];
        this.status = status;  // Playing, Lost, Win
        this.newWallTime = 2;
        this.size = State.mapSize;
        this.timer = 0;
    }

    get player() {
        return this.actors.find(a => a.type === "player");
    }

    createWalls() {
        const walls = [];
        const upWallHeight = Math.random()*16 + 2;
        const complimentWallHeight =  18 - upWallHeight;
        walls.push(new Wall(new Vec(this.size.x, 0), upWallHeight));
        walls.push(new Wall(new Vec(this.size.x, this.size.y-complimentWallHeight), complimentWallHeight));
        return walls;
    }

    update(time, keys) {
        this.newWallTime = 3;
        this.timer = this.timer + time;
        if (Math.round(this.timer) === this.newWallTime ){
            this.timer = 0;
            this.createWalls().forEach(wall => this.actors.push(wall));
        }
    
        this.actors = this.actors.map(actor => actor.update(time, this, keys));
        this.actors = this.actors.filter(actor => actor !== null);
    
        for (let actor of this.actors) {
            if (actor !== this.player && this.overlap(actor, this.player)) {
                this.status = "lost";
            }
        }
    }

    overlap(actor1, actor2) {
        return actor1.pos.x + actor1.size.x > actor2.pos.x &&
            actor1.pos.x < actor2.pos.x + actor2.size.x &&
            actor1.pos.y + actor1.size.y > actor2.pos.y &&
            actor1.pos.y < actor2.pos.y + actor2.size.y;
    }

    isOutside(pos, size, type) {
        const xStart = Math.floor(pos.x);
        const xEnd = Math.ceil(pos.x + size.x);
        const yStart = Math.floor(pos.y);
        const yEnd = Math.ceil(pos.y + size.y);
        let isOutside = false;
        if (type === 'player') {
            for (let y = yStart; y < yEnd; y++) {
                isOutside = y < 0 || y >= this.size.y;
                if (isOutside) {
                    return true;
                }
            }
        } else if (type === 'wall') {
            for (let x = xStart; x < xEnd; x++) {
                isOutside = x < -size.x;
                if (isOutside) {
                    return true;
                }
            }
        }
        return false;
    }
}

export default State;