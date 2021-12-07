var Umo = require('./umo.js');
var Bubblesplosion = require('./bubblesplosion.js');
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

var Shopitem = require('./shopitem.js');
var Shop = require('./shop.js');
var Bling = require('./bling.js');
let repairshopitem = new Shopitem("upgrade",0,"repair",0);
// w1 excluded because player starts with it
let buyw0item = new Shopitem("blaster",0,"buy",0);//Probe weapon
let buyw2item = new Shopitem("blaster",2,"buy",0); //Mine weapon w1 excluded because player starts with it
let buyw3item = new Shopitem("blaster",3,"buy",0); //Flakker weapon
let buyw4item = new Shopitem("blaster",4,"buy",0);//Railgun weapon
let buyw5item = new Shopitem("blaster",5,"buy",0);//Scatter cannon weapon
let buyw6item = new Shopitem("blaster",6,"buy",0);//Beam weapon
let buyw7item = new Shopitem("blaster",7,"buy",0);//Double rainbow
let buyw8item = new Shopitem("blaster",8,"buy",0);//Disintegrator
let buyw9item = new Shopitem("blaster",9,"buy",0);//Beepadoop
let blasterbuyitems = [buyw0item,buyw2item,buyw3item,buyw4item,buyw5item,buyw6item,buyw7item,buyw8item,buyw9item];
//No remote detonator for w0, w3,w4,w6,w7,w8 (probe, flakker, railgun, beam, double rainbow, disintigrator)
let remotew1item = new Shopitem("blaster",1,"remote",1);//blaster remote upgrade
let remotew2item = new Shopitem("blaster",2,"remote",1); //Mine remote detonator upgrade
let remotew5item = new Shopitem("blaster",2,"remote",1); //Scatter cannon remote detonator upgrade
let remotew9item = new Shopitem("blaster",2,"remote",1); //Beepadoop remote detonator upgrade
//No damage upgrade for w0 (probe)
let upw1damage = new Shopitem("blaster",1,"damage",1); //Damage upgrades
let upw2damage = new Shopitem("blaster",2,"damage",1); 
let upw3damage = new Shopitem("blaster",3,"damage",1); 
let upw4damage = new Shopitem("blaster",4,"damage",1); 
let upw5damage = new Shopitem("blaster",5,"damage",1); 
let upw6damage = new Shopitem("blaster",6,"damage",1); 
let upw7damage = new Shopitem("blaster",7,"damage",1); 
let upw8damage = new Shopitem("blaster",8,"damage",1); 
let upw9damage = new Shopitem("blaster",9,"damage",1); 
//speed upgrade available to all blasters -- might exclude mine later, maybe also double rainbow
let upw0speed = new Shopitem("blaster",0,"speed",1); //speed  upgrades increase projectile speed
let upw1speed = new Shopitem("blaster",1,"speed",1); 
let upw2speed = new Shopitem("blaster",2,"speed",1); 
let upw3speed = new Shopitem("blaster",3,"speed",1); 
let upw4speed = new Shopitem("blaster",4,"speed",1); 
let upw5speed = new Shopitem("blaster",5,"speed",1); 
let upw7speed = new Shopitem("blaster",7,"speed",1); 
let upw8speed = new Shopitem("blaster",8,"speed",1); 
let upw9speed = new Shopitem("blaster",9,"speed",1); 
//No bounce upgrade for w0, w3, w6, or w7 (probe, flakker, beam double rainbow)
let upw1bounce = new Shopitem("blaster",1,"bounce",1); //bounce upgrades make projectiles bounce of planets--in theory anyways.
let upw2bounce = new Shopitem("blaster",2,"bounce",1); //these are now unused because they dont work, would be nice if they did.
let upw4bounce = new Shopitem("blaster",4,"bounce",1); 
let upw5bounce = new Shopitem("blaster",5,"bounce",1); 
let upw8bounce = new Shopitem("blaster",8,"bounce",1); 
let upw9bounce = new Shopitem("blaster",9,"bounce",1); 
//No timer upgrade for w6 (beam)
let upw0timer = new Shopitem("blaster",0,"timer",1); //timer upgrades increase projectile lifespan
let upw1timer = new Shopitem("blaster",1,"timer",1); 
let upw2timer = new Shopitem("blaster",2,"timer",1); 
let upw3timer = new Shopitem("blaster",3,"timer",1); 
let upw4timer = new Shopitem("blaster",4,"timer",1); 
let upw5timer = new Shopitem("blaster",5,"timer",1); 
let upw6timer = new Shopitem("blaster",6,"timer",1); 
let upw7timer = new Shopitem("blaster",7,"timer",1); 
let upw8timer = new Shopitem("blaster",8,"timer",1); 
let upw9timer = new Shopitem("blaster",9,"timer",1); 
//No boom upgrade for w0, w4, w6,w7 (probe, railgun, beam, double rainbow)
let upw1boom = new Shopitem("blaster",1,"boom",1);//boom upgrades increase blast radius
let upw2boom = new Shopitem("blaster",2,"boom",1);
let upw3boom = new Shopitem("blaster",3,"boom",1);
let upw5boom = new Shopitem("blaster",5,"boom",1);
let upw8boom = new Shopitem("blaster",8,"boom",1);
let upw9boom = new Shopitem("blaster",9,"boom",1);
//Only w5 and w8 get n upgrades (more projectiles). 
let upw5n = new Shopitem("blaster",5,"n",1);
let upw8n = new Shopitem("blaster",8,"n",1);
let blasterupgradeitems = [ //broken up into lines for readability, this is all a single 1 dimensional array.
remotew1item,remotew2item,remotew5item,remotew9item,
upw1damage,upw2damage,upw3damage,upw4damage,upw5damage,upw6damage,upw7damage,upw8damage,upw9damage,
upw0speed,upw1speed,upw2speed,upw3speed,upw4speed,upw5speed,upw7speed,upw8speed,upw9speed,
//upw1bounce,upw2bounce,upw4bounce,upw5bounce,upw8bounce,upw9bounce,//bounce upgrades nonfunctional, removed
upw0timer,upw1timer,upw2timer,upw3timer,upw4timer,upw5timer,upw6timer,upw7timer,upw8timer,upw9timer,
upw1boom,upw2boom,upw3boom,upw5boom,upw8boom,upw9boom
];
let booster1 = new Shopitem("booster",0,"buy",1); //Tier 0 booster
let buycargo0 = new Shopitem("cargo",0,"buy",1);//The upgrade tier variable will used as a price multiplier for cargo
let buycargo1 = new Shopitem("cargo",1,"buy",1); 
let buycargo2 = new Shopitem("cargo",2,"buy",1); 
let buycargo3 = new Shopitem("cargo",3,"buy",1); 
let buycargo4 = new Shopitem("cargo",4,"buy",1);
let buycargo5 = new Shopitem("cargo",5,"buy",1);
let buycargo6 = new Shopitem("cargo",6,"buy",1);
let buycargo7 = new Shopitem("cargo",7,"buy",1);
let buycargo8 = new Shopitem("cargo",8,"buy",1);
let uprepairitem = new Shopitem("upgrade",0,"repair",0);
let uparmoritem = new Shopitem("upgrade",1,"armor",0);
let upshielditem = new Shopitem("upgrade",2,"shield",0);
let upshieldregenitem = new Shopitem("upgrade",3,"shieldregen",0);
let upradaritem = new Shopitem("upgrade",4,"radar",0);
let upcargoitem = new Shopitem("upgrade",5,"cargo",0);
let upthrustitem = new Shopitem("upgrade",6,"thrust",0);
var upgradeshopitems = [uprepairitem,uparmoritem,upshielditem,upshieldregenitem,upradaritem,upcargoitem,upthrustitem];



