
import Draw from "./Draw";
import Connection from "./Connection";
import Controls from "./Controls";

class Game {

    /**
     * Canvas element
     */
    canvas = null

    /** 
     * Context canvas
     * @type { CanvasRenderingContext2D }
     */
    ctx = null

    /** 
     * Context canvas
     * @type { Draw }
     */
    draw = null

    /** 
     * Connection instance
     * @type { Connection }
     */
    connection = null

    /** 
     * Control instance
     * @type { Controls }
     */
    controls = null

    /**
     * Construct Game
     * @param {Object} canvas Canvas Dom object
     */
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d");
        this.draw = new Draw(this);
        this.connection = new Connection(this);
        this.controls = new Controls(this);
    }

    start() {
        console.log("start");
        this.connect()
        this.draw.startLoop();
        this.control();
    }

    connect() {
        this.connection.connect()
    }

    control() {
        console.log("Control Initialize");
        // this.controls.addEventListener('keypress', () => {
        //     console.log('key is pressed');
        // // })
        // setInterval(() => {
        //     if (this.controls.up) {
        //         this.connection.socket.emit('playerMovementUp')
        //     }
        //     if (this.controls.down) {
        //         this.connection.socket.emit('playerMovementDown')
        //     }
        //     if (this.controls.right) {
        //         this.connection.socket.emit('playerMovementRight')
        //     }
        //     if (this.controls.left) {
        //         this.connection.socket.emit('playerMovementLeft')
        //     }
        // }, 8);
    }
}
export default Game;