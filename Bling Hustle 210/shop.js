//Each item needs a type (blaster, ship upgrade, cargo)
//If upgrade or blaster, also needs a tier
//If upgrade or blaster also needs a sub-type (blast radius, damage, etc.)
//Price for blasters set by blaster object and tier
//Price for cargo set by cargo, and also shop.
class Shopitem{
	constructor(itype, iindex, utype, utier){
		this.type = itype; //"cargo","blaster","upgrade","booster"
		this.i = iindex; //Index of blaster, or of cargo, or of item, from separate lists
		this.utype = utype; //For blasters: "damage","blast","speed","timer","bounce","remote", "buy"//For upgrades: "armor","shield","shieldregen","thrust","thrustadjust","radar"
		this.utier = utier;//Tier of upgrade.  Used by boosters only a the moment.
	}
	namestring(){ //returns name of blaster, cargo, upgrade, booster etc.
		var thisname = "Undefined Item"; //error handling by default
		if (this.type == "blaster"){
			thisname = allblasters[this.i].name;
		}else if (this.type == "cargo"){
			thisname = allcargos[this.i].name;
		}else if (this.type == "upgrade"){
			thisname = allupgrades[this.i].name;
		}else if (this.type == "booster"){
			thisname = "Booster"+this.utier; //Boosters can be described entirely by their tier.
		}
		return thisname;
	}
	describestring(){//returns description of blaster, cargo, upgrade, booster etc.
		var thisdescribe = "Undefined Item"; //error handling by default
		if (this.type == "blaster"){
			thisdescribe = allblasters[this.i].description;
		}else if (this.type == "cargo"){
			thisdescribe = allcargos[this.i].description;
		}else if (this.type == "upgrade"){
			thisdescribe = allupgrades[this.i].description;
		}else if (this.type == "booster"){
			thisdescribe = "Booster with "+(16*2^this.utier)+" delta V.";//boosters described purely by thrust.
		}
		return thisdescribe;
	}
	itemprice(){
		var thisprice = "Undefined Item"; //error handling by default
		if (this.type == "blaster"){
			thisprice = allblasters[this.i].nextupcost();
		}else if (this.type == "cargo"){
			thisprice = Math.floor(allcargos[this.i].baseprice*allshops[systems[ps].players[0].dockstate].cargoprices[this.i]);//fix use of allshops here, so prices are proper random in random systems
		}else if (this.type == "upgrade"){
			thisprice = allupgrades[this.i].price*2**(allupgrades[this.i].tier);
		}else if (this.type == "booster"){
			thisprice = 400*(2**this.utier); //Replace with real price as it is determined
		}
		return thisprice;		
	}
	buy(theplayer){ //this function is for the player purchasing a shopitem object.  
		if (this.available(theplayer.ship,theplayer.inventory)){
			if (this.type == "blaster"){
				//stuff to buy the blaster/blaster upgrade
				if (this.utype == "buy"){
					theplayer.blasters[this.i].phas = true;
					}
				if (this.utype == "damage"){
					theplayer.blasters[this.i].plusdamage();
					}
				if (this.utype == "remote"){
					theplayer.blasters[this.i].plusremote();
					}
				if (this.utype == "speed"){
					theplayer.blasters[this.i].plusspeed();
					}
				if (this.utype == "bounce"){
					theplayer.blasters[this.i].plusbounce();
					}
				if (this.utype == "n"){
					theplayer.blasters[this.i].plusn();
					}
				if (this.utype == "timer"){
					theplayer.blasters[this.i].plustimer();
					}
				if (this.utype == "boom"){
					theplayer.blasters[this.i].plusboom();
					}
			}else if (this.type == "upgrade"){ 
				allupgrades[this.i].apply(theplayer);//code in apply function is ignored for some reason
				//console.log("buy function worked, this.type == 'upgrade'");
			}else if (this.type == "booster"){
				theplayer.boosters[this.utier] = theplayer.boosters[this.utier]+2;
			}else if (this.type == "cargo"){
				theplayer.inventory.takecargo(this.i, 1);
				}
			}
		}
	available(playership, pinv){
		var buyable = false;
		if (this.type == "blaster"){
			if (this.utype == "buy"){
				if (allblasters[this.i].phas==false){ //verify player doesnt already have blaster
					buyable = true;
					}
				}
			if ((this.utype == "damage")&&(allblasters[this.i].phas)&&(allblasters[this.i].dtier<allblasters[this.i].maxhurt)){//can always upgrade damage (for now)
				buyable = true;
				}
			if (this.utype == "remote"){ //can only upgrade remote detonator once.
				if ( (allblasters[this.i].phas==true) && (allblasters[this.i].rtier==0) ){ //verify player already has blaster, and doesnt already have upgrade
					buyable = true;
					}
				}
			if (this.utype == "speed"){ //can always upgrade speed
				if ((allblasters[this.i].phas==true)&&(allblasters[this.i].stier<allblasters[this.i].maxspeed)){ //verify player already has blaster.
					buyable = true;
					}
				}
			if (this.utype == "bounce"){//can only upgrade bounce once.
				if ( (allblasters[this.i].phas==true) && (allblasters[this.i].etier == 0) ){ //verify player already has blaster, and doesn't have bounce upgrade
					buyable = true;
					}
				}
			if (this.utype == "timer"){//can only upgrade bounce once.
				if ( (allblasters[this.i].phas==true) && (allblasters[this.i].ttier<allblasters[this.i].maxtimer) ){ //verify player already has blaster, and doesn't have bounce upgrade
					buyable = true;
					}
				}
			if (this.utype == "boom"){//can only upgrade bounce once.
				if ( (allblasters[this.i].phas==true) && (allblasters[this.i].btier<allblasters[this.i].maxboom) ){ //verify player already has blaster, and doesn't have bounce upgrade
					buyable = true;
					}
				}
			if (this.utype == "n"){//can only upgrade bounce once.
				//console.log(allblasters[this.i].ntier+" "+allblasters[this.i].maxn)
				if ( (allblasters[this.i].phas==true) && (allblasters[this.i].ntier<allblasters[this.i].maxn) ){ //verify player already has blaster, and doesn't have bounce upgrade
					buyable = true;
					}
				}
		}else if (this.type == "cargo"){
			if (pinv.maxcargo > pinv.totalcargo()){
				buyable = true;
				}
			}else{buyable = true;}
		return buyable;
		}
	}
