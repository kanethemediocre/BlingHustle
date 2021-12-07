module.exports = class Cargo{
	constructor(name,description,baseprice){
	this.name = name;
	this.description = description;
	this.baseprice = baseprice;
	this.volatility = baseprice / 10;
	this.playerhas  = 0; //dirty hack to track cargo ownership for only the player
	this.soldat = []; //list of station indices
	this.boughtat = []; //list of station indices
	}
}