class Turret{
	constructor(team, anchor, anchord, anchorr){
		this.pivot = new Umo(0,0,0,randcolor());
		this.pivot.c2 = randcolor();
		this.team = team;
		this.a = anchor;
		this.ad = anchord;
		this.ar = anchorr;
		this.baseradius = [1,1,1];
		this.basetheta = [0,0.8*Math.PI, 1.2*Math.PI];
		this.basecolor = randcolor();
	}
	update1(){
		this.pivot.vx = this.a.vx;
		this.pivot.vy = this.a.vy;
		this.pivot.x = this.a.x+Math.cos(this.ad+this.a.d)*this.ar;
		this.pivot.y = this.a.y+Math.sin(this.ad+this.a.d)*this.ar;
	}
	draw(viewx,viewy){ //mostly stolen from draw ship stuff
		this.pivot.drawship(viewx,viewy);
	}
	
}