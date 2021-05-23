//Each item needs a type (blaster, ship upgrade, cargo)
//If upgrade or blaster, also needs a tier
//If upgrade or blaster also needs a sub-type (blast radius, damage, etc.)
//Price for blasters set by blaster object and tier
//Price for cargo set by cargo, and also shop.
class Shopitem{
	constructor(itype, iindex, utype, utier){
		this.type = itype; //"cargo","blaster","upgrade","booster"
		this.i = iindex; //Index of blaster, or of cargo, or of item, from separate lists
		this.utype = utype; //For blasters: "damage","blast","speed","timer","bounce","remote", "buy"
		this.utier = utier;
		//For upgrades: "armor","shield","shieldregen","thrust","thrustadjust","radar"
	}
	namestring(){ //returns name of blaster, cargo, upgrade, booster etc.
		var thisname = "Undefined Item"; //error handling by default
		if (this.type == "blaster"){
			thisname = allblasters[this.i].name;
		}else if (this.type == "cargo"){
			thisname = allcargos[this.i].name;
		}else if (this.type == "upgrade"){
			//thisname = "upgrades array not implemented";
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
			//thisdescribe = "upgrades array not implemented";
			thisdescribe = allupgrades[this.i].description;
		}else if (this.type == "booster"){
			thisdescribe = "Booster with "+(16*2^this.utier)+" delta V.";//boosters described purely by thrust.
		}
		return thisdescribe;
	}
	itemprice(){
		var thisprice = "Undefined Item"; //error handling by default
		if (this.type == "blaster"){
			thisprice = allblasters[this.i].price;
		}else if (this.type == "cargo"){
			thisprice = allcargos[this.i].price;
		}else if (this.type == "upgrade"){
			//thisprice = 69;
			thisprice = allupgrades[this.i].price*2**(this.utier);
		}else if (this.type == "booster"){
			thisprice = 999; //Replace with real price as it is determined
		}
		return thisprice;		
	}
	buy(playermoney, playership){ //this function is for the player purchasing a shopitem object.  
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
				if ( (allblasters[this.i].phas==true) && (playermoney>allblasters[this.i].nextupcost()) ){ //verify player doesnt already have blaster, and has enough money
					playermoney = playermoney - allblasters[this.i].nextupcost();//need to add check for bounce already having been purchased
					allblasters[this.i].plusbounce();
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
			} else if (this.utype =="thrust"){
				//increase player thrust multiplier.
				}
		}else if (this.type == "booster"){
			//stuff to buy the booster
		}else if (this.type == "cargo"){
			//stuff to buy the cargo
		}
	}
	available(playership){
		var buyable = false;
		if (this.type == "blaster"){
			if (this.utype == "buy"){
				if (allblasters[this.i].phas==false){ //verify player doesnt already have blaster
					buyable = true;
					}
				}
			if (this.utype == "damage"){//can always upgrade damage (for now)
				buyable = true;
				}
			if (this.utype == "remote"){ //can only upgrade remote detonator once.
				if ( (allblasters[this.i].phas==true) && (allblasters[this.i].rtier==0) ){ //verify player already has blaster, and doesnt already have upgrade
					buyable = true;
					}
				}
			if (this.utype == "speed"){ //can always upgrade speed
				if (allblasters[this.i].phas==true){ //verify player already has blaster.
					buyable = true;
					}
				}
			if (this.utype == "bounce"){//can only upgrade bounce once.
				if ( (allblasters[this.i].phas==true) && (allblasters[this.i].rtier == 0) ){ //verify player already has blaster, and doesn't have bounce upgrade
					buyable = true;
					}
				}
		}else if (this.type == "upgrade"){
			buyable = true; //all upgrades are (for now) repeatedly buyable
		}else if (this.type == "cargo"){
			buyable = true; //cargo is always buyable.  Cargo space limits not implemented, wont be implemented here
			}
		return buyable;
		}
	}
class Shop{
	constructor(name, storelocation, description, inv){ //name and description are strings, location is a station umo index
		this.name = name;
		this.description = description; 
		this.home = storelocation; //a station umo
		this.inv = inv;//list of shopitem objects
		}
	draw(xpos,ypos,item){//screen coords of top corner, item index
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
		showchart(shopchart, 128, 16, x,y+24);
		context.fillText(this.inv[item].describestring(),x,y+256);
		context.fillText('X',x-16,y+24+item*16);
		}	
	}
