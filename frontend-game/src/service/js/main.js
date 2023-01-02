
import * as p5 from "@/libs/p5.js"
let canvasSize = 100;

function setup() {
    p5.createCanvas(canvasSize, canvasSize);
}



function draw() {
    background(0);
    fill(255,255,255)

    let blob = new Blob(canvasSize/2,canvasSize/2,50)
    blob.update_pos()
}