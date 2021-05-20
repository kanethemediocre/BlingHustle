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
		return this.price*(2^this.level); //Cost doubles every upgrade level
		}
	plusdamage(){ //upgrades damage
		if (this.dtier<this.maxhurt){
			this.dtier = this.dtier+1;
			this.levelcalc();
			this.hurt=this.bhurt+this.uphurt*this.dtier; //Upgrades are linear
			}
		}
	plusremote(){ //activates remote detonator
		if (this.rtier==0){
			this.rtier = 1;
			this.levelcalc();
			}
		}
	plusbounce(){ //Makes weapon projectiles have HP, and thus bounce of planets.
		if (this.etier==0){
			this.etier = 1;
			this.levelcalc();
			//actually do the thing here
			}
		}
	plusspeed(){ //upgrades projectile speed
		if (this.stier<this.maxspeed){
			this.stier = this.stier+1;
			this.levelcalc();
			this.speed=this.bspeed+this.upspeed*this.stier;
			}
		}
	plusboom(){ //upgrades blast radius
		if (this.btier<this.maxboom){
			this.btier = this.btier+1;
			this.levelcalc();
			this.boom=this.bboom+this.upboom*this.btier; 
			}
		}
	plusn(){
		if (this.ntier<this.maxn){
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
		}		
	plustimer(){
		if (this.ttier<this.maxtimer){
			this.ttier = this.ttier+1;
			this.levelcalc();
			this.timer=this.btimer+this.uptimer*this.ttier; 
			}
		}
	fire(theship,thetime){ //thebombs would normally be an array with one member umo
		//theship.hp = 1; //works here...
		var i=0; 
		while (i<this.bombs.length){//first set/verify weapon properties on bomb
			//theship.hp = 1; //works here
			this.bombs[i].c=this.c;
			this.bombs[i].hurt=this.hurt;
			this.bombs[i].boombuff = this.boom;
			this.bombs[i].hp = 1;
			this.bombs[i].shield = 1;
			if (this.etier == 1){
				this.bombs[i].hp = 100;
				this.bombs[i].shield = 1;
			}
			if ((this.type == "rapid")||(this.type == "spread")){
				//theship.hp = 1; 
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
		}else if (this.bombs.length==1){ //single projectile handling is simplest
			//theship.hp = 600;
			theship.launchbomb(this.bombs[0],this.speed,this.timer);	
		}else if (this.type == "rapid"){
			//rapid fire handling here
			//Probably set some flag to active, which will handle based on mouse state rather than on mousedown event.
		}else if (this.type == "spread"){
			//theship.hp = 100*this.bombs.length; //works here
			var spread = 0.5; //arbitrary angle in radians.
			var n = this.bombs.length;
			var interspread = spread/(n-1);//for n==6 and spread == 0.5, interspread == 0.1
			var shipd = theship.d;
			theship.d=theship.d+spread/2; //for above, theship.d=theship.d+0.25;
			var i=0;
			while (i<n){
				//theship.hp = 1; //works here
				theship.launchbomb(this.bombs[i],this.speed,this.timer);	
				theship.d = theship.d-interspread;
				i=i+1;
				}
			theship.d = shipd;
			}
		}
	draw(viewx,viewy){
		var i = 0;
		while (i<this.bombs.length){
			//if (this.bombs[i].timer>0){
				this.bombs[i].drawbomb(viewx,viewy);//(ships[0].x,ships[0].y)
				//}
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

}
//constructor(name,description,price,type,basedamage,updamage,maxdamage,basespeed,upspeed,maxspeed,baseboom,upboom,maxboom,basen,upn,maxn,basetimer,uptimer,maxtimer,nrg,ID)
     let qblaster = new Blaster("joe","a dude",1000,"spread",                                                            10,4,10,12,2,10,1,0.2,10,6,2,10,40,8,10,11,"red","ID not implemented");//All energy costs set at 11 for now.
	 //qblaster.plusremote();
	 //qblaster.rtier = 1;
	 let weapon1 = new Blaster("Banger","Simple, but energy efficient blaster",300,"plain",                              12,6,10,12,2,10,1,0.2,10,1,0,0,40,8,10,11,"red","ID not implemented");
	 let weapon2 = new Blaster("Mine","Powerful but very slow moving bomb",500,"remote1",                                40,10,10,1,0,0,2,0.2,10,1,0,0,1800,300,10,11,"purple","ID not implemented");
	 let weapon3 = new Blaster("Flakker","Quickly detonating, short-range weapon with a wide area of effect",600,"plain",8,4,10,12,2,10,1.4,0.2,10,1,0,0,16,8,10,11,"green","ID not implemented");
	 let weapon4 = new Blaster("Railgun","Powerful, fast moving projectile with minimal blast radius",1000,"plain",      50,10,10,20,2,10,0.2,0,0,1,0,0,80,8,10,11,"blue","ID not implemented");
	 let weapon5 = new Blaster("Scatter Cannon","Fires an adjustable spread of projectiles",2000,"spread",               10,5,10,8,1,10,0.75,0.25,3,4,2,2,80,16,10,11,"white","ID not implemented");
	 let weapon6 = new Blaster("joe","Unique beam weapon",1000,"beam",                                                   10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,11,"white","ID not implemented");
	 let weapon7 = new Blaster("Double Rainbow","Fires an absurd spread of damaging projectiles",5000,"spread",          10,5,10,8,1,10,0.25,0.25,3,12,2,2,80,16,10,11,"white","ID not implemented");
	 let weapon8 = new Blaster("Disintigrator","Short range, rapid-firing blaster",1000,"rapidrainbow",                  10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,11,"white","ID not implemented");
	 let weapon9 = new Blaster("Boodabeep","Beep Beep BaBoomba",20000,"plain",                                           10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,11,"white","ID not implemented");
	 let weapon0 = new Blaster("Probe","Highly configurable sensor probe",1000,"type variable not used yet",             10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,11,"white","ID not implemented");
	 let boss1weapon = new Blaster("joe","Simple, but energy efficient blaster",1000,"type variable not used yet",       10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,11,"white","ID not implemented");
	 let allblasters = [weapon0,weapon1,weapon2,weapon3,weapon4,weapon5,weapon6,weapon7,weapon8,weapon9,qblaster,boss1weapon];
	 