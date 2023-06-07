const DEBUG = false;
const gridsize = 10;
const dotsize = gridsize * 0.7;
const X = 120;
const Y = 7;
const frames = 60;
let msg;

let start_frame = 0;
let paused = false;
let dynamic = true;

function setup() {
    let cnv = createCanvas(X * gridsize, Y * gridsize);
    cnv.parent("pid");
    frameRate(frames);
    const url = new URL(window.location);
    let inp = createInput(url.searchParams.get('txt') || 'Arriving Flinders St');
    inp.parent("textinput")
    inp.size(X * gridsize * 0.3);
    inp.input(change_message);
    msg = load_msg(inp.value())
    pausebutton = createButton("\u23EF");
    pausebutton.parent("pauseunpause");
    pausebutton.mousePressed(pause)
    modeswitch = createButton("Switch between scrolling and centred");
    modeswitch.parent("modeswitch");
    modeswitch.mousePressed(switchModes)
}

function pause() {
    paused = !paused;
    if (paused) {
        noLoop();
    } else if ((!paused) && dynamic) {
        loop();
    }
}

function switchModes() {
    dynamic = !dynamic
    if (dynamic) {
        loop();
        paused = false;
    } else {
        noLoop();
        redraw();
    }
}

function change_message() {
    msg = load_msg(this.value());
    const url = new URL(window.location);
    url.searchParams.set('txt', this.value());
    window.history.replaceState({}, "", url);
    if (!isLooping()) {
        redraw()
    }
}

function draw() {
    background(0);
    noStroke();
    if (!isLooping()) {
        start_frame += 1
    }
    let current_frame;
    if (dynamic) {
        current_frame = frameCount - start_frame;
        if (current_frame > (msg[0].length + X)) {
            current_frame = 0;
            start_frame = frameCount;
        }
    } else {
        current_frame = Math.round((X + msg[0].length) / 2);
    }
    for (const x of Array(X).keys()) {
        for (const y of Array(Y).keys()) {
            let pixel = msg[y][x + current_frame - X];
            if (typeof pixel === 'undefined') {
                notdefined();
            } else if (pixel) {
                on()
            } else {
                off();
            }
            ellipse((x + 0.5) * gridsize, (y + 0.5) * gridsize, dotsize, dotsize);
        }
    }
}

function on() {
    fill(251, 100, 6);
}

function notdefined() {
    if (DEBUG) {
        fill(0, 255, 0);
    } else {
        off()
    }
}

function off() {
    fill(90);
}

function load_msg(msg) {
    let out = Array.from({length: Y}, () => []);
    let spacer = letters["spacer"]
    Array.from(msg || " ").forEach((c, idx, msg) => {
        let char_repr = letters[c];
        if (!char_repr) {
            console.log(`Character '${c}' is not found in letters object. Using default.`);
            char_repr = spacer;
        }
        ((idx === (msg.length - 1)) ? [char_repr] : [char_repr, spacer]).forEach((char) => char.forEach((line, i) => {
            out[i].push(...line)
        }))
    });
    return out
}