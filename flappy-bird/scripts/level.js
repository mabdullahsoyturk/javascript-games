import Player from "./actors/player.js";
import Vec from "./vec.js";
import DOMDisplay from "./domDisplay.js";

class Level {
    static size = new Vec(35,25);

    constructor() {
        this.startActors = []
        this.startActors.push(Player.create());
    }
}

Level.prototype.touches = function (pos, size, type) {
    var xStart = Math.floor(pos.x);
    var xEnd = Math.ceil(pos.x + size.x);
    var yStart = Math.floor(pos.y);
    var yEnd = Math.ceil(pos.y + size.y);

    for (var y = yStart; y < yEnd; y++) {
        for (var x = xStart; x < xEnd; x++) {
            let isOutside = x < 0 || x >= Level.size.x || y < 0 || y >= Level.size.y;
            let here = isOutside ? "wall" : null;
            if (here === type) return true;
        }
    }
    return false;
};

export default Level;