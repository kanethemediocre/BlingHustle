function hud(playerindex){
	var myplayer = systems[ps].players[playerindex];
	context.font='12px Arial';
	context.fillStyle = "white"; 
	var shipsinrange = [];//To help guide what ships are targetable by the player, I'm generating a list of indices
	var closestdistance = 999999;//needs to be larger than radarrange 
	var closestindex = 0; //defaults to self-targeting if no ships in range
	var i=0;
	while (i<systems[ps].ships.length){ //this loop makes the short list
		var tdistance = Math.floor(myplayer.ship.distance(systems[ps].ships[i]));
		if (tdistance<myplayer.radarrange){
			shipsinrange.push(i);
			if (myplayer.ship.pointingat(systems[ps].ships[i])){
				myplayer.shiptarget = i;	
				}
			if (tdistance<closestdistance){
				closestdistance = tdistance;
				closestindex = shipsinrange.length-1;
				}
			}
		i++;
		}
	if (myplayer.ship.distance(systems[ps].ships[myplayer.shiptarget])>myplayer.radarrange){
		myplayer.shiptarget=0;
		closestindex = 0;
		}
	var i=0;
	if (nmeactive == 1){//if targeting computer is on...
			context.font='12px Courier New';
			var sorttargets = [];//No sorting yet
			var i = 0 //assumes each column is same length, otherwise error
			while(i<shipsinrange.length){
				var cellposx = canvas.width-300;
				var cellposy = 16+i*16;
				context.fillStyle = systems[ps].ships[shipsinrange[i]].c;
				context.fillText(systems[ps].ships[shipsinrange[i]].name,cellposx,cellposy);
				var cellposx = canvas.width-300+64;
				var shipdistance = myplayer.ship.distance(systems[ps].ships[shipsinrange[i]]);
				context.fillText(shipdistance,cellposx,cellposy);
				i=i+1;
				}
			context.fillStyle = "white";  
		if (shipsinrange.length == 0){
			context.font = '20px Ariel';
			context.fillStyle = "red";
			context.fillText("No targets in range", canvas.width-160, 24);
			}
	//if (myplayer.shiptarget>shipsinrange.length-1){myplayer.shiptarget = 0;}
	//else if (myplayer.shiptarget<0){myplayer.shiptarget = 0;}
	if (shipsinrange.length>0){
		//shipsinrange[shiptarget][0].drawcompass(ships[0],canvas.width-64, 96, 64); //Targeting computer compass
		myplayer.ship.drawcompass2(systems[ps].ships[myplayer.shiptarget],canvas.width-64, 96, 64); //Targeting computer compass
		systems[ps].ships[myplayer.shiptarget].drawreticle(myplayer.ship.x,myplayer.ship.y); //Targeting reticle
		var nmechart2 = [["Name","Level","HP","Shield","Damage","Blast","Regen", "AI"],[systems[ps].ships[myplayer.shiptarget].name, systems[ps].ships[myplayer.shiptarget].level, systems[ps].ships[myplayer.shiptarget].hp,  systems[ps].ships[myplayer.shiptarget].shield,  systems[ps].botbombs[myplayer.shiptarget].hurt, systems[ps].botbombs[myplayer.shiptarget].boombuff,systems[ps].ships[myplayer.shiptarget].shieldregen,systems[ps].ships[myplayer.shiptarget].ai]];
		showchart(nmechart2, 64, 16, canvas.width-128,192);//test location
		context.beginPath(); 
		context.rect(canvas.width-304,4+16*closestindex, 160, 16); //This is the item selection indicator
		context.lineWidth = 2; 
		context.strokeStyle = "white";
		context.stroke();	
		}
	}
	var i=0;
	while (i<vkeys.length){
		vkeys[i].draw();
		i++;
		}
///////////////Navigation hud///////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (myplayer.navactive > 0){

		var thenavtarget=0;
		if (myplayer.navactive==1){
			thenavtarget=systems[ps].planets[myplayer.navtarget];
			}
		if (myplayer.navactive==2){
			if (myplayer.navtarget < 0) {myplayer.navtarget = 0;}//maybe not necessary?
			else if (myplayer.navtarget>systems[ps].outposts.length-1){myplayer.navtarget = 0;			}
			thenavtarget=systems[ps].outposts[myplayer.navtarget];
			}
		thenavtarget.drawcompass(myplayer.ship,canvas.width-64,canvas.height-96, 64); //Nav computer compass for planets
		var solardistance = systems[ps].planets[0].distance(myplayer.ship); //distance to sun
		var solargravity = (.0003*systems[ps].planets[0].m)/(solardistance*solardistance); //Gravitational influence of sun, pixels per frame per frame.
		var distance = thenavtarget.distance(myplayer.ship); //distance to target planet
		var planetarygravity = (.0003*thenavtarget.m)/(distance*distance); //gravity from target planet
		var name = thenavtarget.name.slice(0,16);
		var pclass = "Moon"; //Defaults to Moon,
		if (thenavtarget==0){pclass = "Star";} //0 index is the sun
		else if (thenavtarget.parentid == 0){pclass = "Planet";}//Objects orbiting sun are planets
		if (myplayer.navactive==2){pclass = "Station"; }
		var size = String(Math.floor(thenavtarget.s));
		var mass = String(Math.floor(thenavtarget.m/1000));
		var parent = systems[ps].planets[thenavtarget.parentid].name;	
		var orbitradius = thenavtarget.distance(systems[ps].planets[thenavtarget.parentid]);
		var orbitspeed = thenavtarget.deltav(systems[ps].planets[thenavtarget.parentid]);
		var orbitpos = systems[ps].planets[thenavtarget.parentid].directionof(thenavtarget);
		while (orbitpos > Math.PI){orbitpos=orbitpos - 2*Math.PI;} //This reduces the angle difference to within +- Math.PI
		while (orbitpos < -1*Math.PI){orbitpos = orbitpos + 2*Math.PI;}
		var distance = thenavtarget.distance(myplayer.ship); //distance to target planet
		//var planetarygravity = (.0003*planets[navtarget].m)/(distance*distance); //gravity from target planet
		var gravity = 0;
		if (myplayer.navactive==1){ gravity = ((.0003*thenavtarget.m*900)/(distance*distance)).toFixed(3); }
		var dv = thenavtarget.deltav2(myplayer.ship);
		var deltav = (dv[0]).toFixed(3).padStart(8,"0");
		var cosdv =  Math.cos(dv[1]-myplayer.ship.directionof(thenavtarget))*dv[0];
		var sindv =  Math.sin(dv[1]-myplayer.ship.directionof(thenavtarget))*dv[0];
		var escape = 0;
		if (myplayer.navactive == 1){escape = Math.sqrt(thenavtarget.m*2*.0003/myplayer.ship.distance(thenavtarget));}
		var navchart2 = [ ["Name","Class", "Size", "Mass", "Parent", "Orbit Radius", "Orbit speed", "Orbit Position"], [name, pclass, size, mass, parent, Math.floor(orbitradius), Math.floor(orbitspeed), orbitpos.toFixed(3)],  ["Distance","DeltaV", "Cos DV", "Sin DV", "Gravity", "Escape","X","Y"], [Math.floor(distance),deltav, cosdv.toFixed(3), sindv.toFixed(3), gravity, escape.toFixed(3),Math.floor(thenavtarget.x), Math.floor(thenavtarget.y)]  ];
		showchart(navchart2, 80, 16, canvas.width-480,canvas.height-160);	
		}
	else {
		context.font = '20px Ariel';
		context.fillStyle = "white";
		context.fillText("Navigation is off", canvas.width-160, canvas.height-16);
		}
	//context.fillText("Press N key to cycle navigation computer mode",canvas.width-300,canvas.height-8);
