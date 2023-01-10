import { Socket } from "socket.io";
import Server from "./index.js";

class EmitHandler {

    /** 
     * Socket Handle
     * @type { Server }
     */
    server = null

    /** 
     * Socket Handle
     * @type { Socket }
     */
    sockets = null

    constructor(server) {
        this.server = server
        this.sockets = this.server.io.sockets
    }

    setPlayers(players) {
        this.sockets.emit('setPlayers', players);
    }

    unsetPlayer(player) {
        this.sockets.emit('unsetPlayer', player);
    }

    broadcastPlayers() {
        setInterval(() => {
            this.server.io.sockets.emit('broadcastPlayers', this.server.playerHandler.clientPlayers());
        }, 1);
    }

    movementPlayers() {
        setInterval(() => {
            this.server.playerHandler.players.forEach((player) => {
                if (player.movement.up) {
                    player.y -= 1;
                }
                if (player.movement.down) {
                    player.y += 1;
                }
                if (player.movement.right) {
                    player.x += 1;
                }
                if (player.movement.left) {
                    player.x -= 1;
                }
            });
        }, 1);
    }

    start() {
        this.broadcastPlayers();
        this.movementPlayers();
    }
}

export default EmitHandler;