function randcolor(){
	var thecolors = ["hotpink","deeppink","fuchsia","darkviolet","purple","indigo","salmon","crimson","red","darkred","orange","orangered","gold","yellow","khaki","lime","mediumspringgreen","seagreen","green","darkgreen","olive","teal","aqua","steelblue","lightskyblue","deepskyblue","blue","navy","tan","chocolate","sienna","maroon","silver","darkgrey","dimgrey"];
	return thecolors[Math.floor(Math.random()*thecolors.length)];
	}
function randvowel(){
	var vowels = "aeyuio";
	var vindex = Math.floor(Math.random()*vowels.length);
	return vowels[vindex];
	}
function randconsonant(){
	var consonants = "zxcvbnmsdfghjklqwrtyp";
	var cindex = Math.floor(Math.random()*consonants.length);
	return consonants[cindex];
	}
function randname(namelength){//Creates a random name of length namelength, with no more than 2 vowels or consonants in a row
	var lastchartype = Math.floor(Math.random()*2); //0 for consonant, 1 for vowel;
	var lastchartype2 = Math.floor(Math.random()*2); //2nd to last....
	var thischartype = Math.floor(Math.random()*2); //0 for consonant, 1 for vowel;
	var thename = ""; //Start with an empty name
	if (lastchartype2 == 0){thename=thename+randconsonant();}else{thename=thename+randvowel();}
	if (lastchartype == 0){thename=thename+randconsonant();}else{thename=thename+randvowel();}
	var i = namelength;
	while (i>2){
		i=i-1;
		if (lastchartype == lastchartype2){ //if last two characters are same type,
			if (lastchartype == 0){thischartype = 1;}else{thischartype = 0;} //make other type
			}else {thischartype = Math.floor(Math.random()*2);}//otherwise pick randomly
		if (thischartype == 0){thename=thename+randconsonant();}else{thename=thename+randvowel();}
		lastchartype2 = lastchartype; //Keep track of last two characters
		lastchartype = thischartype; //so we can not have 3 vowels or 3 consonants sequentially
		}
	return thename;
	}

