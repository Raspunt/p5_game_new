import { Server as SocketServer } from "socket.io";
import ControlHandler from "./ControlHandler.js";
import EmitHandler from "./EmitHandler.js";
import EventHandler from "./EventHandler.js";
import ObjectHandler from "./ObjectHandler.js";
import PlayerHandler from "./PlayerHandler.js";

class Server {

    /** 
     * Context canvas
     * @type { SocketServer }
     */
    io = null

    /** 
    * Event Handler
    * @type { EventHandler }
    */
    eventHandler = null

    /** 
    * Emit Handler
    * @type { EmitHandler }
    */
    emitHandler = null

    /** 
    * Object Handler
    * @type { ObjectHandler }
    */
    objectHandler = null

    /** 
    * Control Handler
    * @type { ControlHandler }
    */
    controlHandler = null

    /** 
    * Control Handler
    * @type { PlayerHandler }
    */
    playerHandler = null

    playerList = [];

    /**
     * Construct Socket Handler
     * @param {SocketServer} io Socket Server
     */
    constructor(io) {
        this.io = io
        this.eventHandler = new EventHandler(this);
        this.objectHandler = new ObjectHandler(this);
        this.controlHandler = new ControlHandler(this);
        this.playerHandler = new PlayerHandler(this)
        this.emitHandler = new EmitHandler(this);
    }

    findByData(playerData) {
        return this.playerList.find(player => player.ip == playerData.ip);
    }

    findIndexById(remote_id) {
        return this.playerList.findIndex((player => player.id == remote_id))
    }

    disconnectHandler(playerData) {
        this.playerList.splice(this.findIndexById(playerData.id), 1);

        this.io.sockets.emit('unsetPlayer', playerData); // Говорим всем что пользователь вышел с такими данными

        console.log('Disconnected player is dead ' + playerData.id);
    }

    controlHandler(socket, indexPlayer) {

        // socket.on('playerMovementUp', () => {
        //     this.playerList[this.findIndexById(socket.id)].pos.y -= 5;
        // });

        // socket.on('playerMovementDown', () => {
        //     this.playerList[this.findIndexById(socket.id)].pos.y += 5;
        // });

        // socket.on('playerMovementLeft', () => {
        //     this.playerList[this.findIndexById(socket.id)].pos.x -= 5;
        // });

        // socket.on('playerMovementRight', () => {
        //     this.playerList[this.findIndexById(socket.id)].pos.x += 5;
        // });
        socket.on('keypressDown', (key) => {
            if (key == 'w') {
                this.playerList[indexPlayer].movement.up = true;
            }
            if (key == 'a') {
                this.playerList[indexPlayer].movement.left = true;
            }
            if (key == 'd') {
                this.playerList[indexPlayer].movement.right = true;
            }
            if (key == 's') {
                this.playerList[indexPlayer].movement.down = true;
            }
        })

        socket.on('keypressUp', (key) => {
            if (key == 'w') {
                this.playerList[indexPlayer].movement.up = false;
            }
            if (key == 'a') {
                this.playerList[indexPlayer].movement.left = false;
            }
            if (key == 'd') {
                this.playerList[indexPlayer].movement.right = false;
            }
            if (key == 's') {
                this.playerList[indexPlayer].movement.down = false;
            }
        })
    }

    connectionHandler(socket) {

        const playerData = {
            id: socket.id,
            ip: socket.handshake.address,
            movement: {
                up: false,
                down: false,
                left: false,
                right: false
            }, // Позже перенести
            pos: {
                x: 200,
                y: 200,
                r: 50
            }
        };

        // if (this.findByData(playerData)) {
        //     return;
        // }


        console.log('Player connected');

        const indexPlayer = this.playerList.push(playerData) - 1;

        this.io.sockets.emit('setPlayer', playerData);

        socket.emit('setPlayers', this.playerList); // Передаём массив с пользователями

        this.controlHandler(socket, indexPlayer);

        socket.on('disconnect', () => this.disconnectHandler(playerData));
    };

    initSocket() {

        this.eventHandler.handle();
        this.emitHandler.start();

        // this.io.on('connection', (socket) => this.connectionHandler(socket));

        // setInterval(() => {
        //     this.playerList.forEach((player) => {
        //         if (player.movement.up) {
        //             player.pos.y -= 1;
        //         }
        //         if (player.movement.down) {
        //             player.pos.y += 1;
        //         }
        //         if (player.movement.left) {
        //             player.pos.x -= 1;
        //         }
        //         if (player.movement.right) {
        //             player.pos.x += 1;
        //         }
        //     })
        // }, 5);

        // setInterval(() => {
        //     this.io.sockets.emit('broadcastPlayers', this.playerList)

        // }, 1)
    }
}

export default Server;