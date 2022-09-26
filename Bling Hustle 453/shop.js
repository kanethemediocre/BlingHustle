//Each item needs a type (blaster, ship upgrade, cargo)
//If upgrade or blaster, also needs a tier
//If upgrade or blaster also needs a sub-type (blast radius, damage, etc.)
//Price for blasters set by blaster object and tier
//Price for cargo set by cargo, and also shop.
class Shopitem{
	constructor(itype, iindex, utype, utier){
		this.type = itype; //"cargo","blaster","upgrade","booster"
		this.i = iindex; //Index of blaster, or of cargo, or of item, from separate lists
		this.utype = utype; //For blasters: "damage","blast","speed","timer","bounce","remote", "buy"//For upgrades: "armor","shield","shieldregen","thrust","thrustadjust","radar"
		this.utier = utier;//Tier of upgrade.  Used by boosters only a the moment.
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
			thisname = "Booster"+this.utier; //Boosters can be described entirely by their tier.
		}else if (this.type == "chassis"){
			thisname = "Chassis Reroll"; //Boosters can be described entirely by their tier.
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
		}else if (this.type == "chassis"){
			thisdescribe = "Randomly changes the shape and color of your ship.";//boosters described purely by thrust.
		}
		return thisdescribe;
	}
	itemprice(theplayer){
		var thisprice = "Undefined Item"; //error handling by default
		if (this.type == "blaster"){
			thisprice = theplayer.blasters[this.i].nextupcost();
		}else if (this.type == "cargo"){
			thisprice = Math.floor(allcargos[this.i].baseprice*1);//allshops[theplayer.dockstate].cargoprices[this.i]);//fix use of allshops here, so prices are proper random in random systems
		}else if (this.type == "upgrade"){
			thisprice = theplayer.upgrades[this.i].price*2**(theplayer.upgrades[this.i].tier);
		}else if (this.type == "booster"){
			thisprice = 400*(2**this.utier); //Replace with real price as it is determined
		}else if (this.type == "chassis"){
			thisprice = 1000; //Replace with real price as it is determined
		}
		return thisprice;		
	}
	buy(theplayer){ //this function is for the player purchasing a shopitem object.  
		if (this.available(theplayer)){
			if (this.type == "blaster"){
				//stuff to buy the blaster/blaster upgrade
				if (this.utype == "buy"){
					theplayer.blasters[this.i].phas = true;
					}
				if (this.utype == "damage"){
					theplayer.blasters[this.i].plusdamage();
					}
				if (this.utype == "remote"){
					theplayer.blasters[this.i].plusremote();
					}
				if (this.utype == "speed"){
					theplayer.blasters[this.i].plusspeed();
					}
				if (this.utype == "bounce"){
					theplayer.blasters[this.i].plusbounce();
					}
				if (this.utype == "n"){
					theplayer.blasters[this.i].plusn();
					}
				if (this.utype == "timer"){
					theplayer.blasters[this.i].plustimer();
					}
				if (this.utype == "boom"){
					theplayer.blasters[this.i].plusboom();
					}
			}else if (this.type == "upgrade"){ 
				theplayer.upgrades[this.i].apply(theplayer);//code in apply function is ignored for some reason
				//console.log("buy function worked, this.type == 'upgrade'");
			}else if (this.type == "booster"){
				theplayer.boosters[this.utier] = theplayer.boosters[this.utier]+2;
			}else if (this.type == "cargo"){
				theplayer.inventory.takecargo(this.i, 1);
			}else if (this.type == "chassis"){//Always randomizes.  Planned option to ttake station logo.
				var gangcolor = randcolor();
				var gangcolor2 = randcolor();
				var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
				var randomplayerverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
				normalizepoly(randomplayerverts);
				theplayer.ship.polytheta = randomplayerverts[0];
				theplayer.ship.polyradius = randomplayerverts[1];
				theplayer.ship.c=gangcolor;
				theplayer.ship.c2=gangcolor2;
				}
			}
		}
	available(theplayer){
		var buyable = false;
		if (this.type == "blaster"){
			if (this.utype == "buy"){
				if (theplayer.blasters[this.i].phas==false){ //verify player doesnt already have blaster
					buyable = true;
					}
				}
			if ((this.utype == "damage")&&(theplayer.blasters[this.i].phas)&&(theplayer.blasters[this.i].dtier<theplayer.blasters[this.i].maxhurt)){//can always upgrade damage (for now)
				buyable = true;
				}
			if (this.utype == "remote"){ //can only upgrade remote detonator once.
				if ( (theplayer.blasters[this.i].phas==true) && (theplayer.blasters[this.i].rtier==0) ){ //verify player already has blaster, and doesnt already have upgrade
					buyable = true;
					}
				}
			if (this.utype == "speed"){ //can always upgrade speed
				if ((theplayer.blasters[this.i].phas==true)&&(theplayer.blasters[this.i].stier<theplayer.blasters[this.i].maxspeed)){ //verify player already has blaster.
					buyable = true;
					}
				}
			if (this.utype == "bounce"){//can only upgrade bounce once.
				if ( (theplayer.blasters[this.i].phas==true) && (theplayer.blasters[this.i].etier == 0) ){ //verify player already has blaster, and doesn't have bounce upgrade
					buyable = true;
					}
				}
			if (this.utype == "timer"){//can only upgrade bounce once.
				if ( (theplayer.blasters[this.i].phas==true) && (theplayer.blasters[this.i].ttier<theplayer.blasters[this.i].maxtimer) ){ //verify player already has blaster, and doesn't have bounce upgrade
					buyable = true;
					}
				}
			if (this.utype == "boom"){//can only upgrade bounce once.
				if ( (theplayer.blasters[this.i].phas==true) && (theplayer.blasters[this.i].btier<theplayer.blasters[this.i].maxboom) ){ //verify player already has blaster, and doesn't have bounce upgrade
					buyable = true;
					}
				}
			if (this.utype == "n"){//can only upgrade bounce once.
				//console.log(allblasters[this.i].ntier+" "+allblasters[this.i].maxn)
				if ( (theplayer.blasters[this.i].phas==true) && (theplayer.blasters[this.i].ntier<theplayer.blasters[this.i].maxn) ){ //verify player already has blaster, and doesn't have bounce upgrade
					buyable = true;
					}
				}
		}else if (this.type == "cargo"){
			if (theplayer.inventory.maxcargo > theplayer.inventory.totalcargo()){
				buyable = true;
				}
			}else{buyable = true;}
		return buyable;
		}
	}