class Shop{
	constructor(name, storelocation, description, inv){ //name and description are strings, location is a station umo index
		this.name = name;
		this.description = description; 
		this.home = storelocation; //a station umo
		this.inv = inv;//list of shopitem objects
		this.missions = []; 
		this.cargoprices = [];//list of price multipliers, index matching allcargos list
		var i=0;
		while (i<allcargos.length){
			var pricemulti = 0.5+Math.random();
			this.cargoprices.push(pricemulti); //fill array with 1x multipliers by default
			i=i+1;
			}
		}
	drawbuymenu(xpos,ypos,item){//screen coords of top corner, item index
		var x = xpos;
		var y = ypos;
		context.font='16px Arial';
		context.fillStyle = "white";
		context.fillText("Welcome to "+this.name,x,y);
		context.font='32px Arial';
		context.fillStyle = systems[ps].outposts[this.home].c;
		context.fillText("Buy",x,y-24);
		context.fillStyle = "white";
		var names = [];
		var descriptions = [];
		var prices = [];
		var utypes = [];
		var i=0;
		while (i<this.inv.length){	
			names.push(this.inv[i].namestring().slice(0,20));
			descriptions.push(this.inv[i].describestring().slice(0,20));
			prices.push(this.inv[i].itemprice());
			utypes.push(this.inv[i].utype);
			i=i+1;
			}
		var shopchart = [names,descriptions,prices,utypes];
		context.font='12px Arial';
		fillwrappedtext(this.inv[item].describestring(),86,16,x,y+236);
		context.beginPath(); //This colored rectangle will show which item is selected.
		context.strokeStyle = systems[ps].outposts[systems[ps].players[0].dockstate].c;//Global scope here, very bad, also in drawpolarpoly
		context.rect(x-12,y+20+item*16,400,16);
		context.stroke();
		var i=0;
		while (i<this.inv.length){
			context.fillStyle = "grey";
			if (this.inv[i].available(ships[0],playerinventory)){//Used global variable instead of reference
				context.fillStyle = "white";
				}
			context.fillText(this.inv[i].namestring().slice(0,16),x,y+32+16*i);
			context.fillText(this.inv[i].describestring().slice(0,16),x+80,y+32+16*i);
			context.fillText(this.inv[i].itemprice(),x+200,y+32+16*i);
			context.fillText(this.inv[i].utype.slice(0,16),x+300,y+32+16*i);
			i=i+1;
			}
		context.beginPath();
		context.strokeStyle = systems[ps].outposts[systems[ps].players[0].dockstate].c2;//Global scope here, very bad, also in drawpolarpoly
		context.rect(xpos-16,ypos-56,512,336);
		context.rect(xpos-16,ypos+12,512,208);
		context.stroke();
		drawpolarpoly(x+464,y-20,systems[ps].outposts[systems[ps].players[0].dockstate].emblem[0],systems[ps].outposts[systems[ps].players[0].dockstate].emblem[1],32,systems[ps].outposts[systems[ps].players[0].dockstate].c,-1*Math.PI/2); //this.emblem is a randomized logo
		
		}	
	
