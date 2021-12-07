module.exports = class Inventory{
	constructor(cargospace,allcargos){// let bob = new Inventory(10)
		this.maxcargo = cargospace;
		this.cargo = []; //list of integer quanitites, indexes parallel with allcargos
		this.blasters = [];
		this.upgrades = [];//not sure if/how this will be used
		var i=0;
		var cargoslength = 100;
		while (i<cargoslength){
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
	draw(xpos,ypos,allcargos){
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