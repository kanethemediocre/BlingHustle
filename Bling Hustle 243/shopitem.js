//Each item needs a type (blaster, ship upgrade, cargo)
//If upgrade or blaster, also needs a tier
//If upgrade or blaster also needs a sub-type (blast radius, damage, etc.)
//Price for blasters set by blaster object and tier
//Price for cargo set by cargo, and also shop.
module.exports = class Shopitem{
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
		}
		return thisdescribe;
	}
	itemprice(){
		var thisprice = "Undefined Item"; //error handling by default
		if (this.type == "blaster"){
			thisprice = allblasters[this.i].nextupcost();
		}else if (this.type == "cargo"){
			thisprice = Math.floor(allcargos[this.i].baseprice*allshops[systems[ps].players[0].dockstate].cargoprices[this.i]);//fix use of allshops here, so prices are proper random in random systems
		}else if (this.type == "upgrade"){
			thisprice = allupgrades[this.i].price*2**(allupgrades[this.i].tier);
		}else if (this.type == "booster"){
			thisprice = 400*(2**this.utier); //Replace with real price as it is determined
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
				allupgrades[this.i].apply(theplayer);//code in apply function is ignored for some reason
				//console.log("buy function worked, this.type == 'upgrade'");
			}else if (this.type == "booster"){
				theplayer.boosters[this.utier] = theplayer.boosters[this.utier]+2;
			}else if (this.type == "cargo"){
				theplayer.inventory.takecargo(this.i, 1);
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