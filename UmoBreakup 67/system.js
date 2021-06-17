	
/////////////////////////////Begin system class///////////////////////////////////////////////////////////////////////////////////////////////////////////////
class System{
	constructor(index, name, x, y){
		this.index = index; //integer identifying system 
		this.name = name; //name of system for display
		this.planets = []; //list of planets (to be generated)
		this.ships = []; //list of ships (to be generated)
		this.npc = []; //More ship umos, but not enemy ais.  Not yet used.
		this.botbombs = []; //list of bombs used in system
		this.outposts = []; //list of outposts in system.  1st (index 0) item is empty, correlates with dockstate == 0 which is undocked
		this.shops = []; //list of shops in the system.  1st (index 0) item is empty, correlates with dockstate == 0 which is undocked
		this.difficulty = 1; //Scales ship generation attributes
		this.x = x;
		this.y = y;
	}
	draw(viewx,viewy){ //no filter draws everything
		var i= this.ships.length;
		while  (i>0){
			i=i-1;
			this.ships[i].drawship(viewx,viewy);
			}
		var i= this.planets.length;
		while  (i>0){
			i=i-1;
			this.planets[i].drawplanet(viewx,viewy);
			}
		var i= this.botbombs.length;
		while  (i>0){
			i=i-1;
			this.botbombs[i].drawbomb(viewx,viewy);
			}
		}
	draw2(viewx,viewy){ //linear filtered instead of by distance, maybe computationally cheaper?
		var i= this.ships.length;
		while  (i>0){
			i=i-1;
			var xtol = canvas.width/2+this.ships[i].s;
			var xdif = this.ships[i].x-viewx;
			if (xdif < xtol){
				if (xdif > -1*xtol){
					var ytol = canvas.height/2+this.ships[i].s;
					var ydif = this.ships[i].y-viewy;
					if (ydif < ytol){
						if (ydif > -1*ytol){
							this.ships[i].drawship(viewx,viewy);	
							}
						}		
					}
				}		
			}
		var i= this.planets.length;
		while  (i>0){
			i=i-1;
			var xtol = canvas.width/2+this.planets[i].s;
			var xdif = this.planets[i].x-viewx;
			if (xdif < xtol){
				if (xdif > -1*xtol){
					var ytol = canvas.height/2+this.planets[i].s;
					var ydif = this.planets[i].y-viewy;
					if (ydif < ytol){
						if (ydif > -1*ytol){
							this.planets[i].drawplanet(viewx,viewy);	
							}
						}		
					}
				}		
			}	
		var i= this.botbombs.length;
		while  (i>0){
			i=i-1;
			var xtol = canvas.width/2+this.botbombs[i].s;
			var xdif = this.botbombs[i].x-viewx;
			if (xdif < xtol){
				if (xdif > -1*xtol){
					var ytol = canvas.height/2+this.botbombs[i].s;
					var ydif = this.botbombs[i].y-viewy;
					if (ydif < ytol){
						if (ydif > -1*ytol){
							this.botbombs[i].drawbomb(viewx,viewy);	
							}
						}		
					}
				}		
			}
		var i= this.outposts.length;
		while  (i>0){
			i=i-1;
			var xtol = canvas.width/2+this.outposts[i].s;
			var xdif = this.outposts[i].x-viewx;
			if (xdif < xtol){
				if (xdif > -1*xtol){
					var ytol = canvas.height/2+this.outposts[i].s;
					var ydif = this.outposts[i].y-viewy;
					if (ydif < ytol){
						if (ydif > -1*ytol){
							this.outposts[i].drawstation(viewx,viewy);	
							}
						}		
					}
				}		
			}				
		}
	updateall(){
		var i = this.ships.length; //update section////////////////////////////////////////////////////////////
		while (i>0){ //update ships
			i=i-1;
			this.ships[i].updateship(this.planets);
			}
		var i = this.planets.length; //update planets
		while (i>0){
			i=i-1;
			this.planets[i].update1();
			}
		var i = this.botbombs.length; //update bot bombs
		while (i>0){
			i=i-1;
			this.botbombs[i].update1();
			this.botbombs[i].updatebomb();
			}

		var i = this.outposts.length; //update outposts, ignoring index 0
		while (i>0){
			i=i-1;
			this.outposts[i].update1();
			this.outposts[i].d = this.outposts[i].directionof(planets[0]);
			}	
		}
	gravitateall(){
		var i = this.planets.length;
		while (i>0){ //Planet on ships and bombs
			i=i-1;
			var j = this.ships.length;
			while (j>0){ //gravitate on each ship
				j=j-1;
				this.planets[i].gravitate(this.ships[j]);
				}
			j = this.botbombs.length;
			while (j>0){ //gravitate on each bot bomb
				j=j-1;
				this.planets[i].gravitate(this.botbombs[j]);
				}				
			}
		var i = this.outposts.length;
		while (i>0){
			i=i-1;
			this.planets[0].gravitate(this.outposts[i]);	
			}
		var i = this.planets.length;
		while (i>1){//Planet on planet gravity
			i=i-1;
			this.planets[0].gravitate(this.planets[i]);//sun gravitates all
			if (this.planets[i].parentid>0){ this.planets[this.planets[i].parentid].gravitate(this.planets[i]); } //others only affected by parent
			}
		}
	gravitateothers(umolist){//For gravitating Umos external to the system (playerbombs at the start)
		var i = this.planets.length;
		while (i>0){
			i=i-1;
			var j = umolist.length;
			while (j>0){
				j=j-1;
				this.planets[i].gravitate(umolist[j]);
				}
			}	
		}
	dockcheck(dockstate){ //currently gets player stuck docked, not sure why
		var i=0;
		while (i<outposts.length){
			if (ships[0].distance(outposts[i])<160){
				outposts[i].dock(ships[0]);
				dockstate = i;//Maybe add this to system update function, but that implicitly passes dockstate which might not work in other languages.
				}		
			i=i+1;
			}
		}
	collideself(){ //Internal system collisions, ships to planets, ships to bot bombs, planets to bot bombs
		var i = this.planets.length;
		var j = this.ships.length;
		var k = this.botbombs.length;
		while (i>0){ //For all planets (and bombs and ships)
			i=i-1;
			j = this.ships.length;
			while (j>0){ //For all ships to each planet
				j=j-1;
				this.planets[i].circlecollide(this.ships[j]);
				}
			k = this.botbombs.length;
			while (k>0){ //For all bombs to each planet
				k=k-1; 
				this.planets[i].circlecollide(this.botbombs[k]);
				}
			}
			k = this.botbombs.length;
			while (k>0){
				k=k-1;
				if (this.ships[j].hp>=0){//do not execute on dead ships.  Maybe check player distance too.
					this.botbombs[k].bombcollide(this.ships[j]);
					}
				}	
			var i = 0;//For each ship,
			var j = 0; //to each other ship
			while (i<this.ships.length-1){
				j = i+1; //avoids duplicate executions 
				while ((j<this.ships.length)&&(notskip)){
					this.ships[i].circlecollide2(this.ships[j]);
					j = j+1;
					}
				i = i+1;
				}
			
			
			}	
	collideothers(externalplanets, externalships, externalbombs){//input are umo arrays
		var  i = externalplanets.length;//unfinished... 		
	}
	randomplanets(){
		var numplanets = Math.floor(Math.random()*6+6);//random number of planets, 5-11
		var orbitradius = 0; //randomized in the loop
		var planetsize = 0; //randomized in the loop
		this.planets.push( new Umo(this.x,this.y,Math.floor(Math.random()*3000+1000), "orange") ); //make the sun 
		this.planets[0].name = this.name; // Star name is same as system name
		var i=0;
		while (i<numplanets-1){
			i=i+1; //planets[0] is already the sun, so we can skip index 0;
			orbitradius = Math.floor( (Math.random()*Math.random()*250000) + 4*this.planets[0].s); //Minimum orbit radius 4x sun radius, 1/r density factor
			planetsize = Math.floor( Math.random()*Math.random()*800 + Math.random()*100+100 ); //Minimum size 100,
			var i = 1;
			while (i<this.planets.length){
				var otherdist = this.planets[0].distance(this.planets[i]);
				var proximity = Math.abs(orbitradius - otherdist);
				if (proximity < 6*(this.planets[i].s+planetsize)){
					orbitradius = Math.floor( (Math.random()*Math.random()*250000) + 4*this.planets[0].s);//rerandomizes orbit
					var i=0; //re-checks new orbitradius....
					}
				i=i+1;
				}
			this.planets.push( new Umo(0,0,planetsize, randcolor() ) );//this is where the planet gets added to the array
			this.planets[i].c2 = randcolor();
			this.planets[i].name = randname(4);//random 4 character name
			this.planets[i].setorbit(this.planets[0], orbitradius, Math.random()*6.28, 1);
			this.planets[i].parentid = 0; //establishes star (planet[0] as parent planet
			}
		var i=1;
		var numplanets = this.planets.length;
		while (i<numplanets-1){
			this.randommoons(i); 
			i=i+1;
			}
		this.randomoutposts(3);
		
		}
		
