/////////////////////////////Begin system class///////////////////////////////////////////////////////////////////////////////////////////////////////////////
class System{
	constructor(index, name, x, y){
		this.index = index; //integer identifying system 
		this.name = name; //name of system for display
		this.planets = []; //list of planets (to be generated)
		this.ships = []; //list of ships (to be generated)
		this.npcs = []; //More ship umos, but not enemy ais.  Not yet used.
		this.botbombs = []; //list of bombs used in system
		this.outposts = []; //list of outposts in system.  1st (index 0) item is empty, correlates with dockstate == 0 which is undocked
		this.shops = []; //list of shops in the system.  1st (index 0) item is empty, correlates with dockstate == 0 which is undocked
		this.turrets = []; //list of bare turrets in the system.
		this.explosions = [];
		this.players = [];//list of ship type umos
		this.bling = [];
		this.difficulty = 1; //Scales ship generation attributes
		this.planetarycollisions = false;
		this.gravity = true;
		this.solardamage = true;
		this.x = x;
		this.y = y;
		this.wraps = 0; //0 for off, >0 for wrapping at that radius.
		this.bombcollisions = false;
		this.waldosize = 100000000000;
		this.playerspawnx = 0;
		this.playerspawny = 0;
		this.playerspawnplanet = 5;//planet ID where player is to be spawned in orbit.  -1 for XY spawn.
		}
	isclear(target,x,y){
		var dummy = new Umo(0,0,target.s,"pink");
		dummy.match(target);
		var clear = true;
		//var problems = 0;
		var i=0;
		while(i<this.planets.length){
			if ( (dummy.collide(this.planets[i])) && (target!==this.planets[i]) ){
				clear = false; 
				//problem = this.planets[i];
				//console.log("Collided with planet "+i);
				}
			i++;
			}
		var i=0;
		while(i<this.npcs.length){
			if ( (dummy.collide(this.npcs[i].ship)) && (target!==this.npcs[i].ship) ){
				clear = false; 
		//		//problem = this.ships[i];
		//		//console.log("Collided with npc "+i);
				}
			i++;
			}
		var i=0;
		while(i<this.outposts.length){
			if ( (dummy.collide(this.outposts[i])) && (target!==this.outposts[i]) ){
				clear = false;
				//problem = this.outposts[i];
				//console.log("Collided with outpost "+i);
				}
			i++;
			}

		return clear;
		}
	placenear(target,x,y){
		//console.log("triedtoplacenear");
		target.x = x;
		target.y = y;
		var i=0;//I doesn't control the loop exit, but algorithmically indicates next point to try
		while (this.isclear(target,target.x,target.y)==false){
			var nextdir = i%4; //Cardinal directions, easy math
			var nextmag = i*50;//target.s*(1+Math.floor(i/4))
			if 		(nextdir == 0){target.x = x+nextmag;}
			else if (nextdir == 1){target.x = x-nextmag;}
			else if (nextdir == 2){target.y = y+nextmag;}
			else if (nextdir == 3){target.y = y-nextmag;}
			//console.log(i);
			i++;
			}
		//console.log("placednear");
		}
	draw(viewx,viewy){ //no filter draws everything, sort of obselete
		var i= this.planets.length;
		if (this.planets[this.planets.length-1].name=="Waldo"){
			console.log("dontdrawwaldoyo");
			i--;
			}
		while  (i>0){
			i=i-1;
			this.planets[i].drawplanet(viewx,viewy);
			}
		var i= this.players.length;
		while  (i>0){
			i=i-1;
			this.players[i].drawship(viewx,viewy);
			}
		}
	draw2(viewx,viewy){ //linear filtered instead of by distance, maybe computationally cheaper?
		var i=0;
		while  (i<this.players.length){
			var xtol = canvas.width/2+this.players[i].ship.s;
			var xdif = this.players[i].ship.x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.players[i].ship.s;
				var ydif = this.players[i].ship.y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.players[i].ship.drawship(viewx,viewy);	
					}		
				}		
			this.players[i].drawbombs(viewx,viewy)
			i++;
			}
		var i=0;
		while  (i<this.npcs.length){
			if (this.npcs[i].alive==true){
				var xtol = canvas.width/2+this.npcs[i].ship.s;
				var xdif = this.npcs[i].ship.x-viewx;
				if ((xdif < xtol)&&(xdif > -1*xtol)){
					var ytol = canvas.height/2+this.npcs[i].ship.s;
					var ydif = this.npcs[i].ship.y-viewy;
					if ((ydif < ytol)&&(ydif>-1*ytol)){
						this.npcs[i].ship.drawship(viewx,viewy);
						}
					}
				}
			this.npcs[i].drawbombs(viewx,viewy);//this ought to have some filter, or it executes for every npc bomb regardless of distance from player view
			i++;
			}
		var i=0;
		while  (i<this.turrets.length){
			var xtol = canvas.width/2+this.turrets[i].pivot.s*4+2000;//*4 is arbitrary safety factor, the pivot is normally smaller than the total turret size including base.  If it's slightly too far it won't render anyways, just waste a tiny bit of calculations.
			var xdif = this.turrets[i].pivot.x-viewx; //+2000 is fudge factor because this affects drawing of the bomb as well.
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.turrets[i].pivot.s*4+2000; //same arbitrary *4 reasoning.
				var ydif = this.turrets[i].pivot.y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.turrets[i].draw(viewx,viewy);	
					}		
				}		
			var xtol2 = canvas.width/2+this.turrets[i].bombs[0].s;//this whole section is unused because the turret draw function also handles the bombs.
			var xdif2 = this.turrets[i].bombs[0].x-viewx;
			if ((xdif2 < xtol2)&&(xdif2 > -1*xtol2)){
				var ytol2 = canvas.height/2+this.turrets[i].bombs[0].s*4; //same arbitrary *4 reasoning.
				var ydif2 = this.turrets[i].bombs[0].y-viewy;
				if ((ydif2 < ytol2)&&(ydif2>-1*ytol2)){
					//this.turrets[i].bombs[0].drawbomb(viewx,viewy);	
					}		
				}	
			i++;
			}	
		var i=0;
		while  (i<this.planets.length){
			var xtol = canvas.width/2+this.planets[i].s;
			var xdif = this.planets[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.planets[i].s;
				var ydif = this.planets[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.planets[i].drawplanet(viewx,viewy);	
					}		
				}		
			i++;
			}	
		var i=0;
		while  (i<this.outposts.length){
			var xtol = canvas.width/2+this.outposts[i].s;
			var xdif = this.outposts[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.outposts[i].s;
				var ydif = this.outposts[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.outposts[i].drawstation(viewx,viewy);	
					}		
				}		
			i++;
			}
		var i=0;
		while  (i<this.explosions.length){
			//this.explosions[i].draw(viewx,viewy);//FIlter on explosions wasnt working, turned off for now
			
			var xtol = canvas.width;
			var xdif = this.explosions[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height;
				var ydif = this.explosions[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.explosions[i].draw(viewx,viewy);
					}		
				}
			
			i++;
			}
		var i=0;
		while  (i<this.bling.length){
			var xtol = canvas.width/2+this.bling[i].s;
			var xdif = this.bling[i].x-viewx;
			if ((xdif < xtol)&&(xdif > -1*xtol)){
				var ytol = canvas.height/2+this.bling[i].s;
				var ydif = this.bling[i].y-viewy;
				if ((ydif < ytol)&&(ydif>-1*ytol)){
					this.bling[i].draw(viewx,viewy);
					}		
				}		
			i++;
			}
		}
	drawplanetfinder(playerindex,radius){
		var viewx = this.players[playerindex].ship.x;
		var viewy = this.players[playerindex].ship.y;
		var maxnavtarget = this.planets.length-1;
		if ((aplayer.sensor<1)&&(this.planets[this.planets.length-1].s<64)){maxnavtarget--;}//Player can't select waldo, the last planet, without player.sensor >=1;
		context.font = '20px Ariel';
		context.fillStyle = "yellow";
		context.fillText("Navigation Compass Active", canvas.width/2-80, 24);
		var cx = canvas.width/2;
		var cy = canvas.height/2;
		var i=0;
		while(i<=maxnavtarget){
			var inddir = this.players[playerindex].ship.directionof(this.planets[i]);//indicated direction
			var indc = this.planets[i].c;
			var inddist = this.players[playerindex].ship.distance(this.planets[i]);
			var indsize = (this.planets[i].s/inddist)*radius;//maybe a cpu saving hack vs trig?
			if (indsize>64){indsize=64;}
			var indx = cx + radius*Math.cos(inddir);
			var indy = cy + radius*Math.sin(inddir);
			var pointerx = cx + (radius+indsize*2)*Math.cos(inddir); 
			var pointery = cy + (radius+indsize*2)*Math.sin(inddir);
			var arcstartx = cx + radius*Math.cos(inddir-indsize/radius);
			var arcstarty = cy + radius*Math.sin(inddir-indsize/radius);
			var arcendx = cx + radius*Math.cos(inddir+indsize/radius);
			var arcendy = cy + radius*Math.sin(inddir+indsize/radius);
			context.beginPath(); 
			context.lineWidth = 2; 
			if (this.players[playerindex].navtarget == i){context.lineWidth = 5; }
			context.strokeStyle = indc;
			context.moveTo(arcendx,arcendy);
			context.lineTo(pointerx,pointery);
			context.lineTo(arcstartx,arcstarty);
			context.arc(cx, cy, radius, inddir-indsize/radius,inddir+indsize/radius, false);
			context.stroke();	
			i++;
			}
		var i=0;
		while(i<this.outposts.length){
			var inddir = this.players[playerindex].ship.directionof(this.outposts[i]);//indicated direction
			var indc = this.outposts[i].c;
			var indc2 = this.outposts[i].c2;
			var inddist = this.players[playerindex].ship.distance(this.outposts[i]);
			var indsize = 5;//maybe a cpu saving hack vs trig?
			var indx = cx + (radius-10)*Math.cos(inddir);
			var indy = cy + (radius-10)*Math.sin(inddir); 
			if ((this.players[playerindex].navtarget == i)&&(this.players[playerindex].navactive == 2)){indsize = 12; }
			context.fillStyle = indc;
			context.fillRect(indx-indsize,indy-indsize,indsize*2,indsize*2);
			context.fillStyle = indc2;
			context.fillRect(indx-indsize+2,indy-indsize+2,indsize*2-4,indsize*2-4);
			i++;
			}
		}
	drawshipfinder(playerindex,radius){
		context.font = '20px Ariel';
		context.fillStyle = "red";
		context.fillText("Targeting Compass Active", canvas.width/2-80, 48);
		var cx = canvas.width/2;//center
		var cy = canvas.height/2;
		var i=0;
		while(i<this.npcs.length){
			var inddist = this.players[playerindex].ship.distance(this.npcs[i].ship);//indicated distance
			if (inddist<this.players[playerindex].radarrange){
				var inddir = this.players[playerindex].ship.directionof(this.npcs[i].ship);//indicated direction
				var indc = "white";
				if (this.npcs[i].ai.playerhostile == true){indc = "red";}
				else if (this.npcs[i].ai.team == 2) {indc = "blue";}
				//var inddist = this.players[playerindex].ship.distance(this.ships[i]);
				var indsize = (this.npcs[i].ship.s/inddist)*radius;//maybe a cpu saving hack vs trig?
				if (indsize>32){indsize=32;}
				var indx = cx + radius*Math.cos(inddir);
				var indy = cy + radius*Math.sin(inddir);
				var pointerx = cx + (radius+indsize*2)*Math.cos(inddir); 
				var pointery = cy + (radius+indsize*2)*Math.sin(inddir);
				var arcstartx = cx + radius*Math.cos(inddir-indsize/radius);
				var arcstarty = cy + radius*Math.sin(inddir-indsize/radius);
				var arcendx = cx + radius*Math.cos(inddir+indsize/radius);
				var arcendy = cy + radius*Math.sin(inddir+indsize/radius);
				context.beginPath(); 
				context.lineWidth = 2; 
				if (this.players[playerindex].shiptarget == i){context.lineWidth = 5; }
				context.strokeStyle = indc;
				context.moveTo(arcendx,arcendy);
				context.lineTo(pointerx,pointery);
				context.lineTo(arcstartx,arcstarty);
				context.arc(cx, cy, radius, inddir-indsize/radius,inddir+indsize/radius, false);
				context.stroke();	
				//context.beginPath();
				//context.arc(cx, cy, radius, inddir-indsize/radius,inddir+indsize/radius, false);
				//context.stroke();
				}
			i++;
			}
		var i=0;
		while(i<this.players.length){
			var inddist = this.players[playerindex].ship.distance(this.players[i].ship);
			if ((inddist<this.players[playerindex].radarrange)&&(i!=playerindex)){
				var inddir = this.players[playerindex].ship.directionof(this.npcs[i].ship);//indicated direction
				var indc = this.players[playerindex].ship.c;
				var indc2 = this.players[playerindex].ship.c;
				//var inddist = this.players[playerindex].ship.distance(this.ships[i]);
				var indsize = (this.npcs[i].ship.s/inddist)*radius;//maybe a cpu saving hack vs trig?
				var indx = cx + (radius-8)*Math.cos(inddir);
				var indy = cy + (radius-8)*Math.sin(inddir);
				var pointerx = cx + (radius+indsize*2)*Math.cos(inddir); 
				var pointery = cy + (radius+indsize*2)*Math.sin(inddir);
				context.beginPath(); 
				context.lineWidth = 4; 
				context.strokeStyle = indc;
				context.moveTo(indx,indy);
				context.lineTo(pointerx,pointery);
				context.stroke();	
				context.beginPath();
				context.lineWidth = 2; 
				context.strokeStyle = indc2;
				context.moveTo(indx,indy);
				context.lineTo(pointerx,pointery);
				context.stroke();
				}
			i++;
			}
		}
	drawplanetlist(playerindex,x,y,ystep,scale){
		var actualplanets = [];//list of planet indices where parentid = 0 (orbits sun)
		var i=1;
		while (i<this.planets.length){
			if (this.planets[i].parentid==0){actualplanets.push(i);}
			i++;
			}
		console.log(actualplanets);
		//ok draw sun
		context.beginPath();  //So instead of not rendering, it will render at most recent thickness (often max)
		context.arc(x, y, this.planets[0].s/scale, 0, 2 * Math.PI, false); //until linewidth of 1 is reached.
		context.lineWidth = 4;
		context.strokeStyle = this.planets[0].c;
		context.stroke();
		context.fillStyle = "white";
		context.font = "16px Ariel";
		context.fillText(this.planets[0].name,x-64,y+4);
		//For each planets
		var i=0;
		while(i<actualplanets.length){
			var actualmoons = [];//Find the moons to this planet
			var j=0;
			while(j<this.planets.length){
				if (this.planets[j].parentid == actualplanets[i]){
					actualmoons.push(j);
					}
				j++;
				}
			console.log(actualmoons);
			//Draw this planet
			context.beginPath();  //So instead of not rendering, it will render at most recent thickness (often max)
			context.arc(x, y+ystep*(i+1), this.planets[actualplanets[i]].s/scale, 0, 2 * Math.PI, false); //until linewidth of 1 is reached.
			context.lineWidth = 4;
			context.strokeStyle = this.planets[actualplanets[i]].c;
			context.stroke();
			context.fillText(this.planets[actualplanets[i]].name,x-64,y+4+ystep*(i+1));
			if (this.players[playerindex].navtarget == actualplanets[i]){//indicate planet is targeted	
				context.beginPath();  //So instead of not rendering, it will render at most recent thickness (often max)
				context.rect(x-ystep*0.4, y-ystep*0.4+ystep*(i+1),ystep*0.8,ystep*0.8); //until linewidth of 1 is reached.
				context.lineWidth = 2;
				context.strokeStyle = "white";
				context.stroke();
				}
			//Draw this planets moons next to the planet
			var j = 0;
			while(j<actualmoons.length){
				context.beginPath();  //So instead of not rendering, it will render at most recent thickness (often max)
				context.arc(x+ystep*(j+1), y+ystep*(i+1), this.planets[actualmoons[j]].s/scale, 0, 2 * Math.PI, false); //until linewidth of 1 is reached.
				context.lineWidth = 4;
				context.strokeStyle = this.planets[actualmoons[j]].c;
				context.stroke();
				context.fillText(this.planets[actualmoons[j]].name,x+4+ystep*(j+0.5),y+ystep*(i+0.75));
				if (this.players[playerindex].navtarget == actualmoons[j]){//indicate planet is targeted	
					context.beginPath();  //So instead of not rendering, it will render at most recent thickness (often max)
					context.rect(x+ystep*(j+1)-ystep*0.4, y-ystep*0.4+ystep*(i+1),ystep*0.8,ystep*0.8); //until linewidth of 1 is reached.
					context.lineWidth = 2;
					context.strokeStyle = "white";
					context.stroke();
					}
				j++;
				}
			i++;
			}
		}
	generateplanetlist(){
		var actualplanets = [[0]];//list of planet indices where parentid == 0 (orbits sun)
		var i=1;
		while (i<this.planets.length){//This loop adds all the planets as arrays with one member
			if (this.planets[i].parentid==0){actualplanets.push([i]);}
			i++;
			}
		//actualplanets.sort(function(a,b){return this.planets[0].distance(this.planets[a[0]])-this.planets[0].distance(this.planets[b[0]])}); //points.sort(function(){return 0.5 - Math.random()});
		var tempplanets = this.planets;
		actualplanets.sort(function(a,b){return tempplanets[0].distance(tempplanets[a[0]])-tempplanets[0].distance(tempplanets[b[0]])}); //points.sort(function(){return 0.5 - Math.random()});
		//For each planets
		var i=0;
		while(i<actualplanets.length){
			var j=0;
			while(j<this.planets.length){//This loop  adds moons to their parent planets array.
				if (this.planets[j].parentid == actualplanets[i][0]){
					actualplanets[i].push(j);
					}
				j++;
				}
			i++;
			}
		actualplanets[0]=[0];//Overrides sun to not include planets as its moon in the chart.
		//actualplanets.sort(function(){return this.planets[0].distance(this.planets)}) //points.sort(function(){return 0.5 - Math.random()});
		console.log(actualplanets);
		return actualplanets;
		}
	updateall(time){
		if (this.wraps>0){ this.radialwrap(this.wraps); }
		var i = 0;
		//console.log("trytoupdatenpcs1");
		while (i<this.npcs.length){
			//console.log("npcs updated below");
			this.npcs[i].update1(this,time);//Unsure if use of "this" is allowed like that.
			if (this.npcs[i].respawning == true){
				var parentplanet = this.planets[this.npcs[i].ai.homeplanet];
				console.log(this.npcs[i].ai.homeplanet)
				console.log(i);
				console.log(parentplanet);
				var rdir = Math.random()*Math.PI*2; //random direction from planet
				var rdist = parentplanet.s+this.npcs[i].ship.s+12+Math.random()*2*parentplanet.s; //random ish distance
				var rcw = Math.floor(Math.random()*2)*2 - 1; //random orbit direction (-1 or 1);
				this.npcs[i].ship.setorbit(parentplanet, rdist, rdir, rcw);
				this.npcs[i].ship.hp = this.npcs[i].ship.maxhp;
				this.npcs[i].alive = true;
				this.npcs[i].respawning = false;
				//console.log(this.npcs[i].ship.x);
				}
			i++;
			}
		var i=this.turrets.length;
		while(i>0){
			i=i-1;
			if ((this.turrets[i].pivot.ai == "enemy")&&(this.turrets[i].active==true)){
				var j=0;
				var closestdistance=9999;
				var closestindex = 0;
				while(j<this.players.length){
					var pdist = this.players[j].ship.distance(this.turrets[i].pivot);
					if (pdist<closestdistance){
						closestindex = j;
						closestdistance = pdist;
					}
					j++;
				}
				this.turrets[i].ai3(this.players[closestindex].ship,[]);
				}
			}
		var i=this.turrets.length;
		while(i>0){
			i=i-1;
			if ((this.turrets[i].pivot.ai == "friendly")&&(this.turrets[i].active==true)){
				var j=this.npcs.length;
				var closest = j;
				var closestdistance = 1000000;
				while(j>0){
					j--;
					if (this.npcs[j].ai.playerhostile == true){
						var tempdistance = this.npcs[j].ship.distance(this.turrets[i].pivot);
						if (tempdistance < closestdistance){
							closest=j;
							closestdistance = tempdistance;
							}
						}	
					if (closestdistance < 3000){ //Don't do anything if closest enemy is far
						this.turrets[i].ai3(this.npcs[closest].ship,this.players); //friendly turrets point towards closest enemy, shoot if clear	
						}
					}
				}
			}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
/////////////////////end AI section ///////////////////////////////////////////////////////////////////////////////////////
		var i = this.planets.length; //update planets
		while (i>0){
			i=i-1;
			this.planets[i].update1();
			}
		var i = this.outposts.length; 
		while (i>0){
			i=i-1;
			this.outposts[i].update1();
			this.outposts[i].d = this.outposts[i].directionof(this.planets[0]);
			}
		var i = this.turrets.length; 
		while (i>0){
			i=i-1;
			this.turrets[i].update1();
			}		
		var i = this.players.length; 
		while (i>0){
			i=i-1;
			this.players[i].update1(this.planets);
			
			if (this.players[i].respawning == true){
				if (this.playerspawnplanet>=0){
					var parentplanet = this.planets[this.playerspawnplanet];
					var rdir = Math.random()*Math.PI*2; //random direction from planet
					var rdist = parentplanet.s+this.players[i].ship.s+12+Math.random()*2*parentplanet.s; //random ish distance
					var rcw = Math.floor(Math.random()*2)*2 - 1; //random orbit direction (-1 or 1);
					this.players[i].ship.setorbit(parentplanet, rdist, rdir, rcw);
					this.players[i].respawning = false;
					console.log(this.players[i].ship.hp);
					}
				else{

					this.players[i].ship.x = this.playerspawnx;
					this.players[i].ship.y = this.playerspawny;
					this.players[i].ship.vx = 0;
					this.players[i].ship.vy = 0;
					this.players[i].respawning = false;
					}
				}
			}					
//update explosions///////////////////////////////////////////////////
		var i=0;
		while(i<this.explosions.length){
			this.explosions[i].update1();
			i++;
		}
		//also check for expired explosions and remove them from this.explosions
		//var index = -1;
		var i=0;
		while (i<this.explosions.length){
			if (this.explosions.timer<=0){
				this.explosions.splice(i, 1);
				i=this.explosions.length;//Exits loop.  Maybe don't do this?  
				}
			i++;
			}
////////Bling update///////
		var i=0;
		while (i<this.bling.length){
			this.bling[i].update1();
			if (this.bling[i].t>20000){
				this.bling[i].t=Math.floor(Math.random()*200);//Maybe redundant noise
				this.bling[i].reset(this.planets);  //Maybe I should just remove the bling and let it get randomly repopulated by existing mechanism
				//this.bling[i].setorbit(this.planets[this.bling[i].parentid],) //setorbit(parentplanet, distance, direction, cw){ //cw = -1 or 1
			}
			i++;
		}
	}//end updateall()////////////////////////////////////////////////////////////////////////
	gravitateall(){
		if (this.gravity){	
			var i = this.planets.length;
			while (i>0){ //Planet on ships and bombs
				i=i-1;			
				j = this.bling.length;
				while (j>0){ //gravitate on each bling
					j=j-1;
					this.planets[i].gravitate(this.bling[j]);
					}
				j = this.players.length;
				while (j>0){ //gravitate on each player
					j=j-1;
					this.planets[i].gravitate(this.players[j].ship);
					var k = this.players[j].blasters.length;
					while (k>0){ //For all blasters to each planet
						k=k-1;
						this.players[j].blasters[k].fall(this.planets[i]);
						}
					}
				j = this.npcs.length;
				while (j>0){ //gravitate on each npc and npc blaster bombs
					j=j-1;
					this.planets[i].gravitate(this.npcs[j].ship);
					var k = this.npcs[j].blasters.length;
					while (k>0){ //For all blasters to each planet
						k=k-1;
						this.npcs[j].blasters[k].fall(this.planets[i]);
						}
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
		}
	respawnall(){
		var i=0;
		while(i<this.players.length){
			//var theplayership = this.players[i].ship;
			if ((this.players[i].ship.deadtime<=0)&&(this.players[i].ship.hp==-1000)){
				//respawn the player ship here
				console.log("resplayer "+i);
				}
			i++;	
			}
		var i=0;
		while(i<this.npcs.length){
			if ((this.npcs[i].ship.deadtime<=0)&&(this.npcs[i].ship.hp==-1000)){
				//respawn the npc ship here
				console.log("resnpc "+i);
				}
			i++;	
			}
		}
	blingregensolar(){
		if ((this.bling.length<256)&&(time%16==0)){
			this.bling.push(new Bling(0,0,0,0,Math.floor(Math.random()*128)));
			this.bling[this.bling.length-1].reset(this.planets);
			//if (ps==0){ systems[0].bling = []; }
			}
		var i=0;
		while(i<this.bling.length){
			if(this.bling[i].t>20000){this.bling[i].reset(this.planets);}
			i++;
			}
		}
	blingregenpocket(){
		if ((this.bling.length<256)&&(time%16==0)){
			var bspeed = 1;//This stuff should be abstracted into a bling function
			var bdir = Math.random()*2*Math.PI;
			var bdist = this.planets[0].s+16;
			var bx = this.planets[0].x+bdist*Math.cos(bdir);//planets[0] should be at 0,0 anyways
			var by = this.planets[0].y+bdist*Math.sin(bdir);
			var bvx = bspeed*(Math.random()-0.5);
			var bvy = bspeed*(Math.random()-0.5);
			this.bling.push(new Bling(bx,by,bvx,bvy,Math.floor(Math.random()*128)));
			}	
		var i=0;
		while(i<this.bling.length){
			if ((this.bling[i].t>20000)&&(Math.random()<0.01)){
				var bspeed = 1;
				var bdir = Math.random()*2*Math.PI;
				var bdist = this.planets[0].s+16;
				var bx = this.planets[0].x+bdist*Math.cos(bdir);//planets[0] should be at 0,0 anyways
				var by = this.planets[0].y+bdist*Math.sin(bdir);
				var bvx = bspeed*(Math.random()-0.5);
				var bvy = bspeed*(Math.random()-0.5);
				this.bling[i].x = bx;
				this.bling[i].y = by;
				this.bling[i].vx = bvx;
				this.bling[i].vy = bvy ;
				}
			i++;
			}
		}
	gravitateothers(umolist){//For gravitating Umos external to the system (playerbombs at the start) not used afaik
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
	dockcheck(dockstate){ //This is obseletes all kinds of ways, assuming its even called anymore.
		var i=0;
		while (i<outposts.length){
			if (ships[0].distance(outposts[i])<160){
				outposts[i].dock(ships[0]);
				dockstate = i;//Maybe add this to system update function, but that implicitly passes dockstate which might not work in other languages.
				}		
			i=i+1;
			}
		}
	collideself(){ //Internal system collisions, ships to planets, ships to bot bombs, planets to bot bombs, turret bombs to ships and planets....
		if (this.planetarycollisions){//Planets are normally set up to not collide with each other, but in special cases it can be enabled.
			var i=0;
			var j=1;
			while (j<this.planets.length){//Handles sun only, sun not moved by collisions.
				this.planets[i].circlecollide(this.planets[j]);
				j++;
				}
			var i=1;
			while (i<this.planets.length){
				var j=i+1;
				while (j<this.planets.length){
					this.planets[i].circlecollide4(this.planets[j]);
					j++;
					}
				i++;
				}
			}
		if (this.bombcollisions){
			var i=0;
			while (i<this.players.length){//Handles sun only, sun not moved by collisions.
				var j=0;
				while(j<this.players[i].blasters.length){
					var k=0;
					while(k<this.players[i].blasters[j].bombs.length){
						//basically disabled for now.

						k++;
						}
					j++;
					}
				i++;
				}
			}	
		var i = this.planets.length;
		while (i>0){
			//For all planets+other collisions/////////////////////////////////
			i=i-1;
			var j = this.turrets.length;
			while(j>0){
				j = j-1;
				var k=0;
				while(k<this.turrets[j].bombs.length){
					this.planets[i].circlecollide(this.turrets[j].bombs[k]); 
					k++;
					}
				}
			var j = this.bling.length;
			while (j>0){
				j=j-1;
				this.planets[i].circlecollidesafe(this.bling[j]);
			}
			var j = this.players.length;
			while(j>0){
				j=j-1;
				if (this.players[j].alive==true){
					//console.log("itried3");
					if (this.planets[i].collide(this.players[j].ship)){
						var collidedamagebonus = 9;//9x bonus damage plus the normal damage done in circlecollide
						if (this.players[j].shieldbonus != "impact"){
							this.players[j].ship.damage(collidedamagebonus*this.planets[i].hurt);//Still no dependence on delta V.  But it's something.
							}
						}
					this.planets[i].circlecollide(this.players[j].ship);
					//this.players[j].ship.damagewithsound(1);
					var k=this.players[j].blasters.length;
					while(k>0){
						k=k-1;
						//console.log("itried2");
						var h = this.players[j].blasters[k].bombs.length;//usually h=1
						while(h>0){
							h=h-1;
							//console.log("itried1");
							this.planets[i].circlecollide(this.players[j].blasters[k].bombs[h]);
							}
						}
					}
				}
			var j = this.npcs.length;
			while(j>0){
				j=j-1;
				if (this.npcs[j].alive==true){
					//NPC bonus collision damage nerfed to keep bots alive longer in arena systems
					if (this.planets[i].collide(this.npcs[j].ship)){
						var collidedamagebonus = 3;//9x bonus damage plus the normal damage done in circlecollide
						if (this.npcs[j].shieldbonus != "impact"){
							this.npcs[j].ship.damage(collidedamagebonus*this.planets[i].hurt);//Still no dependence on delta V.  But it's something.
							}
						}
					this.planets[i].circlecollide(this.npcs[j].ship);
					var k=this.npcs[j].blasters.length;
					while(k>0){
						k=k-1;
						//console.log("itried2");
						var h = this.npcs[j].blasters[k].bombs.length;//usually h=1
						while(h>0){
							h=h-1;
							//console.log("itried1");
							this.planets[i].circlecollide(this.npcs[j].blasters[k].bombs[h]);
							}
						}
					}
				}
			}
		var i = 0; //for each player (.ship)
		var j = 0;
		while (i<this.players.length){
			if (this.players[i].alive==true){
				j=i+1;
				while(j<this.players.length){
					if (this.players[j].alive==true){
						this.players[j].ship.circlecollide2(this.players[i].ship);	
						}
					j++;
					}
				j=0;
				while(j<this.npcs.length){
					if (this.npcs[j].alive==true){
						this.npcs[j].ship.circlecollide2(this.players[i].ship);
						}
					j++;
					}
				}
			i++;
			}
		var i = 0;//For each npc,
		var j = 0; //to each other npc
		while (i<this.npcs.length){
			if (this.npcs[i].alive==true){
				j = i+1; //avoids duplicate executions
				while (j<this.npcs.length){
					if (this.npcs[j].alive==true){
						this.npcs[i].ship.circlecollide4(this.npcs[j].ship);
						}
					j++;
					}
				}
			i++;
			}
//////////////////turret bombs hitting ships and players///////////////////////////////////////////////
		var i=0;
		while (i<this.turrets.length){
			var j=0;
			while(j<this.players.length){
				if (this.players[j].alive==true){
					var k=0;
					while(k<this.turrets[i].bombs.length){
						this.turrets[i].bombs[k].bombcollide(this.players[j].ship);
						k++;
						}
					}
				j++;
				}
			var j=0;
			while(j<this.npcs.length){
				if (this.npcs[j].alive==true){
					var k=0;
					while(k<this.turrets[i].bombs.length){
						this.turrets[i].bombs[k].bombcollide(this.npcs[j].ship);
						k++;
						}
					}
				j++;
				}


			i=i+1; 
			}
		var i=0;//////Rework/repeat this for npcs
		while(i<this.players.length){//Do NOT exclude dead players aas shooters, their bombs may be still active
			var j = 0;
			while (j<this.players[i].blasters.length){ 
				var k = 0;
				while (k<this.players[i].blasters[j].bombs.length){ 
					var m = 0;
					while (m<this.players.length){ //players bombs hit other players
						if (this.players[m].alive==true){
							this.players[i].blasters[j].bombs[k].bombcollide(this.players[m].ship);
							}
						m++;
						}
					var m = 0;
					while (m<this.npcs.length){ //players bombs hit npcs
						if (this.npcs[m].ship.hp>0){	
							this.players[i].blasters[j].bombs[k].bombcollide(this.npcs[m].ship);
							if (this.npcs[m].ship.hp<=0){ //npc .alive is being weird, causes excessive erroneous cash awards
								if (this.npcs[m].ai.playerhostile==true){
									var getcash = Math.floor(Math.random()*21+10)*this.npcs[m].ship.level;
									this.players[i].money = this.players[i].money + getcash;
									this.players[i].gotmoney = [30,getcash];
	//////////////////////////////////explosion stuff///////////////
									//var boomstages = Math.floor(4+this.npcs[m].ship.level/2);
									//this.explosions.push(new Bubblesplosion(boomstages,0.375,"red",this.npcs[m].ship));
									//this.bling.push(new Bling(this.npcs[m].ship.x,this.npcs[m].ship.y,this.npcs[m].ship.vx,this.npcs[m].ship.vy,this.npcs[m].ship.level*5));
									if(!cashsound1.paused) cashsound1.pause();
									cashsound1.currentTime = 0;
									cashsound1.play();
									console.log("wut");
								}else if (this.npcs[m].ai.playerhostile==false){
									//this.explosions.push(new Bubblesplosion(4,0.375,"red",this.npcs[m].ship));
									this.players[i].money = this.players[i].money - 1000;
									this.players[i].gotmoney = [30, -1000];
									//somebadsound.play();
									}
								}
							}
						m++;
						}
					var m=0;
					while (m<this.turrets.length){//need to add and implement .alive for turrets
						if (this.turrets[m].pivot.hp>0){	
							this.players[i].blasters[j].bombs[k].bombcollide(this.turrets[m].pivot);
							if (this.turrets[m].pivot.hp<=0){ 
								if (this.turrets[m].pivot.ai=="enemy"){//Ai handled old way for turrets
									var getcash = Math.floor(Math.random()*21+10)*this.turrets[m].pivot.level;
									this.players[i].money = this.players[i].money + getcash;
									this.players[i].gotmoney = [30,getcash];
	//////////////////////////////////explosion stuff///////////////
									var boomstages = 6;//Math.floor(4+this.turrets[m].pivot.level/2);
									this.explosions.push(new Bubblesplosion(boomstages,0.375,"red",this.turrets[m].pivot));
									this.bling.push(new Bling(this.turrets[m].pivot.x,this.turrets[m].pivot.y,this.turrets[m].pivot.vx,this.turrets[m].pivot.vy,this.turrets[m].pivot.level*5));
									if(!cashsound1.paused) cashsound1.pause();
									cashsound1.currentTime = 0;
									cashsound1.play();
								}else if (this.turrets[m].pivot.ai=="friendly"){
									this.explosions.push(new Bubblesplosion(4,0.375,"red",this.turrets[m].pivot));
									this.players[i].money = this.players[i].money - 1000;
									this.players[i].gotmoney = [30, -1000];
									//somebadsound.play();
									}
								}
							}
						m++;
						}
					k++;
					}
				j++;
				}
			i++;
			}
		var i=0;//////Reworked/repeated for npcs
		while(i<this.npcs.length){
			var j = 0;
			while (j<this.npcs[i].blasters.length){
				var k = 0;
				while (k<this.npcs[i].blasters[j].bombs.length){
					var m = 0;
					while (m<this.npcs.length){ //npcs hit other npcs
						this.npcs[i].blasters[j].bombs[k].bombcollide(this.npcs[m].ship);
						m++;
						}
					var m = 0;
					while (m<this.players.length){ //npcs hit players
						this.npcs[i].blasters[j].bombs[k].bombcollide(this.players[m].ship);
						m++;
						}
					var m=0;
					while (m<this.turrets.length){
						this.npcs[i].blasters[j].bombs[k].bombcollide(this.turrets[m].pivot);
						m++;
						}
					k++;
					}
				j++;
				}
			i++;
			}
		var i=0;
		while (i<this.bling.length){
			var j = 0;
			while (j<this.players.length){
				if (this.players[j].ship.collide(this.bling[i])){
					this.players[j].money = this.players[j].money + this.bling[i].value;
					this.players[j].gotmoney = [30,this.bling[i].value];
					this.bling.splice(i, 1);
					//cashsound1.stop();
					if(!cashsound1.paused) cashsound1.pause();
					cashsound1.currentTime = 0;
					cashsound1.play();
					//i=this.bling.length;
					}
				j++
				}	
			i++;
			}
		}	
	collideothers(externalplanets, externalships, externalbombs){//input are umo arrays
		var  i = externalplanets.length;//unfinished, unused, but a good idea. 		
		}
	radialwrap(wrapr){
		var wrapr2 = wrapr*wrapr;
		//var i=0;
		//console.log("triedtowrap");
		//while (i<this.ships.length){
		//	var tested = this.ships[i]
		//	var rad2 = tested.x*tested.x+tested.y*tested.y;
		//	if ( (rad2>wrapr2) && (rad2<wrapr2*4) ){
		//		var overshoot = (wrapr/Math.sqrt(rad2));
		//		tested.x = tested.x* overshoot;
		//		tested.y = tested.y* overshoot;
		//		//console.log("trying to place a ship");
		//		this.placenear(tested,-0.99*tested.x,-0.99*tested.y)
		//		//tested.x = -0.99*tested.x;
		//		//tested.y = -0.99*tested.y;
		//		}
		//	i++;
		//	}
		var i=0;
		while (i<this.players.length){
			var tested = this.players[i].ship;
			var rad2 = tested.x*tested.x+tested.y*tested.y;
			if ( (rad2>wrapr2) && (rad2<wrapr2*4) ){
				var overshoot = (wrapr/Math.sqrt(rad2));
				tested.x = tested.x* overshoot;
				tested.y = tested.y* overshoot;
				//console.log("trying to place a player");
				this.placenear(tested,-0.99*tested.x,-0.99*tested.y)
				//tested.x = -0.99*tested.x;
				//tested.y = -0.99*tested.y;
				}
			i++;
			}
		var i=0;
		while (i<this.planets.length-2){//Let waldo and xxxx do their thing and not be involved.
			var tested = this.planets[i];
			var rad2 = tested.x*tested.x+tested.y*tested.y;
			if ( (rad2>wrapr2) && (rad2<wrapr2*4) ){
				var overshoot = (wrapr/Math.sqrt(rad2));
				tested.x = tested.x* overshoot;
				tested.y = tested.y* overshoot;
				//console.log("trying to place a planet");
				this.placenear(tested,-0.99*tested.x,-0.99*tested.y)
				//tested.x = -0.98*tested.x;//Planets get moved further inwards to prevent ships from spawing inside planets.
				//tested.y = -0.98*tested.y;
				}
			i++;
			}
		var i=0;
		while (i<this.outposts.length){//Let waldo and xxxx do their thing and not be involved.
			var tested = this.outposts[i];
			var rad2 = tested.x*tested.x+tested.y*tested.y;
			if ( (rad2>wrapr2) && (rad2<wrapr2*4) ){
				var overshoot = (wrapr/Math.sqrt(rad2));
				tested.x = tested.x* overshoot;
				tested.y = tested.y* overshoot;
				//console.log("trying to place an outpost");
				this.placenear(tested,-0.99*tested.x,-0.99*tested.y)
				//tested.x = -0.98*tested.x;//Planets get moved further inwards to prevent ships from spawing inside planets.
				//tested.y = -0.98*tested.y;
				}
			i++;
			}
		//var i=0;
		//while (i<this.botbombs.length){//Let waldo and xxxx do their thing and not be involved.
		//	var tested = this.botbombs[i];
		//	var rad2 = tested.x*tested.x+tested.y*tested.y;
		//	if ( (rad2>wrapr2) && (rad2<wrapr2*4) ){
		//		var overshoot = (wrapr/Math.sqrt(rad2));
		//		tested.x = tested.x* overshoot;
		//		tested.y = tested.y* overshoot;
		//		//console.log("trying to place an outpost");
		//		this.placenear(tested,-0.99*tested.x,-0.99*tested.y)
		//		//tested.x = -0.98*tested.x;//Planets get moved further inwards to prevent ships from spawing inside planets.
		//		//tested.y = -0.98*tested.y;
		//		}
		//	i++;
		//	}
		//console.log("finishedwrap");
		}
	planetsmpsummary(){//For onboarding new system
		var pupdate = [];
		var i=0;
		while(i<this.planets.length){
			var p = this.planets[i]
			pupdate.push([Math.floor(p.x), Math.floor(p.y), p.vx, p.vy, p.name, p.c, p.c2, p.s, p.polyradius, p.polytheta, p.parentid])
			i++;
			}
		return pupdate;
		}
	planetsmpload(pupdate){
		var i=0;
		this.planets = [];
		while (i<pupdate.length){
			this.planets.push(new Umo(pupdate[i][0],pupdate[i][1],pupdate[i][7],pupdate[i][5]));
			//this.planets[i].x = pupdate[i][0];
			//this.planets[i].y = pupdate[i][1];
			this.planets[i].vx = pupdate[i][2];
			this.planets[i].vy = pupdate[i][3];
			this.planets[i].name = pupdate[i][4];
			//this.planets[i].c = pupdate[i][5];
			this.planets[i].c2 = pupdate[i][6];
			//this.planets[i].s = pupdate[i][7];
			this.planets[i].polyradius = pupdate[i][8];
			this.planets[i].polytheta = pupdate[i][9];
			this.planets[i].parentid = pupdate[i][10]
			i++;
			}
		}
	planetsmpupdate(){//For occasional corrections, maybe once per second
		var pupdate = [];
		var i=0;
		while(i<this.planets.length){
			var p = this.planets[i]
			pupdate.push([Math.floor(p.x), Math.floor(p.y), p.vx, p.vy])
			i++;
			}
		return pupdate;
		}
	planetsmpcorrect(pupdate){
		var i=0;
		while (i<this.planets.length){
			this.planets[i].x = pupdate[i][0];
			this.planets[i].y = pupdate[i][1];
			this.planets[i].vx = pupdate[i][2];
			this.planets[i].vy = pupdate[i][3];
			i++;
			}
		}
	playersmpsummary(){//For onboarding new system
		var pupdate = [];
		var i=0;
		while(i<this.players.length){
			var p = this.players[i].ship
			console.log("p.x="+p.x);
			pupdate.push([Math.floor(p.x), Math.floor(p.y), p.vx, p.vy, p.name, p.c, p.c2, p.s, p.polyradius, p.polytheta, p.parentid,p.maxhp,p.maxshield]);
			i++;
			}
		console.log("Playersmpsummary player 0 X "+pupdate[0][0]+" Y "+pupdate[0][1])
		return pupdate;
		}
	playersmpload(pupdate){
		var i=0;
		this.players = [];
		while (i<pupdate.length){
			this.players.push(new Player());
			this.players[i].ship.x = pupdate[i][0];
			this.players[i].ship.y = pupdate[i][1];
			this.players[i].ship.vx = pupdate[i][2];
			this.players[i].ship.vy = pupdate[i][3];
			this.players[i].ship.name = pupdate[i][4];
			this.players[i].ship.c = pupdate[i][5];
			this.players[i].ship.c2 = pupdate[i][6];
			this.players[i].ship.s = pupdate[i][7];
			this.players[i].ship.polyradius = pupdate[i][8];
			this.players[i].ship.polytheta = pupdate[i][9];
			this.players[i].ship.parentid = pupdate[i][10]
			this.players[i].ship.maxhp = pupdate[i][11];
			this.players[i].ship.maxshield = pupdate[i][12]
			i++;
			}
		}
	playersmpupdate(){//For occasional corrections, maybe once per second
		var pupdate = [];
		var i=0;
		while(i<this.players.length){
			var p = this.players[i].ship
			pupdate.push([Math.floor(p.x), Math.floor(p.y), p.vx, p.vy, p.d])
			i++;
			}
		return pupdate;
		}
	playersmpcorrect(pupdate){
		var i=0;
		while (i<this.players.length){
			this.players[i].ship.x = pupdate[i][0];
			this.players[i].ship.y = pupdate[i][1];
			this.players[i].ship.vx = pupdate[i][2];
			this.players[i].ship.vy = pupdate[i][3];
			this.players[i].ship.d = pupdate[i][4];
			i++;
			}
		}
	playermice(){
		var qq = 0;
		while (qq<this.players.length){
			var aplayer = this.players[qq];
			if (((aplayer.mousestate==1)&&(aplayer.thrustmode==false))||((aplayer.mousestate==2)&&(aplayer.thrustmode==true))){ //if it's the left button
				//console.log("itried4");
				if (aplayer.wep < 20){
					//console.log("itried3");
					//console.log(myplayer.energy+"  "+myplayer.blasters[1].ecost);//myplayer.blasters[myplayer.wep].ecost);
					if (aplayer.energy>aplayer.blasters[aplayer.wep].ecost){
						//console.log("itried2");
						if (aplayer.blasters[aplayer.wep].type!=="beam"){
							aplayer.blasters[aplayer.wep].fire(aplayer,time);
							aplayer.energy = aplayer.energy - aplayer.blasters[aplayer.wep].ecost;
							}
						//console.log("itried1");
						if (aplayer.wep == 1){blastersound1.play();}
						else if (aplayer.wep == 2){blastersound2.play();}
						else if (aplayer.wep == 3){blastersound3.play();}
						else if (aplayer.wep == 4){blastersound4.play();}
						else if (aplayer.wep == 5){blastersound5.play();}
						else if (aplayer.wep == 6){blastersound6.play();}
						else if (aplayer.wep == 7){blastersound7.play();}
						//else if (aplayer.wep == 8){blastersound8.play();}
						else if (aplayer.wep == 9){
							blastersound9.play();
							playerweapon9superbomb.initorbitbomb(aplayer.blasters[9].bombs,8,16,160,aplayer.ship,0.5,aplayer.moused+Math.PI, 4); //(bombs,coresize,minorbitize,maxorbitsize,origin,orbitspeed,direction,speed){//Orbitspeed is a multiplier value.  Individual orbit speeds are handled with the borbitspeed variable. //global scope here shame
							}
						else if (aplayer.wep == 0){blastersound0.play();}
						else if (aplayer.wep == 10){blastersound0.play();}
						else if (aplayer.wep == 11){
							var sounds = [blastersound11x2,	blastersound11x3,blastersound11x4,blastersound11x5,blastersound11x6,blastersound11x7,blastersound11x8,blastersound11x9,blastersound11x10,blastersound11x11,blastersound11x12];
							var bombi =  aplayer.blasters[aplayer.wep].n - 2;
							sounds[bombi].play();
							}
						else if (aplayer.wep == 12){blastersound12.play();}
						else if (aplayer.wep == 13){blastersound13.play();}
						else if (aplayer.wep == 14){
							var sounds = [blastersound14x0,	blastersound14x1,blastersound14x2,blastersound14x3,blastersound14x4,blastersound14x5];
							var bombi =  Math.floor(Math.random()*sounds.length);//aplayer.blasters[aplayer.wep].firing
							sounds[bombi].play();
							}
						//else if (aplayer.wep == 15){blastersound15.play();}//removed because sound is triggered in main loop
						else if (aplayer.wep == 16){blastersound16.play();}
						else if (aplayer.wep == 17){blastersound17.play();}
						else if (aplayer.wep == 19){blastersound19.play();}	
						}
					}
				}	
				
			else if (((aplayer.mousestate==2)&&(aplayer.thrustmode==false))||((aplayer.mousestate==1)&&(aplayer.thrustmode==true))){ //if it's the left button
				if (aplayer.dockstate>=0){
					this.outposts[aplayer.dockstate].undock(aplayer.ship);//undock function sets relative position and velocity.  Maybe other stuff.
					aplayer.dockstate = -1;
					}
				if (aplayer.thruster>0){
					aplayer.ship.thrust = 2*aplayer.thrustmultiplier;
					//myplayer.thruster = myplayer.thruster - 24;
					var td = 48;
					var tr = 24;
					var x = Math.cos(aplayer.ship.d+Math.PI)*td + canvas.width/2;
					var y = Math.sin(aplayer.ship.d+Math.PI)*td + canvas.height/2;
					context.beginPath();
					context.strokeStyle = "orange";
					context.arc(x, y, tr, 0, 2 * Math.PI, false);
					context.fillStyle = "orange";
					context.fill();
					context.lineWidth = 2;
					context.stroke();	
					enginesound1.play();
					}
				} 
			//aplayer.mousestate = 0;//Need to handle this server-side in actual multiplayer so w6 can work.
			qq++;
			}
		}
	playerkeys(){
		var qq = 0;
		while (qq<this.players.length){
			aplayer = this.players[qq];
			switch (aplayer.input) {  //events for all the keyboard keys
				case "q":
				if (aplayer.planetmenu < 1){
					aplayer.planetmenu++;
					aplayer.navactive = 1;
					}
				else {aplayer.planetmenu = 0;}	
				
				  break;   
				 case "Delete":
				 if (cheatmode == 0){cheatmode = 1;}
				  break;    
				case " ":
				  playerradio.msgtime = 1;
				  break;     
				case "b": //Booster selection
					if (aplayer.boosters[0]==aplayer.boosters.length-1){
						aplayer.boosters[0]=0;
					}else{
						aplayer.boosters[0]=aplayer.boosters[0]+1;
					}
				  break;	
				case "c": //supercompass toggle
					supercompass++;
					if (supercompass>3){supercompass = 0;}
				  break;
				case "g": //Booster activation
					if (aplayer.boosters[aplayer.boosters[0]]>0){//if selected booster is in stock
						aplayer.boosters[aplayer.boosters[0]]=aplayer.boosters[aplayer.boosters[0]]-1; //remove 1 from stock of selected booster
						aplayer.ship.thrust = 32*2^(aplayer.boosters[0]); //boost hard
						boost1.play();
						}
				  break;	  	  
				case "1":    //This is how weapon switching is handled.
					if (aplayer.blasters[1].phas){ aplayer.wep = 1; } //If weapon is present, switch to it.		
					break; //Nothing happens on keypress otherwise.
				case "2": 
					if (aplayer.blasters[2].phas){ aplayer.wep = 2; }
				  break;
				case "3": 
					if (aplayer.blasters[3].phas){ aplayer.wep = 3; }
					  break;
				case "4": 
					if (aplayer.blasters[4].phas){ aplayer.wep = 4; }
					break;
				case "5": 
					if (aplayer.blasters[5].phas){ aplayer.wep = 5; }
				  break;
				case "6": 
					if (aplayer.blasters[6].phas){ aplayer.wep = 6; }
					  break;
				case "7": 
					if (aplayer.blasters[7].phas){ aplayer.wep = 7; }
				  break;
				case "8": 
					if (aplayer.blasters[8].phas){ aplayer.wep = 8; }
					  break;
				case "9": 
					if (aplayer.blasters[9].phas){ aplayer.wep = 9; }
				  break;
				case "0": 
					if (aplayer.blasters[0].phas){ aplayer.wep = 0; }
					  break;
				case "!":    //This is how weapon switching is handled.
					if (aplayer.blasters[11].phas){ aplayer.wep = 11; } //If weapon is present, switch to it.		
					break; //Nothing happens on keypress otherwise.
				case "@": 
					if (aplayer.blasters[12].phas){ aplayer.wep = 12; }
				  break;
				case "#": 
					if (aplayer.blasters[13].phas){ aplayer.wep = 13; }
					  break;
				case "$": 
					if (aplayer.blasters[14].phas){ aplayer.wep = 14; }
					break;
				case "%": 
					if (aplayer.blasters[15].phas){ aplayer.wep = 15; }
				  break;
				case "^": 
					if (aplayer.blasters[16].phas){ aplayer.wep = 16; }
					  break;
				case "&": 
					if (aplayer.blasters[17].phas){ aplayer.wep = 17; }
				  break;
				case "*": 
					if (aplayer.blasters[18].phas){ aplayer.wep = 18; }
					  break;
				case "(": 
					if (aplayer.blasters[19].phas){ aplayer.wep = 19; }
				  break;
				case ")": 
					if (aplayer.blasters[10].phas){ aplayer.wep = 10; }
					  break;
				case "n": 
					if (aplayer.navactive == 0){
						aplayer.navactive = 1;
						if (aplayer.navtarget>this.planets.length-2){aplayer.navtarget=0;}
					} else if (aplayer.navactive == 1) {
						aplayer.navactive = 2;
						if (aplayer.navtarget > this.outposts.length-2){aplayer.navtarget=0;}
					} else if (aplayer.navactive == 2){aplayer.navactive = 0;}
					  break;
				case "m": 
					if (aplayer.mapactive == 0){aplayer.mapactive = 2;} else {aplayer.mapactive--;}
					  break;
				case "j": 
					if (aplayer.journalactive<2){aplayer.journalactive++;}else{aplayer.journalactive = 0;}
					  break;
				case "+": 
					aplayer.mapscale = aplayer.mapscale * 0.9;
					if (aplayer.mapscale>64){aplayer.mapscale = Math.floor(aplayer.mapscale);}
					  break;		  
				case "-": 
					aplayer.mapscale = aplayer.mapscale * 1.1;
					if (aplayer.mapscale>64){aplayer.mapscale = Math.floor(aplayer.mapscale);}
					  break;	  
				case ".": 
					var maxnavtarget = this.planets.length-1;
					if ((aplayer.sensor<1)&&(this.planets[this.planets.length-1].s<64)){maxnavtarget--;}//Player can't select waldo, the last planet, without player.sensor >=1;
					if (aplayer.navactive == 1){
						aplayer.navtarget++;
						if (aplayer.navtarget > maxnavtarget){ aplayer.navtarget = 0; }//Waldo is now excluded
					}else if (aplayer.navactive == 2){
						aplayer.navtarget++;
						if (aplayer.navtarget > this.outposts.length-1){aplayer.navtarget = 0; }
						}
					  break;
				case ",": 
					var maxnavtarget = this.planets.length-1;
					if ((aplayer.sensor<1)&&(this.planets[this.planets.length-1].s<64)){maxnavtarget--;}//Player can't select waldo, the last planet, without player.sensor >=1;
					if (aplayer.navactive == 1){
						aplayer.navtarget--;
						if (aplayer.navtarget == -1){ aplayer.navtarget = maxnavtarget; }
					}else if (aplayer.navactive == 2){
						aplayer.navtarget--;
						if (aplayer.navtarget == -1){ aplayer.navtarget = this.outposts.length-1; }
						}
					break;		  
				case "w": 
				if (cheatmode ==1){	aplayer.ship.respawn(this.planets[aplayer.navtarget]); }
					  break;
				case "]": 
					//if (aplayer.shiptarget == aplayer.shipsinrange.length-1){ aplayer.shiptarget = 0; }
					//else {aplayer.shiptarget++;}	                                          
				  break;
				case "[": 
					//if (aplayer.shiptarget == 0){ aplayer.shiptarget = aplayer.shipsinrange.length-1; }
					//else {aplayer.shiptarget--;}	                                          
				  break;
				case "v": 
					if (aplayer.vkactive == true ) {aplayer.vkactive = false;} 
					else if (aplayer.vkvisible == true ){aplayer.vkvisible = false;}
					else {
						aplayer.vkactive = true;
						aplayer.vkvisible = true;
						}
				  break;
				  
				case "t": 
					aplayer.targetlock = aplayer.shiptarget;//This can be more efficient and exclude other calculations around here                                      
				  break;
				case "ArrowUp":
					console.log("ihearya")
					if (aplayer.dockstate>=0){
						menuclick1.play();
						aplayer.shopitem = aplayer.shopitem - 1;
						if ((aplayer.shopitem<0)&&(aplayer.shopmode == 0))
							{aplayer.shopitem = this.shops[aplayer.dockstate].inv.length-1;}
						if ((aplayer.shopitem<0)&&(aplayer.shopmode == 1)){
							if (aplayer.inventory.cargotypes>0){aplayer.shopitem = aplayer.inventory.cargotypes()-1;}
							aplayer.shopitem = 0;//aplayer.inventory.cargotypes()-1;
							}//-2 instead of -1 because the last item is mission cargo, which shouldn't be bought or sold.
						if ((aplayer.shopitem<0)&&(aplayer.shopmode == 2))
							{aplayer.shopitem = this.shops[aplayer.dockstate].missions.length-1;}
						}
					else if (aplayer.journalactive==1){
						aplayer.journalitem--;
						if (aplayer.journalitem<0){aplayer.journalitem = playerradio.log.length-1;}
						}
					else if (aplayer.journalactive==2){
						aplayer.jobitem--;
						//if (aplayerjobs<0){aplayer.journalitem = playerradio.log.length-1;}
						}
					else{ 
						aplayer.cyclewep(-10);
						}
				  break;
				case "ArrowDown":
					if (aplayer.dockstate>=0){
						menuclick1.play();
						aplayer.shopitem++;
						if ((aplayer.shopitem>this.shops[aplayer.dockstate].inv.length-1)&&(aplayer.shopmode == 0))
							{aplayer.shopitem = 0;}
						if ((aplayer.shopitem>aplayer.inventory.cargotypes()-1)&&(aplayer.shopmode == 1))
							{aplayer.shopitem = 0;}
						if ((aplayer.shopitem>this.shops[aplayer.dockstate].missions.length-1)&&(aplayer.shopmode == 2))
							{aplayer.shopitem = 0;}
						}
					else if (aplayer.journalactive==1){
						aplayer.journalitem++;
						if (aplayer.journalitem>playerradio.log.length-1){aplayer.journalitem = 0;}
						}
					else if (aplayer.journalactive==2){
						aplayer.jobitem++;//boundaries handled in joblist function.
						}
					else{ 
						aplayer.cyclewep(10);
						}
				  break;   
				case "ArrowLeft":
					aplayer.cyclewep(-1);
				  break;   
				case "ArrowRight":
					aplayer.cyclewep(1);
				  break;  
				case "End":
					if (cheatmode == 1){aplayer.money = aplayer.money +10000;}
				  break;  
				case "x":
					//if (cheatmode == 1){
					//	var clustercolor = "red";
					//	testcluster = new Clusterbomb(time,ships[0].x+mdx,ships[0].y+mdy,ships[0].vx,ships[0].vy,12,6,32,0.9,clustercolor,233,0.3);
					//	}
				  break;   //handled in detail elsewhere
				case "d":
					if (diagnostic == 3){diagnostic=0;}else {diagnostic=diagnostic+1;}
			
				  break;
				case "z":
					if (aplayer.autopilot == 2){aplayer.autopilot = 0;}else {aplayer.autopilot = 2;}
			
				  break;
				 case "v":
				 if (cheatmode == 1){//global scope stuff
					if (ps <31){ps++;} //maybe ps should be a player property?
					else  {ps = 1;}
					aplayer.navtarget = 0;
					aplayer.shiptarget = 0;
					pz = 0;
					var randdir = Math.random()*2*Math.PI;
					xxxx.setorbit(this.planets[0], 320000, randdir+Math.PI, -1);//Global scope here is bad, but setorbiting previous system is worse.
					waldo.setorbit(this.planets[0], 320000, randdir, -1);
					aplayer.planetarychart = this.generateplanetlist();
					aplayer.ship.vx = 0; //Otherwise players inherit the momentum acquired in descent.
					aplayer.ship.vy = 0;
					//myplayer.planetarychart = systems[ps].generateplanetlist();
					}
				  break;
				  case "s":
				  if (starmode == 0){starmode = 1;}else{starmode = 0;}
				  break;
				 case "Enter": //The enter key purchases the currently selected shop item
				 if ((aplayer.dockstate >= 0)&&(aplayer.dockstate<this.shops.length)){//check if docked and shop exists
					if (aplayer.shopmode == 0){
						 if (aplayer.shopitem < this.shops[aplayer.dockstate].inv.length){//check for shopitem exists
							if (this.shops[aplayer.dockstate].inv[aplayer.shopitem].itemprice(aplayer,this.shops[aplayer.dockstate].eco) <= aplayer.money){ //check if player has enough money
								if (this.shops[aplayer.dockstate].inv[aplayer.shopitem].available(aplayer)){ //check if player has prerequisites / doesn't already own item
									if (aplayer.money > this.shops[aplayer.dockstate].inv[aplayer.shopitem].itemprice(aplayer,this.shops[aplayer.dockstate].eco)){
										aplayer.money = aplayer.money - this.shops[aplayer.dockstate].inv[aplayer.shopitem].itemprice(aplayer,this.shops[aplayer.dockstate].eco);
										menubuy1.play();
										this.shops[aplayer.dockstate].inv[aplayer.shopitem].buy(aplayer);//the buy function is supposed to handle the money transaction as well, but i dont think it can by itself.
									}
								} 
							}
						}		 
					}else if (aplayer.shopmode == 1){
						//if (playerinventory.cargo.length <= shopitem){shopitem = 0;}
						var item = 0;
						var i=0;
						while(i<aplayer.inventory.cargo.length-1){
							if (aplayer.inventory.cargo[i]>0){
								if (item==aplayer.shopitem){
									aplayer.inventory.cargo[i]=aplayer.inventory.cargo[i]-1;
									aplayer.money = aplayer.money + cargoitems[i].itemprice(aplayer,this.shops[aplayer.dockstate].eco);
									menubuy1.play();
									i = aplayer.inventory.cargo.length;//exits loop
									}
								else{
									item++;
									}
								}
							
							i++;
							}
						
						//if (aplayer.inventory.cargo[aplayer.shopitem]>0){
						//	aplayer.inventory.cargo[aplayer.shopitem]=aplayer.inventory.cargo[aplayer.shopitem]-1;
						//	aplayer.money = aplayer.money + Math.floor(allcargos[aplayer.shopitem].baseprice*systems[ps].shops[aplayer.dockstate].cargoprices[aplayer.shopitem]);
						//	menubuy1.play();
						//}
					}else if (aplayer.shopmode == 2){
						if (this.shops[aplayer.dockstate].missions[aplayer.shopitem].taken == false){//I shouldn't have to comment this if condition.  Side effect is that players can re-take a mission in progress, respawning the bot if it's a destroy mission.  Maybe useful if a bot gets lost just inside the return radius.
							this.shops[aplayer.dockstate].missions[aplayer.shopitem].take(this.npcs,this.planets,aplayer);
							//aplayer.job = systems[ps].shops[aplayer.dockstate].missions[aplayer.shopitem].message;//moved to take()
							menuclick3.play();
							}
						}
					}
				  break;
				 case "Backspace": //The enter key purchases the currently selected shop item
					if (aplayer.dockstate>=0){
						menuclick2.play();
						aplayer.shopmode++;
						if (aplayer.shopmode > 2) { aplayer.shopmode = 0; }
						aplayer.shopitem = 0;
						}
				  break;
				 case "p": 
					 aplayer.probemode = aplayer.probemode + 1;
					if (aplayer.probemode > 3) { aplayer.probemode = 0;}
				  break;
				   case "a": 
				   aplayer.autopilot++;
					if (aplayer.autopilot > 1) { aplayer.autopilot = 0;}//disables experimental modes for playability
					//if (autopilot > 4) { autopilot = 0;}
				  break;
				  case "thrust": 
				   if (aplayer.thrustmode){
						aplayer.thrustmode = false;
						vkeys[vkeys.length-1].label = "Thrust Mode is OFF";
					}else{
						aplayer.thrustmode = true;
						vkeys[vkeys.length-1].label = "Thrust Mode is ON";
						}
				  break;
				   case "k": 
				   //save game
					//console.log(aplayer.savecharacter());
					//console.log(aplayer.saveblasters());
			
				 function download(filename, text) {
					var element = document.createElement('a');
					element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
					element.setAttribute('download', filename);
				
					element.style.display = 'none';
					document.body.appendChild(element);
				
					element.click();
				
					document.body.removeChild(element);
				}
				
				// Start file download.
				document.getElementById("dwn-btn").addEventListener("click", function(){
					// Generate download of hello.txt file with some content
					var upgradestring = "";//unnecessary?
					var i=0;
					while(i<aplayer.upgrades.length){
						upgradestring=upgradestring+aplayer.upgrades[i].tier+" ";
						i++;
						}
					var savetext = aplayer.saveupgrades()+"|"+aplayer.saveblasters()+"|"+aplayer.savecharacter()+"|"+aplayer.savepolygon()+"|"+aplayer.inventory.savecargo()+"|"+aplayer.emtrees[0].savestring()+"|"; //document.getElementById("text-val").value;
					var filename = "blinghustlesave.txt";
					
					download(filename, savetext);
				}, false);
				  break;	
			
				   case "l": //Loading game
					var i=0;
					var stopindexes = [];
					while(i<loadgamestring.length){
						if (loadgamestring[i]=="|"){
							stopindexes.push(i);
							}
						i++;
						}
					if (stopindexes.length!=6) {console.log("bad save file");}
					else{
						console.log("good save file");
						aplayer.initialize(1000,200,1);
						var savedupgrades = loadgamestring.slice(0,stopindexes[0]);
						var savedblasters = loadgamestring.slice(stopindexes[0]+1,stopindexes[1]);
						console.log(savedblasters);
						var savedcharacter = loadgamestring.slice(stopindexes[1]+1,stopindexes[2]);
						var savedpolygon = loadgamestring.slice(stopindexes[2]+1,stopindexes[3]);
						var savedcargo = loadgamestring.slice(stopindexes[3]+1,stopindexes[4]);
						var savedemtree = loadgamestring.slice(stopindexes[4]+1,loadgamestring.length);
						aplayer.loadblastertiers(savedblasters);
						aplayer.loadcharacter(savedcharacter);
						aplayer.loadupgrades(savedupgrades);
						aplayer.loadpolygon(savedpolygon);
						aplayer.inventory.loadcargo(savedcargo);
						aplayer.emtrees[0].loadstring(savedemtree);
						var i=0;
						while(i<aplayer.emtrees[0].emods.length){
							aplayer.emtrees[0].emods[i].grade();
							i++;
							}
						aplayer.inventory.cargo[aplayer.inventory.cargo.length-1] = 0;//Purges mission cargo, which is will be the last index.
						loadgamestring = "";//Disables loadgamestring to prevent accidentally re-loading the file more than once.
						}
				//  break;	  	  
			//	default:
				  break;
					//return; // Quit when this doesn't handle the key event.
			  } //end event key handling switch
			qq++;
			}
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
		var extradots = Math.floor(Math.random()*3);
		while(extradots>0){
			this.planets[i].polyradius.push(0);
			this.planets[i].polytheta.push(0);
			extradots--;
			}
		var i = 0;
		while (i<this.planets.length){
			var j=0;
			while (j<this.planets[i].polytheta.length){
				this.planets[i].polyradius[j] = Math.random()+0.125;
				this.planets[i].polytheta[j] = Math.random()*2*Math.PI;
				j=j+1;
				}
			i=i+1;
			}	
		this.randomoutposts(5); 
		var traderstops = Math.floor(Math.random()*3)+2;
		var destinations = [];
		var i=0;
		while (i<traderstops){
			var thisstop = Math.floor(Math.random()*(this.planets.length-1))+1;
			destinations.push(thisstop);
			i=i+1;
			}
		this.addrandomtraders(destinations, 4, 15); 
		var traderstops = Math.floor(Math.random()*3)+2;
		var destinations = [];
		var i=0;
		while (i<traderstops){
			var thisstop = Math.floor(Math.random()*(this.planets.length-1))+1;
			destinations.push(thisstop);
			i=i+1;
			}
		this.addrandomtraders(destinations, 4, 15)//Duplicate for two groups.
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
		var alreadypickedplanets = [];
		var i=0;
		while (i<num){//
			this.outposts.push( new Umo(0,0,128, randcolor()));
			var lastindex = this.outposts.length-1;
			this.outposts[lastindex].c2 = randcolor();
			this.outposts[lastindex].parentid = 0;
			this.outposts[lastindex].name = randname(8)+" "+randname(7)+" "+randname(5);
			var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
			var toradii = [1,1,1,1]; //rectangle
			this.outposts[lastindex].polytheta = totheta;
			this.outposts[lastindex].polyradius = toradii;
			var pickedplanet = Math.floor(Math.random()*(this.planets.length-2))+1;//station will be in a solar following orbit to the chosen planet
			while ((this.planets[pickedplanet].parentid !== 0)&&(alreadypickedplanets.includes(pickedplanet))){//No outpost generated if planet is actually a moon or already picked
				pickedplanet = Math.floor(Math.random()*(this.planets.length-2))+1;//tries again to find a not-moon
				}
			var orbitdistance = this.planets[0].distance(this.planets[pickedplanet]);
			var orbitposition = this.planets[0].directionof(this.planets[pickedplanet]);
			this.outposts[lastindex].setorbit(this.planets[0], orbitdistance, orbitposition+0.2+Math.random()*0.3, 1);//This properly sets orbital distance, maybe properly sets orbit position.
			
			var numberofsides = Math.floor(Math.random()*6+7)*2;
			this.outposts[i].makeemblem(numberofsides,0.1); //randomly generates a shop logo
			//Now add the shop...  Tons of global scope used here.
			var randshopitems3 = [];  
			randshopitems3.push(repairshopitem);//First 2 items are always the same, repair item and booster item.
			randshopitems3.push(booster1);
			var j=2;
			while(j<4){ //Next 2 items will be random blasters for sale
				var buyableblaster = Math.floor(Math.random()*blasterbuyitems.length);
				randshopitems3.push(blasterbuyitems[buyableblaster]);
				j=j+1;
				}
			while (j<7){ //Next 3 items will be random blaster upgrades
				var theitem = Math.floor(Math.random()*blasterupgradeitems.length);
				randshopitems3.push(blasterupgradeitems[theitem]);
				j=j+1;
			}
			while (j<9){ //Next 2 items will be random ship upgrades.
				var randupgrade = Math.floor(Math.random()*upgradeshopitems.length);
				randshopitems3.push(upgradeshopitems[randupgrade]);
				j=j+1;
				}
			//while (j<12){ //And 3 cargo items
			//	var randcargo = Math.floor(Math.random()*(allcargos.length-1));
			//	randshopitems3.push(new Shopitem("cargo",randcargo,"buy",1));
			//	j=j+1;
			//	}
			this.shops.push(new Shop("XXXXXXXXXX",i, "whaaaaaaaaaaaaaat", randshopitems3)); //should fix this to reflect outpost name/description
			var k = 0;
			while (k<4){ //This adds 4 cargo missions to the shop.  
				this.shops[i].addcargomission(this.npcs,this.planets,this.outposts);
				k=k+1;
				}// Destroy missions can't be added here (they are added in enemypopulate function), because normally the enemy ships haven't been added to the system yet when randomoutposts() (this function) is run.
			i=i+1;
			}
		}
	randomoutpostat(opx,opy){
		this.outposts.push( new Umo(0,0,128, randcolor()));
		var lastindex = this.outposts.length-1;
		this.outposts[lastindex].c2 = randcolor();
		this.outposts[lastindex].parentid = 0;
		this.outposts[lastindex].name = randname(8)+"'s "+randname(7)+" "+randname(5);
		var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
		var toradii = [1,1,1,1]; //rectangle
		this.outposts[lastindex].polytheta = totheta;
		this.outposts[lastindex].polyradius = toradii;
		//var pickedplanet = Math.floor(Math.random()*(this.planets.length-2))+1;//station will be in a solar following orbit to the chosen planet
		//while ((this.planets[pickedplanet].parentid !== 0)&&(alreadypickedplanets.includes(pickedplanet))){//No outpost generated if planet is actually a moon or already picked
		//	pickedplanet = Math.floor(Math.random()*(this.planets.length-2))+1;//tries again to find a not-moon
		//	}
		//var orbitdistance = this.planets[0].distance(this.planets[pickedplanet]);
		//var orbitposition = this.planets[0].directionof(this.planets[pickedplanet]);
		//this.outposts[lastindex].setorbit(this.planets[0], orbitdistance, orbitposition+0.2+Math.random()*0.3, 1);//This properly sets orbital distance, maybe properly sets orbit position.
		this.outposts[lastindex].x = opx;
		this.outposts[lastindex].y = opy;
		var numberofsides = Math.floor(Math.random()*6+7)*2;
		this.outposts[lastindex].makeemblem(numberofsides,0.1); //randomly generates a shop logo
		//Now add the shop...  Tons of global scope used here.
		var randshopitems3 = [];  
		randshopitems3.push(repairshopitem);//First 2 items are always the same, repair item and booster item.
		randshopitems3.push(booster1);
		var j=2;
		while(j<6){ //Next4 items will be random blasters for sale
			var buyableblaster = Math.floor(Math.random()*blasterbuyitems.length);
			randshopitems3.push(blasterbuyitems[buyableblaster]);
			j=j+1;
			}
		while (j<10){ //Next 4 items will be random blaster upgrades
			var theitem = Math.floor(Math.random()*blasterupgradeitems.length);
			randshopitems3.push(blasterupgradeitems[theitem]);
			j=j+1;
		}
		while (j<14){ //Next 4 items will be random ship upgrades.
			var randupgrade = Math.floor(Math.random()*upgradeshopitems.length);
			randshopitems3.push(upgradeshopitems[randupgrade]);
			j=j+1;
			}
		//while (j<12){ //And 3 cargo items
		//	var randcargo = Math.floor(Math.random()*(allcargos.length-1));
		//	randshopitems3.push(new Shopitem("cargo",randcargo,"buy",1));
		//	j=j+1;
		//	}
		this.shops.push(new Shop("XXXXXXXXXX",lastindex, "whaaaaaaaaaaaaaat", randshopitems3)); //should fix this to reflect outpost name/description
		var k = 0;
		while (k<4){ //This adds 4 cargo missions to the shop.  
			//this.shops[i].addcargomission(this.npcs,this.planets,this.outposts);//skipped for weird use cases
			k=k+1;
			}// Destroy missions can't be added here (they are added in enemypopulate function), because normally the enemy ships haven't been added to the system yet when randomoutposts() (this function) is run.
		var i=0;
		while(i<50){
			this.ecobalance(.05);
			i++;
			}
		//this.addcargosales(cargoitems);	//shady global scope used here
		}
	ecobalance(magnitude){//magnitude is 0<x<1, normally .01 ish
		var distances = [];//a set of sets containing shop economy distances to each other shop economy
		var minunit = 2000; //This is the treated as the minimum possible distance between shops.  Getting closer has no effect.
		var i=0;
		while(i<this.outposts.length){
			var somedistances = [];
			var j=0;
			while(j<this.outposts.length){
				var thedistance = this.outposts[i].distance(this.outposts[j])+minunit;//this is bad, need to use a distance metric like the missions
				//var fakemission = new Mission("cargo",)//constructor(missiontype, morigin, mtarget,mmessage,mreward,mstory){
				somedistances.push(thedistance);
				var k=0;
				while(k<this.shops[j].eco.supplies.length){
					var pricedifference = this.shops[i].eco.prices[k]-this.shops[j].eco.prices[k];
					var distancecoefficient = thedistance/minunit;//thedistance wont be less than minunit
					var pricechange = magnitude*pricedifference/distancecoefficient;
					//if ((this.shops[i].eco.forsale[k])&&(pricechange>0)){
						this.shops[j].eco.prices[k] = this.shops[j].eco.prices[k] + pricechange;
					//	}
					//else if ((this.shops[i].eco.forbuy[k])&&(pricechange<0)){
						this.shops[j].eco.prices[k] = this.shops[j].eco.prices[k] + pricechange;
					//	}
					k++;
					}
				j++;
				}
			distances.push(somedistances);
			i++;
			}
		
		}
	addcargosales(cargoshopitems){
		var i=0;
		while(i<this.shops.length){
			var j=0;
			while(j<this.shops[i].eco.prices.length){
				if (this.shops[i].eco.forsale[j]==true){
					this.shops[i].inv.push(cargoitems[j]);//from global scope, not passed by referebce, because maybe it fixes something?
					console.log(i+" "+j+":::");
					}
				j++;
				}
			i++;
			}
		}
	addcargomissions(n){
		var i=0;
		while(i<this.shops.length){
			var j=0;
			while (j<n){
				this.shops[i].addcargomission(this.npcs,this.planets,this.outposts);
				j++;
				}
			i++;
			}
		}
	levelup(botindex,levels){//adds "levels" to make bots tougher
		var i = levels;
		while(i>0){
			i=i-1;
			var bonus = Math.floor(Math.random()*12);//Picks a number to select which bonus the bot gets
			if (bonus==0){ //extra health
				this.npcs[botindex].ship.maxhp = this.npcs[botindex].ship.maxhp+100;
				this.npcs[botindex].ship.hp = this.npcs[botindex].ship.hp+100;
				}
			else if (bonus==1){ //extra shield
				this.npcs[botindex].ship.maxshield = this.npcs[botindex].ship.maxshield+50;
				this.npcs[botindex].ship.shield = this.npcs[botindex].ship.shield+50;
				}
			else if (bonus==2){ //extra shield regen
				this.npcs[botindex].ship.shieldregen = this.npcs[botindex].ship.shieldregen+0.25;
				}			
			else if (bonus==3){ //extra bomb damage
				this.npcs[botindex].blasters[0].plusdamage();
				}						
			else if (bonus==4){ //extra bomb blast
					this.npcs[botindex].blasters[0].plusboom();//I think botbombs needs -1 because it does not include a bomb for ships[0] (player)
					}
			else if (bonus==5){ //extra bomb speed
				this.npcs[botindex].blasters[0].plusspeed();//I think botbombs needs -1 because it does not include a bomb for ships[0] (player)
				}		
			else if (bonus==6){ //extra bomb timer
				this.npcs[botindex].blasters[0].plustimer();//I think botbombs needs -1 because it does not include a bomb for ships[0] (player)
				}
			else if (bonus==7){ //extra bomb n and 
				if (this.npcs[botindex].blasters[0].type == "multiplex"){
					this.npcs[botindex].blasters[0].type = "fixedspread";
					this.npcs[botindex].blasters[0].plusn();
					this.npcs[botindex].blasters[0].special1 = 0.125*Math.PI/2+0.375*Math.random()*Math.PI/2;//Default spread 
					this.npcs[botindex].blasters[0].special2 = this.npcs[botindex].blasters[0].special1/2
					}
				else if (this.npcs[botindex].blasters[0].type == "fixedspread"){
					this.npcs[botindex].blasters[0].type = "multiplex";
					this.npcs[botindex].blasters[0].plusn();
					}
				}
				//Repeat 0 and 1 to pad out the probability of a defensive bonus
			else if (bonus==8){ //extra health
				this.npcs[botindex].ship.maxhp = this.npcs[botindex].ship.maxhp+100;
				this.npcs[botindex].ship.hp = this.npcs[botindex].ship.hp+100;
				}
			else if (bonus==9){ //extra shield
				this.npcs[botindex].ship.maxshield = this.npcs[botindex].ship.maxshield+50;
				this.npcs[botindex].ship.shield = this.npcs[botindex].ship.shield+50;
				}	
			else if (bonus==10){ //Get smaller!
				this.npcs[botindex].ship.s = this.npcs[botindex].ship.s--;//Smaller by 1...
				if (this.npcs[botindex].ship.s>24){this.npcs[botindex].ship.s--;}//By two if the ship isn't already smol	
				if (this.npcs[botindex].ship.s<16){
					this.npcs[botindex].ship.s = 16;
					this.npcs[botindex].ship.maxhp = this.npcs[botindex].ship.maxhp+100;
					}//By two if the ship isn't already smol	
				}
			else if (bonus==11){ //Get bigger and beefier!
				this.npcs[botindex].ship.s = this.npcs[botindex].ship.s++;//Bigger by 1...
				if (this.npcs[botindex].ship.s>24){this.npcs[botindex].ship.s++;}//By two if the ship isn't already smol	
				if (this.npcs[botindex].ship.s>50){
					this.npcs[botindex].ship.s = 50;
					this.npcs[botindex].ship.maxhp = this.npcs[botindex].ship.maxhp+100;
					this.npcs[botindex].ship.hp = this.npcs[botindex].ship.hp+100;
					this.npcs[botindex].ship.maxshield = this.npcs[botindex].ship.maxshield+50;
					this.npcs[botindex].ship.shield = this.npcs[botindex].ship.shield+50;
					}//By two if the ship isn't already smol							
				}					
			this.npcs[botindex].ship.level = this.npcs[botindex].ship.level +1;
			}
		}
	addrandomgang(planetindex, num,level){ //Adds a gang of enemy ships, level describes difficulty (not used yet)
		var gangsize = num;
		var gangcolor = randcolor();
		var gangcolor2 = randcolor();
		var gangparent = planetindex;
		var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
		var randomplayerverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
		normalizepoly(randomplayerverts);
		var gangpolytheta = randomplayerverts[0];
		var gangpolyradius = randomplayerverts[1];
		var i = gangsize;
		while (i>0){
			i=i-1;
			var botindex = this.npcs.length;
			this.npcs.push(new NPC(botindex));
			this.npcs[botindex].ship.c2 = gangcolor2;
			this.npcs[botindex].ai.homeplanet = gangparent;; 
			this.npcs[botindex].ship.setorbit(this.planets[gangparent], this.planets[gangparent].s+300, Math.random()*6, 1);
			this.npcs[botindex].ship.name = randname(5);
			this.npcs[botindex].ship.hp = 150;
			this.npcs[botindex].ship.maxhp = 150;
			this.npcs[botindex].ship.polytheta = gangpolytheta;
			this.npcs[botindex].ship.polyradius = gangpolyradius;
			this.npcs[botindex].ai.behavior = "guardbot2";
			if (i==(gangsize-1)){this.npcs[botindex].ai.behavior = "guardbot2";}
			this.npcs[botindex].ai.playerhostile = true; 
			this.levelup(botindex,level);
			}
		}
	addrandomtraders(destinations, num, level){
		var fleetsize = num;
		var fleetcolor1 = randcolor();
		var fleetcolor2 = randcolor();
		var fleetparent = destinations[0];
		var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
		var randomshipverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
		normalizepoly(randomshipverts);
		var fleetpolytheta = randomshipverts[0];
		var fleetpolyradius = randomshipverts[1];
		var i = fleetsize;
		while (i>0){
			i=i-1;
			var botindex = this.npcs.length;
			this.npcs.push(new NPC(botindex));
			this.npcs[botindex].ship.c = fleetcolor1;
			this.npcs[botindex].ship.c2 = fleetcolor2;
			this.npcs[botindex].ship.parentid = fleetparent; 
			this.npcs[botindex].ship.respawn(this.planets[fleetparent]);//This method is semi-obselete, after death respawns are handled by setting a "respawning" flag on the NPC object and waiting for the system updateall() function to run.
			this.npcs[botindex].ship.name = randname(5);
			this.npcs[botindex].ship.hp = 150;
			this.npcs[botindex].ship.maxhp = 150;
			this.npcs[botindex].ship.polytheta = fleetpolytheta;
			this.npcs[botindex].ship.polyradius = fleetpolyradius;
			this.npcs[botindex].ai.team = "trader";
			this.npcs[botindex].ai.route = destinations;
			this.npcs[botindex].ai.behavior = "inertpatrol";
			this.levelup(botindex,level);
			}
		}
	addprivateer(home, level){//Home is planet index, not actual planet (umo) object
		//var fleetsize = num;
		var fleetcolor1 = randcolor();
		var fleetcolor2 = randcolor();
		var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
		var randomshipverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
		normalizepoly(randomshipverts);
		var fleetpolytheta = randomshipverts[0];
		var fleetpolyradius = randomshipverts[1];
		var botindex = this.npcs.length;
		this.npcs.push(new NPC(botindex));
		this.npcs[botindex].ship.c = fleetcolor1;
		this.npcs[botindex].ship.c2 = fleetcolor2;
		this.npcs[botindex].ship.parentid = fleetparent; 
		this.npcs[botindex].ship.respawn(this.planets[fleetparent]);
		this.npcs[botindex].ship.name = randname(5);
		this.npcs[botindex].ship.hp = 150;
		this.npcs[botindex].ship.maxhp = 150;
		this.npcs[botindex].ship.polytheta = fleetpolytheta;
		this.npcs[botindex].ship.polyradius = fleetpolyradius;
		this.npcs[botindex].ai.team = "privateer";
		this.npcs[botindex].ai.homeplanet = home;
		this.npcs[botindex].ai.behavior = "bassassin";
		this.npcs[botindex].ai.career = "privateer";
		var rnpc = Math.floor(Math.random()*systems[ps].npcs.length);
		var i=0;
		while (((this.npcs[rnpc].ai.playerhostile == false)||(this.npcs[rnpc].level>this.npcs[botindex].level))&&(i<10)){
			rnpc = Math.floor(Math.random()*systems[ps].npcs.length);
			systems[ps].npcs[botindex].ai.alltargetplayers = [ rnpc ];
			}
		if (i>9){console.log("failed to find appropriate target after 10 tries");}
		this.levelup(botindex,level);
			
		}
	enemypopulate(num,minlevel,maxlevel){ //Adds gangs of enemy ships, level describes difficulty, num is size of each gang.
		var i=1;
		while (i<this.planets.length-1){
			var templevel = Math.floor(minlevel + Math.random()*(maxlevel+1 - minlevel));
			this.addrandomgang(i,num,templevel);
			i=i+1;
			}
		var i=0;
		while(i<this.npcs.length){
			var maybe = Math.floor(Math.random()*4)
			if (maybe==0){
				this.npcs[i].ai.behavior = "guardandpursueplayers";
				this.npcs[i].ai.alltargetplayers = [-1];
				this.npcs[i].ai.alltargetplanets = [this.npcs[i].ai.homeplanet];
				}
			i++;
			}
		var i = 0;
		while (i<this.shops.length){
			var k = 0;
			while (k<4){
				this.shops[i].addkillmission(this.npcs,this.planets,this.outposts);
				k=k+1;
				}
			i=i+1;
			}
		
		}
	generatebasicsystem(gangsize,minlevel,maxlevel,bling){
		this.randomplanets();
		this.enemypopulate(gangsize,minlevel,maxlevel);
		this.addrandombling(bling);
		this.addsuperboss(96,4,1000+minlevel*128,500+minlevel*32,320,80,1+Math.floor((this.planets.length-2)*Math.random()));
		this.addsuperboss(96,6,1000+maxlevel*128,500+maxlevel*32,320,80,1+Math.floor((this.planets.length-2)*Math.random()));
		
		}
	generateasteroidarena(sunsize,minroidsize,maxroidsize,minradius,maxradius,shopradius,rodiradius,numroids,gangsize,numsuperboss,numshops){
		this.planetarycollisions = true;
		this.solardamage = false;
		this.planets.push( new Umo(this.x,this.y,sunsize, "orange") ); //make the sun 
		this.planets[0].name = this.name; // Star name is same as system name
		let decoy = new Umo(0, 0, 300, randcolor); //4
		decoy.name = "Rodi";//No idea why the name.
		decoy.setorbit(this.planets[0], rodiradius, 0, 1);
		decoy.parentid = 0;
		decoy.c2 = randcolor;
		this.planets.push(decoy);
		var maxsize = maxroidsize;
		var minsize = minroidsize;
		var maxorbit = maxradius;
		var minorbit = minradius;
		var orbitwonk = .02;
		var i = 0;
		while (i<numroids){
			var orbitr = minorbit + Math.floor((maxorbit-minorbit)*Math.random());
			var wonk = 1 - orbitwonk + 2*orbitwonk*Math.random();
			var aodir = Math.random()*2*Math.PI;
			var asize = minsize + Math.floor((maxsize-minsize)*Math.random());
			//console.log(orbitr);
			//console.log(wonk);
			//console.log(aodir);
			let nextplanet = new Umo(1000, 16000, asize, randcolor());
			nextplanet.name = randname(4);
			nextplanet.setorbit(this.planets[0], orbitr, aodir, 1);
			nextplanet.parentid = 1;
			nextplanet.grange = nextplanet.s*8+512;
			nextplanet.vx = nextplanet.vx * wonk;
			nextplanet.vy = nextplanet.vy * wonk;
			var j=0;
			while (j<this.planets.length){
				if (this.planets[j].collide(nextplanet)){//If planets overlaps
					orbitr = minorbit + Math.floor((maxorbit-minorbit)*Math.random());//Re-roll planet orbit
					wonk = 1 - orbitwonk + 2*orbitwonk*Math.random();
					aodir = Math.random()*2*Math.PI;
					nextplanet.setorbit(this.planets[0], orbitr, aodir, 1);
					nextplanet.vx = nextplanet.vx * wonk;
					nextplanet.vy = nextplanet.vy * wonk;
					j=-1;//start at 0 after the j++  to re-check for overlap
					}
				j++;
				}
			var extradots = Math.floor(Math.random()*3);
			while(extradots>0){
				nextplanet.polyradius.push(0);
				nextplanet.polytheta.push(0);
				extradots--;
				}
			var j=0;
			while (j<nextplanet.polytheta.length){
				nextplanet.polyradius[j] = Math.random()+0.125;
				nextplanet.polytheta[j] = Math.random()*2*Math.PI;
				j=j+1;
				}
			this.planets.push(nextplanet);
			i++;
			}
		var extradots = Math.floor(Math.random()*3);
		while(extradots>0){
			this.planets[i].polyradius.push(0);
			this.planets[i].polytheta.push(0);
			extradots--;
			}
		var i = 0;
		while (i<this.planets.length){
			var j=0;
			while (j<this.planets[i].polytheta.length){
				this.planets[i].polyradius[j] = Math.random()+0.125;
				this.planets[i].polytheta[j] = Math.random()*2*Math.PI;
				j=j+1;
				}
			i=i+1;
			}	
		var outpostnum = numshops
		this.randomoutposts(outpostnum);
		var i=0;
		while(i<this.outposts.length){
			this.outposts[i].setorbit(this.planets[0],shopradius,i*(2/outpostnum)*Math.PI,1);
			i++;
			}
		this.enemypopulate(gangsize,4,16);	
		console.log(this.shops);
		var i = 1;
		while(i<numsuperboss){
			this.addsuperboss(96,5,4000,1000,320,80,i);
			i++;
			}
		//this.addsuperboss(96,5,4000,1000,320,80,1);
		//this.addsuperboss(96,6,4000,1000,320,80,2);
		//this.addsuperboss(96,8,4000,1000,320,80,3);
		}
	generatebubbleparty(minroidsize,maxroidsize,maxroidradius,shopradius,numroids,gangsize,numsuperboss,numshops,heat){
		this.planetarycollisions = true;
		this.gravity = false;
		this.solardamage = false;
		var i=0;
		while(i<numroids){
			var asize = minroidsize + Math.floor((maxroidsize-minroidsize)*Math.random());
			let nextplanet = new Umo(0, 0, asize, randcolor());
			nextplanet.name = randname(4);
			nextplanet.parentid = 1;
			var j=0;
			var clipped = true;//Defaults to true, so that loop will run at least once to check.
			var corner = true;
			while (clipped||corner){
				var randx = Math.floor( maxroidradius*(Math.random()*2-1) );
				var randy = Math.floor( maxroidradius*(Math.random()*2-1) );//re-randomizes...
				var centerdistance = Math.sqrt(randx*randx+randy*randy);
				nextplanet.x = randx;
				nextplanet.y = randy;
				if (centerdistance>maxroidradius){ corner = true; } else { corner = false; }
				clipped = false;
				var j=0;
				while(j<this.planets.length){//Check that the new planet doesn't collide with any prior planets
					if (this.planets[j].collide(nextplanet)){
						clipped = true;
						}
					j++;
					}
				}
			var tempmag = Math.random()*heat;
			//console.log(tempmag);
			var tempdir = Math.random()*2*Math.PI;
			//console.log(tempdir);			
			nextplanet.push(tempmag, tempdir);
			var extradots = Math.floor(Math.random()*3);
			while(extradots>0){
				nextplanet.polyradius.push(0);
				nextplanet.polytheta.push(0);
				extradots--;
				}
			var j=0;
			while (j<nextplanet.polytheta.length){
				nextplanet.polyradius[j] = Math.random()+0.125;
				nextplanet.polytheta[j] = Math.random()*2*Math.PI;
				j=j+1;
				}
			this.planets.push(nextplanet);
			//this.planets[this.planets.length-1].push(tempmag,tempdir);
			i++;
			}
		
		this.randomoutposts(numshops);
		var i=0;
		while(i<this.outposts.length){
			//this.outposts[i].setorbit(this.planets[0],shopradius,i*(2/outpostnum)*Math.PI,1);
			i++;
			}
		this.enemypopulate(gangsize,1,8);	
		console.log(this.planets.length);
		console.log(this.npcs.length);
		//this.addsuperboss(96,4,4000,1000,320,80,1);
		//this.addsuperboss(96,4,4000,1000,320,80,2);
		//this.addsuperboss(96,4,4000,1000,320,80,3);
		}
	generatepocket(nout,nin,sizeout,minsizein,maxsizein,difficulty){//sizeout is really a radial distance from center.  Actual size adjusted to fit.
		if (nout<3){nout = 3;}
		this.playerspawnplanet = -1;
		
		this.waldosize = 0;
		this.gravity = false;
		this.planetarycollisions = false;
		this.solardamage = false;
		this.planets.push(new Umo(0,0,256,randcolor()));//sun doesn't matter, it's hidden away
		this.planets.c2 = randcolor();
		this.planets[0].name = "CNDY";
		var i=0;
		while(i<nout){
			var bdir = i * 2*Math.PI/nout
			var bx = Math.cos(bdir)*sizeout;
			var by = Math.sin(bdir)*sizeout;
			var borderplanet = new Umo(bx,by,sizeout,randcolor());
			borderplanet.name = randname(10);
			borderplanet.c2 = randcolor();
			borderplanet.parentid = 0;
			this.planets.push(borderplanet);
			i++;
			}
		var interdistance = this.planets[1].distance(this.planets[2]);
		var i=1;
		while(i<nout+1){//+1 because fake sun takes up a slot
			this.planets[i].s = Math.floor(interdistance/2);
			i++;
			}
		//this.addbling(0,100,400,100);//addbling(parent,basevalue,bonusvalue,num){//adds bling to 1 planet
		//var i=0;
		//while(i<256){
		//	var newbling = new Bling(Math.random()*3000-1500,Math.random()*3000-1500,Math.random()-0.5,Math.random()-0.5,Math.floor(Math.random()*128));
		//	this.bling.push(newbling);
		//	i++;
		//	}
		var i=1;
		while(i<nin){
			var er = 1200; //exclusion radius in center
			var tpos = Math.random()*Math.PI*2;
			var rpos = er + Math.random()*(sizeout-er)*0.25;//fudge factor at end optimized for triangle systems leaving corner space
			var xpos = Math.floor(Math.cos(tpos)*rpos);
			var ypos = Math.floor(Math.sin(tpos)*rpos);
			var psize = Math.floor(minsizein+(maxsizein-minsizein)*Math.random());
			var aplanet = new Umo(xpos,ypos,psize,randcolor());
			if (this.isclear(aplanet,xpos,ypos)){
				aplanet.c2 = randcolor();
				aplanet.name = randname(4);
				aplanet.parentid = 1; //Just to prevent the minimap from rendering orbits.
				this.planets.push(aplanet);
				i++;//sketchy that theres no guaranteed speed of execution here.
				}
			}
		this.enemypopulate(2,1+difficulty,4+difficulty*2);
		var i=0;
		while(i<nout){
			var opdir = (i+0.5) * 2*Math.PI/nout
			var opr = sizeout*0.35;
			var opx = Math.cos(opdir)*opr;
			var opy = Math.sin(opdir)*opr;
			if (i==0){//Player should spawn just inward of outpost 0.
				this.playerspawnx = opx*0.95;
				this.playerspawny = opy*0.95;
				}
			
			this.randomoutpostat(opx,opy)
			i++;
			}
		}
	addsuperboss(size,turretnum,hp,shield,turrethp,turretshield,parentid){
		//var superboss = new Umo(0, 0, size, randcolor() ); //Superboss is a test capital ship
		var botindex = this.npcs.length;
		var superboss = new NPC(botindex);
		superboss.blasters = [ new Blaster("Boss Blaster","Fires an absurd spread of damaging projectiles.",5000,"fixedspread",          
	 8,4,10,6,1,10,0.25,0.5,10,4,1,10,64,8,10,50,"white","ID not implemented")];
	 	superboss.blasters[0].special1 = Math.PI/4;//Default spread 
		superboss.blasters[0].special2 = 1*Math.PI/8;//default spread start
		if (Math.random()>0.5){superboss.blasters[0].type = "multiplex";}
		superboss.ship.c1 = randcolor();
		superboss.ship.c2 = randcolor();
		superboss.ship.hp = hp;
		superboss.ship.maxhp = hp;
		superboss.ship.shield = shield;
		superboss.ship.maxshield = shield;
		superboss.ship.shieldregen = 2;
		superboss.ai.homeplanet = parentid; 
		superboss.ship.respawn(this.planets[superboss.ai.homeplanet]);
		superboss.ship.name = randname(5);
		superboss.ship.level = 8*turretnum+Math.floor(superboss.ship.hp/400)+Math.floor(superboss.ship.shield/100);
		superboss.ship.s = size;
		var sides = 20;
		if (turretnum>4){sides = turretnum*4+4; }
		var randomplayerverts = randpolarpoly(sides, 0.5);//sides,  minimum radius
		normalizepoly(randomplayerverts);
		superboss.ship.polytheta = randomplayerverts[0];
		superboss.ship.polyradius = randomplayerverts[1];
		//var sbpi = [3,6,13,16];
		//superboss.polyradius[3] = superboss.polyradius[3]+.75
		//superboss.polyradius[superboss.polyradius.length-4] = superboss.polyradius[superboss.polyradius.length-4]+.75
		//superboss.polyradius[6] = superboss.polyradius[6]+.75
		//superboss.polyradius[superboss.polyradius.length-7] = superboss.polyradius[superboss.polyradius.length-7]+.75
		superboss.ai.playerhostile = true;
		superboss.ai.behavior = "guardbot2";
		this.npcs.push(superboss);
		this.levelup(botindex,12);//levelup(botindex,levels){//adds "levels" to make bots tougher, is a system function for some reason.
		var randomturretverts = randpolarpoly(sides, 0.5);//sides,  minimum radius
		normalizepoly(randomturretverts);
		var tc1 = randcolor();
		var tc2 = randcolor();
		var i=0;
		while(i<turretnum){
			if (i<(turretnum-1)/2){ var polygoni = (i+1)*4-1; }
			else if (i>(turretnum-1)/2){ var polygoni = superboss.ship.polyradius.length-(turretnum - i)*4; }
			else {polygoni = Math.floor(superboss.ship.polyradius.length/2);}
			superboss.ship.polyradius[polygoni] = 1.4;
			var newturret = new Turret("enemy",superboss.ship,superboss.ship.polytheta[polygoni],superboss.ship.s*superboss.ship.polyradius[polygoni]);
			newturret.pivot.hp = turrethp;
			newturret.pivot.maxhp = turrethp;
			newturret.pivot.shield = turretshield;
			newturret.pivot.maxshield = turretshield;
			newturret.anchorvisible = false;
			newturret.pivot.c = tc1;
			newturret.pivot.c2 = tc2;
			newturret.pivot.polyradius = randomturretverts[1];
			newturret.pivot.polytheta = randomturretverts[0];
			this.turrets.push(newturret);
			i++;
			}
	}
	addbling(parent,basevalue,bonusvalue,num){//adds bling to 1 planet
		var i=0;
		while(i<num){
			var tempvalue = Math.floor(basevalue+Math.random()*bonusvalue);
			var tempdistance = parent.s+32+2*Math.floor(Math.random()*parent.s);
			this.bling.push(new Bling(0,0,0,0,tempvalue));
			this.bling[this.bling.length-1].setorbit(parent,tempdistance,Math.random()*2*Math.PI,1);
			this.bling[this.bling.length-1].t = this.bling[this.bling.length-1].t +i*600;
			i++;
			}
		}
	addrandombling(spread){
		var i=0;
		while (i<this.planets.length){
			var blingonplanet = Math.floor(this.planets[i].s/spread);
			var j=0;
			while(j<blingonplanet){
				this.addbling(this.planets[i],16,32,1);
				this.bling[this.bling.length-1].parentid = i;
				this.bling[this.bling.length-1].t = Math.floor(Math.random()*1000);//Timer counts up to an expiration, this helps stagger the expiration times
				j++
			}
			i++;
		}
	
	}
	nextjob(){
		var numjobs = 0;
		var thejob = "none";
		var i=0;
		while (i<this.shops.length){
			var j=0;
			while (j<this.shops[i].missions.length){
				if (this.shops[i].missions[j].taken){
					numjobs = numjobs + 1;
					thejob = this.shops[i].missions[j].message;
					}
				j=j+1;
				}
			i=i+1;
			}
		return [thejob, numjobs];
		}
	joblist(x,y,theplayer){  
		//var item = thepla;
		var joblistcolor = "orange"
		context.fillStyle = joblistcolor;
		context.strokeStyle = joblistcolor;
		context.font = "24px Verdana";
		context.fillText("Jobs",x,y-24);
		//context.font = "16px Verdana";
	//	context.fillText("number of jobs goes here",x+128,y-24);
		context.rect(x-4,y-48,640,500);
		context.rect(x-4,y-16,640,300);
		context.stroke();	
		context.font='12px Arial';
		var jobnum = 0;
		var myjobs = []
		var i=0;
		while (i<this.shops.length){
			var j=0;
			while (j<this.shops[i].missions.length){
				if (this.shops[i].missions[j].taken){
					myjobs.push(this.shops[i].missions[j]);
					//context.fillText(this.shops[i].missions[j].message,x+8,y+28+jobnum*20);
					jobnum++;
					}
				j=j+1;
				}
			i=i+1;
			}
		if (theplayer.jobitem<0){theplayer.jobitem = jobnum - 1;}
		else if (theplayer.jobitem>=jobnum){theplayer.jobitem = 0;}
		context.font = "16px Verdana";
		context.fillText(jobnum+" current jobs",x+128,y-24);
		if (jobnum == 0){ context.fillText("No jobs",x,y); 
		}else{
			context.fillText("Type:",x+0,y+20+16*-1);
			context.fillText("Location:",x+100,y+20+16*-1);
			context.fillText("Distance:",x+200,y+20+16*-1);
			context.fillText("Danger:",x+300,y+20+16*-1);
			context.fillText("Reward:",x+400,y+20+16*-1);
			context.fillText(myjobs[theplayer.jobitem].message,x+0,y+300);
			var chartstart = 0;
			var chartend = jobnum-1;
			if (myjobs.length>8){
				chartstart = theplayer.jobitem - 4;
				chartend = theplayer.jobitem + 4;
				if (chartend < 8){chartend = 8;}
				if (chartstart<0){chartstart=0;}
				if (chartend>myjobs.length-1){chartend=myjobs.length-1;}
				}
			else{
				chartstart = 0;
				chartend = myjobs.length-1;
				}
			var i=chartstart;
			while (i<=chartend){
				context.fillText(myjobs[i].type,x+0,y+24+20*(i-chartstart));
				context.fillText(myjobs[i].targetlocationname,x+100,y+24+20*(i-chartstart));
				context.fillText(myjobs[i].distance,x+200,y+24+20*(i-chartstart));
				context.fillText(myjobs[i].danger,x+300,y+24+20*(i-chartstart));
				context.fillText(myjobs[i].reward,x+400,y+24+20*(i-chartstart));
				i++;
				}
		
			}
		context.beginPath(); //This colored rectangle will show which item is selected.
		context.strokeStyle = joblistcolor;
		context.rect(x-2,y+8+(theplayer.jobitem-chartstart)*20,500,20);
		context.stroke();	
		
		}
	}//end of system class////////////////////////////////////////////////////////////////////////////////////////////////////////////////
