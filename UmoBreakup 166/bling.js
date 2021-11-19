class Bling{
	constructor(xx,yy,vx,vy,value){
		this.x=xx;
		this.y=yy;
		this.vx=vx;
		this.vy=vy;
		this.s = 8;
		this.value = value;
		this.t = 0;
		this.parentid=0;
	}
	match(that){  //This basically synchronizes two moving bodies
		this.x = that.x; //same position
		this.y = that.y;
		this.vx = that.vx;//same velocity
		this.vy = that.vy;
	}
	push(mag,dir){
		this.vx = this.vx + mag*Math.cos(dir);
		this.vy = this.vy + mag*Math.sin(dir);
	}
	update1(){
		this.x = this.x + this.vx;
		this.y = this.y + this.vy;
		this.t++;
	}
	setorbit(parentplanet, distance, direction, cw){ //cw = -1 or 1
		this.match(parentplanet); //set velocity and position equal
		this.x = this.x + (distance)*Math.cos(direction); //set relative
		this.y = this.y + (distance)*Math.sin(direction); //start location;
		var gravy = parentplanet.m*.0003 / (distance*distance);  //gMm/r^2, where m is 1;
		var orbitspeed = Math.sqrt(gravy*distance);  //a = v^2/r, a* r = v^2, v = sqrt(a*r)
		this.vx = this.vx + orbitspeed*Math.cos(direction + cw*Math.PI/2);
		this.vy = this.vy + orbitspeed*Math.sin(direction + cw*Math.PI/2);
		}
	draw(viewx,viewy){
		var x = this.x - viewx + canvas.width/2; //this function draws object as a circle,
		var y = this.y - viewy + canvas.height/2; //and labels it
		context.beginPath();
		context.fillStyle = rainbow(Math.floor(this.t/3)%6); //sets planet color
		context.arc(x, y, 6, 0, 2 * Math.PI, false); //draws the innermost circle
		context.lineWidth = 2; //circle is thicc
		context.fill();	//ok now actually FILL it.
		context.beginPath();
		context.strokeStyle = "yellow"; //sets planet color
		context.arc(x, y, 8, 0, 2 * Math.PI, false); //draws the circle
		context.lineWidth = 2; //circle is thicc
		context.stroke();	//ok now actually draw it.
		}
        
    }