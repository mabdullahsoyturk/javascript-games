import Player from "./actors/player.js";
import Coin from "./actors/coin.js";
import Lava from "./actors/lava.js";
import Lasergun from "./actors/lasergun.js";
import Monster from "./actors/monster.js";
import Vec from "./vec.js";

class Level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map(l => [...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];
        this.levelChars = {
            ".": "empty", "#": "wall", "+": "lava",
            "@": Player, "o": Coin,
            "=": Lava, "|": Lava, "v": Lava,
            "x": Lasergun,
            "M": Monster
        };

        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = this.levelChars[ch];
                if (typeof type == "string") return type;
                this.startActors.push(type.create(new Vec(x, y), ch));
                return "empty";
            });
        });
    }

    touches(pos, size, type) { 
        var xStart = Math.floor(pos.x);
        var xEnd = Math.ceil(pos.x + size.x);
        var yStart = Math.floor(pos.y);
        var yEnd = Math.ceil(pos.y + size.y);
    
        for (var y = yStart; y < yEnd; y++) {
            for (var x = xStart; x < xEnd; x++) {
                let isOutside = x < 0 || x >= this.width ||
                    y < 0 || y >= this.height;
                let here = isOutside ? "wall" : this.rows[y][x];
                if (here === type) return true;
            }
        }
        return false;
    }
}

export default Level;