import { connection } from "./connection"
import { controls } from "./controls"

export default class Game {

    ctx = null
    canvas = null

    drawingLoop = false

    players = []

    ownPlayer = null

    controls = null;

    socket = null;

    connection = new connection(this);

    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d");
    }

    start() {
        this.connection.connect();
        this.connection.eventHandlers();

        this.controls = new controls()
        this.drawingLoop = true;
        window.requestAnimationFrame(() => { this.draw() });
    }

    movement() {
        if (this.controls.up) {
            //this.ownPlayer.sphere.position.y -= 5;
            this.connection.socket.emit('playerMovementUp')
        }
        if (this.controls.down) {
            //this.ownPlayer.sphere.position.y += 5;
            this.connection.socket.emit('playerMovementDown')
        }
        if (this.controls.right) {
            // this.ownPlayer.sphere.position.x += 5
            this.connection.socket.emit('playerMovementRight')
        }
        if (this.controls.left) {
            //this.ownPlayer.sphere.position.x -= 5
            this.connection.socket.emit('playerMovementLeft')
        }
    }

    background() {
        this.ctx.fillStyle = "#009999";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBlobs() {

        this.players.forEach((player) => {
            player.sphere.draw(this.ctx)
        });
        // if (this.ownPlayer) {
        //     console.log(this.ownPlayer);
        //     this.ownPlayer.sphere.draw(this.ctx)
        // }

        // if (this.ownPlayer) {
        //     this.ownPlayer.sphere.draw(this.ctx);
        // }

    }

    draw() {
        //loop
        this.background();
        this.drawBlobs();
        this.movement();
        if (this.drawingLoop) {
            window.requestAnimationFrame(() => { this.draw() });
        }
    }

}