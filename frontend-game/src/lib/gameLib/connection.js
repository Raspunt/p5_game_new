import { io } from "socket.io-client"
import { Sphere } from "./player";

export class connection {

    socket = null;
    game = null

    constructor(game) {
        this.game = game;
    }

    connect() {
        this.socket = io("ws://" + process.env.VUE_APP_SERVER, {
            reconnectionDelayMax: 10000
        })
        return this.socket;
    }

    eventHandlers() {
        console.log("event handlers init");
        this.socket.on('broadcastPlayers', (data) => {
            let players = [];
            data.forEach(element => {
                const sphere = new Sphere(element.pos.x, element.pos.y, element.pos.r);
                if (element.id == this.game.ownPlayer.id) {
                    sphere.color = "blue";
                }
                players.push({
                    id: element.id,
                    sphere: sphere,
                })
            });
            this.game.players = players;
            console.log(data, this.game.ownPlayer);
        })

        this.socket.on('playerCreate', (data) => {
            this.game.ownPlayer = {
                id: data.id,
                sphere: new Sphere(data.pos.x, data.pos.y, data.pos.r),
            };

            this.game.ownPlayer.sphere.color = "red"
            console.log(data);
        })
    }
}