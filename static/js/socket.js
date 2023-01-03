

let socket = io();
let socket_id = null;
let player_list = []



socket.on('broadcastPlayers', (players) => {

    player_list = players
    
});


