import Server from "./index.js";
import PlayerObject from "./objects/PlayerObject.js";

class PlayerHandler {

    /** 
     * Socket Handle
     * @type { Server }
     */
    server = null;

    players = [];

    constructor(server) {
        this.server = server
        this.players = this.server.objectHandler.objectList.players
    }

    findPlayerById(id) {
        return this.players.find((player) => player.id == id)
    }

    findIndexById(remote_id) {
        return this.players.findIndex((player => player.id == remote_id))
    }

    addPlayer(socket) {
        const player = new PlayerObject(socket, 250, 250, 45);

        this.players.push(player);

        return player;
    }

    removePlayer(index) {
        this.players.splice(index, 1);
    }

    clientPlayers() {
        let clientPlayers = [];
        this.players.forEach((player) => {
            clientPlayers.push(player.clientData());
        });
        return clientPlayers;
    }

}

export default PlayerHandler;