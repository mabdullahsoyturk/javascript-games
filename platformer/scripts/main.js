let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

// function trackKeys(keys) {
//     let down = Object.create(null);
//     function track(event) {
//         if (keys.includes(event.key)) {
//             down[event.key] = event.type == "keydown";
//             event.preventDefault();
//         }
//     }
//     window.addEventListener("keydown", track);
//     window.addEventListener("keyup", track);
//     return down;
// }

function trackKeys(keys) {
    let down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type == "keydown";
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

const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

// I have set a maximum frame step of 100 milliseconds (one-tenth of a second).
// When the browser tab or window with our page is hidden,
// requestAnimationFrame calls will be suspended until the tab or window is shown again.
// In this case, the difference between lastTime and time will be the entire time in which the page was hidden.
// Advancing the game by that much in a single step would look silly and might cause weird side effects,
// such as the player falling through the floor.
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

// function runLevel(level, Display) {
//     let display = new Display(document.body, level);
//     let state = State.start(level);
//     let ending = 1;
//     return new Promise(resolve => {
//         runAnimation(time => {
//             state = state.update(time, arrowKeys);
//             display.syncState(state);
//             if (state.status === "playing") {
//                 return true;
//             } else if (ending > 0) {
//                 ending -= time;
//                 return true;
//             } else {
//                 display.clear();
//                 resolve(state.status);
//                 return false;
//             }
//         });
//     });
// }

// To know when to stop and restart the animation, a level that is
// being displayed may be in three `running` states:
//
// * "yes":     Running normally.
// * "no":      Paused, animation isn't running
// * "pausing": Must pause, but animation is still running
//
// The key handler, when it notices escape being pressed, will do a
// different thing depending on the current state. When running is
// "yes" or "pausing", it will switch to the other of those two
// states. When it is "no", it will restart the animation and switch
// the state to "yes".
//
// The animation function, when state is "pausing", will set the state
// to "no" and return false to stop the animation.

function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    let running = "yes";

    return new Promise(resolve => {
        function escHandler(event) {
            if (event.key != "Escape") return;
            event.preventDefault();
            if (running == "no") {
                running = "yes";
                runAnimation(frame);
            } else if (running == "yes") {
                running = "pausing";
            } else {
                running = "yes";
            }
        }
        window.addEventListener("keydown", escHandler);
        let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

        function frame(time) {
            if (running == "pausing") {
                running = "no";
                return false;
            }

            state = state.update(time, arrowKeys);
            display.syncState(state);
            if (state.status == "playing") {
                return true;
            } else if (ending > 0) {
                ending -= time;
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

async function runGame(plans, Display) {
    let lives = 3;
    for (let level = 0; level < plans.length && lives > 0;) {
        console.log(`Level ${level + 1}, lives: ${lives}`);
        let status = await runLevel(new Level(plans[level]),
            Display);
        if (status === "won") level++;
        else lives--;
    }
    if (lives > 0) {
        console.log("You've won!");
    } else {
        console.log("Game over");
    }
}
runGame(GAME_LEVELS, DOMDisplay);