////////////////////////Map/////////////////////////////////////
			//if (mapactive == 1){drawmap(planets,256,canvas.width/2,canvas.height/2, ships[0].x, ships[0].y);}
			//planets[0].drawcompass(ships[0],canvas.width/2,canvas.height-48); //Nav computer compass for sun
///////////////Rest of HUD/////////////////////////////////////////////////////////////////////////////////////////////////	
	var sbl = 150; //status bar length
	context.font='12px Arial';
	context.fillStyle = "orange"; //thruster power bar 
    context.fillRect(4, 84,Math.floor(sbl*myplayer.thruster/100), 16);
	context.strokeStyle = "orange";
	context.beginPath();
	context.rect(4,84,sbl,16);
	context.stroke();
	context.fillStyle = "red"; //weapons energy bar
    context.fillRect(4, 64,Math.floor(sbl*myplayer.energy/100), 16);
	context.strokeStyle = "red";
	context.beginPath();
	context.rect(4,64,sbl,16);
	context.stroke();
	context.fillStyle = "purple"; //weapons energy bar
    context.fillRect(4, 44,Math.floor(sbl*myplayer.levelcheck()), 16);
	context.strokeStyle = "purple";
	context.beginPath();
	context.rect(4,44,sbl,16);
	context.stroke();
	context.fillStyle = "blue"; //shield bar
    context.fillRect(4, 24,Math.floor(sbl*myplayer.ship.shield/myplayer.ship.maxshield), 16);
	context.strokeStyle = "blue";
	context.beginPath();
	context.rect(4,24,sbl,16);
	context.stroke();
	context.fillStyle = "green"; //health bar
    context.fillRect(4, 4,Math.floor(sbl*myplayer.ship.hp/myplayer.ship.maxhp), 16);
	context.strokeStyle = "green";
	context.beginPath();
	context.rect(4,4,sbl,16);
	context.stroke();
	context.fillStyle = "white";
	myplayer.levelcheck();//Remove this to run this function less.
	var statuschart1 = [ ["Health","Shields","Level "+myplayer.ship.level,"Weapons", "Thrusters"]  ];
	showchart(statuschart1, 80, 20, 8,16);	
	context.font='16px Arial';
	context.fillStyle = "yellow";
	context.fillText("Bling",5,116);
	context.fillText(myplayer.money,50,116);//Displays how much money the player has
	if (myplayer.gotmoney[0]>0){//If the player has received money recently, display how much and decrement the display lifetime of that event.
		myplayer.gotmoney[0] = myplayer.gotmoney[0]-1;//gotmoney[0] is the timer integer
		context.fillStyle = "green";
		context.fillText("+"+myplayer.gotmoney[1],100,116);//gotmoney[1] is the value integer
		context.fillStyle = "white";
		}
	context.fillStyle = "red";
	context.fillRect(16*myplayer.wep-160*Math.floor(myplayer.wep/10),124+16*Math.floor(myplayer.wep/10),14,20);//This highlights which blaster the player has selected
	//context.fillRect(16*myplayer.wep-160*Math.floor(i/10),104+16*Math.floor(i/10),14,20);//This highlights which blaster the player has selected
	context.font='14px Arial';
	var i=0;//This indicates available blasters to the user
	while(i<myplayer.blasters.length){
		if (myplayer.blasters[i].phas){context.fillStyle = "white";}else{context.fillStyle = "grey";}
		context.fillText(i,16*i-160*Math.floor(i/10),140+16*Math.floor(i/10));
		i=i+1;
	}
	context.fillStyle = "red";
	context.font='20px Arial';
	context.fillText(myplayer.blasters[myplayer.wep].name,8,180);

	context.fillStyle = "white";
	context.fillText(myplayer.boosters[0],8,208);//0 index is booster type
	context.fillText(myplayer.boosters[myplayer.boosters[0]],8,236);
	context.font='16px Arial';
	context.fillStyle = "green"; 
	context.fillText("task: "+myplayer.task,8,260);//The task is a brief description of the last thing a player was asked to do.
	context.fillStyle = "yellow";
	context.fillText("job: ("+myplayer.jobs.length+" jobs) "+myplayer.job,8,280);//Jobs are missions taken from station menus.  This indicates latest and how many jobs.
	context.fillStyle = "white";
	context.font='12px Arial';
	context.fillText("dockstate: "+myplayer.dockstate,8,336);//Debugging stuff
	context.fillText("storystate: "+myplayer.storystate,8,352);
	context.fillText("probemode: "+myplayer.probemode,8,368);
	context.fillText("autopilot: "+myplayer.autopilot,8,384);
	context.fillText("nav target active "+systems[ps].planets[myplayer.navtarget].active,8,400);
	//context.fillText("ship target active "+systems[ps].ships[myplayer.shiptarget].active,8,330);
	if (myplayer.ship.hp==-1000){//This is the death screen.
		context.fillStyle = "red";
		context.font='24px Arial';
		context.fillText("u ded bruh.  Maybe take a break for "+myplayer.ship.deadtime+" frames.",canvas.width/2,canvas.height/2);
		context.fillStyle = "white";
		context.font='12px Arial';
	}
	context.fillStyle = "white";
	context.font='12px Arial';
	playerradio.display(time);
