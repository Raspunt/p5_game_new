

let socket = io();
let socket_id = null;
let player_list = []



socket.on('players_list', (players) => {

    player_list = players
    
});

