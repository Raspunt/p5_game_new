
let game_canvas = null ;



function setup() {
    game_canvas =  createCanvas(windowWidth, windowHeight-10);
    game_canvas.parent('game_canvas')

    let player = new Bblob(windowWidth/2,windowHeight/2,200);
    console.log(socket_id);
    socket.emit('create_player',player)

}
  
function draw() {
    background(0);

    // player.draw()
    // player.followMouse()


    player_list.forEach(player =>{

        let pos = player[1]
        let netPlayer = new Bblob(pos.x,pos.y,pos.r)
        netPlayer.draw()
        netPlayer.followMouse()

        console.log(netPlayer.x,netPlayer.y);

        socket.emit('update_player',player)
        

    })


}


