import { Socket } from "socket.io";

class PlayerObject {

    /**
     * Socket Player Instance
     * @type {Socket}
     */
    socket = null;

    movement = {
        up: false,
        down: false,
        left: false,
        right: false,
    }

    constructor(socket, x, y, r) {
        this.socket = socket;
        this.x = x;
        this.y = y;
        this.radius = r;
    }

    clientData() { // Данные для клиента по объекту
        return {
            id: this.socket.id,
            pos: {
                x: this.x,
                y: this.y
            },
            options: {
                radius: this.radius
            }
        };
    }
}
export default PlayerObject;