//Journal display if active
	if (myplayer.journalactive==1){//Journal of radio messages
		if (myplayer.journalitem>playerradio.log.length-1){myplayer.journalitem=0;}
		context.fillStyle = "skyblue";
		context.strokeStyle = "skyblue";
		playerradio.showlog(myplayer.journalitem,200,64);
		//if (playerradio.log.length>0){ playerradio.showlog(myplayer.journalitem,200,50); }
		//else{
		//	context.fillText("No journal entries",200,50);//The task is a brief description of the last thing a player was asked to do.
		//}
		//drawaskeyspecial(700,160,60,24,"Up","white");
		//drawaskeyspecial(700,200,60,24,"Down","white");
		vkeys[16].display = true;
		vkeys[16].active = true;	
		vkeys[17].display = true;
		vkeys[17].active = true;	
		vkeys[22].display = false;
		vkeys[22].active = false;
		vkeys[23].display = false;
		vkeys[23].active = false;
		vkeys[24].display = false;
		vkeys[24].active = false;
		vkeys[25].display = false;
		vkeys[25].active = false;	
	}else if (myplayer.journalactive==2){ //journal of jobs taken
	
		systems[ps].joblist(200,64,myplayer);

		//display jobs
	}else{
		vkeys[16].display = false;
		vkeys[16].active = false;
		vkeys[17].display = false;
		vkeys[17].active = false;	
		vkeys[22].display = true;
		vkeys[22].active = true;
		vkeys[23].display = true;
		vkeys[23].active = true;	
		vkeys[24].display = true;
		vkeys[24].active = true;
		vkeys[25].display = true;
		vkeys[25].active = true;		
		
	}
	