	drawsellmenu(xpos,ypos,item){//screen coords of top corner, item index
		var x = xpos;
		var y = ypos;
		context.font='16px Arial';
		context.fillStyle = "white";
		context.fillText("Welcome to "+this.name,x,y);
		context.font='32px Arial';
		context.fillStyle = systems[ps].outposts[this.home].c;
		context.fillText("Sell",x,y-24);
		context.fillStyle = "white";
		context.font='12px Arial';
		
		if (allcargos.length>0){fillwrappedtext(allcargos[item].description,86,16,x,y+236);}
		context.beginPath(); //This colored rectangle will show which item is selected.
		context.strokeStyle = systems[ps].outposts[systems[ps].players[0].dockstate].c;//Global scope here, very bad, also in drawpolarpoly
		context.rect(x-12,y+20+item*16,400,16);
		context.stroke();
		var i=0;
		while (i<allcargos.length-1){//Don't want to render the last cargo item as an option, because it's reserved for mission cargo
			if (systems[ps].players[0].inventory.cargo[i]>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}//Used global variable instead of reference
			context.fillText(allcargos[i].name.slice(0,16),x,y+32+16*i);
			context.fillText(allcargos[i].description.slice(0,16),x+80,y+32+16*i);
			context.fillText(Math.floor(allcargos[i].baseprice*allshops[systems[ps].players[0].dockstate].cargoprices[i]),x+200,y+32+16*i); //duplicate to itemprice() function, but this is indexed by allcargos instead of shopitem.
			i=i+1;
			}
		context.beginPath();
		context.strokeStyle = systems[ps].outposts[systems[ps].players[0].dockstate].c2;//Global scope here, very bad, also in drawpolarpoly
		context.rect(xpos-16,ypos-56,512,336);
		context.rect(xpos-16,ypos+12,512,208);
		context.stroke();
		drawpolarpoly(x+464,y-20,systems[ps].outposts[systems[ps].players[0].dockstate].emblem[0],systems[ps].outposts[systems[ps].players[0].dockstate].emblem[1],32,systems[ps].outposts[systems[ps].players[0].dockstate].c,-1*Math.PI/2); //this.emblem is a randomized logo
		}		
	drawworkmenu(xpos, ypos, item){
		var x = xpos;
		var y = ypos;
		context.font='16px Arial';
		context.fillStyle = "white";
		context.fillText("Welcome to "+this.name,x,y);
		context.font='32px Arial';
		context.fillStyle = systems[ps].outposts[this.home].c;
		context.fillText("Work",x,y-24);
		context.font='12px Arial';
		context.fillStyle = "white";	
		if (this.missions.length>0){fillwrappedtext(this.missions[item].message,86,16,x,y+236);}
		context.beginPath(); //This colored rectangle will show which item is selected.
		context.strokeStyle = systems[ps].outposts[systems[ps].players[0].dockstate].c;//Global scope here, very bad, also in drawpolarpoly
		context.rect(x-12,y+20+item*16,400,16);
		context.stroke();
		var i=0;
		while (i<this.missions.length){
			if (this.missions[i].taken){context.fillStyle = "red";}else{context.fillStyle = "white";}
			context.fillText(this.missions[i].type.slice(0,16),x,y+32+16*i);
			context.fillText(this.missions[i].message.slice(0,16),x+80,y+32+16*i);
			context.fillText(this.missions[i].reward,x+160,y+32+16*i);
			var missionlocation = "unknown";
			if (this.missions[i].type == "cargo"){
				missionlocation = systems[ps].planets[this.missions[i].target].name;
				}
			if (this.missions[i].type == "destroy"){
				missionlocation = systems[ps].planets[systems[ps].ships[this.missions[i].target].parentid].name;
				}
			context.fillText(missionlocation,x+240,y+32+16*i);
			i=i+1;
			}
		context.beginPath();
		context.strokeStyle = systems[ps].outposts[systems[ps].players[0].dockstate].c2;//Global scope here, very bad, also in drawpolarpoly
		context.rect(xpos-16,ypos-56,512,336);
		context.rect(xpos-16,ypos+12,512,208);
		context.stroke();
		drawpolarpoly(x+464,y-20,systems[ps].outposts[systems[ps].players[0].dockstate].emblem[0],systems[ps].outposts[systems[ps].players[0].dockstate].emblem[1],32,systems[ps].outposts[systems[ps].players[0].dockstate].c,-1*Math.PI/2); //this.emblem is a randomized logo
		}
	addcargomission(theships,theplanets,theoutposts){
		var missiontarget = 1+Math.floor(Math.random()*(theplanets.length-1));
		var missiondistance = theoutposts[this.home].distance(theplanets[missiontarget]);
		var missionpay = Math.floor(500 + missiondistance/40);
		var missionmessage = "Go to "+theplanets[missiontarget].name + "."
		this.missions.push(new Mission("cargo",this.home,missiontarget,missionmessage,missionpay,0));//missiontype, morigin, mtarget,mmessage,mreward,mstory
		}
	addkillmission(theships,theplanets,theoutposts){
		var missiontarget = 1+Math.floor(Math.random()*(theships.length-2));
		var missiondistance = theoutposts[this.home].distance(theships[missiontarget]);
		var missionpay = Math.floor(500 + missiondistance/40);
		var missionmessage = "Destroy "+theships[missiontarget].name + ".  It can be found near "+theplanets[theships[missiontarget].parentid].name;
		this.missions.push(new Mission("destroy",this.home,missiontarget,missionmessage,missionpay,0));//missiontype, morigin, mtarget,mmessage,mreward,mstory
		}
	
	
	}
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
//let upw6speed = new Shopitem("blaster",6,"speed",1); 
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
let buycargo0x0d5 = new Shopitem("cargo",0,"buy",0.5);//The upgrade tier variable will used as a price multiplier for cargo
let buycargo0x2 = new Shopitem("cargo",0,"buy",2);//The upgrade tier variable will used as a price multiplier for cargo
let buycargo1 = new Shopitem("cargo",1,"buy",1); 
let buycargo2 = new Shopitem("cargo",2,"buy",1); 
let buycargo3 = new Shopitem("cargo",3,"buy",1); 
let buycargo4 = new Shopitem("cargo",4,"buy",1);
let buycargo5 = new Shopitem("cargo",5,"buy",1);
let buycargo6 = new Shopitem("cargo",6,"buy",1);
let buycargo7 = new Shopitem("cargo",7,"buy",1);
let buycargo8 = new Shopitem("cargo",8,"buy",1);


