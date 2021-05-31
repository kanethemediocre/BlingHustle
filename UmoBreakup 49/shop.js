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
			thisprice = Math.floor(allcargos[this.i].baseprice*allshops[dockstate].cargoprices[this.i]);
		}else if (this.type == "upgrade"){
			//thisprice = 69;
			thisprice = allupgrades[this.i].price*2**(this.utier);
		}else if (this.type == "booster"){
			thisprice = 400*(2**this.utier); //Replace with real price as it is determined
		}
		return thisprice;		
	}
	buy(playermoney, playership, inventory){ //this function is for the player purchasing a shopitem object.  
		if (this.type == "blaster"){
			//stuff to buy the blaster/blaster upgrade
			if (this.utype == "buy"){
				if ( (allblasters[this.i].phas==false) && (playermoney>allblasters[this.i].price) ){ //verify player doesnt already have blaster, and has enough money
					playermoney = playermoney - allblasters[this.i].price;
					allblasters[this.i].phas = true;
					}
				}
			if (this.utype == "damage"){
				if ( (allblasters[this.i].phas==true) && (playermoney>allblasters[this.i].nextupcost()) ){ 
					playermoney = playermoney - allblasters[this.i].nextupcost();
					allblasters[this.i].plusdamage();
					}
				}
			if (this.utype == "remote"){
				if ( (allblasters[this.i].phas==true) && (playermoney>allblasters[this.i].nextupcost())&&(allblasters[this.i].rtier==0) ){ //verify player already has blaster, and has enough money, and doesnt already have upgrade
					playermoney = playermoney - allblasters[this.i].nextupcost();//need to add check for remote already having been purchased
					allblasters[this.i].plusremote();
					}
				}
			if (this.utype == "speed"){
				if ( (allblasters[this.i].phas==true) && (playermoney>allblasters[this.i].nextupcost()) ){ //verify player doesnt already have blaster, and has enough money
					playermoney = playermoney - allblasters[this.i].nextupcost(); 
					allblasters[this.i].plusspeed();
					}
				}
			if (this.utype == "bounce"){
				if ( (allblasters[this.i].phas==true) && (playermoney>allblasters[this.i].nextupcost()&&(allblasters[this.i].btier == 0) ) ){ //verify player doesnt already have blaster, and has enough money
					playermoney = playermoney - allblasters[this.i].nextupcost();//need to add check for bounce already having been purchased
					allblasters[this.i].plusbounce();
					}
				}
			if (this.utype == "n"){
				if ( (allblasters[this.i].phas==true) && (playermoney>allblasters[this.i].nextupcost()) ){ //verify player doesnt already have blaster, and has enough money
					playermoney = playermoney - allblasters[this.i].nextupcost();//need to add check for bounce already having been purchased
					allblasters[this.i].plusn();
					}
				}
			if (this.utype == "timer"){
				if ( (allblasters[this.i].phas==true) && (playermoney>allblasters[this.i].nextupcost()) ){ //verify player doesnt already have blaster, and has enough money
					playermoney = playermoney - allblasters[this.i].nextupcost();//need to add check for bounce already having been purchased
					allblasters[this.i].plustimer();
					}
				}
			if (this.utype == "boom"){
				if ( (allblasters[this.i].phas==true) && (playermoney>allblasters[this.i].nextupcost()) ){ //verify player doesnt already have blaster, and has enough money
					playermoney = playermoney - allblasters[this.i].nextupcost();//need to add check for bounce already having been purchased
					allblasters[this.i].plustimer();
					}
				}
				
				
			
		}else if (this.type == "upgrade"){
			if (this.utype =="armor"){
				playership.maxhp = playership.maxhp + 200; 
				playership.hp = playership.maxhp; 
				this.utier = this.utier+1;
			} else if (this.utype =="repair"){
				playership.hp = playership.maxhp; 
			} else if (this.utype =="shield"){
				playership.maxshield = playership.maxshield + 50; 
				this.utier = this.utier+1;
			} else if (this.utype =="shieldregen"){
				playership.shieldregen = playership.shieldregen + 0.25;
				this.utier = this.utier+1;
			} else if (this.utype =="radar"){
				radarrange = radarrange + 1000;
				this.utier = this.utier+1;
			} else if (this.utype =="cargo"){
				playerinventory.maxcargo = playerinventory.maxcargo + 5; //refers to global, not passed variable.
				}
		}else if (this.type == "booster"){
			boosters[this.utier] = boosters[this.utier]+2;
		}else if (this.type == "cargo"){
			inventory.takecargo(this.i, 1);
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
		//showchart(shopchart, 128, 16, x,y+24);
		context.fillText(this.inv[item].describestring(),x,y+256);
		context.fillText('X',x-16,y+32+item*16);
		//replace showchart function
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
		}	
	
	drawsellmenu(xpos,ypos,item){//screen coords of top corner, item index
		var x = xpos;
		var y = ypos;
		context.font='16px Arial';
		context.fillStyle = "white";
		context.fillText("Welcome to "+this.name,x,y);
		context.font='12px Arial';
		context.fillText(allcargos[item].description,x,y+256);
		context.fillText('X',x-16,y+32+item*16);
		//replace showchart function
		var i=0;
		while (i<allcargos.length){
			if (playerinventory.cargo[i]>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}//Used global variable instead of reference
			context.fillText(allcargos[i].name.slice(0,16),x,y+32+16*i);
			context.fillText(allcargos[i].description.slice(0,16),x+80,y+32+16*i);
			context.fillText(Math.floor(allcargos[i].baseprice*allshops[dockstate].cargoprices[i]),x+200,y+32+16*i); //duplicate to itemprice() function, but this is indexed by allcargos instead of shopitem.
			i=i+1;
			}
		}		

	}
