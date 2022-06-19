class Blaster{
	constructor(name,description,price,type,basedamage,updamage,maxdamage,basespeed,upspeed,maxspeed,baseboom,upboom,maxboom,basen,upn,maxn,basetimer,uptimer,maxtimer,nrg,bombcolor,ID){
		this.name = name;//"Super blaster"
		this.origin = ""; //This needs to be replaced with the player ship umo.
		this.type = type;
		this.description=description; //"The super blaster is super dope"
		this.phas = false; //player has blaster or not
		this.price = price; //integer cost of blaster at tier 1
		this.ecost = nrg; //Energy cost of firing blaster
		//this.upgrades = upgrades; //["d5xx","b01x5","s2x4"] would add 5 to damage for up to infinite upgrades, 0.1 to boombuff for up to 5 upgrades,  2 to speed for up to 4 upgrades 
		this.bhurt = basedamage; //initial damage
		this.hurt = basedamage; //current damage
		this.uphurt = updamage; //damage bonus per tier
		this.maxhurt = maxdamage;  //maximum bonus tier, NOT maximum raw damage
		this.bspeed = basespeed; //same stuff for speed
		this.speed = basespeed;
		this.upspeed = upspeed;
		this.maxspeed = maxspeed; //again NOT maximum raw speed
		this.bboom = baseboom;//same stuff for boom (blast radius multiplier)
		this.boom = baseboom; 
		this.upboom = upboom;
		this.maxboom = maxboom;
		this.bn = basen; //base projectile number (normally 1)
		this.n = basen;
		this.upn = upn;
		this.maxn = maxn;
		this.btimer = basetimer; //base projectile lifespan
		this.timer = basetimer;
		this.uptimer = uptimer;
		this.maxtimer = maxtimer;
		this.id = ID;
		this.c = bombcolor; 
		this.firing =-1;//for use with rapid blasters.  -1 is inactive, 0 and above are bomb indices
		this.level = 0;
		this.rtier = 0; //number of remote upgrades applied (max 1)
		this.etier = 0; //number of "elastic"(bounce) upgrades applied
		this.dtier = 0; //number of damage upgrades applied
		this.btier = 0; //number of boombuff upgrades applied
		this.ntier = 0; //number of multishot upgrades applied
		this.stier = 0; //number of speed upgrades applied
		this.ttier = 0; //number of timer upgrades applied
		this.xtier = 0; //special upgrade slot
		this.bombs = []; 
		var i = 0;
		while(i<this.n){ //sets up an array of n bombs needed for the blaster, most often n=1.
			this.bombs.push(new Umo(0,0,0,this.c));
			this.bombs[i].timer = 0;
			this.bombs[i].c=this.c;
			this.s = 16; //default non-exploded size
			this.bombs[i].hurt=this.hurt;
			this.bombs[i].boombuff = this.boom;
			this.bombs[i].hp = 1;
			this.bombs[i].shield = 1;
			i=i+1;
			}
		}//w signifies weapon, next 2 digits are weapon number, x signifies notjhing, next 2 digits are upgrade tier
	levelcalc(){
		this.level = this.etier+this.rtier+this.dtier+this.btier+this.ntier+this.stier+this.ttier+this.xtier;
		}
	nextupcost(){
		return this.price*(2**this.level); //Cost doubles every upgrade level
		}
	plusdamage(){ //upgrades damage
		this.dtier = this.dtier+1;
		this.levelcalc();
		this.hurt=this.bhurt+this.uphurt*this.dtier; //Upgrades are linear
		}
	plusremote(){ //activates remote detonator
		this.rtier = 1;
		this.levelcalc();
		}
	plusbounce(){ //Makes weapon projectiles have HP, and thus bounce of planets.
		this.etier = 1;
		this.levelcalc();
		}
	plusspeed(){ //upgrades projectile speed
		this.stier = this.stier+1;
		this.levelcalc();
		this.speed=this.bspeed+this.upspeed*this.stier;
		}
	plusboom(){ //upgrades blast radius
		this.btier = this.btier+1;
		this.levelcalc();
		this.boom=this.bboom+this.upboom*this.btier; 
		}
	plusn(){
		this.ntier = this.ntier+1;
		this.levelcalc();
		var i = 0;
		while(i<this.upn){ //adds elements to bombs array.  Their properties will be set at firing.
			this.bombs.push(new Umo(0,0,0,this.c));
			this.bombs[i].timer = 0;
			i=i+1;
			}
		this.n=this.bn+this.upn*this.ntier; 
		}		
	plustimer(){
		this.ttier = this.ttier+1;
		this.levelcalc();
		this.timer=this.btimer+this.uptimer*this.ttier; 
		}
	plusx(){ //auxilliary upgrade variable for special cases
		this.xtier = this.xtier+1;
		this.levelcalc();
		}
	fire(theplayer,thetime){ //
		var i=0; 
		while (i<this.bombs.length){//first set/verify weapon properties on bomb
			this.bombs[i].c=this.c;
			this.bombs[i].hurt=this.hurt;
			this.bombs[i].boombuff = this.boom;
			this.bombs[i].hp = 1;
			this.bombs[i].shield = 1;
			if (this.etier >0){
				this.bombs[i].hp = 100;
				this.bombs[i].shield = 1;
			}
			if ((this.type == "rapid")||(this.type == "spread")||(this.type == "fixedspread")||(this.type == "multiplex")){
				var cnum = (thetime+i)%6;
				if (cnum == 0){
					this.bombs[i].c = "red";
					this.bombs[i].c2 = "orange";
				}else if (cnum == 1){
					this.bombs[i].c = "orange";
					this.bombs[i].c2 = "yellow";
				}else if (cnum == 2){
					this.bombs[i].c = "yellow";
					this.bombs[i].c2 = "green";
				}else if (cnum == 3){
					this.bombs[i].c = "green";
					this.bombs[i].c2 = "blue";
				}else if (cnum == 4){
					this.bombs[i].c = "blue";
					this.bombs[i].c2 = "purple";
				}else if (cnum == 5){
					this.bombs[i].c = "purple";
					this.bombs[i].c2 = "red";
					}
			}
			i=i+1;
		}
		//Firing bomb(s)
		if ((this.rtier == 1)&&(this.bombs[0].timer>6)){//if blaster has remote detonator and bombs are not yet detonated....
			var i=0;
			while (i<this.bombs.length){//In most cases only one bomb, but the while loop can handle any number
				this.bombs[i].timer=6; //Bombs begin to explode at timer==6, so moving the timer forward will trigger the explosion on update.
				i=i+1;
				}
		}else if ((this.bombs.length==1)&&((this.type=="plain")||(this.type=="probe"))){ //single projectile handling is simplest
			theplayer.ship.launchbomb(this.bombs[0],this.speed,this.timer);	
		}else if (this.type == "rapid"){
			this.firing = 0;
		}else if (this.type == "spread"){
			//var spread = 0.5; //arbitrary angle in radians.
			var spread = 0.0625 + 128/theplayer.mousedistance; //Used global variable mousedistance here, shame....
			if (spread>Math.PI){spread = Math.PI;}
			var n = this.bombs.length;
			var interspread = spread/(n-1);//for n==6 and spread == 0.5, interspread == 0.1
			var shipd = theplayer.ship.d;
			theplayer.ship.d=theplayer.ship.d+spread/2; //for above, theship.d=theship.d+0.25;
			var i=0;
			while (i<n){
				theplayer.ship.launchbomb(this.bombs[i],this.speed,this.timer);	
				theplayer.ship.d = theplayer.ship.d-interspread;
				i=i+1;
				}
			theplayer.ship.d = shipd;
		}else if (this.type == "fixedspread"){
			var spread = Math.PI/2; //arbitrary angle in radians.
			var n = this.bombs.length;
			var interspread = spread/(n-1);//for n==6 and spread == 0.5, interspread == 0.1
			var shipd = theplayer.ship.d;
			theplayer.ship.d=theplayer.ship.d+spread/2; //for above, theship.d=theship.d+0.25;
			var i=0;
			while (i<n){
				theplayer.ship.launchbomb(this.bombs[i],this.speed,this.timer);	
				theplayer.ship.d = theplayer.ship.d-interspread;
				i=i+1;
				}
			theplayer.ship.d = shipd;
		}else if (this.type == "novaspread"){
			var spread = 2*Math.PI; //arbitrary angle in radians.
			var n = this.bombs.length;
			var interspread = spread/(n-1);//for n==6 and spread == 0.5, interspread == 0.1
			var shipd = theplayer.ship.d;
			theplayer.ship.d = theplayer.ship.d+spread/2; //for above, theship.d=theship.d+0.25;
			var i=0;
			while (i<n){
				theplayer.ship.launchbomb(this.bombs[i],this.speed,this.timer);	
				theplayer.ship.d = theplayer.ship.d-interspread;
				i=i+1;
				}
			theplayer.ship.d = shipd;
		}else if (this.type == "multiplex"){
			var n = this.bombs.length;
			var interspread = 32
			var interstart = -1*((n-1)/2)*interspread
			var offsetd = theplayer.ship.d+Math.PI/2;
			var i=0;
			while (i<n){
				var interoffset = interstart + interspread*i;
				var dx = interoffset*Math.cos(offsetd);
				var dy = interoffset*Math.sin(offsetd);
				theplayer.ship.launchbomb(this.bombs[i],this.speed,this.timer);	
				this.bombs[i].x = this.bombs[i].x + dx;
				this.bombs[i].y = this.bombs[i].y + dy
				i=i+1;
				}
			}
		}
	draw(viewx,viewy){
		var i = 0;
		while (i<this.bombs.length){
			if (this.bombs[i].timer>0){
				this.bombs[i].drawbomb(viewx,viewy);//(ships[0].x,ships[0].y)
				}
			i=i+1;
			}
		}
	update1(){
		var i=0;
		while (i<this.bombs.length){
			this.bombs[i].update1();
			this.bombs[i].updatebomb();
			i=i+1;
		}
	}
	scollide(theship){ //collision for ships
		var i=0;
		while (i<this.bombs.length){
			if (this.bombs[i].timer>0){
				this.bombs[i].bombcollide(theship);
				}
			i=i+1;
			}
		}
	pcollide(theplanet){ //collision for planets 
		var i=0;
		while (i<this.bombs.length){
			if (this.bombs[i].timer>0){
				theplanet.circlecollide(this.bombs[i]);
				}
			i=i+1;
			}
		}
	fall(theplanet){ //Sort of inverse of the gravitate function, this gets theplanet to gravitate all the member bombs.
		var i=0;
		while (i<this.bombs.length){
			if (this.bombs[i].timer>0){
				theplanet.gravitate(this.bombs[i]);
				}
			i=i+1;
			}		
		}
	drawstats(xpos,ypos){
		context.fillStyle = "green";
		context.font = "12px Ariel";
		var blasterchartlabels = ["Name","Type","Price","Energy Cost","Damage","Speed","Blast","Projectiles","Timer","Level"];
		var blasterchartvalues = [this.name,this.type,this.price,this.ecost,this.hurt,this.speed,this.boom,this.n,this.timer,this.level];
		var blasterchart = [blasterchartlabels,blasterchartvalues];
		showchart(blasterchart, 128, 16, xpos,ypos);
		}
	savetierstring(){//Only saves upgrade state
		var has = 0;
		if (this.phas){has = 1;}
		var r = this.rtier;
		var e = this.etier;
		var d = this.dtier;
		var b = this.btier;
		var n = this.ntier;
		var s = this.stier;
		var t = this.ttier;
		var x = this.xtier;
		var tierstring = has+" "+r+" "+e+" "+d+" "+b+" "+n+" "+s+" "+t+" "+x;
		return tierstring;
		}
	loadtierstring(thetiers){
		var i = 1;//kludge
		var lastword = "";
		var values = [];
		while(i<thetiers.length){
			var thechar = thetiers[i];
			if (thechar!=" "){
				lastword=lastword+thechar;
				}
			else {
				values.push(lastword)
				lastword = "";
				}
			i++;
			}
		console.log(values[0]);
		if (values[0]==1){this.phas = true;}else{this.phas=false;}//Not sure if necessary to do like that.
		console.log(this.phas);
		var i=0;
		while(i<parseInt(values[1])){
			this.plusremote();
			i++;
			}
		var i=0;
		while(i<parseInt(values[2])){
			this.plusbounce();
			i++;
			}
		var i=0;
		while(i<parseInt(values[3])){
			this.plusdamage();
			i++;
			}
		var i=0;
		while(i<parseInt(values[4])){
			this.plusboom();
			i++;
			}
		var i=0;
		while(i<parseInt(values[5])){
			this.plusn();
			i++;
			}
		var i=0;
		while(i<parseInt(values[6])){
			this.plusspeed();
			i++;
			}
		var i=0;
		while(i<parseInt(values[7])){
			this.plustimer();
			i++;
			}
		var i=0;
		while(i<parseInt(values[8])){
			this.plusx();
			i++;
			}
		}
	}