let merzianshopitems = [repairshopitem,buyw2item,buyw3item,buyw4item,remotew1item,booster1,buycargo0,buycargo1,buycargo2,buyw0item];
let merrymerz = new Shop("The Merry Merzian", 1, "I have these fine tapestries....", merzianshopitems);


let armorupitem = new Shopitem("upgrade",1,"armor",1); //Armor upgrade

//let buycargo3 = new Shopitem("cargo",3,"buy",1); 
let billshopitems = [repairshopitem,buyw2item,buyw3item,upw1damage,upw3damage,armorupitem,buycargo2,buycargo3]
let billbits = new Shop("Bills Billion Bits", 0, "Welcome to Earf", billshopitems);


let jojoshopitem7 = new Shopitem("upgrade",2,"shield",1); //Flakker damage upgrade
let jojoshopitem8 = new Shopitem("upgrade",4,"radar",1); //Armor upgrade
//let jojoshopitem9 = new Shopitem("cargo",2,"buy",1); 
//let buycargo5 = new Shopitem("cargo",5,"buy",1); 
let jojoshopitems = [repairshopitem,buyw5item,buyw6item,buyw9item,remotew2item,armorupitem,jojoshopitem7,jojoshopitem8,buycargo2,buycargo5];
let jojocheese = new Shop("JoJo's House of Cheese", 2, "Jupe Fantastico", jojoshopitems);


