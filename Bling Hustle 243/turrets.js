var Umo = require('./umo.js');
function randcolor(){
	var thecolors = ["hotpink","deeppink","fuchsia","darkviolet","purple","indigo","salmon","crimson","red","darkred","orange","orangered","gold","yellow","khaki","lime","mediumspringgreen","seagreen","green","darkgreen","olive","teal","aqua","steelblue","lightskyblue","deepskyblue","blue","navy","tan","chocolate","sienna","maroon","silver","darkgrey","dimgrey"];
	return thecolors[Math.floor(Math.random()*thecolors.length)];
	}
function randpolarpoly(sides, minradius){//Polygons will be symmetrical, vertices evenly spaced
	spacing = 2*Math.PI/sides; //Needs at least 3.  Or 4, seems not to work right with odd numbers
	firstradius = Math.random()*(1-minradius) + minradius; //Minimum radius to make things less spiky
	vertices = [[0],[firstradius]];//Array of arrays, first element is list of angles, 2nd element is list of radii.
	i = 0;
	while (i<sides/2){ //First half is random
		i=i+1;
		vertices[0].push(spacing*i);
		vertices[1].push(Math.random()*(1-minradius) + minradius);
		}
	while (i<sides){ //2nd half matches first
		i=i+1;
		vertices[0].push(spacing*i);
		vertices[1].push(vertices[1][sides-i]);
		}
	return vertices; 
	}
function normalizepoly(vertices){//Make the largest radii equal to 1, scale the others proportionally.
	var maxr = 0;
	i = vertices[1].length;
	while (i>0){//finds the largest radii
		i=i-1;
		if (vertices[1][i]>maxr){maxr = vertices[1][i];}
		}
	i = vertices[1].length;
	while (i>0){//Scales radii to 1
		i=i-1;
		vertices[1][i]=vertices[1][i]/maxr;
		}
	}
function pointingat(objdir,dir,distance,size){ //are you pointing at a thing?
	var as = Math.atan2(size,distance); //how much angle does the thing occupy?
	var dd = dir - objdir; //How much off the actual direction are you pointing?
	while (dd > Math.PI){dd = dd - 2*Math.PI;} //This reduces the angle difference to within +- Math.PI
	while (dd < -1*Math.PI){dd = dd + 2*Math.PI;}
	while (as > Math.PI){as = as - 2*Math.PI;} //This reduces the angle difference to within +- Math.PI
	while (as < -1*Math.PI){as = as + 2*Math.PI;}
	if ((dd<as)&&(dd>-1*as)){//-1*anglesize < deltadir < anglesize
		return 1;
		}else {return 0;}
	}
module.exports = class Turret{
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
		var i=0;
		while(i<this.bombs.length){
			this.bombs[i].hurt = 10;
			//this.bombs[i].boombuff = 1;
			i++;
		}
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
		var i=0;
		while(i<this.bombs.length){
			this.bombs[i].update1();
			this.bombs[i].updatebomb();
			i++;
		}
	}
	draw(viewx,viewy){ //mostly stolen from draw ship stuff
		drawpolarpoly(this.basex-viewx+canvas.width/2, this.basey-viewy+canvas.height/2,this.basetheta,this.baseradius,48,this.basecolor,this.a.directionof(this.pivot));
		this.pivot.drawship(viewx,viewy);
		var i=0;
		while (i<this.bombs.length){
			this.bombs[i].drawbomb(viewx,viewy);
			i++;
		}
	}
	fire(){
		var realdir = this.pivot.d;
		if (this.bombs.length>1){//shotgun handling
			var spread = Math.PI/16;
			var interspread = 2*spread/(this.bombs.length-1);
			var i=0;
			while (i<this.bombs.length){
				this.bombs[i].hurt = 8;//nerf damage for testing
				this.pivot.d=realdir - spread + i*interspread;
				this.pivot.launchbomb(this.bombs[i],12,60);
				i++;
			}
		//this.pivot.d = realdir;
		}else{
			this.bombs[0].hurt = 8; //nerf damage for testing
			this.pivot.launchbomb(this.bombs[0],24,40);//	launchbomb(thebomb, mag, time){ 
		}

	}
	ai1(target){//Track target, shoot as appropriate
		if (this.pivot.distance(target) < 1200){ //Don't do anything if closest enemy is far
			this.pivot.fasttrack(target); //friendly turrets point towards closest enemy	
			if ((Math.random()>0.95) && (this.bombs[0].timer < 1)){  //Bots fire occasionally, if bomb isn't in use
				this.fire();//pivot.launchbomb(this.turrets[i].bombs[0], 15, 60); 					
				}
			}
		}

		//function pointingat(objdir,dir,distance,size){ //are you pointing at a thing?
	ai2(target,untargets){//Track target, shoot as appropriate, dont shoot untargets
		if (this.pivot.distance(target) < 1200){ //Don't do anything if closest enemy is far
			this.pivot.fasttrack(target); //friendly turrets point towards closest enemy
			//function pointingat(objdir,dir,distance,size){ //are you pointing at a thing?
			var clearance = true;
			var i=0;
			while (i<untargets.length){
				var objdir1 = this.pivot.directionof(untargets[i]);
				var dir1 = this.pivot.d;
				var distance1 = this.pivot.distance(untargets[i]);
				var size1 = untargets[i].s*2;//*2 is fudge factor
				console.log("dosomething");
				if (pointingat(objdir1,dir1,distance1,size1)==1){
					console.log("Dontshoot");
					clearance = false;
				}
				i++;
			}	
			if ((Math.random()>0.95) && (this.bombs[0].timer < 1)&&(clearance)){  //Bots fire occasionally, if bomb isn't in use
				this.fire();//pivot.launchbomb(this.turrets[i].bombs[0], 15, 60); 					
				}
			}
		}

	ai3(target,untargets){//Track target, shoot as appropriate, dont shoot anchor or untargets
		if (this.pivot.distance(target) < 1200){ //Don't do anything if closest enemy is far
			this.pivot.fasttrack(target); //friendly turrets point towards closest enemy
			//function pointingat(objdir,dir,distance,size){ //are you pointing at a thing?
			var clearance = true;
			var i=0;
			while (i<untargets.length){
				if (pointingat(this.pivot.directionof(untargets[i]),this.pivot.d,this.pivot.distance(untargets[i]),untargets[i].s*2)==1){
					clearance = false;
				}
				i++;
			}	
			if (pointingat(this.pivot.directionof(this.a),this.pivot.d,this.pivot.distance(this.a),this.a.s*2)==1){
				clearance = false;
			}
			if ((Math.random()>0.95) && (this.bombs[0].timer < 1)&&(clearance)){  //Bots fire occasionally, if bomb isn't in use
				this.fire();//pivot.launchbomb(this.turrets[i].bombs[0], 15, 60); 					
				}
			}
		}
	}