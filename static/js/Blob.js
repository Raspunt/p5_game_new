

class Bblob{

    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    draw(){
        ellipse(this.x,this.y,this.r,this.r)
    }

    sendMousePos(){
        socket.emit('mouse_pos', this)
    }

    setRandomColor(){
        let r = random(255); 
        let g = random(100,200);
        let b = random(100); 
        let a = random(200,255);

        fill(r, g, b, a);
    }

    updatePlayer(x,y){
        this.x = x
        this.y = y
    }
}