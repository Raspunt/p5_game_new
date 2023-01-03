
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


function updatePlayerHandler(socket,mousePos){
    player_list[findIndexById(socket.id)].pos = {
        x:mousePos.x,
        y:mousePos.y,
        r:mousePos.r
    };
    
}

function connectionHandler(socket){
    const playerData = {
        id:socket.id,
        ip:socket.handshake.address,
        pos:{
            x:0,
            y:0,
            r:0
        }
    };

    if(findByData(playerData)){
        return;
    }
    player_list.push(playerData)
    console.log('player created');

    socket.on('disconnect', disconnectHandler);
    socket.on('updatePlayer',(mousePos) => {
        updatePlayerHandler(socket,mousePos);
    });

};



export default function initSocket(io){
    io.on('connection',connectionHandler);

    setInterval( () => {
        io.sockets.emit('broadcastPlayers',player_list)
    } ,5)

    
}



