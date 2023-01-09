import DrawObject from "../DrawObject";

class BackgroundObject extends DrawObject {

    constructor(color, canvas) {
        super();
        this.color = color
        this.canvas = canvas
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
export default BackgroundObject