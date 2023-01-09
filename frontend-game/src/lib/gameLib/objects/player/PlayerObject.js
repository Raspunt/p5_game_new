import DrawObject from "../DrawObject";

class PlayerObject extends DrawObject {

    x = 0;
    y = 0;
    r = 50;
    color = 'white'
    id = null

    constructor(color, x, y, r, id = null) {
        super()
        this.color = color;
        this.x = x;
        this.y = y;
        this.r = r;
        this.id = id;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}
export default PlayerObject