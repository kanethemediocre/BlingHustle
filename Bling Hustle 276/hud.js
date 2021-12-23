function hud(playerindex){
	var myplayer = systems[ps].players[playerindex];
	context.font='12px Arial';
	context.fillStyle = "white"; 
	var shipsinrange = [];//To help guide what ships are targetable by the player, I'm generating a list of indices
	var closestdistance = 999999;//needs to be larger than radarrange 
	//var closestindex = 0; //defaults to self-targeting if no ships in range
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
	var i=0;
	if (nmeactive == 1){//if targeting computer is on...
			context.font='12px Courier New';
			var sorttargets = [];//No sorting yet
			var i = 0 //assumes each column is same length, otherwise error
			while(i<shipsinrange.length){
				var cellposx = canvas.width-300;
				var cellposy = 16+i*16;
				context.fillStyle = systems[ps].ships[shipsinrange[i]].c
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
		context.rect(canvas.width-304,4+16*myplayer.shiptarget, 160, 16); //This is the item selection indicator
		context.lineWidth = 2; 
		context.strokeStyle = "white";
		context.stroke();	
		}
	}
	
	drawaskey(32,149,"B","white");
	drawaskey(32,176,"G","white");
	drawaskey(canvas.width/2-104,32,"C","white");
	drawaskey(canvas.width/2-128,canvas.height-24," ","white");
	drawaskey(canvas.width/2+128,canvas.height-24,"J","white");
	drawaskey(canvas.width-64,360,"Z","white");
	
	drawaskey(canvas.width-324,32,"[","white");
	drawaskey(canvas.width-324,64,"]","white");
	drawaskey(canvas.width-324,96,"T","white");
	drawaskey(32,canvas.height-320,"+","white");
	drawaskey(64,canvas.height-320,"-","white");
	drawaskey(96,canvas.height-320,"M","white");
	drawaskey(canvas.width-32,canvas.height-200,">","white");
	drawaskey(canvas.width-64,canvas.height-200,"<","white");
	drawaskey(canvas.width-96,canvas.height-200,"N","white");
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
		var name = thenavtarget.name;
		var pclass = "Moon"; //Defaults to Moon,
		if (thenavtarget==0){pclass = "Star";} //0 index is the sun
		else if (thenavtarget.parentid == 0){pclass = "Planet";}//Objects orbiting sun are planets
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
		var gravity = ((.0003*thenavtarget.m*900)/(distance*distance)).toFixed(3);
		var dv = thenavtarget.deltav2(myplayer.ship);
		var deltav = (dv[0]).toFixed(3).padStart(8,"0");
		var cosdv =  Math.cos(dv[1]-myplayer.ship.directionof(thenavtarget))*dv[0];
		var sindv =  Math.sin(dv[1]-myplayer.ship.directionof(thenavtarget))*dv[0];
		var escape = Math.sqrt(thenavtarget.m*2*.0003/myplayer.ship.distance(thenavtarget));
		var navchart2 = [ ["Name","Class", "Size", "Mass", "Parent", "Orbit Radius", "Orbit speed", "Orbit Position"], [name, pclass, size, mass, parent, Math.floor(orbitradius), Math.floor(orbitspeed), orbitpos.toFixed(3)],  ["Distance","DeltaV", "Cos DV", "Sin DV", "Gravity", "Escape","X","Y"], [Math.floor(distance),deltav, cosdv.toFixed(3), sindv.toFixed(3), gravity, escape.toFixed(3),Math.floor(thenavtarget.x), Math.floor(thenavtarget.y)]  ];
		showchart(navchart2, 80, 16, canvas.width-480,canvas.height-160);	
		}
	//context.fillText("Press N key to cycle navigation computer mode",canvas.width-300,canvas.height-8);
////////////////////////Map/////////////////////////////////////
			//if (mapactive == 1){drawmap(planets,256,canvas.width/2,canvas.height/2, ships[0].x, ships[0].y);}
			//planets[0].drawcompass(ships[0],canvas.width/2,canvas.height-48); //Nav computer compass for sun
