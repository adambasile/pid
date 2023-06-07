const gridsize = 10;
const dotsize = gridsize * 0.7;
const X = 120;
const Y = 7;

function setup() {
    createCanvas(X * gridsize, Y * gridsize);
    frameRate(3);
}

function draw() {
    background(0);
    noStroke();
    for (const x of Array(X).keys()) {
        for (const y of Array(Y).keys()) {
            if ((Math.floor(x / 2) + (Math.floor(y / 2) % 2) + frameCount) % 2 === 0) {
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