let repairshopitem = new Shopitem("upgrade",0,"repair",0);
let buyw2item = new Shopitem("blaster",2,"buy",0); //Mine weapon
let buyw3item = new Shopitem("blaster",3,"buy",0); //Flakker weapon
let buyw4item = new Shopitem("blaster",4,"buy",0);//Railgun weapon
let remotew1item = new Shopitem("blaster",1,"remote",1);//blaster remote upgrade
let booster1 = new Shopitem("booster",0,"buy",1); //Tier 0 booster
let buycargo0 = new Shopitem("cargo",0,"buy",1);//The upgrade tier variable will used as a price multiplier for cargo
let buycargo0x0d5 = new Shopitem("cargo",0,"buy",0.5);//The upgrade tier variable will used as a price multiplier for cargo
let buycargo0x2 = new Shopitem("cargo",0,"buy",2);//The upgrade tier variable will used as a price multiplier for cargo
let buycargo1 = new Shopitem("cargo",1,"buy",1); 
let buycargo2 = new Shopitem("cargo",2,"buy",1); 
let buyw0item = new Shopitem("blaster",0,"buy",0); //probe
let merzianshopitems = [repairshopitem,buyw2item,buyw3item,buyw4item,remotew1item,booster1,buycargo0x0d5,buycargo1,buycargo2,buyw0item];
let merrymerz = new Shop("The Merry Merzian", 1, "I have these fine tapestries....", merzianshopitems);

//let billshopitem1 = new Shopitem("upgrade",0,"repair",0);
//let billshopitem2 = new Shopitem("blaster",2,"buy",0); //Mine weapon
//let billshopitem3 = new Shopitem("blaster",3,"buy",0); //Flakker weapon
let upw1damage = new Shopitem("blaster",1,"damage",1); //Blaster damage upgrade
let upw3damage = new Shopitem("blaster",3,"damage",1); //Flakker damage upgrade
let armorupitem = new Shopitem("upgrade",1,"armor",1); //Armor upgrade
//let billshopitem7 = new Shopitem("cargo",2,"buy",1); 
let buycargo3 = new Shopitem("cargo",3,"buy",1); 
let billshopitems = [repairshopitem,buyw2item,buyw3item,upw1damage,upw3damage,armorupitem,buycargo2,buycargo3]
let billbits = new Shop("Bills Billion Bits", 0, "Welcome to Earf", billshopitems);

