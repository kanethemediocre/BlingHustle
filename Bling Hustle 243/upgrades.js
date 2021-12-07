module.exports = class Upgrade{
	constructor(name,description,price,type,tier){
		this.name = name;//"Super blaster"
		this.description=description; //"The super blaster is super dope"
		this.price = price;
		this.type = type;//"armor","shield","shieldregen","radar","thruster"
		this.tier = tier;
		}
	apply(theplayer){
		console.log("apply function was executed");//not executed--why?
		if (this.type == "armor"){
			//console.log("apply function executed, this.type == 'armor'");//not executed--why?
			theplayer.ship.maxhp = theplayer.ship.maxhp + 250; 
			theplayer.ship.hp = theplayer.ship.maxhp; 
			this.tier = this.tier + 1;
		} else if (this.type == "repair"){
			//console.log("apply function executed, this.type == 'repair'");//not executed--why?
			theplayer.ship.hp = theplayer.ship.maxhp; 
		} else if (this.type == "shield"){
			//console.log("apply function executed, this.type == 'shield'");//not executed--why?
			theplayer.ship.maxshield = theplayer.ship.maxshield + 100; 
			this.tier = this.tier + 1;
		} else if (this.type=="shieldregen"){
			theplayer.ship.shieldregen = theplayer.ship.shieldregen + 0.25;
			this.tier = this.tier + 1;
		} else if (this.type=="radar"){
			theplayer.radarrange = theplayer.radarrange + 1000;//use of global variable here only OK because JS is weird
			this.tier = this.tier + 1;
		} else if (this.type=="cargo"){
			theplayer.inventory.maxcargo = theplayer.inventory.maxcargo + 10; //same
			this.tier = this.tier + 1;
		} else if (this.type=="thrust"){
			theplayer.thrustmultiplier = theplayer.thrustmultiplier + 0.5; //same
			this.tier = this.tier + 1;
			}
		}
	}
