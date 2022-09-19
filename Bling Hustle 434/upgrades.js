class Upgrade{
	constructor(name,description,price,type,tier){
		this.name = name;//"Super blaster"
		this.description=description; //"The super blaster is super dope"
		this.price = price;
		this.type = type;//"armor","shield","shieldregen","radar","thruster"
		this.tier = tier;
		}
	apply(theplayer){
		if (this.type == "armor"){
			theplayer.ship.maxhp = theplayer.ship.maxhp + 250; 
			theplayer.ship.hp = theplayer.ship.maxhp; 
			this.tier = this.tier + 1;
		} else if (this.type == "repair"){
			theplayer.ship.hp = theplayer.ship.maxhp; 
		} else if (this.type == "shield"){
			theplayer.ship.maxshield = theplayer.ship.maxshield + 100; 
			this.tier = this.tier + 1;
		} else if (this.type=="shieldregen"){
			theplayer.ship.shieldregen = theplayer.ship.shieldregen + 0.25;
			this.tier = this.tier + 1;
		} else if (this.type=="radar"){
			theplayer.radarrange = theplayer.radarrange + 1000;
			this.tier = this.tier + 1;
		} else if (this.type=="cargo"){
			theplayer.inventory.maxcargo = theplayer.inventory.maxcargo + 10; 
			this.tier = this.tier + 1;
		} else if (this.type=="thrust"){
			theplayer.thrustmultiplier = theplayer.thrustmultiplier + 0.5;
			this.tier = this.tier + 1;
		} else if (this.type=="sensor"){
			theplayer.sensor = theplayer.sensor + 1; 
			this.tier = this.tier + 1;
		} else if (this.type=="solar"){
			theplayer.shieldbonus = "solar"; //These have no tier and will replace each other.
		} else if (this.type=="impact"){
			theplayer.shieldbonus = "impact";
			}
		}
	}
allupgrades = [];
allupgrades.push(new Upgrade("Repair","Repairs any damage to your ship.",20,"repair",0));
allupgrades.push(new Upgrade("Armor","Improves your ship's armor.",800,"armor",0));
allupgrades.push(new Upgrade("Shield","Improves your ship's shield.",2000,"shield",0));
allupgrades.push(new Upgrade("Shield Regen","Improves your ship's shield regeneration rate.",1250,"shieldregen",0));
allupgrades.push(new Upgrade("Radar","Improves your ship's radar range.",2500,"radar",0));
allupgrades.push(new Upgrade("Cargo","Improves your ship's cargo capacity",3000,"cargo",0));
allupgrades.push(new Upgrade("Thrust","Improves your ship's thruster power",4000,"thrust",0));
allupgrades.push(new Upgrade("Sensor","Improves your ship's navigation and targeting sensors",5000,"sensor",0));
allupgrades.push(new Upgrade("Solar Shield","Improves your shield's resistance to solar radiation.",3000,"solar",0));
allupgrades.push(new Upgrade("Impact Shield","Improves your shield's resistance to collisions.",3000,"impact",0));
//allupgrades.push(new Upgrade("Thrust Adjust","Adds adjustibility to your ship's thrusters",3000,"thrustadjust",0));
//allupgrades.push(new Upgrade("Efficient Thrusters","Improves thruster efficiency",3000,"thrusteff",0));
function freshupgrades(){
	var newupgrades = [];
	newupgrades.push(new Upgrade("Repair","Repairs any damage to your ship.",20,"repair",0));
	newupgrades.push(new Upgrade("Armor","Improves your ship's armor.",800,"armor",0));
	newupgrades.push(new Upgrade("Shield","Improves your ship's shield.",2000,"shield",0));
	newupgrades.push(new Upgrade("Shield Regen","Improves your ship's shield regeneration rate.",1250,"shieldregen",0));
	newupgrades.push(new Upgrade("Radar","Improves your ship's radar range.",2500,"radar",0));
	newupgrades.push(new Upgrade("Cargo","Improves your ship's cargo capacity",3000,"cargo",0));
	newupgrades.push(new Upgrade("Thrust","Improves your ship's thruster power",4000,"thrust",0));
	newupgrades.push(new Upgrade("Sensor","Improves your ship's navigation and targeting sensors",5000,"sensor",0));
	newupgrades.push(new Upgrade("Solar Shield","Improves your shield's resistance to solar radiation.",3000,"solar",0));
	newupgrades.push(new Upgrade("Impact Shield","Improves your shield's resistance to collisions.",3000,"impact",0));
	return newupgrades
}