//let jojoshopitem1 = new Shopitem("upgrade",0,"repair",0);
let buyw5item = new Shopitem("blaster",5,"buy",0); //Scatter cannon
let buyw6item = new Shopitem("blaster",6,"buy",0); //Flazor 
let buyw9item = new Shopitem("blaster",9,"buy",0); //Beepadoop (big bomb)
let remotew2item = new Shopitem("blaster",2,"remote",1); //Mine remote detonator upgrade
let jojoshopitem7 = new Shopitem("upgrade",2,"shield",1); //Flakker damage upgrade
let jojoshopitem8 = new Shopitem("upgrade",4,"radar",1); //Armor upgrade
//let jojoshopitem9 = new Shopitem("cargo",2,"buy",1); 
let buycargo5 = new Shopitem("cargo",5,"buy",1); 
let jojoshopitems = [repairshopitem,buyw5item,buyw6item,buyw9item,remotew2item,armorupitem,jojoshopitem7,jojoshopitem8,buycargo2,buycargo5];
let jojocheese = new Shop("JoJo's House of Cheese", 2, "Jupe Fantastico", jojoshopitems);

//let dangshopitem1 = new Shopitem("upgrade",0,"repair",0);
//let dangshopitem2 = new Shopitem("blaster",4,"buy",0);
let dangshopitem3 = new Shopitem("blaster",7,"buy",0);
let dangshopitem4 = new Shopitem("blaster",8,"buy",0);
let dangshopitem5 = new Shopitem("blaster",4,"speed",1);
let dangshopitem6 = new Shopitem("blaster",5,"bounce",1);
let dangshopitem7 = new Shopitem("blaster",1,"damage",1);
let dangshopitem8 = new Shopitem("upgrade",3,"shieldregen",1);
let dangshopitem9 = new Shopitem("cargo",1,"buy",0);
let dangshopitem10 = new Shopitem("cargo",6,"buy",0);
let dangshopitems = [repairshopitem,buyw4item,dangshopitem3,dangshopitem4,dangshopitem5,dangshopitem6,dangshopitem7,dangshopitem8,dangshopitem9,dangshopitem10,buycargo0x2];
let dangustown = new Shop("Dangustown", 3, "It's YOUR Anus!", dangshopitems);

let randshopitems1 = [];
var i = 0;
while (i<12){
	var randblaster = Math.floor(Math.random()*10);
	var randblasterfxseed = Math.floor(Math.random()*8);
	var randblastfx = "buy";
	if (randblasterfxseed == 1){randblastfx = "damage";}
	else if (randblasterfxseed == 2){randblastfx = "speed";}
	else if (randblasterfxseed == 3){randblastfx = "bounce";}
	else if (randblasterfxseed == 4){randblastfx = "remote";}	
	else if (randblasterfxseed == 5){randblastfx = "n";}
	else if (randblasterfxseed == 6){randblastfx = "boom";}
	else if (randblasterfxseed == 7){randblastfx = "timer";}
	randshopitems1.push(new Shopitem("blaster",randblaster,randblastfx,0));
	i=i+1;
}
let randoshop1 = new Shop("Marlon Rando's Randomized Blasters",4, "Randomized items", randshopitems1);

let randshopitems2 = [];

var i = 0;
while (i<12){
	var randupgrade = Math.floor(Math.random()*6);
	var randupgradetype = "repair";
	if (randupgrade == 1){randupgradetype = "armor";}
	else if (randupgrade == 2){randupgradetype = "shield";}
	else if (randupgrade == 3){randupgradetype = "shieldregen";}
	else if (randupgrade == 4){randupgradetype = "radar";}	
	else if (randupgrade == 5){randupgradetype = "cargo";}
	randshopitems2.push(new Shopitem("upgrade",randupgrade,randupgradetype,0));
	i=i+1;
}
let randoshop2 = new Shop("Rando Calrissian's Randomized Upgrades",4, "Randomized items", randshopitems2);
let allshops = [0,billbits,merrymerz,jojocheese,dangustown,randoshop1,randoshop2];
