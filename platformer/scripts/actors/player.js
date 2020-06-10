import Vec from "../vec.js";
// import $ from '../jquery-3.5.1.min.js';
// // window.jQuery = $;
// // window.$ = $;

class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
        this.playerXSpeed = 7;
        this.gravity = 30;
        this.jumpSpeed = 17;
        this.size = new Vec(2, 3.5);
        this.walking = ['walk0.png', 'walk1.png', 'walk2.png', 'walk3.png', 'walk4.png', 'walk5.png', 'walk6.png', 'walk7.png'];
        this.walkingIndex = 0;
    }

    get type() { return "player"; }

    static create(pos) {
        // Because a player is one-and-a-half squares high, its initial position is set to be half a square above the position where the @ character appeared.
        // This way, its bottom aligns with the bottom of the square it appeared in.
        return new Player(pos.plus(new Vec(0, -2.5)), new Vec(0, 0));
    }

    update(time, state, keys) {
        let xSpeed = 0;
        if (keys.ArrowLeft) {
            xSpeed -= this.playerXSpeed;
            // const url = 'url(./zombie/'+this.walking[this.walkingIndex]+');';
            const url = 'red'
            console.log(url);
            $(".player").css("background", url);
            this.walkingIndex ++;
            this.walkingIndex = this.walkingIndex%7;
        }
        if (keys.ArrowRight) xSpeed += this.playerXSpeed;
        let movedX = this.pos.plus(new Vec(xSpeed * time, 0));
        if (!state.level.touches(movedX, this.size, "wall")) {
            this.pos = movedX;
        }
    
        // We check for walls again. If we don’t hit any, the new position is used. If there is a wall, there are two possible outcomes.
        // When the up arrow is pressed and we are moving down (meaning the thing we hit is below us), the speed is set to a relatively large, negative value.
        // This causes the player to jump. If that is not the case, the player simply bumped into something, and the speed is set to zero.
        let ySpeed = this.speed.y + time * this.gravity;
        let movedY = this.pos.plus(new Vec(0, ySpeed * time));
        if (!state.level.touches(movedY, this.size, "wall")) {
            this.pos = movedY;
        } else if (keys.ArrowUp && ySpeed > 0) {
            ySpeed = -this.jumpSpeed;
        } else {
            ySpeed = 0;
        }
        return new Player(this.pos, new Vec(xSpeed, ySpeed));
    }
}

export default Player;