//Autopilot indicator
	if (myplayer.autopilot>0){
		context.fillStyle = "red";
		context.font='32px Arial';
		context.fillText("Autopilot on",canvas.width/2 - 80,canvas.height/2 - 100);
		}
	if (myplayer.emenu){
		testquiz.draw(500,200);
		//testmodule.drawplots(700,400);
		}
////Shopping!//////////////////////////////////////////////////////
	if ((myplayer.dockstate>=0)&&(myplayer.dockstate<systems[ps].shops.length)){
		//console.log("itriedtodrawthebuymenu0");
		//drawaskeyspecial(480,32,128,24,"Backspace","white");
		//drawaskeyspecial(800,180,80,24,"Enter","white");
		
		//drawaskeyspecial(800,140,60,24,"Up","white");
		//drawaskeyspecial(800,220,60,24,"Down","white");
		vkeys[18].display = true;//these assignments get executed redundantly, fixable
		vkeys[18].active = true;//up and down
		vkeys[19].display = true;
		vkeys[19].active = true;
		vkeys[20].display = true;//backspace and enter
		vkeys[20].active = true;		
		vkeys[21].display = true;
		vkeys[21].active = true;	
		if (myplayer.shopmode == 0){
			//console.log("itriedtodrawthebuymenu1");
			if (myplayer.shopitem >= systems[ps].shops[myplayer.dockstate].inv.length){myplayer.shopitem=0;}
			//console.log("itriedtodrawthebuymenu2");
			systems[ps].shops[myplayer.dockstate].drawbuymenu(400,64,myplayer.shopitem,myplayer);//y u no work
		}else if (myplayer.shopmode == 1){
			//console.log("itriedtodrawthebuymenu3");
			systems[ps].shops[myplayer.dockstate].drawsellmenu(400,64,myplayer.shopitem,myplayer);
		}else if (myplayer.shopmode == 2){
			//console.log("itriedtodrawthebuymenu4");
			systems[ps].shops[myplayer.dockstate].drawworkmenu(400,64,myplayer.shopitem,myplayer);
		}
	}else{ 
		vkeys[18].display = false;//these assignments get executed redundantly every frame, fixable
		vkeys[18].active = false;
		vkeys[19].display = false;
		vkeys[19].active = false;	
		vkeys[20].display = false;//these assignments get executed redundantly every frame, fixable
		vkeys[20].active = false;
		vkeys[21].display = false;
		vkeys[21].active = false;		
		}
	//draw cargo stuff
	if (diagnostic == 1){myplayer.blasters[myplayer.wep].drawstats(canvas.width-200,400);}
	if (diagnostic == 2){myplayer.inventory.draw(canvas.width-200,400);}//Oof, add to player
	if (diagnostic == 3){//this should be togglable
		context.fillStyle = "teal";
		context.font='12px Arial';
		var titles = ["Armor",    "Max Armor",    "Shield",       "Max Shield",      "Shield Regen",      "Radar Range","Cargo Max",             ];
		var values = [myplayer.ship.hp,myplayer.ship.maxhp, myplayer.ship.shield,myplayer.ship.maxshield,myplayer.ship.shieldregen,myplayer.radarrange, playerinventory.maxcargo ];
		showchart([titles,values], 80, 16, canvas.width-200,400);
	}
	myplayer.blasters[myplayer.wep].drawsights(myplayer,time); //Draws aiming guide
	//}
	
	if (myplayer.planetmenu == 1){
		//systems[ps].drawplanetlist(0,400,100,48,80); //Mostly works.  Wasteful, could be more preprocessed
		//drawplanetlist(playerindex,x,y,ystep,scale){
		var blind = 1;
		if (myplayer.sensor >0){blind = 0;}
		var mx = mdx+canvas.width/2;
		var my = mdy+canvas.height/2;
		var ystep = 50;
		var x = 400;
		var y = 64;
		var scale = 64;
		var i=0;
		while(i<myplayer.planetarychart.length-blind){
			var dx = -64;
			var dy = ystep*(i+0)+6;
			var j = 0;
			while(j<myplayer.planetarychart[i].length){
				if (j>0){
					dx = 8+ystep*(j-0.5);
					dy = ystep*(i-0.3);
					}
				context.beginPath();  //So instead of not rendering, it will render at most recent thickness (often max)
				context.arc(x+ystep*(j), y+ystep*(i), systems[ps].planets[myplayer.planetarychart[i][j]].s/scale, 0, 2 * Math.PI, false); //until linewidth of 1 is reached.
				context.lineWidth = 4;
				//console.log("i = "+i+" j = "+j);
				context.strokeStyle = systems[ps].planets[myplayer.planetarychart[i][j]].c;
				context.stroke();
				context.fillStyle = "white";
				context.font = "16px Ariel";
				context.fillText(systems[ps].planets[myplayer.planetarychart[i][j]].name,x+dx,y+dy);
				if (systems[ps].players[playerindex].navtarget == myplayer.planetarychart[i][j]){//indicate planet is targeted	
					context.beginPath();  //So instead of not rendering, it will render at most recent thickness (often max)
					context.rect(x+ystep*(j)-ystep*0.4, y-ystep*0.4+ystep*(i),ystep*0.8,ystep*0.8); //until linewidth of 1 is reached.
					context.lineWidth = 2;
					context.strokeStyle = "white";
					context.stroke();
					}
				j++;
				}
			i++;
			}
		if ((mx>x)&&(my>y)){
			var mi = Math.floor((my-y)/ystep);
			var mj = Math.floor((mx-x)/ystep);
			if (mi<myplayer.planetarychart.length-blind){
				if (mj<myplayer.planetarychart[mi].length){
					myplayer.navtarget = myplayer.planetarychart[mi][mj];
					}
				}
			}
		}
		

		
	

	
var netsolarpain = 0;
if (myplayer.shieldbonus!="solar"){netsolarpain = myplayer.solarpain-1.125;}
else {netsolarpain = myplayer.solarpain - 3.125;}
if (netsolarpain > 0){
	context.font = "32px Ariel";
	context.fillStyle = "yellow";
	context.fillText("SOLAR DAMAGE",canvas.width/2-100,256);	
	
	}
if (cheatmode == 1){
	context.font = "32px Ariel";
	context.fillStyle = "red";
	context.fillText("YOU'RE A CHEATER",canvas.width/2-100,64);	
	context.font = "12px Ariel";
	context.fillText("End key gives money, Q key fires scrt blaster, W key warps to planet, V warps to next solar system",canvas.width/2-300,48);	
	}
}