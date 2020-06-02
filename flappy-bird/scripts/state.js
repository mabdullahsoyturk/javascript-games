import Wall from "./actors/wall.js";
class State {

    static newWallTime = 2;

    constructor(level, actors, status, timer) {
        this.level = level;
        this.actors = actors;
        this.status = status;  // Playing, Lost, Win
        this.timer = timer;
    }

    static start(level) {
        return new State(level, level.startActors, "playing", 0);
    }

    get player() {
        return this.actors.find(a => a.type === "player");
    }
}

State.prototype.update = function(time, keys) {
    State.newWallTime = 4;
    this.timer = this.timer + time;
    if (Math.round(this.timer) === State.newWallTime ){
        // create new Wall
        this.timer = 0;
        this.actors.push(Wall.create());
    }

    let actors = this.actors.map(actor => actor.update(time, this, keys));

    let newState = new State(this.level, actors, this.status, this.timer);
    if (newState.status !== "playing") return newState;

    let player = newState.player;

    for (let actor of actors) {
        if (actor !== player && overlap(actor, player)) {
            newState = actor.collide(newState);
        }
    }
    return newState;
};

function overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
        actor1.pos.x < actor2.pos.x + actor2.size.x &&
        actor1.pos.y + actor1.size.y > actor2.pos.y &&
        actor1.pos.y < actor2.pos.y + actor2.size.y;
}

export default State;