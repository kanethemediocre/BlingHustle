class Blaster{
	constructor(name,description,price,type,basedamage,updamage,maxdamage,basespeed,upspeed,maxspeed,baseboom,upboom,maxboom,basen,upn,maxn,basetimer,uptimer,maxtimer,ID){
		this.name = name;//"Super blaster"
		this.description=description; //"The super blaster is super dope"
		this.price = price; //integer cost of blaster at tier 1
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
		this.c = "red"; 
		this.level = 0;
		this.dtier = 0; //number of damage upgrades applied
		this.btier = 0; //number of boombuff upgrades applied
		this.ntier = 0; //number of multishot upgrades applied
		this.stier = 0; //number of speed upgrades applied
		this.ttier = 0; //number of timer upgrades applied
		this.xtier = 0; //special upgrade slot
		this.bombs = []; //Not used yet
		var i = 0;
		while(i<this.n){ //sets up an array of n bombs needed for the blaster, most often n=1.
			this.bombs.push(new Umo(0,0,0,this.c));
			i=i+1;
			}
		}//w signifies weapon, next 2 digits are weapon number, x signifies notjhing, next 2 digits are upgrade tier
	levelcalc(){
		this.level = this.dtier+this.btier+this.ntier+this.stier;
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
	fire(theship,thebombs){ //thebombs would normally be an array with one member umo
		var i=0; //first set/verify weapon properties on bomb
		while (i<thebombs.length){
			thebombs[i].c=this.c;
			thebombs[i].hurt=this.hurt;
			thebombs[i].boombuff = this.boom;
			if (this.type == "plain"){
				thebombs[i].hp = 1;
				thebombs[i].shield = 1;
			}else if (this.type == "bounce"){
				thebombs[i].hp = 100;
				thebombs[i].shield = 1;
			}else if ((this.type == "rapidrainbow")||(this.type == "doublerainbow")){
				var cnum = i % 6;
				}
			i=i+1;
		}
		if (thebombs.length==1){ //single projectile handling is simplest
			theship.launchbomb(thebombs[0],this.speed,this.timer);	
			}
		}
	}
		//constructor(name,description,price,type,basedamage,updamage,maxdamage,basespeed,upspeed,maxspeed,baseboom,upboom,maxboom,basen,upn,maxn,basetimer,uptimer,maxtimer,ID)
     let qblaster = new Blaster("joe","a dude",1000,"plain",                                                             10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,"ID not implemented");
	 let weapon1 = new Blaster("Banger","Simple, but energy efficient blaster",300,"plain",                              12,6,10,12,2,10,1,0.2,10,1,0,0,40,8,10,"ID not implemented");
	 let weapon2 = new Blaster("Mine","Powerful but very slow moving bomb",500,"remote1",                                40,10,10,12,2,10,2,0.2,10,1,0,0,40,8,10,"ID not implemented");
	 let weapon3 = new Blaster("Flakker","Quickly detonating, short-range weapon with a wide area of effect",600,"plain",8,4,10,12,2,10,1.4,0.2,10,1,0,0,16,8,10,"ID not implemented");
	 let weapon4 = new Blaster("Railgun","Powerful, fast moving projectile with minimal blast radius",1000,"plain",      50,10,10,20,2,10,0.2,0.2,0,1,0,0,40,8,10,"ID not implemented");
	 let weapon5 = new Blaster("Scatter Cannon","Fires an adjustable spread of projectiles",2000,"bounce",               10,5,10,8,1,10,0.75,0.25,3,4,2,2,80,16,10,"ID not implemented");
	 let weapon6 = new Blaster("joe","Simple, but energy efficient blaster",1000,"beam",                                 10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,"ID not implemented");
	 let weapon7 = new Blaster("Double Rainbow","Fires an absurd spread of damaging projectiles",5000,"doublerainbow",   12,4,10,12,2,10,0.2,0,0,12,0,0,40,8,10,"ID not implemented");
	 let weapon8 = new Blaster("Disintigrator","Short range, rapid-firing blaster",1000,"rapidrainbow",                  10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,"ID not implemented");
	 let weapon9 = new Blaster("Boodabeep","Beep Beep BaBoomba",20000,"plain",                                           10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,"ID not implemented");
	 let weapon0 = new Blaster("Probe","Highly configurable sensor probe",1000,"type variable not used yet",             10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,"ID not implemented");
	 let boss1weapon = new Blaster("joe","Simple, but energy efficient blaster",1000,"type variable not used yet",       10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,"ID not implemented");
	 let allblasters = [weapon0,weapon1,weapon2,weapon3,weapon4,weapon5,weapon6,weapon7,weapon8,weapon9,qblaster,boss1weapon];
	 