let dangshopitem8 = new Shopitem("upgrade",3,"shieldregen",1);
//let dangshopitem9 = new Shopitem("cargo",1,"buy",0);
//let dangshopitem10 = new Shopitem("cargo",6,"buy",0);
let dangshopitems = [repairshopitem,buyw4item,buyw7item,buyw8item,upw4speed,upw5bounce,upw1damage,dangshopitem8,buycargo1,buycargo6,buycargo0];
let dangustown = new Shop("Dangustown", 3, "It's YOUR Anus!", dangshopitems);

let randshopitems1 = [];
var i = 0;
while (i<12){
	var randomblasterupgrade = Math.floor(Math.random()*blasterupgradeitems.length)
	randshopitems1.push(blasterupgradeitems[randomblasterupgrade]);
	i=i+1;
}
let randoshop1 = new Shop("Rando Calrissian's Blaster Upgrades",4, "Randomized items", randshopitems1);

let upshopitem0 = new Shopitem("upgrade",0,"repair",0);
let upshopitem1 = new Shopitem("upgrade",1,"armor",0);
let upshopitem2 = new Shopitem("upgrade",2,"shield",0);
let upshopitem3 = new Shopitem("upgrade",3,"shieldregen",0);
let upshopitem4 = new Shopitem("upgrade",4,"radar",0);
let upshopitem5 = new Shopitem("upgrade",5,"cargo",0);
let upshopitem6 = new Shopitem("upgrade",6,"thrust",0);

var upgradeshopitems = [upshopitem0,upshopitem1,upshopitem2,upshopitem3,upshopitem4,upshopitem5,upshopitem6];

let upgradeshop = new Shop("All Upgrades Testing Shop",5, "Randomized items", upgradeshopitems);
let allshops = [billbits,merrymerz,jojocheese,dangustown,randoshop1,upgradeshop];

let dadashopitems = [upshopitem0,buyw2item,buyw3item,buyw4item,upw1damage,upw4damage,upshopitem1,buycargo0,buycargo6,buycargo5];
let dadashop = new Shop("Ye Olde Space Shoppe",0,"The Gentleman's Outfitter",dadashopitems);

let hijoshopitems = [upshopitem0,buyw5item,buyw6item,buyw8item,remotew2item,upw3damage,upw5n,buycargo1,buycargo2,buycargo4];
let hijoshop = new Shop("Not Your Dada's Spaceport",1,"Welcome to our new location",hijoshopitems);

let fantshopitems = [upshopitem0,buyw2item,buyw7item,buyw0item,upw2boom,upw5damage,upw8damage,buycargo3,buycargo7,buycargo8];
let fantshop = new Shop("Want-Fant",2,"You want it, Fant has it.",fantshopitems);

let stanshopitems = [upshopitem0,buyw3item,buyw6item,buyw9item,upw6timer,upw8boom,buycargo6,buycargo7,buycargo8];
let stanshop = new Shop("Shifty Steve's Questionable Commodities",3,"Everything your legitimate business needs.",stanshopitems);

let trinidadshops = [dadashop,hijoshop,fantshop,stanshop];

let arisshopitems = [upshopitem0,buyw4item,buyw6item,buyw7item,upw4speed,upw4timer,upw6damage,upw5n,buycargo1,buycargo2,buycargo4];
let arisshop = new Shop("The Foob",0,"yaaaaa",arisshopitems);

let luxeshopitems = [upshopitem0,buyw2item,buyw5item,buyw8item,upw5damage,upw5boom,upw5n,buycargo1,buycargo2,buycargo4];
let luxeshop = new Shop("The Luxemburger",1,"mmmmmm",luxeshopitems);

let napashops = [arisshop,luxeshop];