///////////////Rest of HUD/////////////////////////////////////////////////////////////////////////////////////////////////	
	context.font='12px Arial';
	context.fillStyle = "orange"; //thruster power bar 
    context.fillRect(4, 64,Math.floor(0.64*myplayer.thruster), 16);
	context.fillStyle = "red"; //weapons energy bar
    context.fillRect(4, 44,Math.floor(0.64*myplayer.energy), 16);
	context.fillStyle = "blue"; //shield bar
    context.fillRect(4, 24,Math.floor(64*myplayer.ship.shield/myplayer.ship.maxshield), 16);
	context.fillStyle = "green"; //health bar
    context.fillRect(4, 4,Math.floor(64*myplayer.ship.hp/myplayer.ship.maxhp), 16);
	context.fillStyle = "white";
	var statuschart1 = [ ["Health","Shields", "Weapons", "Thrusters"]  ];
	showchart(statuschart1, 80, 20, 8,16);	
	context.fillText("Money",5,90);
	context.fillText(myplayer.money,50,90);
	if (myplayer.gotmoney[0]>0){
		myplayer.gotmoney[0] = myplayer.gotmoney[0]-1;
		context.fillStyle = "green";
		context.fillText("+"+myplayer.gotmoney[1],100,90);
		context.fillStyle = "white";
		}
	context.fillStyle = "red";
	context.fillRect(8*myplayer.wep,96,8,16);
	
	var i=0;//This indicates selected and available blasters to the user
	while(i<myplayer.blasters.length){
		if (myplayer.blasters[i].phas){context.fillStyle = "white";}else{context.fillStyle = "grey";}
		context.fillText(i,8*i,110);
		i=i+1;
	}
	context.fillStyle = "white";
	context.fillText(myplayer.boosters[0],8,150);//0 index is booster type
	context.fillText(myplayer.boosters[myplayer.boosters[0]],8,175);
	context.font='12px Arial';
	context.fillStyle = "green"; 
	context.fillText("task: "+myplayer.task,8,200);
	context.fillStyle = "yellow";
	context.fillText("job: ("+myplayer.jobs+" jobs) "+myplayer.job,8,216);
	context.fillStyle = "white";
	context.fillText("dockstate: "+myplayer.dockstate,8,250);//Debugging stuff
	context.fillText("storystate: "+myplayer.storystate,8,266);
	context.fillText("probemode: "+myplayer.probemode,8,282);
	context.fillText("autopilot: "+myplayer.autopilot,8,298);
	context.fillText("nav target active "+systems[ps].planets[myplayer.navtarget].active,8,314);
	//context.fillText("ship target active "+systems[ps].ships[myplayer.shiptarget].active,8,330);
	
	if (myplayer.ship.hp==-1000){
		context.fillStyle = "red";
		context.font='24px Arial';
		context.fillText("u ded bruh."+myplayer.ship.deadtime,canvas.width/2,canvas.height/2);
		context.fillStyle = "white";
		context.font='12px Arial';
	}
	context.fillStyle = "white";
	context.font='12px Arial';
	playerradio.display(time);
//Journal display if active
	if (myplayer.journalactive==1){
		if (myplayer.journalitem>playerradio.log.length-1){myplayer.journalitem=0;}
		context.fillStyle = "teal";
		playerradio.showlog(myplayer.journalitem,200,50);
	}else if (myplayer.journalactive==2){
		systems[ps].joblist(200,50);
		//display jobs
	}
	
////Shopping!//////////////////////////////////////////////////////
	if ((myplayer.dockstate>=0)&&(myplayer.dockstate<systems[ps].shops.length)){
		drawaskeyspecial(480,32,128,24,"Backspace","white");
		drawaskeyspecial(800,180,80,24,"Enter","white");
		drawaskeyspecial(800,140,60,24,"Up","white");
		drawaskeyspecial(800,220,60,24,"Down","white");
		if (myplayer.shopmode == 0){
			if (myplayer.shopitem >= systems[ps].shops[myplayer.dockstate].inv.length){myplayer.shopitem=0;}
			systems[ps].shops[myplayer.dockstate].drawbuymenu(400,64,myplayer.shopitem,myplayer);//y u no work
		}else if (myplayer.shopmode == 1){
			systems[ps].shops[myplayer.dockstate].drawsellmenu(400,64,myplayer.shopitem,myplayer);
		}else if (myplayer.shopmode == 2){
			systems[ps].shops[myplayer.dockstate].drawworkmenu(400,64,myplayer.shopitem,myplayer);
		}
	}
	//draw cargo stuff
	if (diagnostic == 1){myplayer.blasters[myplayer.wep].drawstats(canvas.width-200,400);}
	if (diagnostic == 2){playerinventory.draw(canvas.width-200,400);}//Oof, add to player
	if (diagnostic == 3){//this should be togglable
		context.fillStyle = "teal";
		context.font='12px Arial';
		var titles = ["Armor",    "Max Armor",    "Shield",       "Max Shield",      "Shield Regen",      "Radar Range","Cargo Max",             ];
		var values = [myplayer.ship.hp,myplayer.ship.maxhp, myplayer.ship.shield,myplayer.ship.maxshield,myplayer.ship.shieldregen,myplayer.radarrange, playerinventory.maxcargo ];
		showchart([titles,values], 80, 16, canvas.width-200,400);
	}
if (cheatmode == 1){
	context.font = "32px Ariel";
	context.fillStyle = "red";
	context.fillText("YOU'RE A CHEATER",canvas.width/2-100,64);	
	context.font = "12px Ariel";
	context.fillText("End key gives money, Q key fires scrt blaster, W key warps to planet, V warps to next solar system, X summons rainbow monster",canvas.width/2-300,48);	
	}


}