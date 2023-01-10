// eslint-disable-next-line
import Game from ".";

class Controls extends EventTarget {

    up = false;
    down = false;
    right = false;
    left = false;
    tabActive = true;

    /** 
     * Context canvas
     * @type { Game }
     */
    game = null

    constructor(game) {
        super();
        this.keyDown()
        this.keyUp()
        this.eventTabActive();
        this.game = game
        this.keypressDownEvent = new CustomEvent("keypressDown");
        this.keypressUpEvent = new CustomEvent("keypressUp");
    }

    eventTabActive() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.game.connection.socket.emit("keypressAllDown");
                // this.tabActive = false;
                // this.down = false;
                // this.up = false;
                // this.right = false;
                // this.left = false;
            } else {
                // this.tabActive = true;
            }
        });
    }

    // Создать систему отписки от событий
    keyDown() {
        document.addEventListener('keydown', (key) => {
            const k = key.key
            //this.dispatchKeypressDown(k);
            this.game.connection.socket.emit("keypressDown", k);
            // if (k == 'w') {
            //     this.up = true
            // }
            // if (k == 'a') {
            //     this.left = true
            // }
            // if (k == 's') {
            //     this.down = true;
            // }
            // if (k == 'd') {
            //     this.right = true;
            // }
        })
    }

    keyUp() {
        document.addEventListener('keyup', (key) => {
            const k = key.key
            //this.dispatchKeypressUp(k);
            this.game.connection.socket.emit("keypressUp", k);

            // if (k == 'w') {
            //     this.up = false
            // }
            // if (k == 'a') {
            //     this.left = false
            // }
            // if (k == 's') {
            //     this.down = false;
            // }
            // if (k == 'd') {
            //     this.right = false;
            // }
        })
    }

    dispatchKeypressDown(key) {
        const event = new CustomEvent("keypressDown", key);
        this.dispatchEvent(event);
    }

    dispatchKeypressUp(key) {
        const event = new CustomEvent("keypressUp", key);
        this.dispatchEvent(event);
    }

    // sendPacket() {
    //     this.addEventListener('keypressDown', () => {
    //         this.game.connection.socket.emit('')
    //     });
    // }
}
export default Controls;