let repairshopitem = new Shopitem("upgrade",0,"repair",0);
let buyw2item = new Shopitem("blaster",2,"buy",0); //Mine weapon
let buyw3item = new Shopitem("blaster",3,"buy",0); //Flakker weapon
let buyw4item = new Shopitem("blaster",4,"buy",0);//Railgun weapon
let remotew1item = new Shopitem("blaster",1,"remote",1);//blaster remote upgrade
let booster0 = new Shopitem("booster",0,"buy",0); //Tier 0 booster
let merzianshopitem7 = new Shopitem("cargo",0,"buy",1);//The upgrade tier variable will used as a price multiplier for cargo
let merzianshopitem8 = new Shopitem("cargo",1,"buy",1); 
let merzianshopitem9 = new Shopitem("cargo",2,"buy",1); 
let merzianshopitems = [repairshopitem,buyw2item,buyw3item,buyw4item,remotew1item,booster0,merzianshopitem7,merzianshopitem8,merzianshopitem9];
let merrymerz = new Shop("The Merry Merzian", 1, "I have these fine tapestries....", merzianshopitems);

//let billshopitem1 = new Shopitem("upgrade",0,"repair",0);
//let billshopitem2 = new Shopitem("blaster",2,"buy",0); //Mine weapon
//let billshopitem3 = new Shopitem("blaster",3,"buy",0); //Flakker weapon
let billshopitem4 = new Shopitem("blaster",1,"damage",1); //Blaster damage upgrade
let billshopitem5 = new Shopitem("blaster",3,"damage",1); //Flakker damage upgrade
let armorupitem = new Shopitem("upgrade",99,"armor",1); //Armor upgrade
let billshopitem7 = new Shopitem("cargo",2,"buy",1); 
let billshopitem8 = new Shopitem("cargo",3,"buy",1); 
let billshopitems = [repairshopitem,buyw2item,buyw3item,billshopitem4,billshopitem5,armorupitem,billshopitem7,billshopitem8]
let billbits = new Shop("Bills Billion Bits", 0, "Welcome to Earf", billshopitems);

//let jojoshopitem1 = new Shopitem("upgrade",0,"repair",0);
let buyw5item = new Shopitem("blaster",5,"buy",0); //Scatter cannon
let buyw6item = new Shopitem("blaster",6,"buy",0); //Flazor 
let buyw9item = new Shopitem("blaster",9,"buy",0); //Beepadoop (big bomb)
let remotew2item = new Shopitem("blaster",2,"remote",1); //Mine remote detonator upgrade
let jojoshopitem7 = new Shopitem("upgrade",99,"shield",1); //Flakker damage upgrade
let jojoshopitem8 = new Shopitem("upgrade",99,"radar",1); //Armor upgrade
let jojoshopitem9 = new Shopitem("cargo",2,"buy",1); 
let jojoshopitem10 = new Shopitem("cargo",5,"buy",1); 
let jojoshopitems = [repairshopitem,buyw5item,buyw6item,buyw9item,remotew2item,armorupitem,jojoshopitem7,jojoshopitem8,jojoshopitem9,jojoshopitem10];
let jojocheese = new Shop("JoJo's House of Cheese", 2, "Jupe Fantastico", billshopitems);

//let dangshopitem1 = new Shopitem("upgrade",0,"repair",0);
//let dangshopitem2 = new Shopitem("blaster",4,"buy",0);
let dangshopitem3 = new Shopitem("blaster",7,"buy",0);
let dangshopitem4 = new Shopitem("blaster",8,"buy",0);
let dangshopitem5 = new Shopitem("blaster",4,"speed",1);
let dangshopitem6 = new Shopitem("blaster",5,"bounce",1);
let dangshopitem7 = new Shopitem("upgrade",99,"shieldregen",1);
let dangshopitem8 = new Shopitem("upgrade",99,"thrust",1);
let dangshopitem9 = new Shopitem("cargo",1,"buy",0);
let dangshopitem10 = new Shopitem("cargo",6,"buy",0);
let dangshopitems = [repairshopitem,buyw4item,dangshopitem3,dangshopitem4,dangshopitem5,dangshopitem6,dangshopitem7,dangshopitem8,dangshopitem9,dangshopitem10];
let dangustown = new Shop("Dangustown", 2, "It's YOUR Anus!", dangshopitems);
let allshops = [0,billbits,merrymerz,jojocheese,dangustown];
