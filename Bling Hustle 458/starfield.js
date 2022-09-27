class Star {
	constructor(x,y,z,size){
		this.x = x;
		this.y = y;
		this.z = Math.floor(z);
		this.c = randcolor();
		this.s = size;
	}
	draw(viewx,viewy,viewz, zmax){ //viewx and viewy are scaled differently than star x and y.
		var dz = this.z - viewz;
		while (dz < 0) {
			dz = dz + zmax;//wraps around in the z axis
		}
		var xyscale = 32*dz; //no idea what i did there but ok
		var dx = (this.x-(viewx / xyscale))/dz;
		if (Math.abs(dx)<canvas.width/2){//This is sort of an optimization?  
			var dy = (this.y-(viewy / xyscale))/dz;
			if (Math.abs(dy)<canvas.height/2){
				context.beginPath();
				context.strokeStyle = this.c;
				context.arc(canvas.width/2 + dx,canvas.height/2+dy, this.s/(250*dz), 0, 2 * Math.PI, false);
				context.fillStyle = "white";
				context.fill();
				context.lineWidth = 1;
				context.stroke();
				}		 
			}
		}
	}

class Starfield{
	constructor(xmax,ymax,zmax,minsize,maxsize, layerstars){
		this.xmax = xmax;
		this.ymax = ymax;
		this.zmax = zmax;
		this.stars = [];
		var i=0;
		while (i<zmax){
			var j=0;
			while (j<layerstars){
				var starx = (Math.random()*2-1)*xmax;
				var stary = (Math.random()*2-1)*ymax ;
				var starsize = 1000 + Math.floor(Math.random()*3000);
				this.stars.push(new Star(starx,stary,i,starsize));
				j++;
				}
			i++;
			}
		}
	draw(viewx,viewy,viewz,zmax){
		var i=0;
		while (i<this.stars.length){
			this.stars[i].draw(viewx,viewy,viewz,zmax)
			i++;
			}
		}
	
	}
class Starfield2{
	constructor(xmax,ymax,zmax,minsize,maxsize, layerstars){
		this.xmax = xmax;
		this.ymax = ymax;
		this.zmax = zmax;
		this.starlayers = [];
		var i=0;
		while (i<zmax){
			var onelayer = [];
			var j=0;
			while (j<layerstars){
				var starx = (Math.random()*2-1)*xmax;
				var stary = (Math.random()*2-1)*ymax;
				var starsize = 1000 + Math.floor(Math.random()*3000);
				onelayer.push(new Star(starx,stary,i,starsize));
				j++;
				}
			//X or Y sorting of stars could go here
			this.starlayers.push(onelayer);
			i++;
			}
		}
	draw(viewx,viewy,viewz){
		var i=0;
		var hcx = canvas.width/2;
		var hcy = canvas.height/2;
		while (i<this.starlayers.length){
			var j=0;
			var dz = this.starlayers[i][0].z - viewz;
			while (dz < 0) {
				dz = dz + this.zmax;//wraps around in the z axis
			}
			var xyscale = 32*dz; //no idea what i did there but ok
			while(j<this.starlayers[i].length){
				var dx = (this.starlayers[i][j].x-(viewx / xyscale))/dz;
				if (Math.abs(dx)<hcx){//This is sort of an optimization?  
					var dy = (this.starlayers[i][j].y-(viewy / xyscale))/dz;
					if (Math.abs(dy)<hcy){
						var dotsize = this.starlayers[i][j].s/(250*dz);
						if (dotsize>1.00){
							context.beginPath();
							context.strokeStyle = this.starlayers[i][j].c;
							context.arc(hcx + dx,hcy+dy, this.starlayers[i][j].s/(250*dz), 0, 2 * Math.PI, false);
							context.fillStyle = "white";
							context.fill();
							context.lineWidth = 1;
							context.stroke();
						}else if (dotsize>0.5){
							context.fillStyle = this.starlayers[i][j].c;
							context.fillRect(hcx + dx,hcy+dy,dotsize+1,dotsize+1);
						}else if (dotsize>0.25){
						context.fillStyle = this.starlayers[i][j].c;
						context.fillRect(hcx + dx,hcy+dy,1,1);
							}	
						}	 
					}
				j++;
				}
			i++;
			}
		}
	
	}
class Starfield3{
	constructor(xmax,ymax,zmax,minsize,maxsize, layerstars){
		this.xmax = xmax;
		this.ymax = ymax;
		this.zmax = zmax;
		this.starlayers = [];
		var i=0;
		while (i<zmax){
			var onelayer = [];
			var j=0;
			while (j<layerstars){
				var starx = (Math.random()*2-1)*xmax;
				var stary = (Math.random()*2-1)*ymax;
				var starsize = 1000 + Math.floor(Math.random()*3000);
				onelayer.push(new Star(starx,stary,i,starsize));
				j++;
				}
			//X or Y sorting of stars could go here
			this.starlayers.push(onelayer);
			i++;
			}
		}
	draw(viewx,viewy,viewz){
		var i=0;
		var hcx = canvas.width/2;
		var hcy = canvas.height/2;
		while (i<this.starlayers.length){
			var j=0;
			var dz = this.starlayers[i][0].z - viewz;
			while (dz < 0) {
				dz = dz + this.zmax;//wraps around in the z axis
			}
			var xyscale = 32*dz; //no idea what i did there but ok
			while(j<this.starlayers[i].length){
				var dx = ( (this.starlayers[i][j].x-(viewx / xyscale))/dz );
				if (Math.abs(dx)<hcx){//This is sort of an optimization?  
					var dy = ( (this.starlayers[i][j].y-(viewy / xyscale))/dz );
					if (Math.abs(dy)<hcy){
						var dotsize = this.starlayers[i][j].s/(250*dz);
						if (dotsize>1.00){
							context.beginPath();
							context.strokeStyle = this.starlayers[i][j].c;
							context.arc(hcx + dx,hcy+dy, this.starlayers[i][j].s/(250*dz), 0, 2 * Math.PI, false);
							context.fillStyle = "white";
							context.fill();
							context.lineWidth = 1;
							context.stroke();
						}else if (dotsize>0.5){
							context.fillStyle = this.starlayers[i][j].c;
							context.fillRect(hcx + dx,hcy+dy,dotsize+1,dotsize+1);
						}else if (dotsize>0.25){
						context.fillStyle = this.starlayers[i][j].c;
						context.fillRect(hcx + dx,hcy+dy,1,1);
							}	
						}	 
					}
				j++;
				}
			i++;
			}
		}
	
	}