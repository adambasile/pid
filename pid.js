const gridsize = 10;
const dotsize = gridsize * 0.7;
const X = 120;
const Y = 7;
let msg;
let start_frame = 0;

function setup() {
    let cnv = createCanvas(X * gridsize, Y * gridsize);
    cnv.parent("sketchHolder");
    frameRate(15);
    let inp = createInput('Arriving Flinders St');
    inp.parent("sketchHolder")
    inp.position(0, Y * gridsize);
    inp.size(X * gridsize * 0.3);
    inp.input(change_message);
    msg = load_msg(inp.value())
}

function change_message() {
    msg = load_msg(this.value())
}

function draw() {
    background(0);
    noStroke();
    let current_frame = frameCount - start_frame;
    if (current_frame > msg[0].length) {
        current_frame = 0;
        start_frame = frameCount;
    }
    for (const x of Array(X).keys()) {
        for (const y of Array(Y).keys()) {
            if (msg[y][x + current_frame]) {
                on();
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

function off() {
    fill(90);
}

function load_msg(msg) {
    let out = Array.from({length: Y}, () => []);
    let spacer = letters["spacer"]
    Array.from(msg || " ").forEach((c) => {
        let char_repr = letters[c];
        if (!char_repr) {
            console.log(`Character '${c}' is not found in letters object. Using default.`);
            char_repr = spacer;
        }
        [char_repr, spacer].forEach((char) => char.forEach((line, i) => {
            out[i].push(...line)
        }))
    });
    return out
}