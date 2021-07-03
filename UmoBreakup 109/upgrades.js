class Upgrade{
	constructor(name,description,price,type,tier){
		this.name = name;//"Super blaster"
		this.description=description; //"The super blaster is super dope"
		this.price = price;
		this.type = type;//"armor","shield","shieldregen","radar","thruster"
		this.tier = tier;
		}
	apply(playership){
		console.log("apply function was executed");//not executed--why?
		if (this.type == "armor"){
			//console.log("apply function executed, this.type == 'armor'");//not executed--why?
			playership.maxhp = playership.maxhp + 200; 
			playership.hp = playership.maxhp; 
			this.tier = this.tier + 1;
		} else if (this.type == "repair"){
			//console.log("apply function executed, this.type == 'repair'");//not executed--why?
			playership.hp = playership.maxhp; 
		} else if (this.type == "shield"){
			//console.log("apply function executed, this.type == 'shield'");//not executed--why?
			playership.maxshield = playership.maxshield + 50; 
			this.tier = this.tier + 1;
		} else if (this.type=="shieldregen"){
			playership.shieldregen = playership.shieldregen + 0.25;
			this.tier = this.tier + 1;
		} else if (this.type=="radar"){
			radarrange = radarrange + 1000;//use of global variable here only OK because JS is weird
			this.tier = this.tier + 1;
		} else if (this.type=="cargo"){
			playerinventory.maxcargo = playerinventory.maxcargo + 5; //same
			this.tier = this.tier + 1;
		} else if (this.type=="thrust"){
			thrustmultiplier = thrustmultiplier + 0.5; //same
			this.tier = this.tier + 1;
			}
		}
	}
allupgrades = [];
allupgrades.push(new Upgrade("Repair","Repairs any damage to your ship.",20,"repair",0));
allupgrades.push(new Upgrade("Armor","Improves your ship's armor.",1000,"armor",0));
allupgrades.push(new Upgrade("Shield","Improves your ship's shield.",2000,"shield",0));
allupgrades.push(new Upgrade("Shield Regen","Improves your ship's shield regeneration rate.",3000,"shieldregen",0));
allupgrades.push(new Upgrade("Radar","Improves your ship's radar range.",3000,"radar",0));
allupgrades.push(new Upgrade("Cargo","Improves your ship's cargo capacity",3000,"cargo",0));
allupgrades.push(new Upgrade("Thrust","Improves your ship's thruster power",3000,"thrust",0));
//allupgrades.push(new Upgrade("Thrust Adjust","Adds adjustibility to your ship's thrusters",3000,"thrustadjust",0));
//allupgrades.push(new Upgrade("Efficient Thrusters","Improves thruster efficiency",3000,"thrusteff",0));
