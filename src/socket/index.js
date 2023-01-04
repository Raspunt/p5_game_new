
import { player_list } from "./config.js"


function findByData(playerData) {
    return player_list.find(player => player.ip == playerData.ip);
}

function findIndexById(remote_id) {
    return player_list.findIndex((player => player.id == remote_id))
}

function disconnectHandler(socket) {
    player_list.splice(findIndexById(socket.id), 1);
    console.log(player_list);
    console.log('Disconnected player is dead');
}


function updatePlayerHandler(socket, mousePos) {
    player_list[findIndexById(socket.id)].pos = {
        x: mousePos.x,
        y: mousePos.y,
        r: mousePos.r
    };

}

function controlHandler(socket) {

    socket.on('playerMovementUp', () => {
        player_list[findIndexById(socket.id)].pos.y -= 5;
    });

    socket.on('playerMovementDown', () => {
        player_list[findIndexById(socket.id)].pos.y += 5;
    });

    socket.on('playerMovementLeft', () => {
        player_list[findIndexById(socket.id)].pos.x -= 5;
    });

    socket.on('playerMovementRight', () => {
        player_list[findIndexById(socket.id)].pos.x += 5;
    });
}

function connectionHandler(socket) {

    const playerData = {
        id: socket.id,
        ip: socket.handshake.address,
        pos: {
            x: 200,
            y: 200,
            r: 50
        }
    };

    if (findByData(playerData)) {
        return;
    }

    console.log('Player connected');

    player_list.push(playerData);

    socket.emit('playerCreate', playerData);
    controlHandler(socket)
    socket.on('disconnect', disconnectHandler);
    socket.on('updatePlayer', (mousePos) => {
        updatePlayerHandler(socket, mousePos);
    });

};



export default function initSocket(io) {
    io.on('connection', connectionHandler);

    setInterval(() => {
        io.sockets.emit('broadcastPlayers', player_list)
    }, 1)


}