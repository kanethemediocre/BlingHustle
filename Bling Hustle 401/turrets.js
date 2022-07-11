class Turret{
	constructor(team, anchor, anchord, anchorr){
		this.pivot = new Umo(0,0,24,randcolor());
		this.pivot.c2 = randcolor();
		this.pivot.ai = team;
		this.team = team;
		this.a = anchor;
		this.anchorvisible = true;
		this.pivotvisible = true;
		this.active = true;
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
		//update it like a ship here?
		this.pivot.updatepivot();
		if (this.pivot.hp>0){
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
		else if (this.pivot.hp==-1000){
			this.pivot.deadtime--;
			if (this.pivot.deadtime<=0){
				this.pivot.hp = this.pivot.maxhp;
				this.pivot.shield = Math.floor(this.pivot.maxshield/4)
				}
			}
		else{
			this.pivot.deadtime = 2400;
			this.pivot.hp = -1000;
			this.pivot.vx = 0;
			this.pivot.vy = 0;
			this.pivot.x = -1000000 - Math.floor(Math.random()*100000);
			this.pivot.y = 0;
			}
		}
	draw(viewx,viewy){ //mostly stolen from draw ship stuff
		if (this.anchorvisible){ drawpolarpoly(this.basex-viewx+canvas.width/2, this.basey-viewy+canvas.height/2,this.basetheta,this.baseradius,48,this.basecolor,this.a.directionof(this.pivot)); }
		if (this.pivotvisible){ this.pivot.drawship(viewx,viewy); }
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