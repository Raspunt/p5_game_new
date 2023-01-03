
let game_canvas = null ;
let player ;


function setup() {
    game_canvas =  createCanvas(windowWidth, windowHeight-10);
    game_canvas.parent('game_canvas')

    player = new Bblob(windowWidth/2,windowHeight/2,200);

}
  
function draw() {
    background(0);

    // player.draw()
    // player.followMouse()

    player.UpdateMousePos()



    player_list.forEach((pl)=>{


        let plBlob = new Bblob(
            pl.pos.x,
            pl.pos.y,
            pl.pos.r
            )
        
        plBlob.draw()


    })

}


