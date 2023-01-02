
import {player_list} from "./config.js"


function findByData(playerData){
    return player_list.find(player => player.ip == playerData.ip);
}

function findIndexById(remote_id){
    return player_list.findIndex((player => player.id == remote_id))
}

function disconnectHandler(socket){
    player_list.splice(findIndexById(socket.id),1);
    console.log(player_list);
    console.log('Disconnected player is dead');
}

function connectionHandler(socket){
    const playerData = {
        id:socket.id,
        ip:socket.handshake.address
    };
    if(findByData(playerData)){
        return;
    }
    player_list.push(playerData)
    console.log('player created');

    socket.on('disconnect', disconnectHandler);

};

export default function initSocket(io){
    io.on('connection',connectionHandler);
}



