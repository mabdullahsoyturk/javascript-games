import State from "./state.js";

export default class DOMDisplay {
    constructor(parent) {
        this.scale = 20;
        this.dom = elt("div", {class: "game"}, drawBackground(this.scale));
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }

    clear() { this.dom.remove(); }

    syncState(state) {
        if (this.actorLayer) this.actorLayer.remove();
        this.actorLayer = drawActors(state.actors, this.scale);
        this.dom.appendChild(this.actorLayer);
        this.dom.className = `game ${state.status}`;
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


function drawBackground(scale) {
    return elt("div", {
        class: "background",
        style: `width: ${State.mapSize.x * scale}px; height: ${State.mapSize.y * scale}px;`
    });
}

function drawActors(actors, scale) {
    return elt("div", {}, ...actors.map(actor => {
        let rect = elt("div", {class: `actor ${actor.type} ${actor.direction}`});
        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.pos.x * scale}px`;
        rect.style.top = `${actor.pos.y * scale}px`;
        if (actor.type === 'mixer') {
            rect.style.transform = `rotate(${actor.angle}deg)`;
            rect.style.transformOrigin= `${actor.direction} center`;
        }
        return rect;
    }));
}