	randommoons(index){//index is of planet
		var nummoons = Math.floor(Math.random()*this.planets[index].s/100 )//Planets < 120 in size have 0 chance of a moon, planet 240 in size has 50% chance of 1 moon, etc.
		var moonsize = 0; //randomized in loop
		var moonorbitr = 0;//randomized in loop
		var moonindex = 0; //set in loop
		var i = nummoons;
		while (i>0){
			i=i-1;
			moonsize = Math.floor(Math.random()*this.planets[index].s/3+10);//radius is 10 plus up to 1/3 of parent planet
			moonorbitr = Math.floor(this.planets[index].s*(Math.random()*3.5+1.5)+80); //orbit radius is 1.5x parent planet radius + up to 3.5x parent planet radius... plus 80.
			moonindex = this.planets.length;//no -1 because push comes on next line
			this.planets.push( new Umo(0,0,moonsize, randcolor()) );
			this.planets[moonindex].c2 = randcolor();
			this.planets[moonindex].name = randname(4);
			this.planets[moonindex].parentid = index;
			this.planets[moonindex].setorbit(this.planets[index],moonorbitr,Math.random()*6.28, 1);//orbit direction is 1, not random
			}
		}
	
	randomoutposts(num){//num is number of outposts
		var i=0;
		while (i<num){//
			this.outposts.push( new Umo(0,0,128, randcolor()));
			var lastindex = this.outposts.length-1;
			this.outposts[lastindex].parentid = 0;
			this.outposts[lastindex].name = randname(8)+"'s "+randname(7)+" "+randname(5);
			var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
			var toradii = [1,1,1,1]; //rectangle
			this.outposts[lastindex].polytheta = totheta;
			this.outposts[lastindex].polyradius = toradii;
			var pickedplanet = Math.floor(Math.random()*(this.planets.length-2))+1;//station will be in a solar following orbit to the chosen planet
			while (this.planets[pickedplanet].parentid !== 0){//No outpost generated if planet is actually a moon.
				pickedplanet = Math.floor(Math.random()*(this.planets.length-2))+1;//tries again to find a not-moon
				}
			var orbitdistance = this.planets[0].distance(this.planets[pickedplanet]);
			var orbitposition = this.planets[0].directionof(this.planets[pickedplanet]);
			this.outposts[lastindex].setorbit(this.planets[0], orbitdistance, orbitposition+0.2+Math.random()*0.3, 1);//This properly sets orbital distance, maybe properly sets orbit position.
			//Now add the shop...
			
			
			
			var randshopitems3 = [];
			randshopitems3.push(repairshopitem);
			randshopitems3.push(booster1);//Scope issues here?
			
			var j = 2;
			while (j<6){
				var randblaster = Math.floor(Math.random()*10);
				var randblasterfxseed = Math.floor(Math.random()*8);
				var randblastfx = "buy";
				if (randblasterfxseed == 1){randblastfx = "damage";}
				else if (randblasterfxseed == 2){randblastfx = "speed";}
				else if (randblasterfxseed == 3){randblastfx = "bounce";}
				else if (randblasterfxseed == 4){randblastfx = "remote";}	
				else if (randblasterfxseed == 5){randblastfx = "n";}
				else if (randblasterfxseed == 6){randblastfx = "boom";}
				else if (randblasterfxseed == 7){randblastfx = "timer";}
				randshopitems3.push(new Shopitem("blaster",randblaster,randblastfx,0));
				j=j+1;
			}
			while (j<9){
				var randupgrade = Math.floor(Math.random()*6);
				var randupgradetype = "repair";
				if (randupgrade == 1){randupgradetype = "armor";}
				else if (randupgrade == 2){randupgradetype = "shield";}
				else if (randupgrade == 3){randupgradetype = "shieldregen";}
				else if (randupgrade == 4){randupgradetype = "radar";}	
				else if (randupgrade == 5){randupgradetype = "cargo";}
				randshopitems3.push(new Shopitem("upgrade",randupgrade,randupgradetype,0));
				j=j+1;
				}
			while (j<12){
				var randcargo = Math.floor(Math.random()*allcargos.length);
				randshopitems3.push(new Shopitem("cargo",randcargo,"buy",1));
				j=j+1;
				}
			
			this.shops.push(new Shop("XXXXXXXXXX",i, "whaaaaaaaaaaaaaat", randshopitems3));
			i=i+1;
			}
		}
	
