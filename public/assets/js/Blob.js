


class Blob{


    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
    }



    update_pos(){
        ellipse(this.x, this.y,this.r,this.r)
    }


}