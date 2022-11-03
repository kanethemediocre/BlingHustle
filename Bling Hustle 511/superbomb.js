class Superbomb{
	constructor(superbombtype){
		this.sbt=superbombtype;
		this.n=0;
		this.bombs = [];
		this.orbits = [];
		}
	initorbitbomb(bombs,coresize,minorbitsize,maxorbitsize,origin,orbitspeed,direction,speed){//Orbitspeed is a multiplier value.  Individual orbit speeds are handled with the borbitspeed variable.
		this.bombs=bombs;
		this.bombs[0].match(origin);
		this.bombs[0].x = this.bombs[0].x+Math.cos(direction)*(maxorbitsize+32);//set position in direction ship is pointint
		this.bombs[0].vx =  this.bombs[0].vx+Math.cos(direction)*speed;//set velocity to reflect launch speed and distance
		this.bombs[0].y = this.bombs[0].y+Math.sin(direction)*(maxorbitsize+32);//set position in direction ship is pointint
		this.bombs[0].vy =  this.bombs[0].vy+Math.sin(direction)*speed;//set velocity to reflect launch speed and distance
		this.bombs[0].timer = 1000;//Lifespan of bomb cluster.
		this.orbits = [ [0,0,0] ];
		//need to fire this first bomb here
		var i=1;
		while(i<this.bombs.length){
			this.bombs[i].match(this.bombs[0]);
			this.bombs[i].timer = this.bombs[0].timer;
			var orbitsize = Math.floor(minorbitsize + (maxorbitsize-minorbitsize)*Math.random());
			var orbitstart = Math.random()*Math.PI*2; //Angular starting position
			var borbitspeed = Math.sqrt(orbitspeed/orbitsize);  //GM constant replaced with orbit speed.
			//var odx = orbitsize*Math.cos(orbitstart);
			//var ody = orbitsize*Math.sin(orbitstart);
			this.orbits.push([orbitsize,orbitstart,borbitspeed]);  //each element in orbits is a 3 number array--the size of the orbit, the current angular position,
			this.bombs[i].x = this.bombs[i].x+Math.cos(direction)*maxorbitsize+12;//set position in direction ship is pointint
			this.bombs[i].y = this.bombs[i].y+Math.sin(direction)*maxorbitsize+12;//set position in direction ship is pointint
			this.bombs[i].timer = this.bombs[0].timer;//Lifespan of bomb cluster.
			i++;
			}
		}
	maintainorbitbomb(){
		this.bombs[0].c =  randcolor();
		this.bombs[0].c2 = this.bombs[0].c;
		var i=1;
		while(i<this.bombs.length){
			if (this.bombs[i].timer > this.bombs[0].timer){this.bombs[i].timer = this.bombs[0].timer;}
			this.orbits[i][1] = this.orbits[i][1]+this.orbits[i][2];
			this.bombs[i].x = this.bombs[0].x+this.orbits[i][0]*Math.cos(this.orbits[i][1]);
			this.bombs[i].y = this.bombs[0].y+this.orbits[i][0]*Math.sin(this.orbits[i][1]);
			
			i++;
			}
		}	
	
	}