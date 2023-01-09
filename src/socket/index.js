import { Server } from "socket.io";

class Socket {

    /** 
     * Context canvas
     * @type { Server }
     */
    io = null

    playerList = [];

    /**
     * Construct Socket Handler
     * @param {Server} io Socket Server
     */
    constructor(io) {
        this.io = io
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

    controlHandler(socket) {

        socket.on('playerMovementUp', () => {
            this.playerList[this.findIndexById(socket.id)].pos.y -= 5;
        });

        socket.on('playerMovementDown', () => {
            this.playerList[this.findIndexById(socket.id)].pos.y += 5;
        });

        socket.on('playerMovementLeft', () => {
            this.playerList[this.findIndexById(socket.id)].pos.x -= 5;
        });

        socket.on('playerMovementRight', () => {
            this.playerList[this.findIndexById(socket.id)].pos.x += 5;
        });
    }

    connectionHandler(socket) {

        const playerData = {
            id: socket.id,
            ip: socket.handshake.address,
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

        this.playerList.push(playerData);

        this.io.sockets.emit('setPlayer', playerData);

        socket.emit('setPlayers', this.playerList); // Передаём массив с пользователями

        this.controlHandler(socket)
        socket.on('disconnect', () => this.disconnectHandler(playerData));
    };

    initSocket() {
        this.io.on('connection', (socket) => this.connectionHandler(socket));
        setInterval(() => {
            this.io.sockets.emit('broadcastPlayers', this.playerList)
        }, 1)
    }
}

export default Socket;