class Blaster{
	constructor(name,description,price,type,basedamage,updamage,maxdamage,basespeed,upspeed,maxspeed,baseboom,upboom,maxboom,basen,upn,maxn,basetimer,uptimer,maxtimer,nrg,bombcolor,ID){
		this.name = name;//"Super blaster"
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
	fire(theplayer,thetime){ //thebombs would normally be an array with one member umo
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
			if ((this.type == "rapid")||(this.type == "spread")||(this.type == "fixedspread")){
				var cnum = (thetime+i)%6;
				if (cnum == 0){
					this.bombs[i].c = "red";
				}else if (cnum == 1){
					this.bombs[i].c = "orange";
				}else if (cnum == 2){
					this.bombs[i].c = "yellow";
				}else if (cnum == 3){
					this.bombs[i].c = "green";
				}else if (cnum == 4){
					this.bombs[i].c = "blue";
				}else if (cnum == 5){
					this.bombs[i].c = "purple";
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
			this.firing = 0;//not actually used, but -1 would indicate not firing, integer bomb indices would indicate which bomb was next in sequence.
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
		//stuff to render proprietary bombs here.
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
//constructor(name,description,price,type,basedamage,updamage,maxdamage,basespeed,upspeed,maxspeed,baseboom,upboom,maxboom,basen,upn,maxn,basetimer,uptimer,maxtimer,nrg,ID)
     let qblaster = new Blaster("joe","a dude",1000,"spread",                                                            
	 10,4,10,12,2,10,1,0.2,10,6,2,10,40,8,10,11,"red","ID not implemented");//All energy costs set at 11 for now.
	 let weapon1 = new Blaster("Banger","A simple, energy efficient blaster.  Your ships starting weapon may not be exciting, but it gets the job done. This launches a bomb at a moderate 12 p/f relative velocity, exploding on contact, or after a few seconds, doing damage in a small area",300,"plain",                            
	 12,6,10,12,2,10,0.8,0.2,10,1,0,0,40,8,10,12,"red","ID not implemented");
	 weapon1.phas = true; //this is the starter blaster
	 //weapon1.etier = 1; //testing bounce stuff
	 let weapon2 = new Blaster("Mine","Powerful but very slow moving bomb.  This blaster needs to be used in conjunction with some combination of thrusters and clever planning.",500,"plain",                                 
	 40,10,10,1,0,0,2,0.2,10,1,0,0,1800,300,10,40,"purple","ID not implemented");
	 let weapon3 = new Blaster("Flakker","Quickly detonating, short-range weapon with a wide area of effect.  Damage output and range are low, and it's most suitable for finishing off damaged umos or damaging small groups at close range.",600,"fixedspread",
	 8,4,10,12,2,10,1.2,0.2,10,2,1,10,16,8,10,25,"green","ID not implemented");
	 let weapon4 = new Blaster("Railgun","Powerful, fast moving projectile without explosive effect.  The Railgun will almost completely drain your blaster energy in one shot, but it's so fast and powerful you might not need a followup.",1000,"plain",      
	 40,10,10,20,4,4,0.2,0,0,1,0,0,80,8,10,80,"blue","ID not implemented");
	 let weapon5 = new Blaster("Scatter Cannon","Fires an adjustable spread of bombs. Good for close range damage and target rich environments. Probably the best weapon.",2000,"spread",               
	 10,5,10,10,2,5,0.75,0.25,5,4,2,4,80,16,10,30,"white","ID not implemented");
	 let weapon6 = new Blaster("Blazor","Unique beam weapon damages everything in it's path.  Instead of tapping the mouse, hold the left button down for a continuous beam of... honestly, we don't even know, but it hurts. ",1000,"beam",                                                   
	 10,4,10,12,2,10,1,0.2,10,1,0,0,384,64,10,11,"white","ID not implemented");
	 let weapon7 = new Blaster("Double Rainbow","Fires an absurd spread of damaging projectiles.",5000,"fixedspread",          
	 8,5,10,8,1,10,0.3,0.2,4,12,2,2,80,16,10,50,"white","ID not implemented");
	 let weapon8 = new Blaster("Disintigrator","Short range, rapid-firing blaster with good damage output.  Hold the left mouse button down instead of tapping it.",3000,"rapid",                         
	 12,6,10,12,2,10,0.2,0.1,10,6,0,0,16,2,10,11,"white","ID not implemented");
	 let weapon9 = new Blaster("Boodabeep","Beep Beep BaBoomba, Boomba Be Boppo!  Baboombador bopposobeep, babumble beepapoo.  Beepapop boowopendongle, prodoopsenboboompo bopopob.",20000,"plain",                                           
	 64,8,10,12,2,10,3,0.25,10,1,0,0,40,8,10,99,"white","ID not implemented");
	 let weapon0 = new Blaster("Probe","Currently equipped to steal colors or shapes. Upgradeable to provide many other functions. Eventually.",1000,"probe",                      
	 10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,11,"white","ID not implemented");
	 let boss1weapon = new Blaster("joe","Simple, but energy efficient blaster",1000,"type variable not used yet",       
	 10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,11,"white","ID not implemented");
	 
	 let allblasters = [weapon0,weapon1,weapon2,weapon3,weapon4,weapon5,weapon6,weapon7,weapon8,weapon9,qblaster,boss1weapon];

	 function baseblastercopy(old){//Creates a new Blaster with same base stats as old Blaster.  Upgrades are not copied.
		let tempblaster = new Blaster(old.name,old.description,old.price,old.type,                                                            
	 	old.bhurt,old.uphurt,old.maxhurt,old.bspeed,old.upspeed,old.maxspeed,old.bboom,old.upboom,old.maxboom,old.bn,old.upn,old.maxn,
	 	old.btimer,old.uptimer,old.maxtimer,old.ecost,old.c,old.id);
		return tempblaster;
	 }
	 