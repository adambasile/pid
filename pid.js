const gridsize = 10;
const dotsize = gridsize * 0.7;
const X = 120;
const Y = 7;
let msg;

function setup() {
    createCanvas(X * gridsize, Y * gridsize);
    frameRate(3);
    msg = load_msg("0123456789:,qQwWeErRtTyYuUiIoOpPaAsSdDfFgGhHjJkKlLzZxXcCvVbBnNmM");
}

function draw() {
    background(0);
    noStroke();
    for (const x of Array(X).keys()) {
        for (const y of Array(Y).keys()) {
            if (msg[y][x]) {
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