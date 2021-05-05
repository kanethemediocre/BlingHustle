function hud(){
	context.font='12px Arial';
	context.fillStyle = "white"; 
	var shipsinrange = [];//To help guide what ships are targetable by the player, I'm generating a short list / shallow copy of nearby ships.
	var closestdistance = 999999;//needs to be larger than radarrange 
	var closestindex = 0; //defaults to self-targeting if no ships in range
	var i=0;//Excludes player ship
	while (i<ships.length-1){ //this loop makes the short list
		i=i+1;
		var tdistance = Math.floor(ships[0].distance(ships[i]));
		if (tdistance<radarrange){shipsinrange.push([ships[i],tdistance,i]);}//shallow-copy ship into shipsinrange, with global index for reference [theship,distance,index]
		}
	var i=0;
	while (i<shipsinrange.length){//this loop finds the closest ship
		if (shipsinrange[i][1]<closestdistance){
			closestdistance = shipsinrange[i][1];//tracks closest distance,
			//closestindex = shipsinrange[i][2]; //and the global index (as in ships[index]) of the closest ship
			closestindex = i;					
			}
		i=i+1;
		}
	if (nmeactive == 1){//if targeting computer is on...
		var i=0;
		var nmechartnames = [];
		var nmechartdistances = [];
		while (i<shipsinrange.length){
			var shipname = shipsinrange[i][0].name;
			var shipdistance = shipsinrange[i][1];
			nmechartnames.push(shipname);
			nmechartdistances.push(shipdistance);
			i=i+1;
			}
		var nmechart1 = [nmechartnames,nmechartdistances];//maybe sort this by distance some day.
		//var cxytest = [ ["first", "column", "of", "words"], ["2nd", "column", "of", "words"]       ];
		targetchart(shipsinrange,64,16,canvas.width-300,16);
		if (shipsinrange.length == 0){
			context.font = '20px Ariel';
			context.fillStyle = "red";
			context.fillText("No targets in range", canvas.width-160, 24);
			}
		}
	if (shiptarget>shipsinrange.length-1){shiptarget = 0;}
	if (shipsinrange.length>0){
		//shipsinrange[shiptarget][0].drawcompass(ships[0],canvas.width-64, 96, 64); //Targeting computer compass
		ships[0].drawcompass2(shipsinrange[shiptarget][0],canvas.width-64, 96, 64); //Targeting computer compass
		shipsinrange[shiptarget][0].drawreticle(ships[0].x,ships[0].y); //Targeting reticle
		var nmechart2 = [["Name","Level","HP","Shield","Damage","Blast","Regen"],[shipsinrange[shiptarget][0].name, shipsinrange[shiptarget][0].level, shipsinrange[shiptarget][0].hp,  shipsinrange[shiptarget][0].shield,  botbombs[shipsinrange[shiptarget][2]-1].hurt, botbombs[shipsinrange[shiptarget][2]-1].boombuff,shipsinrange[shiptarget][0].shieldregen]];
		showchart(nmechart2, 64, 16, canvas.width-128,192);//test location
		context.beginPath(); 
		context.rect(canvas.width-304,4+16*shiptarget, 160, 16); //This is the item selection indicator
		context.lineWidth = 2; 
		context.strokeStyle = "white";
		context.stroke();	
		}
	//targetchart(shipsinrange,64,16,canvas.width-200,700);
	//maybe causeing the graphical problems?
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
	if (navactive > 0){
		var thenavtarget=0;
		if (navactive==1){thenavtarget=planets[navtarget];}
		if (navactive==2){thenavtarget=outposts[navtarget];}
		thenavtarget.drawcompass(ships[0],canvas.width-64,canvas.height-96, 64); //Nav computer compass for planets
		var solardistance = planets[0].distance(ships[0]); //distance to sun
		var solargravity = (.0003*planets[0].m)/(solardistance*solardistance); //Gravitational influence of sun, pixels per frame per frame.
		var distance = thenavtarget.distance(ships[0]); //distance to target planet
		var planetarygravity = (.0003*thenavtarget.m)/(distance*distance); //gravity from target planet
		var name = thenavtarget.name;
		var pclass = "Moon"; //Defaults to Moon,
		if (navtarget==0){pclass = "Star";} //0 index is the sun
		else if (thenavtarget.parentid == 0){pclass = "Planet";}//Objects orbiting sun are planets
		var size = String(Math.floor(thenavtarget.s));
		var mass = String(Math.floor(thenavtarget.m/1000));
		var parent = planets[thenavtarget.parentid].name;	
		var orbitradius = thenavtarget.distance(planets[thenavtarget.parentid]);
		var orbitspeed = thenavtarget.deltav(planets[thenavtarget.parentid]);
		var orbitpos = planets[thenavtarget.parentid].directionof(thenavtarget);
		while (orbitpos > Math.PI){orbitpos=orbitpos - 2*Math.PI;} //This reduces the angle difference to within +- Math.PI
		while (orbitpos < -1*Math.PI){orbitpos = orbitpos + 2*Math.PI;}
		var distance = thenavtarget.distance(ships[0]); //distance to target planet
		//var planetarygravity = (.0003*planets[navtarget].m)/(distance*distance); //gravity from target planet
		var gravity = ((.0003*thenavtarget.m*900)/(distance*distance)).toFixed(3);
		var dv = thenavtarget.deltav2(ships[0]);
		var deltav = (dv[0]).toFixed(3).padStart(8,"0");
		var cosdv =  Math.cos(dv[1]-ships[0].directionof(thenavtarget))*dv[0];
		var sindv =  Math.sin(dv[1]-ships[0].directionof(thenavtarget))*dv[0];
		var escape = Math.sqrt(thenavtarget.m*2*.0003/ships[0].distance(thenavtarget));
		var navchart2 = [ ["Name","Class", "Size", "Mass", "Parent", "Orbit Radius", "Orbit speed", "Orbit Position"], [name, pclass, size, mass, parent, Math.floor(orbitradius), Math.floor(orbitspeed), orbitpos.toFixed(3)],  ["Distance","DeltaV", "Cos DV", "Sin DV", "Gravity", "Escape","X","Y"], [Math.floor(distance),deltav, cosdv.toFixed(3), sindv.toFixed(3), gravity, escape.toFixed(3),Math.floor(planets[navtarget].x), Math.floor(planets[navtarget].y)]  ];
		showchart(navchart2, 80, 16, canvas.width-480,canvas.height-160);	
		}
	//context.fillText("Press N key to cycle navigation computer mode",canvas.width-300,canvas.height-8);
////////////////////////Map/////////////////////////////////////
			//if (mapactive == 1){drawmap(planets,256,canvas.width/2,canvas.height/2, ships[0].x, ships[0].y);}
			//planets[0].drawcompass(ships[0],canvas.width/2,canvas.height-48); //Nav computer compass for sun
///////////////Rest of HUD/////////////////////////////////////////////////////////////////////////////////////////////////	
	context.font='12px Arial';
	context.fillStyle = "orange"; //thruster power bar 
    context.fillRect(4, 64,Math.floor(0.64*thruster), 16);
	context.fillStyle = "red"; //weapons energy bar
    context.fillRect(4, 44,Math.floor(0.64*energy), 16);
	context.fillStyle = "blue"; //shield bar
    context.fillRect(4, 24,Math.floor(64*ships[0].shield/ships[0].maxshield), 16);
	context.fillStyle = "green"; //health bar
    context.fillRect(4, 4,Math.floor(64*ships[0].hp/ships[0].maxhp), 16);
	context.fillStyle = "white";
	var statuschart1 = [ ["Health","Shields", "Weapons", "Thrusters"]  ];
	showchart(statuschart1, 80, 20, 8,16);	
	context.fillText("Money",5,90);
	context.fillText(money,50,90);
	if (gotmoney[0]>0){
		gotmoney[0] = gotmoney[0]-1;
		context.fillStyle = "green";
		context.fillText("+"+gotmoney[1],100,90);
		context.fillStyle = "white";
		}
	context.fillStyle = "red";
	context.fillRect(8+8*wep,96,8,16);
	if (w0>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}
	context.fillText("0",8,110);
	if (w1>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}
	context.fillText("1",16,110);
	if (w2>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}
	context.fillText("2",24,110);
	if (w3>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}
	context.fillText("3",32,110);
	if (w4>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}
	context.fillText("4",40,110);
	if (w5>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}
	context.fillText("5",48,110);
	if (w6>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}
	context.fillText("6",56,110);
	if (w7>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}
	context.fillText("7",64,110);
	if (w8>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}
	context.fillText("8",72,110);
	if (w9>0){context.fillStyle = "white";}else{context.fillStyle = "grey";}
	context.fillText("9",80,110);
	context.fillStyle = "white";
	context.fillText(boosters[0],8,150);
	context.fillText(boosters[boosters[0]],8,175);
	
	
	//context.fillText(wep,32,144);
	context.fillText("Mouse aims, left-flick fires, right-click thrusts, 1234567890 selects weapons. M toggles map mode, N toggles nav computer mode, < and > cycles nav targets, [ and ] cycles enemy targets, T for closest target (sometimes)",128,10);
	if (ships[0].hp==-1000){
		context.fillStyle = "red";
		context.font='24px Arial';
		context.fillText("u ded bruh."+ships[0].deadtime,canvas.width/2,canvas.height/2);
		context.fillStyle = "white";
		context.font='12px Arial';
	}
	context.fillStyle = "white";
	context.font='12px Arial';
	playerradio.display(time);
//Journal display if active
if (journalactive){
		context.fillStyle = "teal";
		playerradio.showlog(0);
	}
////Shopping!//////////////////////////////////////////////////////
if (dockstate==1){//Earf station
	context.fillText("Up and Down to select, Enter to purchase.",canvas.width/2+64,canvas.height/2-120);
	var shopchart1 = [ ["$20 Repair hull", "$200 w3 Flakker", "$600 w1 Blaster Upgrade I (detonator)","$1000 w3 Flakker Upgrade I (damage)","$1000 w6 Laser","$800 Single-use extra hull","$500 Booster I","EMPTY","EMPTY","EMPTY"]  ];
	context.font='12px Arial';
	context.fillStyle = "white";
	showchart(shopchart1, 80,20,canvas.width/2+64, canvas.height/2-90);	
	context.fillText(shopitem,canvas.width/2+64,canvas.height/2+120);	
	context.beginPath(); 
	context.rect(canvas.width/2+60,canvas.height/2-104+20*shopitem, 256, 18); //This is the item selection indicator
	context.lineWidth = 2; 
	context.strokeStyle = "green";
	context.stroke();	
	}
if (dockstate==2){//Merz station
	context.fillText("Up and Down to select, Enter to purchase.",canvas.width/2+64,canvas.height/2-120);
	var shopchart1 = [ ["$20 Repair hull","$400 w2 Mine", "$200 w3 Flakker", "$600 w1 Blaster Upgrade I (detonator)","$1000 Armor Upgrade I","$3000 Radar Upgrade I","$400 Single-use extra hull","$500 Booster I","EMPTY","EMPTY"]  ];
	context.font='12px Arial';
	context.fillStyle = "white";
	showchart(shopchart1, 80,20,canvas.width/2+64, canvas.height/2-90);	
	context.fillText(shopitem,canvas.width/2+64,canvas.height/2+120);	
	context.beginPath(); 
	context.rect(canvas.width/2+60,canvas.height/2-104+20*shopitem, 256, 18); //This is the item selection indicator
	context.lineWidth = 2; 
	context.strokeStyle = "green";
	context.stroke();	
	}
if (dockstate==3){//Jupe station
	context.fillText("Up and Down to select, Enter to purchase.",canvas.width/2+64,canvas.height/2-120);
	var shopchart1 = [ ["$20 Repair hull","$400 w2 Mine", "$200 w3 Flakker", "$1000 w4 Railgun","$600 w1 Blaster Upgrade I (detonator)","$1200 w2 Mine Upgrade I (detonator)","$1000 w3 Flakker Upgrade I (damage)","$1000 Armor Upgrade I","$2000 Shield Upgrade I","$800 Single-use extra hull"]  ];
	context.font='12px Arial';
	context.fillStyle = "white";
	showchart(shopchart1, 80,20,canvas.width/2+64, canvas.height/2-90);	
	context.fillText(shopitem,canvas.width/2+64,canvas.height/2+120);	
	context.beginPath(); 
	context.rect(canvas.width/2+60,canvas.height/2-104+20*shopitem, 256, 18); //This is the item selection indicator
	context.lineWidth = 2; 
	context.strokeStyle = "green";
	context.stroke();	
	}
if (dockstate==4){//Anus station
	context.fillText("Up and Down to select, Enter to purchase.",canvas.width/2+64,canvas.height/2-120);
	var shopchart1 = [ ["$20 Repair hull","$1000 w4 Railgun","$2400 w5 SpreadShot Cannon","$4000 w6 Lazzor","$6000 w7 Double Rainbow","$4000 w8 Spectral Disintegrator", "$10000 w9 Bapadoop","$2000 Shield Upgrade I","$400 Single-use extra hull","EMPTY"]  ];
	context.font='12px Arial';
	context.fillStyle = "white";
	showchart(shopchart1, 80,20,canvas.width/2+64, canvas.height/2-90);	
	context.fillText(shopitem,canvas.width/2+64,canvas.height/2+120);	
	context.beginPath(); 
	context.rect(canvas.width/2+60,canvas.height/2-104+20*shopitem, 256, 18); //This is the item selection indicator
	context.lineWidth = 2; 
	context.strokeStyle = "green";
	context.stroke();	
	}
}