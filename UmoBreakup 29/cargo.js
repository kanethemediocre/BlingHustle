class Cargo{
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

let iron = new Cargo("Iron","A common element throughout space, this magnetic and strong metal can form a tremendous number of useful alloys.", 100);
let water = new Cargo("Water","A necessity for life and a lot of useful chemistry, water is in demand despite not being hard to find.", 50);
let phosphorus = new Cargo("Phosphorus","Phosphorus is a necessary element for life as we know it, and unlike water it's also quite rare.",1000);
let oxygen = new Cargo("Oxygen","It's good for breathing.",100);

let cheese = new Cargo("Cheese","A valuable type of spoiled milk, cheese is a delicacy that many humans refuse to live without.",400);
let weet = new Cargo("Weet","Weet is a genetically engineered grain optimized to provide a high calorie density without being too needy to grow in space.",100);
let dankcheese = new Cargo("Dank Cheese","Cheese is already a valuable commodity in deep space, but the dankest of cheeses can fetch even higher prices with the right buyer",1000);
let szyrup = new Cargo("Sweet Juice","Ubiquitous beverage of choice in deep space settlements.  It's pretty good if you don't ask too many questions about it.",150);

let tinywizards = new Cargo("Tiny Wizards","Widely used for tabletop gaming, these figurines are inexplicably valuable in some markets",80);
let allcargos = [iron,water,phosphorus,oxygen,cheese,weet,dankcheese,szyrup,tinywizards];
class Inventory{
	constructor(cargospace){// let bob = new Inventory(10)
		this.maxcargo = cargospace;
		this.cargo = []; //list of strings
		this.blasters = [];
		this.upgrades = [];//not sure if/how this will be used
	}
	takecargo(thecargo){//takes 1 unit of thecargo as a string indicating cargo type
		if (this.cargo.length<this.maxcargo){
			this.cargo.push(thecargo); 
			}
		}
	givecargo(thecargo){
		var i=0;
		var found = false;
		//while (i<this.cargo.length){
			//if ()
			//}
	}
}