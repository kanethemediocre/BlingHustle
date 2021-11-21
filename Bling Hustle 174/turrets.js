class Turret{
	constructor(team, anchor, anchord, anchorr){
		this.pivot = new Umo(0,0,24,randcolor());
		this.pivot.c2 = randcolor();
		this.pivot.ai = team;
		this.team = team;
		this.a = anchor;
		this.ad = anchord;
		this.ar = anchorr;
		this.basecolor = randcolor();
		this.baseradius = [1,1,1,1];
		this.basetheta = [0.1,0.8*Math.PI, 1.2*Math.PI,1.9*Math.PI];
		this.basex = 0;
		this.basey = 0;//set in update
		var shape = randpolarpoly(12,0.5);
		this.pivot.polytheta = shape[0];
		this.pivot.polyradius = shape[1];
		this.basecolor = randcolor();
		this.bombs = [new Umo(0,0,8,"purple")];
		//this.pivot.vd = 0.1;
	}
	update1(){
		this.pivot.vx = this.a.vx;
		this.pivot.vy = this.a.vy;
		this.pivot.x = this.a.x+Math.cos(this.ad+this.a.d)*this.ar;
		this.pivot.y = this.a.y+Math.sin(this.ad+this.a.d)*this.ar;
		//this.pivot.d = this.pivot.d+this.pivot.vd;
		this.basex = this.a.x+Math.cos(this.ad+this.a.d)*(this.ar-48);
		this.basey = this.a.y+Math.sin(this.ad+this.a.d)*(this.ar-48);
		this.bombs[0].update1();
		this.bombs[0].updatebomb();
	}
	draw(viewx,viewy){ //mostly stolen from draw ship stuff
		drawpolarpoly(this.basex-viewx+canvas.width/2, this.basey-viewy+canvas.height/2,this.basetheta,this.baseradius,48,this.basecolor,this.a.directionof(this.pivot));
		this.pivot.drawship(viewx,viewy);
		this.bombs[0].drawbomb(viewx,viewy);
	}
	fire(){
		this.pivot.launchbomb(this.bombs[0],12,60);//	launchbomb(thebomb, mag, time){ 
	}
	ai1(target){//Track target, shoot as appropriate
		if (this.pivot.distance(target) < 2000){ //Don't do anything if closest enemy is far
			this.pivot.fasttrack(target); //friendly turrets point towards closest enemy	
			if ((Math.random()>0.95) && (this.bombs[0].timer < 1)){  //Bots fire occasionally, if bomb isn't in use
				this.fire();//pivot.launchbomb(this.turrets[i].bombs[0], 15, 60); 					
				}
			}
		}
	}