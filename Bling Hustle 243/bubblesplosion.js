var Umo = require('./umo.js');
function rainbow(n){ //Returns a color of the rainbow corresponding to the integer n
	var color = "red";//default
	if (n==1){color = "orange";}
	if (n==2){color = "yellow";}
	if (n==3){color = "green";}
	if (n==4){color = "blue";}
	if (n==5){color = "purple";}
	return color;
}   
module.exports = class Bubblesplosion{
    constructor(stages,size,color,origin){//origin is an umo
        this.stages = stages;
        this.stage = 0;
        this.s = size;
        this.c = color; //ignored for now
        this.active = false;
        this.timer = 12+2*this.stages;
        this.core = new Umo(0,0,200,"red") ;
        this.core.match(origin);
        this.core.timer = 8;
        this.core.boombuff = this.s;
        this.bubbles = [[this.core]];///this.core is the only member of the first stage.
        var bubblesize = this.s;
        var bubbleradius = this.s;
        var i=1;
        console.log("Bubble explosion");
        while (i<this.stages){
            var nextstage = [];
            bubblesize = bubblesize*0.8;
            bubbleradius = bubbleradius+this.s/2;
            var bubblecolor = rainbow((i-1)%6);
            var numbubbles = Math.floor(Math.random()*(2+i))+3;
            var interangle = Math.PI*2 / numbubbles;
            var j=0;
            while(j<numbubbles){
                nextstage.push(new Umo(0,0,bubblesize,bubblecolor));
                nextstage[nextstage.length-1].boombuff = bubblesize;
                nextstage[nextstage.length-1].match(this.core);
                nextstage[nextstage.length-1].x = nextstage[nextstage.length-1].x+bubbleradius*80*Math.cos(interangle*j);//bubblesize is the wrong scale for this
                nextstage[nextstage.length-1].y = nextstage[nextstage.length-1].y+bubbleradius*80*Math.sin(interangle*j);
                //nextstage[nextstage.length-1].timer = 12+i*4+j;
                nextstage[nextstage.length-1].timer = 8+i*2;
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
                if (this.bubbles[i][j].timer<7){this.bubbles[i][j].drawbomb(viewx,viewy);}
                j++;
            }
            i++;
        }
    }
}