/////////////////////////////Begin system class///////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = class System{
	constructor(index, name, x, y){
		this.index = index; //integer identifying system 
		this.name = name; //name of system for display
		this.planets = []; //list of planets (to be generated)
		this.ships = []; //list of ships (to be generated)
		this.npc = []; //More ship umos, but not enemy ais.  Not yet used.
		this.botbombs = []; //list of bombs used in system
		this.outposts = []; //list of outposts in system.  1st (index 0) item is empty, correlates with dockstate == 0 which is undocked
		this.shops = []; //list of shops in the system.  1st (index 0) item is empty, correlates with dockstate == 0 which is undocked
		this.turrets = []; //list of bare turrets in the system.
		this.explosions = [];
		this.players = [];//list of ship type umos
		this.bling = [];
		this.difficulty = 1; //Scales ship generation attributes
		this.x = x;
		this.y = y;
	}
	draw(viewx,viewy){ //no filter draws everything, sort of obselete
		var i= this.ships.length;
		while  (i>0){
			i=i-1;
			this.ships[i].drawship(viewx,viewy);
			}
		var i= this.planets.length;
		while  (i>0){
			i=i-1;
			this.planets[i].drawplanet(viewx,viewy);
			}
		var i= this.botbombs.length;
		while  (i>0){
			i=i-1;
			this.botbombs[i].drawbomb(viewx,viewy);
			}
		var i= this.players.length;
		while  (i>0){
			i=i-1;
			this.players[i].drawship(viewx,viewy);
			}
		}
	draw2(viewx,viewy){ //linear filtered instead of by distance, maybe computationally cheaper?
		var i=0;
		while  (i<this.ships.length){
			var xtol = canvas.width/2+this.ships[i].s;
			var xdif = this.ships[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.ships[i].s;
				var ydif = this.ships[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.ships[i].drawship(viewx,viewy);	
					}		
				}		
			i++;
			}
		var i=0;
		while  (i<this.players.length){
			var xtol = canvas.width/2+this.players[i].ship.s;
			var xdif = this.players[i].ship.x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.players[i].ship.s;
				var ydif = this.players[i].ship.y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.players[i].ship.drawship(viewx,viewy);	
					}		
				}		
			this.players[i].drawbombs(viewx,viewy)
			i++;
			}
		var i=0;
		while  (i<this.turrets.length){
			var xtol = canvas.width/2+this.turrets[i].pivot.s*4+2000;//*4 is arbitrary safety factor, the pivot is normally smaller than the total turret size including base.  If it's slightly too far it won't render anyways, just waste a tiny bit of calculations.
			var xdif = this.turrets[i].pivot.x-viewx; //+2000 is fudge factor because this affects drawing of the bomb as well.
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.turrets[i].pivot.s*4+2000; //same arbitrary *4 reasoning.
				var ydif = this.turrets[i].pivot.y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.turrets[i].draw(viewx,viewy);	
					}		
				}		
			var xtol2 = canvas.width/2+this.turrets[i].bombs[0].s;//this whole section is unused because the turret draw function also handles the bombs.
			var xdif2 = this.turrets[i].bombs[0].x-viewx;
			if ((xdif2 < xtol2)&&(xdif2 > -1*xtol2)){
				var ytol2 = canvas.height/2+this.turrets[i].bombs[0].s*4; //same arbitrary *4 reasoning.
				var ydif2 = this.turrets[i].bombs[0].y-viewy;
				if ((ydif2 < ytol2)&&(ydif2>-1*ytol2)){
					//this.turrets[i].bombs[0].drawbomb(viewx,viewy);	
					}		
				}	
			i++;
			}	
		var i=0;
		while  (i<this.planets.length){
			var xtol = canvas.width/2+this.planets[i].s;
			var xdif = this.planets[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.planets[i].s;
				var ydif = this.planets[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.planets[i].drawplanet(viewx,viewy);	
					}		
				}		
			i++;
			}	
		var i= 0;
		while  (i<this.botbombs.length){
			var xtol = canvas.width/2+this.botbombs[i].s;
			var xdif = this.botbombs[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.botbombs[i].s;
				var ydif = this.botbombs[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.botbombs[i].drawbomb(viewx,viewy);	
					}		
				}		
			i++;
			}
		var i=0;
		while  (i<this.outposts.length){
			var xtol = canvas.width/2+this.outposts[i].s;
			var xdif = this.outposts[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.outposts[i].s;
				var ydif = this.outposts[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.outposts[i].drawstation(viewx,viewy);	
					}		
				}		
			i++;
			}
		var i=0;
		while  (i<this.explosions.length){
			this.explosions[i].draw(viewx,viewy);//FIlter on explosions wasnt working, turned off for now
			//var xtol = canvas.width;
			//var xdif = this.explosions[i].x-viewx;
			//if ((xdif < xtol)&&(xdif > -1*xtol)){
			//	var ytol = canvas.height;
			//	var ydif = this.explosions[i].y-viewy;
			//	if ((ydif < ytol)&&(ydif>-1*ytol)){
			//		//this.explosions[i].draw(viewx,viewy);
			//		}		
			//	}		
			i++;
			}
		var i=0;
		while  (i<this.bling.length){
			var xtol = canvas.width/2+this.bling[i].s;
			var xdif = this.bling[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.bling[i].s;
				var ydif = this.bling[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.bling[i].draw(viewx,viewy);
					}		
				}		
			i++;
			}
		}
	updateall(){
		var i = 0; //update section////////////////////////////////////////////////////////////
		while (i<this.ships.length){ //update ships
			this.ships[i].updateship(this.planets); //basic ship updates
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////AI section/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
			var j=0;
			while(j<this.players.length){	//THis loop needs to be fixed to select the closest player and act on that player	
				if (this.ships[i].ai == "enemy"){
					if ( (  this.ships[i].distance(this.planets[this.ships[i].parentid]) > 10000  )&&(this.ships[i].hp>0) ){//If this bot got lost....
						var savedhp = this.ships[i].hp; //remember it's hitpoints... 
						this.ships[i].respawn(this.planets[this.ships[i].parentid]); //Respawn...
						this.ships[i].hp = savedhp; //re-apply hitpoints so it doesn't get a free heal out of it.
						}
					var thetargetdistance = this.players[j].ship.distance(this.ships[i]);	
					if (thetargetdistance < 5000){ //Don't do anything if player is far
						var theparentdistance = this.ships[i].distance(this.planets[this.ships[i].parentid]);
						this.ships[i].fasttrack(this.players[j].ship); //Bots point towards player
						if ((Math.random()>0.95) && (this.botbombs[i].timer < 1)){  //Bots fire occasionally, if bomb isn't out
						if ((!this.ships[i].ispointingat(this.planets[this.ships[i].parentid]))||(thetargetdistance<theparentdistance)){  //Don't shoot if your parent planet is between bot and player (the target)
								this.ships[i].launchbomb(this.botbombs[i], 12, 80); 
								}
							}
						}
					}
				if (this.ships[i].ai == "trader"){
					var targetplanet = this.ships[i].aitargets[this.ships[i].aistate];
					this.ships[i].seek3(this.planets[targetplanet],20,30,time,1000);
					//money = money + 1;//test
					if (this.ships[i].distance(this.planets[targetplanet])<1500){ 
						this.ships[i].aistate = this.ships[i].aistate+1;
						if (this.ships[i].aistate>this.ships[i].aitargets.length-1){ this.ships[i].aistate = 0;}
						}
					}
				j++
				}
			i++;
			}
		var i=this.turrets.length;
		while(i>0){
			i=i-1;
			if (this.turrets[i].pivot.ai == "enemy"){
				var j=0;
				var closestdistance=9999;
				var closestindex = 0;
				while(j<this.players.length){
					var pdist = this.players[j].ship.distance(this.turrets[i].pivot);
					if (pdist<closestdistance){
						closestindex = j;
						closestdistance = pdist;
					}
					j++;
				}
				if (this.players.length>0){
					this.turrets[i].ai3(this.players[closestindex].ship,[]);
					}
				}
			}
		var i=this.turrets.length;
		while(i>0){
			i=i-1;
			if (this.turrets[i].pivot.ai == "friendly"){
				var j=this.ships.length;
				var closest = j;
				var closestdistance = 1000000;
				while(j>0){
					j--;
					if (this.ships[j].ai == "enemy"){
						var tempdistance = this.ships[j].distance(this.turrets[i].pivot);
						if (tempdistance < closestdistance){
							closest=j;
							closestdistance = tempdistance;
						}
					}	
					if (closestdistance < 3000){ //Don't do anything if closest enemy is far
					this.turrets[i].ai3(this.ships[closest],this.players); //friendly turrets point towards closest enemy, shoot if clear	
						}
					}
				}
			}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
/////////////////////end AI section ///////////////////////////////////////////////////////////////////////////////////////
		var i = this.planets.length; //update planets
		while (i>0){
			i=i-1;
			this.planets[i].update1();
			}
		var i = this.botbombs.length; //update bot bombs
		while (i>0){
			i=i-1;
			this.botbombs[i].update1();
			this.botbombs[i].updatebomb();
			}
		var i = this.outposts.length; 
		while (i>0){
			i=i-1;
			this.outposts[i].update1();
			this.outposts[i].d = this.outposts[i].directionof(this.planets[0]);
			}
		var i = this.turrets.length; 
		while (i>0){
			i=i-1;
			this.turrets[i].update1();
			}		
		var i = this.players.length; 
		while (i>0){
			i=i-1;
			this.players[i].update1(this.planets);
			}					
///update explosions///////////////////////////////////////////////////
		var i=0;
		while(i<this.explosions.length){
			this.explosions[i].update1();
			i++;
		}
		//also check for expired explosions and remove them from this.explosions
		var index = -1;
		var i=0;
		while (i<this.explosions.length){
			if (this.explosions.timer<=0){
				this.explosions.splice(i, 1);
				i=this.explosions.length;
				}
			i++;
			}
////////Bling update///////
		var i=0;
		while (i<this.bling.length){
			this.bling[i].update1();
			if (this.bling[i].t>20000){
				this.bling[i].t=Math.floor(Math.random()*200);//Maybe redundant noise
				this.bling[i].reset(this.planets);  //Maybe I should just remove the bling and let it get randomly repopulated by existing mechanism
				//this.bling[i].setorbit(this.planets[this.bling[i].parentid],) //setorbit(parentplanet, distance, direction, cw){ //cw = -1 or 1
			}
			i++;
		}
	}//end updateall()////////////////////////////////////////////////////////////////////////
	gravitateall(){
		var i = this.planets.length;
		while (i>0){ //Planet on ships and bombs
			i=i-1;
			var j = this.ships.length;
			while (j>0){ //gravitate on each ship
				j=j-1;
				this.planets[i].gravitate(this.ships[j]);
				}
			j = this.botbombs.length;
			while (j>0){ //gravitate on each bot bomb
				j=j-1;
				this.planets[i].gravitate(this.botbombs[j]);
				}				
			j = this.bling.length;
			while (j>0){ //gravitate on each bling
				j=j-1;
				this.planets[i].gravitate(this.bling[j]);
				}
			j = this.players.length;
			while (j>0){ //gravitate on each player
				j=j-1;
				this.planets[i].gravitate(this.players[j].ship);
				var k = this.players[j].blasters.length;
				while (k>0){ //For all blasters to each planet
					k=k-1;
					this.players[j].blasters[k].fall(this.planets[i]);
					}
				}		
			}
		var i = this.outposts.length;
		while (i>0){
			i=i-1;
			this.planets[0].gravitate(this.outposts[i]);	
			}
		var i = this.planets.length;
		while (i>1){//Planet on planet gravity
			i=i-1;
			this.planets[0].gravitate(this.planets[i]);//sun gravitates all
			if (this.planets[i].parentid>0){ this.planets[this.planets[i].parentid].gravitate(this.planets[i]); } //others only affected by parent
			}
		}
	gravitateothers(umolist){//For gravitating Umos external to the system (playerbombs at the start) not used afaik
		var i = this.planets.length;
		while (i>0){
			i=i-1;
			var j = umolist.length;
			while (j>0){
				j=j-1;
				this.planets[i].gravitate(umolist[j]);
				}
			}	
		}
	dockcheck(dockstate){ 
		var i=0;
		while (i<outposts.length){
			if (ships[0].distance(outposts[i])<160){
				outposts[i].dock(ships[0]);
				dockstate = i;//Maybe add this to system update function, but that implicitly passes dockstate which might not work in other languages.
				}		
			i=i+1;
			}
		}
	collideself(){ //Internal system collisions, ships to planets, ships to bot bombs, planets to bot bombs, turret bombs to ships and planets....
		var i = this.planets.length;
		while (i>0){
			//For all planets+other collisions/////////////////////////////////
			i=i-1;
			var j = this.ships.length;
			while (j>0){ //For all ships to each planet
				j=j-1;
				this.planets[i].circlecollide(this.ships[j]);
				
				}
			var j = this.botbombs.length;
			while (j>0){ //For all bombs to each planet
				j=j-1; 
				this.planets[i].circlecollide(this.botbombs[j]);
				}
			var j = this.turrets.length;
			while(j>0){
				j = j-1;
				var k=0;
				while(k<this.turrets[j].bombs.length){
					this.planets[i].circlecollide(this.turrets[j].bombs[k]); //Only checks 1 bomb, currently they only have 1 bomb.
					k++;
					}
				}
				
			var j = this.bling.length;
			while (j>0){
				j=j-1;
				this.planets[i].circlecollidesafe(this.bling[j]);
			}
			var j = this.players.length;
			while(j>0){
				j=j-1;
				//console.log("itried3");
				this.planets[i].circlecollide(this.players[j].ship);
				var k=this.players[j].blasters.length;
				while(k>0){
					k=k-1;
					//console.log("itried2");
					var h = this.players[j].blasters[k].bombs.length;//usually h=1
					while(h>0){
						h=h-1;
						//console.log("itried1");
						this.planets[i].circlecollide(this.players[j].blasters[k].bombs[h]);
					}
				}
			}
		}
		//Intership collisions///////////////////////////////////////
		var i = 0;//For each ship,
		var j = 0; //to each other ship
		while (i<this.ships.length-1){
			j = i+1; //avoids duplicate executions 
			while (j<this.ships.length){
				this.ships[i].circlecollide2(this.ships[j]);
				j++;
				}
			var j=0;
			while(j<this.players.length){
				this.players[j].ship.circlecollide2(this.ships[i])
				j++;
				}
			i++;
			}
//////////////////turret bombs hitting ships and players///////////////////////////////////////////////
		var i=0;
		while (i<this.turrets.length){
			var j=0;
			while(j<this.ships.length){
				var k=0;
				while(k<this.turrets[i].bombs.length){
					this.turrets[i].bombs[k].bombcollide(this.ships[j])
					k++;
				}
				j++;
				}
				var j=0;
				while(j<this.players.length){
					var k=0;
					while(k<this.turrets[i].bombs.length){
						this.turrets[i].bombs[k].bombcollide(this.players[j].ship);
						k++;
					}
					j++;
					}



			i=i+1; 
			}
		var i=0;
		while (i<this.ships.length){
			if (this.ships[i].hp>0){ //don't check dead ships
				var j=0;
				while (j<this.botbombs.length){  //Bots can kill each other again
					this.botbombs[j].bombcollide(this.ships[i]);
					j++;
					}
				if (this.ships[i].hp<=0){
					this.explosions.push(new Bubblesplosion(7,0.375,"red",this.ships[i]));
					this.bling.push(new Bling(this.ships[i].x,this.ships[i].y,this.ships[i].vx,this.ships[i].vy,this.ships[i].level*5));
					}
				}
			i++;
			}


		var i=0;
		while(i<this.players.length){
			var j=0;
			while(j<this.botbombs.length){
				this.botbombs[j].bombcollide(this.players[i].ship);
				j++;
			}




			var j = 0;
			while (j<this.players[i].blasters.length){ //global scope, shame.  All this is about the allblasters bombs.
				var k = 0;
				while (k<this.players[i].blasters[j].bombs.length){ //Global scope all over here.
					var m = 0;
					while (m<this.ships.length){
						if (this.ships[m].hp>0){
							this.players[i].blasters[j].bombs[k].bombcollide(this.ships[m]);
							if (this.ships[m].hp<0){ //This is getting repeated allblasters.length times, not sure how best to fix
								if (this.ships[m].ai=="enemy"){
									var getcash = Math.floor(Math.random()*21+10)*this.ships[m].level;
									this.players[i].money = this.players[i].money + getcash;
									this.players[i].gotmoney = [30,getcash];
	//////////////////////////////////explosion stuff///////////////
									var boomstages = Math.floor(4+this.ships[m].level/2);
									this.explosions.push(new Bubblesplosion(boomstages,0.375,"red",this.ships[m]));
									this.bling.push(new Bling(this.ships[m].x,this.ships[m].y,this.ships[m].vx,this.ships[m].vy,this.ships[m].level*5));
									cashsound1.play();
								}else if (this.ships[m].ai=="trader"){
									this.explosions.push(new Bubblesplosion(4,0.375,"red",this.ships[m]));
									this.players[i].money = this.players[i].money - 1000;
									this.players[i].gotmoney = [30, -1000];
									//somebadsound.play();
									}
								}
							}
						m++;
						}	
					k++;
					}
				j++;
				}
			i++;
			}

		var i=0;
		while (i<this.bling.length){
			var j=0;
			while(j<this.players.length){
				if (this.players[j].ship.collide(this.bling[i])){
					this.players[j].money = this.players[j].money + this.bling[i].value;
					this.players[j].gotmoney = [30,this.bling[i].value];
					this.bling.splice(i, 1);
					//cashsound1.play();
					//i=this.bling.length;
					}
				j++;
				}
			i++;
			}
		}	
	collideothers(externalplanets, externalships, externalbombs){//input are umo arrays
		var  i = externalplanets.length;//unfinished, unused, but a good idea. 		
	}
	randomplanets(){
		var numplanets = Math.floor(Math.random()*6+6);//random number of planets, 5-11
		var orbitradius = 0; //randomized in the loop
		var planetsize = 0; //randomized in the loop
		this.planets.push( new Umo(this.x,this.y,Math.floor(Math.random()*3000+1000), "orange") ); //make the sun 
		this.planets[0].name = this.name; // Star name is same as system name
		var i=0;
		while (i<numplanets-1){
			i=i+1; //planets[0] is already the sun, so we can skip index 0;
			orbitradius = Math.floor( (Math.random()*Math.random()*250000) + 4*this.planets[0].s); //Minimum orbit radius 4x sun radius, 1/r density factor
			planetsize = Math.floor( Math.random()*Math.random()*800 + Math.random()*100+100 ); //Minimum size 100,
			var i = 1;
			while (i<this.planets.length){
				var otherdist = this.planets[0].distance(this.planets[i]);
				var proximity = Math.abs(orbitradius - otherdist);
				if (proximity < 6*(this.planets[i].s+planetsize)){
					orbitradius = Math.floor( (Math.random()*Math.random()*250000) + 4*this.planets[0].s);//rerandomizes orbit
					var i=0; //re-checks new orbitradius....
					}
				i=i+1;
				}
			this.planets.push( new Umo(0,0,planetsize, randcolor() ) );//this is where the planet gets added to the array
			this.planets[i].c2 = randcolor();
			this.planets[i].name = randname(4);//random 4 character name
			this.planets[i].setorbit(this.planets[0], orbitradius, Math.random()*6.28, 1);
			this.planets[i].parentid = 0; //establishes star (planet[0] as parent planet
			}
		var i=1;
		var numplanets = this.planets.length;
		while (i<numplanets-1){
			this.randommoons(i); 
			i=i+1;
			}
		var extradots = Math.floor(Math.random()*3);
		while(extradots>0){
			this.planets[i].polyradius.push(0);
			this.planets[i].polytheta.push(0);
			extradots = extradots - 1;
			}
		var i = 0;
		while (i<this.planets.length){
			var j=0;
			while (j<this.planets[i].polytheta.length){
				this.planets[i].polyradius[j] = Math.random()+0.125;
				this.planets[i].polytheta[j] = Math.random()*2*Math.PI;
				j=j+1;
				}
			i=i+1;
			}	
		this.randomoutposts(3); 
		var traderstops = Math.floor(Math.random()*3)+2;
		var destinations = [];
		var i=0;
		while (i<traderstops){
			var thisstop = Math.floor(Math.random()*(this.planets.length-1))+1;
			destinations.push(thisstop);
			i=i+1;
			}
		this.addrandomtraders(destinations, 4, 15); 
		var traderstops = Math.floor(Math.random()*3)+2;
		var destinations = [];
		var i=0;
		while (i<traderstops){
			var thisstop = Math.floor(Math.random()*(this.planets.length-1))+1;
			destinations.push(thisstop);
			i=i+1;
			}
		this.addrandomtraders(destinations, 4, 15)//Duplicate for two groups.
		}
	randommoons(index){//index is of planet
		var nummoons = Math.floor(Math.random()*this.planets[index].s/100 )//Planets < 120 in size have 0 chance of a moon, planet 240 in size has 50% chance of 1 moon, etc.
		var moonsize = 0; //randomized in loop
		var moonorbitr = 0;//randomized in loop
		var moonindex = 0; //set in loop
		var i = nummoons;
		while (i>0){
			i=i-1;
			moonsize = Math.floor(Math.random()*this.planets[index].s/3+10);//radius is 10 plus up to 1/3 of parent planet
			moonorbitr = Math.floor(this.planets[index].s*(Math.random()*3.5+1.5)+80); //orbit radius is 1.5x parent planet radius + up to 3.5x parent planet radius... plus 80.
			moonindex = this.planets.length;//no -1 because push comes on next line
			this.planets.push( new Umo(0,0,moonsize, randcolor()) );
			this.planets[moonindex].c2 = randcolor();
			this.planets[moonindex].name = randname(4);
			this.planets[moonindex].parentid = index;
			this.planets[moonindex].setorbit(this.planets[index],moonorbitr,Math.random()*6.28, 1);//orbit direction is 1, not random
			}
		}
	randomoutposts(num){//num is number of outposts
		var alreadypickedplanets = [];
		var i=0;
		while (i<num){//
			this.outposts.push( new Umo(0,0,128, randcolor()));
			var lastindex = this.outposts.length-1;
			this.outposts[lastindex].c2 = randcolor();
			this.outposts[lastindex].parentid = 0;
			this.outposts[lastindex].name = randname(8)+"'s "+randname(7)+" "+randname(5);
			var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
			var toradii = [1,1,1,1]; //rectangle
			this.outposts[lastindex].polytheta = totheta;
			this.outposts[lastindex].polyradius = toradii;
			var pickedplanet = Math.floor(Math.random()*(this.planets.length-2))+1;//station will be in a solar following orbit to the chosen planet
			while ((this.planets[pickedplanet].parentid !== 0)&&(alreadypickedplanets.includes(pickedplanet))){//No outpost generated if planet is actually a moon or already picked
				pickedplanet = Math.floor(Math.random()*(this.planets.length-2))+1;//tries again to find a not-moon
				}
			var orbitdistance = this.planets[0].distance(this.planets[pickedplanet]);
			var orbitposition = this.planets[0].directionof(this.planets[pickedplanet]);
			this.outposts[lastindex].setorbit(this.planets[0], orbitdistance, orbitposition+0.2+Math.random()*0.3, 1);//This properly sets orbital distance, maybe properly sets orbit position.
			
			var numberofsides = Math.floor(Math.random()*6+7)*2;
			this.outposts[i].makeemblem(numberofsides,0.1); //randomly generates a shop logo
			
			
			//Now add the shop...  Tons of global scope used here.
			var randshopitems3 = [];  
			randshopitems3.push(repairshopitem);//First 2 items are always the same, repair item and booster item.
			randshopitems3.push(booster1);
			var j=2;
			while(j<4){ //Next 2 items will be random blasters for sale
				var buyableblaster = Math.floor(Math.random()*blasterbuyitems.length);
				randshopitems3.push(blasterbuyitems[buyableblaster]);
				j=j+1;
				}
			while (j<7){ //Next 3 items will be random blaster upgrades
				var theitem = Math.floor(Math.random()*blasterupgradeitems.length);
				randshopitems3.push(blasterupgradeitems[theitem]);
				j=j+1;
			}
			while (j<9){ //Next 2 items will be random ship upgrades.
				var randupgrade = Math.floor(Math.random()*upgradeshopitems.length);
				randshopitems3.push(upgradeshopitems[randupgrade]);
				j=j+1;
				}
			var allcargoslength = 8;//underestimate here
			while (j<12){ //And 3 cargo items
				var randcargo = Math.floor(Math.random()*allcargoslength);
				randshopitems3.push(new Shopitem("cargo",randcargo,"buy",1));
				j=j+1;
				}
			this.shops.push(new Shop("XXXXXXXXXX",i, "whaaaaaaaaaaaaaat", randshopitems3)); //should fix this to reflect outpost name/description
			var k = 0;
			while (k<4){ //This adds 4 cargo missions to the shop.  
				this.shops[i].addcargomission(this.ships,this.planets,this.outposts);
				k=k+1;
				}// Destroy missions can't be added here (they are added in enemypopulate function), because normally the enemy ships haven't been added to the system yet when randomoutposts() (this function) is run.
			i=i+1;
			}
		}
	levelup(botindex,levels){//adds "levels" to make bots tougher
		var i = levels;
		while(i>0){
			i=i-1;
			var bonus = Math.floor(Math.random()*5);//Picks a number to select which bonus the bot gets
			if (bonus==0){ //extra health
				this.ships[botindex].maxhp = this.ships[botindex].maxhp+100;
				this.ships[botindex].hp = this.ships[botindex].hp+100;
				}
			if (bonus==1){ //extra shield
				this.ships[botindex].maxshield = this.ships[botindex].maxshield+50;
				this.ships[botindex].shield = this.ships[botindex].shield+50;
				}
			if (bonus==2){ //extra shield regen
				this.ships[botindex].shieldregen = this.ships[botindex].shieldregen+0.25;
				}			
			if (bonus==3){ //extra bomb damage
				this.botbombs[botindex].hurt = this.botbombs[botindex].hurt+8;
				}						
			if (bonus==4){ //extra bomb blast
				this.botbombs[botindex].boombuff = this.botbombs[botindex].boombuff+0.25;//I think botbombs needs -1 because it does not include a bomb for ships[0] (player)
				}			
			this.ships[botindex].level = this.ships[botindex].level+1;
			}
		}
	addrandomgang(planetindex, num,level){ //Adds a gang of enemy ships, level describes difficulty (not used yet)
		var gangsize = num;
		var gangcolor = randcolor();
		var gangcolor2 = randcolor();
		var gangparent = planetindex;
		var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
		var randomplayerverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
		normalizepoly(randomplayerverts);
		var gangpolytheta = randomplayerverts[0];
		var gangpolyradius = randomplayerverts[1];
		var i = gangsize;
		while (i>0){
			i=i-1;
			this.ships.push(new Umo(-600,32000,32,gangcolor));
			var botindex = this.ships.length-1;
			this.ships[botindex].c2 = gangcolor2;
			this.ships[botindex].parentid = gangparent; 
			this.ships[botindex].respawn(this.planets[this.ships[botindex].parentid]);
			this.ships[botindex].name = randname(5);
			this.ships[botindex].hp = 150;
			this.ships[botindex].maxhp = 150;
			this.ships[botindex].polytheta = gangpolytheta;
			this.ships[botindex].polyradius = gangpolyradius;
			this.ships[botindex].ai = "enemy";
			this.botbombs.push( new Umo(0,0,0,"red"));
			this.botbombs[this.botbombs.length-1].hp = 1;  //Set hitpoints to 1 so they explode on contact
			this.botbombs[this.botbombs.length-1].maxhp = 1; //with planets 
			this.botbombs[this.botbombs.length-1].shield=0;  
			this.levelup(botindex,level);
			}
		}
	addrandomtraders(destinations, num, level){
		var fleetsize = num;
		var fleetcolor = randcolor();
		var fleetcolor2 = randcolor();
		var fleetparent = destinations[0];
		var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
		var randomshipverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
		normalizepoly(randomshipverts);
		var fleetpolytheta = randomshipverts[0];
		var fleetpolyradius = randomshipverts[1];
		var i = fleetsize;
		while (i>0){
			i=i-1;
			this.ships.push(new Umo(-600,32000,32,fleetcolor));
			var botindex = this.ships.length-1;
			this.ships[botindex].c2 = fleetcolor2;
			this.ships[botindex].parentid = fleetparent; 
			this.ships[botindex].respawn(this.planets[fleetparent]);
			this.ships[botindex].name = randname(5);
			this.ships[botindex].hp = 150;
			this.ships[botindex].maxhp = 150;
			this.ships[botindex].polytheta = fleetpolytheta;
			this.ships[botindex].polyradius = fleetpolyradius;
			this.ships[botindex].ai = "trader";
			this.ships[botindex].aistate = 0;
			this.ships[botindex].aitargets = destinations;
			this.botbombs.push( new Umo(0,0,0,"red"));
			this.botbombs[this.botbombs.length-1].hp = 1;  //Set hitpoints to 1 so they explode on contact
			this.botbombs[this.botbombs.length-1].maxhp = 1; //with planets 
			this.botbombs[this.botbombs.length-1].shield=0;  
			this.levelup(botindex,level);
			}
		}
	enemypopulate(num,minlevel,maxlevel){ //Adds gangs of enemy ships, level describes difficulty, num is size of each gang.
		var i=1;
		while (i<this.planets.length-1){
			var templevel = Math.floor(minlevel + Math.random()*(maxlevel+1 - minlevel));
			this.addrandomgang(i,num,templevel);
			i=i+1;
			}
		var i = 0;
		while (i<this.shops.length){
			var k = 0;
			while (k<4){
				this.shops[i].addkillmission(this.ships,this.planets,this.outposts);
				k=k+1;
				}
			i=i+1;
			}
		}
	addbling(parent,basevalue,bonusvalue,num){//adds bling to 1 planet
		var i=0;
		while(i<num){
			var tempvalue = Math.floor(basevalue+Math.random()*bonusvalue);
			var tempdistance = parent.s+32+2*Math.floor(Math.random()*parent.s);
			this.bling.push(new Bling(0,0,0,0,tempvalue));
			this.bling[this.bling.length-1].setorbit(parent,tempdistance,Math.random()*2*Math.PI,1);
			this.bling[this.bling.length-1].t = this.bling[this.bling.length-1].t +i*600;
			i++;
		}
	}
	addrandombling(spread){
		var i=0;
		while (i<this.planets.length){
			var blingonplanet = Math.floor(this.planets[i].s/spread);
			var j=0;
			while(j<blingonplanet){
				this.addbling(this.planets[i],16,32,1);
				this.bling[this.bling.length-1].parentid = i;
				this.bling[this.bling.length-1].t = Math.floor(Math.random()*1000);//Timer counts up to an expiration, this helps stagger the expiration times
				j++
			}
			i++;
		}
	
	}
	nextjob(){
		var numjobs = 0;
		var thejob = "none";
		var i=0;
		while (i<this.shops.length){
			var j=0;
			while (j<this.shops[i].missions.length){
				if (this.shops[i].missions[j].taken){
					numjobs = numjobs + 1;
					thejob = this.shops[i].missions[j].message;
					}
				j=j+1;
				}
			i=i+1;
			}
		return [thejob, numjobs];
		}
	joblist(x,y){
		context.fillStyle = "orange";
		context.font='12px Arial';
		var jobnum = 0;
		var i=0;
		while (i<this.shops.length){
			var j=0;
			while (j<this.shops[i].missions.length){
				if (this.shops[i].missions[j].taken){
					context.fillText(this.shops[i].missions[j].message,x,y+jobnum*20);
					jobnum++;
					}
				j=j+1;
				}
			i=i+1;
			}
		}
	}//end of system class////////////////////////////////////////////////////////////////////////////////////////////////////////////////