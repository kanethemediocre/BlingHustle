module.exports = class Shop{
	constructor(name, storelocation, description, inv){ //name and description are strings, location is a station umo index
		this.name = name;
		this.description = description; 
		this.home = storelocation; //a station umo index
		this.inv = inv;//list of shopitem objects
		this.missions = []; 
		this.cargoprices = [];//list of price multipliers, index matching allcargos list
		var i=0;
		var cargoslength = 100;
		while (i<cargoslength){
			var pricemulti = 0.5+Math.random();
			this.cargoprices.push(pricemulti); //fill array with 1x multipliers by default
			i=i+1;
			}
		}
	drawbuymenu(xpos,ypos,item){//screen coords of top corner, item index
		var x = xpos;
		var y = ypos;
		context.font='16px Arial';
		context.fillStyle = "white";
		context.fillText("Welcome to "+this.name,x,y);
		context.font='32px Arial';
		context.fillStyle = systems[ps].outposts[this.home].c;
		context.fillText("Buy",x,y-24);
		context.fillStyle = "white";
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
		fillwrappedtext(this.inv[item].describestring(),86,16,x,y+236);
		context.beginPath(); //This colored rectangle will show which item is selected.
		context.strokeStyle = systems[ps].outposts[this.home].c;//systems[ps].outposts[systems[ps].players[0].dockstate].c;//Global scope here, very bad, also in drawpolarpoly
		context.rect(x-12,y+20+item*16,400,16);
		context.stroke();
		var i=0;
		while (i<this.inv.length){
			context.fillStyle = "grey";
			if (this.inv[i].available(systems[ps].players[0])){//Used global variable instead of reference
				context.fillStyle = "white";
				}
			context.fillText(this.inv[i].namestring().slice(0,16),x,y+32+16*i);
			context.fillText(this.inv[i].describestring().slice(0,16),x+80,y+32+16*i);
			context.fillText(this.inv[i].itemprice(),x+200,y+32+16*i);
			context.fillText(this.inv[i].utype.slice(0,16),x+300,y+32+16*i);
			i=i+1;
			}
		context.beginPath();
		context.strokeStyle = systems[ps].outposts[this.home].c2//systems[ps].outposts[systems[ps].players[0].dockstate].c2;//Global scope here, very bad, also in drawpolarpoly
		context.rect(xpos-16,ypos-56,512,336);
		context.rect(xpos-16,ypos+12,512,208);
		context.stroke();
		drawpolarpoly(x+464,y-20,systems[ps].outposts[this.home].emblem[0],systems[ps].outposts[this.home].emblem[1],32,systems[ps].outposts[this.home].c,-1*Math.PI/2); //this.emblem is a randomized logo
		}	
	
	drawsellmenu(xpos,ypos,item){//screen coords of top corner, item index
		var x = xpos;
		var y = ypos;
		context.font='16px Arial';
		context.fillStyle = "white";
		context.fillText("Welcome to "+this.name,x,y);
		context.font='32px Arial';
		context.fillStyle = systems[ps].outposts[this.home].c;
		context.fillText("Sell",x,y-24);
		context.fillStyle = "white";
		context.font='12px Arial';
		if (allcargos.length>0){fillwrappedtext(allcargos[item].description,86,16,x,y+236);}
		context.beginPath(); //This colored rectangle will show which item is selected.
		context.strokeStyle = systems[ps].outposts[systems[ps].players[0].dockstate].c;//Global scope here, very bad, also in drawpolarpoly
		context.rect(x-12,y+20+item*16,400,16);
		context.stroke();
		var i=0;
		while (i<allcargos.length-1){//Don't want to render the last cargo item as an option, because it's reserved for mission cargo
			if (systems[ps].players[0].inventory.cargo[i]>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}//Used global variable instead of reference
			context.fillText(allcargos[i].name.slice(0,16),x,y+32+16*i);
			context.fillText(allcargos[i].description.slice(0,16),x+80,y+32+16*i);
			//context.fillText(Math.floor(allcargos[i].baseprice*allshops[systems[ps].players[0].dockstate].cargoprices[i]),x+200,y+32+16*i); //duplicate to itemprice() function, but this is indexed by allcargos instead of shopitem.
			context.fillText(Math.floor(allcargos[i].baseprice*this.cargoprices[i]),x+200,y+32+16*i); //duplicate to itemprice() function, but this is indexed by allcargos instead of shopitem.
			i=i+1;
			}
		context.beginPath();
		context.strokeStyle = systems[ps].outposts[systems[ps].players[0].dockstate].c2;//Global scope here, very bad, also in drawpolarpoly
		context.rect(xpos-16,ypos-56,512,336);
		context.rect(xpos-16,ypos+12,512,208);
		context.stroke();
		drawpolarpoly(x+464,y-20,systems[ps].outposts[systems[ps].players[0].dockstate].emblem[0],systems[ps].outposts[systems[ps].players[0].dockstate].emblem[1],32,systems[ps].outposts[systems[ps].players[0].dockstate].c,-1*Math.PI/2); //this.emblem is a randomized logo
		}		
	drawworkmenu(xpos, ypos, item){
		var x = xpos;
		var y = ypos;
		context.font='16px Arial';
		context.fillStyle = "white";
		context.fillText("Welcome to "+this.name,x,y);
		context.font='32px Arial';
		context.fillStyle = systems[ps].outposts[this.home].c;
		context.fillText("Work",x,y-24);
		context.font='12px Arial';
		context.fillStyle = "white";	
		if (this.missions.length>0){fillwrappedtext(this.missions[item].message,86,16,x,y+236);}
		context.beginPath(); //This colored rectangle will show which item is selected.
		context.strokeStyle = systems[ps].outposts[systems[ps].players[0].dockstate].c;//Global scope here, very bad, also in drawpolarpoly
		context.rect(x-12,y+20+item*16,400,16);
		context.stroke();
		var i=0;
		while (i<this.missions.length){
			if (this.missions[i].taken){context.fillStyle = "red";}else{context.fillStyle = "white";}
			context.fillText(this.missions[i].type.slice(0,16),x,y+32+16*i);
			context.fillText(this.missions[i].message.slice(0,16),x+80,y+32+16*i);
			context.fillText(this.missions[i].reward,x+160,y+32+16*i);
			var missionlocation = "unknown";
			if (this.missions[i].type == "cargo"){
				missionlocation = systems[ps].planets[this.missions[i].target].name;
				}
			if (this.missions[i].type == "destroy"){
				missionlocation = systems[ps].planets[systems[ps].ships[this.missions[i].target].parentid].name;
				}
			context.fillText(missionlocation,x+240,y+32+16*i);
			i=i+1;
			}
		context.beginPath();
		context.strokeStyle = systems[ps].outposts[systems[ps].players[0].dockstate].c2;//Global scope here, very bad, also in drawpolarpoly
		context.rect(xpos-16,ypos-56,512,336);
		context.rect(xpos-16,ypos+12,512,208);
		context.stroke();
		drawpolarpoly(x+464,y-20,systems[ps].outposts[systems[ps].players[0].dockstate].emblem[0],systems[ps].outposts[systems[ps].players[0].dockstate].emblem[1],32,systems[ps].outposts[systems[ps].players[0].dockstate].c,-1*Math.PI/2); //this.emblem is a randomized logo
		}
	addcargomission(theships,theplanets,theoutposts){
		var missiontarget = 1+Math.floor(Math.random()*(theplanets.length-1));
		var missiondistance = theoutposts[this.home].distance(theplanets[missiontarget]);
		var missionpay = Math.floor(500 + missiondistance/40);
		var missionmessage = "Go to "+theplanets[missiontarget].name + "."
		//this.missions.push(new Mission("cargo",this.home,missiontarget,missionmessage,missionpay,0));//missiontype, morigin, mtarget,mmessage,mreward,mstory
		}
	addkillmission(theships,theplanets,theoutposts){
		var missiontarget = 1+Math.floor(Math.random()*(theships.length-2));
		var missiondistance = theoutposts[this.home].distance(theships[missiontarget]);
		var missionpay = Math.floor(500 + missiondistance/40);
		var missionmessage = "Destroy "+theships[missiontarget].name + ".  It can be found near "+theplanets[theships[missiontarget].parentid].name;
		//this.missions.push(new Mission("destroy",this.home,missiontarget,missionmessage,missionpay,0));//missiontype, morigin, mtarget,mmessage,mreward,mstory
		}
	}