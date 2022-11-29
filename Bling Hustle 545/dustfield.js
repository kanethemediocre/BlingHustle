class Dust {
	constructor(x,y,size){
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.vy = 0;
		this.c = randcolor();
		this.streak = false;
		this.s = size;
	}
	draw(viewx,viewy){ //viewx and viewy are scaled differently than star x and y.
		var dx = this.x-viewx;
		if (Math.abs(dx)<canvas.width/2){//This is sort of an optimization?  
			var dy = this.y - viewy;
			if (Math.abs(dy)<canvas.height/2){
				context.beginPath();
				context.strokeStyle = this.c;
				context.arc(canvas.width/2 + dx,canvas.height/2+dy, this.s, 0, 2 * Math.PI, false);
				context.fillStyle = "white";
				context.fill();
				context.lineWidth = 1;
				context.stroke();
				}		 
			}
		}
	}

class Dustfield{
	constructor(xmax,ymax,minsize,maxsize, numdust){
		this.xmax = xmax;
		this.ymax = ymax;
		this.dust = [];
		var i=0;
		while (i<numdust){
			var dustx = (Math.random()*2-1)*xmax;
			var dusty = (Math.random()*2-1)*ymax ;
			var dustsize = minsize + Math.floor(Math.random()*(maxsize-minsize));
			this.dust.push(new Dust(dustx,dusty,dustsize));
			i++;
			}
		}
	drawstatic(viewx,viewy){
		var i=0;
		while (i<this.dust.length){
			this.dust[i].draw(viewx,viewy);
			i++;
			}
		}
	clearhidden(thesystem){
		var i=0;
		while(i<this.dust.length){
			var dummy = new Umo(0,0,1,"pink");
			dummy.x = this.dust[i].x;
			dummy.y = this.dust[i].y;
			var clear = true;
			//var problems = 0;
			var j=0;
			while(j<thesystem.planets.length){
				if (dummy.collide(thesystem.planets[j])){
					clear = false; 
					j=thesystem.planets.length;//exits planet checking loop, it dont care if it collides with multiple.
					}
				j++;
				}
			if (clear == false){
				this.dust.splice(i, 1);//this deletes entry at i, and implicitly selects the next entry
				}
			else {
				i++;
				}
			}
		console.log("Dust remaining: "+this.dust.length);
		}
	}
