// eslint-disable-next-line
import { io, Socket } from "socket.io-client";

// eslint-disable-next-line
import Game from ".";
import PlayerObject from "./objects/player/PlayerObject";

class Connection {

    /** 
     * Context canvas
     * @type { Socket }
     */
    socket = null;

    /** 
     * Context canvas
     * @type { Game }
     */
    game = null;

    connected = false;

    constructor(game) {
        this.game = game;
    }

    connect() {
        this.socket = io("ws://" + process.env.VUE_APP_SERVER, {
            reconnectionDelayMax: 10000
        })
        this.socket.on("connect", () => {
            console.log('Connected');
            this.eventHandlers();
        });
    }

    eventHandlers() { // Перенести логику
        console.log("event handlers init");
        console.log(this.game.draw.objects);

        this.socket.on('setPlayer', (playerData) => this.setPlayerHandle(playerData))
        this.socket.on('setPlayers', (data) => this.setPlayersHandle(data));
        this.socket.on('unsetPlayer', (playerData) => this.unsetPlayerHandle(playerData));
        this.socket.on('broadcastPlayers', (data) => this.broadcastPlayersHandle(data));



    }

    broadcastPlayersHandle(data) {

        data.forEach(playerData => {
            const player = this.game.draw.objects.find((object) => playerData?.id == object.id);
            if (player) {
                player.x = playerData.pos.x;
                player.y = playerData.pos.y;
                player.r = playerData.options.radius;
            }

        });
    }

    setPlayersHandle(data) {
        console.log(data);
        let players = [];
        data.forEach(playerData => {
            const pl = new PlayerObject(
                'white',
                playerData.pos.x,
                playerData.pos.y,
                playerData.options.radius,
                playerData.id
            );
            pl.ctx = this.game.ctx;
            pl.id = playerData.id;
            players.push(pl)
        });
        this.game.draw.objects = players;
    }

    unsetPlayerHandle(playerData) {
        console.log('unsetPlayer');
        this.game.draw.objects.splice(this.findIndexById(playerData.id), 1);
    }

    // eslint-disable-next-line
    setPlayerHandle(playerData) {
        console.log('setPlayer');
        if (this.game.draw.objects.find((object) => playerData?.id == object.id)) {
            return;
        }

        const pl = new PlayerObject(
            'white',
            playerData.pos.x,
            playerData.pos.y,
            playerData.options.radius,
            playerData.id
        );
        pl.ctx = this.game.ctx;
        pl.id = playerData.id;
        this.game.draw.objects.push(pl)
    }

    findIndexById(remote_id) {
        return this.game.draw.objects.findIndex((player => player?.id == remote_id));
    }
}
export default Connection;