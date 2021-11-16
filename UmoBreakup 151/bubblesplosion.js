class Bubblesplosion{
    constructor(stages,size,color,origin){//origin is an umo
        this.stages = stages;
        this.stage = 0;
        this.s = size;
        this.c = color; //ignored for now
        this.active = false;
        this.timer = 0;
        this.core = new Umo(0,0,this.s,"red") ;
        this.core.match(origin);
        this.bubbles = [[this.core]];///this.core is the only member of the first stage.
        var bubblesize = this.s;
        var i=1;
        while (i<this.stages){
            var nextstage = [];
            bubblesize = Math.floor(bubblesize*0.75);
            var numbubbles = Math.floor(Math.random()*4)+2;//each stage has 2-5bubbles growing off each prior stage.
            var interangle = Math.PI*2 / numbubbles;
            var j=0;
            while(j<numbubbles){
                nextstage.push(new Umo(0,0,bubblesize,"orange"));
                nextstage[nextstage.length-1].match(this.core);
                nextstage[nextstage.length-1].x = nextstage[nextstage.length-1].x+bubblesize*Math.cos(interangle*j);
                nextstage[nextstage.length-1].y = nextstage[nextstage.length-1].y+bubblesize*Math.sin(interangle*j);
                nextstage[nextstage.length-1].timer = 6+i*4+j;
                j++;
            }
            this.bubbles.push(nextstage);
            i++;
        }
    }
    startboom(){
     this.active=true;
     this.timer = this.stages*6;   
    }
    update1(){
        this.timer--;
        var i=0;
        while(i<this.bubbles.length){
            var j=0;
            while(j<this.bubbles[i].length){
                this.bubbles[i][j].update1();
                this.bubbles[i][j].updatebomb();
                j++;
            }
            
            i++;
        }
    }
    draw(viewx,viewy){//Need to handle timed expansion/contraction.
        var i=0;
        while (i<this.bubbles.length){
            var j=0;
            while (j<this.bubbles[i].length){
                this.bubbles[i][j].drawbomb(viewx,viewy)
                j++;
            }
            i++;
        }
    }
}