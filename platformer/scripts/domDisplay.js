class DOMDisplay {
    constructor(parent, level) {
        this.dom = elt("div", {class: "game"}, drawGrid(level));
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }

    clear() { this.dom.remove(); }

    syncState(state) {
        if (this.actorLayer) this.actorLayer.remove();
        this.actorLayer = drawActors(state.actors);
        this.dom.appendChild(this.actorLayer);
        this.dom.className = `game ${state.status}`;
        this.scrollPlayerIntoView(state);
    }

    scrollPlayerIntoView(state) {
        let width = this.dom.clientWidth;
        let height = this.dom.clientHeight;
        let margin = width/3;

        // The viewport
        let left = this.dom.scrollLeft, right = left + width;
        let top = this.dom.scrollTop, bottom = top + height;

        let player = state.player;

        // The way the player’s center is found shows how the methods on our Vec type allow computations with objects to be written in a relatively readable way.
        // To find the actor’s center, we add its position (its top-left corner) and half its size.
        // That is the center in level coordinates, but we need it in pixel coordinates, so we then multiply the resulting vector by our display scale.
        let center = player.pos.plus(player.size.times(0.5)).times(scale);

        if (center.x < left + margin) {
            this.dom.scrollLeft = center.x - margin;
        } else if (center.x > right - margin) {
            this.dom.scrollLeft = center.x + margin - width;
        }
        if (center.y < top + margin) {
            this.dom.scrollTop = center.y - margin;
        } else if (center.y > bottom - margin) {
            this.dom.scrollTop = center.y + margin - height;
        }
    }
}

function elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        dom.appendChild(child);
    }
    return dom;
}

const scale = 20;

function drawGrid(level) {
    return elt("table", {
            class: "background",
            style: `width: ${level.width * scale}px`
        }, ...level.rows.map(row =>
            elt("tr", {style: `height: ${scale}px`},
                ...row.map(type =>
                    elt("td", {class: type})
                )
            )
        )
    );
}

function drawActors(actors) {
    return elt("div", {}, ...actors.map(actor => {
        let rect = elt("div", {class: `actor ${actor.type}`});
        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.pos.x * scale}px`;
        rect.style.top = `${actor.pos.y * scale}px`;
        if (actor.type === 'lasergun') {
            rect.style.transform = `rotate(${actor.angle}deg)`;
        }

        if(actor.type === "player") {
            rect.style.background = `url(${actor.background}) cover`;
        }
        return rect;
    }));
}

export default DOMDisplay;