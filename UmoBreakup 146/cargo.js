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
let missioncargo = new Cargo("Mission cargo","They don't tell you what's in the crates.  They just tell you where to take them.",0);
let allcargos = [iron,water,phosphorus,oxygen,cheese,weet,dankcheese,szyrup,tinywizards,missioncargo];
class Inventory{
	constructor(cargospace){// let bob = new Inventory(10)
		this.maxcargo = cargospace;
		this.cargo = []; //list of integer quanitites, indexes parallel with allcargos
		this.blasters = [];
		this.upgrades = [];//not sure if/how this will be used
		var i=0;
		while (i<allcargos.length){
			this.cargo.push(0);//establishes 0 cargo in inventory for all possible cargo items
			i=i+1;
		}
		this.linenumbers = 0;
	}
	totalcargo(){ //this also updates linenumbers as well as the total quantity of cargo.
		var total = 0;
		var lines = 0; //lines and linenumbers refers to the diversity of cargo types and their needed spacing.
		var i=0;
		while (i<this.cargo.length){
			total = total + this.cargo[i];
			if (this.cargo[i]>0){lines=lines+1;}
			i=i+1;
			}
		this.linenumbers = lines;	
		return total;
		}
	takecargo(cargoi, quantity){//takes cargo index cargoi, and integer quantity.
		this.cargo[cargoi] = this.cargo[cargoi]+quantity;		
		}
	givecargo(cargoi, quantity){//This filters for available cargo space, but i
		this.cargo[cargoi] = this.cargo[cargoi]-quantity;		
		}
	draw(xpos,ypos){
		context.fillStyle = "yellow";
		context.font = "12px Ariel";
		context.fillText("Total cargo: "+this.totalcargo(),xpos,ypos-32);
		context.fillText("Maximum cargo: "+this.maxcargo,xpos,ypos-16);
		var i=0;
		while (i<this.cargo.length){
			context.fillText(allcargos[i].name,xpos,ypos+16*i);
			context.fillText(this.cargo[i],xpos+128,ypos+16*i);
			i=i+1;
		}
	}
}
let playerinventory = new Inventory(10);
playerinventory.takecargo(0,4);//for testing

