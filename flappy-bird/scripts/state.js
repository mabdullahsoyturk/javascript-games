import Wall from "./actors/wall.js";
class State {
    constructor(level, actors, status, timer) {
        this.level = level;
        this.actors = actors;
        this.status = status;  // Playing, Lost, Win
        this.timer = timer;
        this.newWallTime = 2;
    }

    get player() {
        return this.actors.find(a => a.type === "player");
    }

    update(time, keys) {
        this.newWallTime = 3;
        this.timer = this.timer + time;
        if (Math.round(this.timer) === this.newWallTime ){
            // create new Wall
            this.timer = 0;
            Wall.create().forEach(wall => this.actors.push(wall));
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
}

export default State;