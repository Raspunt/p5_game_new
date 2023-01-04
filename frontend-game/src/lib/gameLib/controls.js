export class controls {

    up = false;
    down = false;
    right = false;
    left = false;

    constructor() {
        this.keyDown()
        this.keyUp()
    }

    keyDown() {
        document.addEventListener('keydown', (key) => {
            const k = key.key
            if (k == 'w') {
                this.up = true
            }
            if (k == 'a') {
                this.left = true
            }
            if (k == 's') {
                this.down = true;
            }
            if (k == 'd') {
                this.right = true;
            }
        })
    }

    keyUp() {
        document.addEventListener('keyup', (key) => {
            const k = key.key
            if (k == 'w') {
                this.up = false
            }
            if (k == 'a') {
                this.left = false
            }
            if (k == 's') {
                this.down = false;
            }
            if (k == 'd') {
                this.right = false;
            }
        })
    }
}