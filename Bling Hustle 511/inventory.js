class Inventory{
	constructor(cargospace){// let bob = new Inventory(10)
		this.maxcargo = cargospace;
		this.cargo = []; //list of integer quanitites, indexes parallel with allcargos
		this.blasters = [];
		this.upgrades = [];//not sure if/how this will be used
		var i=0;
		while (i<allcargos.length){//creepy global scope happening
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
	cargotypes(){
		var total = 0;
		var i=0;
		while(i<this.cargo.length-1){//Excludes mission cargo as a type
			if (this.cargo[i]>0){total++;}
			i++;
			}
		return total;
		}
	takecargo(cargoi, quantity){//takes cargo index cargoi, and integer quantity.
		this.cargo[cargoi] = this.cargo[cargoi]+quantity;		
		}
	givecargo(cargoi, quantity){
		this.cargo[cargoi] = this.cargo[cargoi]-quantity;		
		}
	savecargo(){
		var cargostring = "";
		var i=0;
		while(i<this.cargo.length){
			cargostring = cargostring + this.cargo[i]+ " ";
			i++
			}
		return cargostring;
		}
	loadcargo(cargostring){
		var i = 0;
		var lastword = "";
		var values = [];
		while(i<cargostring.length){//This loop parses the string into space separated words
			var thechar = cargostring[i];
			if (thechar!=" "){
				lastword=lastword+thechar;
				}
			else {
				values.push(lastword)
				lastword = "";
				}
			i++;
			}
		var i=0;
		while (i<values.length){
			this.cargo[i] = parseInt(values[i]);
			i++;
			}
		}
	draw(xpos,ypos){
		context.fillStyle = "yellow";
		context.font = "12px Ariel";
		context.fillText("Total cargo: "+this.totalcargo(),xpos,ypos-32);
		context.fillText("Maximum cargo: "+this.maxcargo,xpos,ypos-16);
		var i=0;
		var yoffset = 0;
		while (i<this.cargo.length){
			if (this.cargo[i]>0){
				context.fillText(allcargos[i].name,xpos,ypos+yoffset);
				context.fillText(this.cargo[i],xpos+128,ypos+yoffset);
				yoffset = yoffset + 16;
				}
			i++;
			}
		}
	}


