import Server from "./index.js";

class ControlHandler {

    /** 
     * Socket Handle
     * @type { server }
     */
    server = null


    constructor(server) {
        this.server = server
    }

    handle(player) {
        const socket = player.socket;
        socket.on('keypressDown', (key) => {
            if (key == 'w') {
                player.movement.up = true;
            }
            if (key == 'a') {
                player.movement.left = true;
            }
            if (key == 'd') {
                player.movement.right = true;
            }
            if (key == 's') {
                player.movement.down = true;
            }
        })

        socket.on('keypressUp', (key) => {
            if (key == 'w') {
                player.movement.up = false;
            }
            if (key == 'a') {
                player.movement.left = false;
            }
            if (key == 'd') {
                player.movement.right = false;
            }
            if (key == 's') {
                player.movement.down = false;
            }
        })
    }
}

export default ControlHandler;