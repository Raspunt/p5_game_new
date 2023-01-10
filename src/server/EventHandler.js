import { Socket } from "socket.io";
import Server from "./index.js";

class EventHandler {

    /** 
     * Socket Handle
     * @type { Server }
     */
    server = null

    constructor(server) {
        this.server = server
    }

    handle() {
        this.server.io.on("connection", (socket) => this.onConnection(socket));
    }

    /**
     * Здесь можно работать с событиями
     * @param {Socket} socket 
     */
    onConnection(socket) {
        console.log('Connected');
        const player = this.server.playerHandler.addPlayer(socket);
        this.server.controlHandler.handle(player);

        socket.emit('setPlayer', player.clientData()); // Порядок не менять
        socket.emit('setPlayers', this.server.playerHandler.clientPlayers());

        socket.on('disconnect', () => this.onDisconnect(player));
    }

    onDisconnect(player) {
        const index = this.server.playerHandler.findIndexById(player.id);
        this.server.playerHandler.removePlayer(index);
        this.server.emitHandler.unsetPlayer(player.clientData());
        console.log("Disconnected Player");
    }

}

export default EventHandler;