// eslint-disable-next-line
import Game from ".";
import BackgroundObject from "./objects/startObjects/BackgroundObject";

class Draw {

    objects = [];

    startObjects = [];

    loopToggle = false;

    /** 
     * Context canvas
     * @type { CanvasRenderingContext2D }
     */
    ctx = null

    /** 
     * Context canvas
     * @type { Game }
     */
    game = null


    constructor(Game) {
        this.game = Game
        this.ctx = this.game.ctx;
    }

    /**
     * Set objects
     * @param {Array} objects 
     */
    setObjects(objects) {
        this.objects = objects
    }

    /**
     * Start Drawing Loop
     */
    startLoop() {
        console.log('startLoop');
        this.loopToggle = true;

        this.createStartObjects()

        window.requestAnimationFrame(() => this.loop());
    }

    drawObjects() {
        this.objects.forEach((object) => {
            object.draw()
        });
    }

    drawStartObjects() {
        this.startObjects.forEach((object) => {
            object.draw()
        });
    }

    stopLoop() {
        this.loopToggle = false;
        console.log('Drawing Loop stoped');
    }

    loop() {
        if (!this.loopToggle) return;

        this.drawStartObjects();
        this.drawObjects();
        //return;

        window.requestAnimationFrame(() => this.loop());
    }

    createStartObjects() {
        const background = new BackgroundObject('blue', this.game.canvas)
        background.ctx = this.ctx;
        this.startObjects.push(background);
    }
}
export default Draw;