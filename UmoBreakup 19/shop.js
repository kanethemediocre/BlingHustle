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
			thisname = allupgrades[this.i].name;
		}else if (this.type == "booster"){
			thisname = "Booster"+utier; //Boosters can be described entirely by their tier.
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
			thisprice = allblasters[this.i].price;
		}else if (this.type == "cargo"){
			thisprice = allcargos[this.i].price;
		}else if (this.type == "upgrade"){
			thisprice = allupgrades[this.i].price;
		}else if (this.type == "booster"){
			thisprice = 999; //Replace with real price as it is determined
		}
		return thisprice;		
	}
}
class Shop{
	constructor(name, storelocation, description, inv){ //name and description are strings, location is a station umo index
		this.name = name;
		this.description = description; 
		this.home = storelocation; //a station umo
		this.inv = inv;//list of shopitem objects
		}
	draw(xpos,ypos){//screen coords of top corner
		var x = xpos;
		var y = ypos;
		context.font='12px Arial';
		context.fillStyle = "white";
		context.fillText("Welcome to "+this.name,x,y);
		var names = [];
		var descriptions = [];
		var prices = [];
		var i=0;
		while (i<this.inv.length){	
			names.push(this.inv[i].namestring());
			descriptions.push(this.inv[i].describestring());
			prices.push(this.inv[i].itemprice());
			}
		var shopchart = [names,descriptions,prices];
		showchart(shopchart, 64, 16, x,y);
		}
	
	}
let merzianshopitem1 = new Shopitem("upgrade",0,"repair",0);
let merzianshopitem2 = new Shopitem("blaster",2,"buy",0); //Mine weapon
let merzianshopitem3 = new Shopitem("blaster",3,"buy",0); //Flakker weapon
let merzianshopitem4 = new Shopitem("blaster",4,"buy",0);//Railgun weapon
let merzianshopitem5 = new Shopitem("blaster",1,"remote",1);//blaster remote upgrade
let merzianshopitem6 = new Shopitem("booster",0,"buy",0); //Tier 0 booster
let merzianshopitem7 = new Shopitem("cargo",0,"buy",1);//The upgrade tier variable will used as a price multiplier for cargo
let merzianshopitem8 = new Shopitem("cargo",1,"buy",1); 
let merzianshopitem9 = new Shopitem("cargo",2,"buy",1); 
let merzianshopitems = [merzianshopitem1,merzianshopitem2,merzianshopitem3,merzianshopitem4,merzianshopitem5,merzianshopitem6,merzianshopitem7,merzianshopitem8,merzianshopitem9];
let merrymerz = new Shop("The Merry Merzian", 1, "Merrier than any other Merzian", merzianshopitems);
//let outeroutpost = new Shop("The Outer Outpost", 4, "Best and only shop in the area.")