class Shop{
	constructor(name, storelocation, description, inv){ //name and description are strings, location is a station umo index
		this.name = name;
		this.description = description; 
		this.home = storelocation; //a station umo index
		this.inv = inv;//list of shopitem objects
		this.missions = []; 
		this.cargoprices = [];//list of price multipliers, index matching allcargos list
		var i=0;
		while (i<allcargos.length){
			var pricemulti = 0.5+Math.random();
			this.cargoprices.push(pricemulti); //fill array with 1x multipliers by default
			i=i+1;
			}
		}
	drawbuymenu(xpos,ypos,item,theplayer){//screen coords of top corner, item index
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
			prices.push(this.inv[i].itemprice(theplayer));
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
			var utypewithstats = this.inv[i].utype.slice(0,16);
			if (this.inv[i].type == "blaster"){
				if (this.inv[i].utype == "damage"){
					utypewithstats = this.inv[i].utype.slice(0,16)+" + "+theplayer.blasters[this.inv[i].i].uphurt;
					}
				else if (this.inv[i].utype == "timer"){
					utypewithstats = this.inv[i].utype.slice(0,16)+" + "+theplayer.blasters[this.inv[i].i].uptimer;
					}
				else if (this.inv[i].utype == "boom"){
					utypewithstats = this.inv[i].utype.slice(0,16)+" + "+theplayer.blasters[this.inv[i].i].upboom;
					}
				else if (this.inv[i].utype == "speed"){
					utypewithstats = this.inv[i].utype.slice(0,16)+" + "+theplayer.blasters[this.inv[i].i].upspeed;
					}
				else if (this.inv[i].utype == "n"){
					utypewithstats = this.inv[i].utype.slice(0,16)+" + "+theplayer.blasters[this.inv[i].i].upn;
					}
				}
			if (this.inv[i].type == "upgrade"){
				if (this.inv[i].utype == "armor"){
					utypewithstats = this.inv[i].utype.slice(0,16)+" + 250";
					}
				else if (this.inv[i].utype == "shield"){
					utypewithstats = this.inv[i].utype.slice(0,16)+" + 100";
					}
				else if (this.inv[i].utype == "shieldregen"){
					utypewithstats = this.inv[i].utype.slice(0,16)+" + 0.25";
					}
				else if (this.inv[i].utype == "cargo"){
					utypewithstats = this.inv[i].utype.slice(0,16)+" + 10";
					}
				else if (this.inv[i].utype == "thrust"){
					utypewithstats = this.inv[i].utype.slice(0,16)+" + 0.5";
					}
				else if (this.inv[i].utype == "radar"){
					utypewithstats = this.inv[i].utype.slice(0,16)+" + 1000";
					}
				}
			context.fillText(this.inv[i].namestring().slice(0,16),x,y+32+16*i);
			context.fillText(this.inv[i].describestring().slice(0,16),x+80,y+32+16*i);
			context.fillText(this.inv[i].itemprice(theplayer),x+200,y+32+16*i);
			context.fillText(utypewithstats,x+300,y+32+16*i);
			i=i+1;
			}
		context.beginPath();
		context.strokeStyle = systems[ps].outposts[this.home].c2//systems[ps].outposts[systems[ps].players[0].dockstate].c2;//Global scope here, very bad, also in drawpolarpoly
		context.rect(xpos-16,ypos-56,512,336);
		context.rect(xpos-16,ypos+12,512,208);
		context.stroke();
		drawpolarpoly(x+464,y-20,systems[ps].outposts[this.home].emblem[0],systems[ps].outposts[this.home].emblem[1],32,systems[ps].outposts[this.home].c,-1*Math.PI/2); //this.emblem is a randomized logo
		if (this.inv[item].type=="blaster"){
			//console.log("toldblasterdrawstats");
			theplayer.blasters[this.inv[item].i].drawstats2(canvas.width/2,160,"lime","cyan");
			}
		}	
	
	drawsellmenu(xpos,ypos,item,theplayer){//screen coords of top corner, item index
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
		context.strokeStyle = systems[ps].outposts[theplayer.dockstate].c;//Global scope here, very bad, also in drawpolarpoly
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
		context.strokeStyle = systems[ps].outposts[theplayer.dockstate].c2;//Global scope here, very bad, also in drawpolarpoly
		context.rect(xpos-16,ypos-56,512,336);
		context.rect(xpos-16,ypos+12,512,208);
		context.stroke();
		drawpolarpoly(x+464,y-20,systems[ps].outposts[theplayer.dockstate].emblem[0],systems[ps].outposts[theplayer.dockstate].emblem[1],32,systems[ps].outposts[theplayer.dockstate].c,-1*Math.PI/2); //this.emblem is a randomized logo
		}		
	drawworkmenu(xpos, ypos, item,theplayer){
		var x = xpos;
		var y = ypos+16;
		context.font='16px Arial';
		context.fillStyle = "white";
		context.fillText("Welcome to "+this.name,x,ypos);
		context.font='32px Arial';
		context.fillStyle = systems[ps].outposts[this.home].c;
		context.fillText("Work",x,ypos-24);
		context.font='12px Arial';
		context.fillStyle = "white";	
		if (this.missions.length>0){fillwrappedtext(this.missions[item].message,86,16,x,ypos+236);}
		context.beginPath(); //This colored rectangle will show which item is selected.
		context.strokeStyle = systems[ps].outposts[theplayer.dockstate].c;//Global scope here, very bad, also in drawpolarpoly
		context.rect(x-12,y+28+item*16,400,16);
		context.stroke();
		context.fillText("Type:",x+0,y+32+16*-1);
		context.fillText("Location:",x+80,y+32+16*-1);
		context.fillText("Distance:",x+160,y+32+16*-1);
		context.fillText("Danger:",x+240,y+32+16*-1);
		context.fillText("Reward:",x+320,y+32+16*-1);
		var i=0;
		while (i<this.missions.length){
			if (this.missions[i].taken){context.fillStyle = "red";}else{context.fillStyle = "white";}
			context.fillText(this.missions[i].type.slice(0,16),x,y+40+16*i);
			context.fillText(this.missions[i].distance,x+160,y+40+16*i);
			context.fillText(this.missions[i].danger,x+240,y+40+16*i);
			//context.fillText(this.missions[i].message.slice(0,16),x+80,y+32+16*i);
			context.fillText(this.missions[i].reward,x+320,y+40+16*i);
			var missionlocation = "unknown";
			if (this.missions[i].type == "cargo"){
				missionlocation = systems[ps].planets[this.missions[i].target].name;
				}
			if (this.missions[i].type == "destroy"){
				missionlocation = systems[ps].planets[systems[ps].ships[this.missions[i].target].parentid].name;
				}
			context.fillText(missionlocation,x+80,y+40+16*i);
			context.fillText(missionlocation,x+80,y+40+16*i);
			i=i+1;
			}
		context.beginPath();
		context.strokeStyle = systems[ps].outposts[theplayer.dockstate].c2;//Global scope here, very bad, also in drawpolarpoly
		context.rect(xpos-16,ypos-56,512,336);
		context.rect(xpos-16,ypos+12,512,208);
		context.stroke();
		drawpolarpoly(x+464,y-20,systems[ps].outposts[theplayer.dockstate].emblem[0],systems[ps].outposts[theplayer.dockstate].emblem[1],32,systems[ps].outposts[theplayer.dockstate].c,-1*Math.PI/2); //this.emblem is a randomized logo
		}
	addcargomission(theships,theplanets,theoutposts){
		var missiontarget = 1+Math.floor(Math.random()*(theplanets.length-1));
		var missiondistance = theoutposts[this.home].distance(theplanets[missiontarget]);
		var missionpay = Math.floor(500 + missiondistance/40);
		var missionmessage = "Go to "+theplanets[missiontarget].name + "."
		this.missions.push(new Mission("cargo",this.home,missiontarget,missionmessage,missionpay,0));//missiontype, morigin, mtarget,mmessage,mreward,mstory
		//this.missions[this.missions.length-1].distance = Math.floor(missiondistance/2000);
		this.missions[this.missions.length-1].calcdistance(theships,theplanets,theoutposts);
		this.missions[this.missions.length-1].calcdanger(theships,theplanets);
		}
	addkillmission(theships,theplanets,theoutposts){
		var missiontarget = 1+Math.floor(Math.random()*(theships.length-2));
		var missiondistance = theoutposts[this.home].distance(theships[missiontarget]);
		var missionpay = Math.floor(500 + missiondistance/40);
		var missionmessage = "Destroy "+theships[missiontarget].name + ".  It can be found near "+theplanets[theships[missiontarget].parentid].name;
		this.missions.push(new Mission("destroy",this.home,missiontarget,missionmessage,missionpay,0));//missiontype, morigin, mtarget,mmessage,mreward,mstory
		this.missions[this.missions.length-1].calcdistance(theships,theplanets,theoutposts);
		this.missions[this.missions.length-1].calcdanger(theships,theplanets);
		}
	}