	levelup(botindex,levels){//adds "levels" to make bots tougher
		var i = levels;
		while(i>0){
			i=i-1;
			var bonus = Math.floor(Math.random()*5);//Picks a number to select which bonus the bot gets
			if (bonus==0){ //extra health
				this.ships[botindex].maxhp = this.ships[botindex].maxhp+100;
				this.ships[botindex].hp = this.ships[botindex].hp+100;
				}
			if (bonus==1){ //extra shield
				this.ships[botindex].maxshield = this.ships[botindex].maxshield+50;
				this.ships[botindex].shield = this.ships[botindex].shield+50;
				}
			if (bonus==2){ //extra shield regen
				this.ships[botindex].shieldregen = this.ships[botindex].shieldregen+0.25;
				}			
			if (bonus==3){ //extra bomb damage
				this.botbombs[botindex-1].hurt = this.botbombs[botindex-1].hurt+8;
				}						
			if (bonus==4){ //extra bomb blast
				this.botbombs[botindex-1].boombuff = this.botbombs[botindex-1].boombuff+0.25;//I think botbombs needs -1 because it does not include a bomb for ships[0] (player)
				}			
			this.ships[botindex].level = this.ships[botindex].level+1;
			}
		}
	addrandomgang(planetindex, num,level){ //Adds a gang of enemy ships, level describes difficulty (not used yet)
		var gangsize = num;
		var gangcolor = randcolor();
		var gangparent = planetindex;
		var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
		var randomplayerverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
		normalizepoly(randomplayerverts);
		var gangpolytheta = randomplayerverts[0];
		var gangpolyradius = randomplayerverts[1];
		
		var i = gangsize;
		while (i>0){
			i=i-1;
			this.ships.push(new Umo(-600,32000,32,gangcolor));
			var botindex = this.ships.length-1;
			this.ships[botindex].parentid = gangparent; 
			this.ships[botindex].respawn(this.planets[this.ships[botindex].parentid]);
			this.ships[botindex].name = randname(5);
			this.ships[botindex].hp = 150;
			this.ships[botindex].maxhp = 150;
			this.ships[botindex].polytheta = gangpolytheta;
			this.ships[botindex].polyradius = gangpolyradius;
			this.botbombs.push( new Umo(0,0,0,"red"));
			this.botbombs[this.botbombs.length-1].hp = 1;  //Set hitpoints to 1 so they explode on contact
			this.botbombs[this.botbombs.length-1].maxhp = 1; //with planets 
			this.botbombs[this.botbombs.length-1].shield=0;  
			this.levelup(botindex,level);
			}
		}
	enemypopulate(num,minlevel,maxlevel){ //Adds gangs of enemy ships, level describes difficulty, num is size of each gang.
		var i=1;
		while (i<this.planets.length-1){
			var templevel = Math.floor(minlevel + Math.random()*(maxlevel+1 - minlevel));
			this.addrandomgang(i,num,templevel);
			i=i+1;
			}
		}
	}//end of system class////////////////////////////////////////////////////////////////////////////////////////////////////////////////