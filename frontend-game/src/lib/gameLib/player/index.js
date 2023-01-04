export class Sphere {

    position = null
    color = null;
    constructor(x, y, r) {
        this.position = {
            x: x,
            y: y,
            r: r
        }
    }

    setPos(xyr) {
        this.position = {
            x: xyr.x,
            y: xyr.y,
            r: xyr.r
        }
    }

    draw(ctx) {
        ctx.beginPath();

        ctx.fillStyle = this.color || "white";
        ctx.ellipse(this.position.x, this.position.y, this.position.r, this.position.r, 0, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.fill();
    }
}