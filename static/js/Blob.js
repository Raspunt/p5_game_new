

class Bblob{

    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    draw(){
        ellipse(this.x,this.y,this.r,this.r)
    }

    UpdateMousePos(){

        let pos = {
            x:mouseX,
            y:mouseY,
            r:this.r

        }

        socket.emit('updatePlayer',pos)
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