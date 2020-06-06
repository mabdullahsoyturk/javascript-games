import DOMDisplay from "./domDisplay.js";
import State from "./state.js";
import Player from "./actors/player.js";
import Competitor from "./actors/competitor.js";
import Ball from "./actors/ball.js";

function trackKeys(keys) {
    let down = Object.create(null);

    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type === "keydown";
            event.preventDefault();
        }
    }

    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    down.unregister = () => {
        window.removeEventListener("keydown", track);
        window.removeEventListener("keyup", track);
    };

    return down;
}

function runAnimation(frameFunc) {
    let lastTime = null;

    function frame(time) {
        if (lastTime != null) {
            let timeStep = Math.min(time - lastTime, 100) / 1000; // converts the time steps to seconds
            if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function runLife(Display) {
    let display = new Display(document.body);
    let state = new State(new Player(), new Competitor(), new Ball(),"playing");
    let running = "yes";

    return new Promise(resolve => {
        function escHandler(event) {
            if (event.key !== "Escape") return;
            event.preventDefault();
            if (running === "no") {
                running = "yes";
                runAnimation(frame);
            } else if (running === "yes") {
                running = "pausing";
            } else {
                running = "yes";
            }
        }
        window.addEventListener("keydown", escHandler);
        let arrowKeys = trackKeys(["ArrowUp", "ArrowDown"]);

        function frame(time) {
            if (running === "pausing") {
                running = "no";
                return false;
            }

            state.update(time, arrowKeys);
            display.syncState(state);
            if (state.status === "playing") {
                return true;
            } else {
                display.clear();
                window.removeEventListener("keydown", escHandler);
                arrowKeys.unregister();
                resolve(state.status);
                return false;
            }
        }
        runAnimation(frame);
    });
}

async function runGame(Display) {
    let lives = 3;
    while (lives !== 0) {
        console.log(`Remaining lives: ${lives}`);
        await runLife(Display);
        lives--;
    }
    alert("Game over");
}

runGame(DOMDisplay);