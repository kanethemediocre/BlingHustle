document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    mdx =  e.clientX - canvas.width/2;
	mdy =  e.clientY - canvas.height/2;
	moused = -1*Math.atan2(mdx,mdy) - Math.PI/2;
	mousedistance = Math.sqrt(mdx*mdx+mdy*mdy);
	//clicktester=clicktester+1;  //Apparently also fucked, but not normally a problem.
} //I should figure that out better.
document.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(e) {
mousestate = e.buttons;
if (mousestate==1){ //if it's the left button
	if (wep == 1){
		if ((w1 > 1)&&(playerbombs[0].timer > 4)){playerbombs[0].timer = 6;} //This remote detonation code doesn't work with mousedown for some reason
		else if ((energy > 20)&&(w1>0)){ //If ship has energy and weapon 1.
			ships[0].launchbomb(playerbombs[0],12, 120);  //launch bomb[0] 12 pixels per frame, timed to explode in 120 frames.
			energy = energy - 20; //w1 costs 20 energy
			}
		}
	if (wep == 2){
		if ((w2 > 1)&&(playerbombs[1].timer > 4)){playerbombs[1].timer = 6;} 
		else if ((energy > 50)&&(w2>0)){ 
			ships[0].launchbomb(playerbombs[1],1, 1800);//A mere 1 pixel per frame, but for 1800 frames (60s).
			energy = energy - 50;
			}
		}
	if (wep == 3){
		 if ((energy > 30)&&(w3>0)){ //If ship has energy and weapon 3.
				ships[0].launchbomb(playerbombs[2],16, 12);
				energy = energy - 33;
			}
		}						
	if (wep == 4){
		if ((energy > 75)&&(w4>0)){ //If ship has energy and weapon 4.
				ships[0].launchbomb(playerbombs[3],24, 120);  
				energy = energy - 75; 
			}
		}
	if (wep == 5){
		if (energy > 40){ //If ship has energy
			var shipdsave = ships[0].d; 
			//var spread = 0.4;
			if (mousedistance>(canvas.width*0.6)){var spread = (Math.PI*0.75)/(canvas.width*0.6/32);}
			else if (mousedistance<32){var spread = (Math.PI*0.75)/(32/32);}
			else {var spread = (Math.PI*0.75)/(mousedistance/32);}
			ships[0].d = shipdsave - spread; //Rotates the ship to accomodate launchbomb function
			ships[0].launchbomb(playerbombs[4],12, 80); //launches 1st of four bombs
			ships[0].d = shipdsave - spread/3; //rotates to next position in spread...
			ships[0].launchbomb(playerbombs[5],12, 80);//launches next bomb...
			ships[0].d = shipdsave + spread/3;
			ships[0].launchbomb(playerbombs[6],12, 80);
			ships[0].d = shipdsave + spread;
			ships[0].launchbomb(playerbombs[7],12, 80);					
			ships[0].d = shipdsave;//restores original ship direction
			energy = energy - 40; 
			}
		}
	if (wep == 6){
		if (energy > 30){ //If ship has energy
			var i = ships.length;
			while (i>1){//For all ships except 0
				i = i - 1; 
				if (ships[0].distance(ships[i])<500){
					var ptest = pointingat(ships[0].directionof(ships[i]),ships[0].d,ships[0].distance(ships[i]),ships[i].s)
					if (ptest == 1){
						ships[i].damage(50);
						var x = ships[i].x - ships[0].x + canvas.width/2;
						var y = ships[i].y - ships[0].y + canvas.height/2;
						}
					//function pointingat(objdir,dir,distance,size){ //are you pointing at a thing?
					}
				}
			context.beginPath();
			context.moveTo(canvas.width/2, canvas.height/2);
			context.lineTo(canvas.width/2+Math.cos(ships[0].d)*500,canvas.height/2+Math.sin(ships[0].d)*500);
			context.strokeStyle = "red";
			context.stroke();	
			energy = energy - 30; 
			}
		}				
	
	if (wep == 7){
		if (energy > 60){ //If ship has energy
			var shipdsave = ships[0].d; 
			if (mousedistance>(canvas.width*0.6)){var spread = (Math.PI*0.25)/(canvas.width*0.6/32);}
			else if (mousedistance<32){var spread = (Math.PI*0.25)/(32/32);}
			else {var spread = (Math.PI*0.25)/(mousedistance/32);}
			ships[0].d = shipdsave - spread*5.5; //Rotates the ship to accomodate launchbomb function
			ships[0].launchbomb(playerbombs[8],24, 24); //launches 1st of four bombs
			ships[0].d = shipdsave - spread*4.5; //Rotates the ship to accomodate launchbomb function
			ships[0].launchbomb(playerbombs[9],24, 24); //launches 1st of four bombs
			ships[0].d = shipdsave - spread*3.5; //Rotates the ship to accomodate launchbomb function
			ships[0].launchbomb(playerbombs[10],24, 24); //launches 1st of four bombs
			ships[0].d = shipdsave - spread*2.5; //rotates to next position in spread...
			ships[0].launchbomb(playerbombs[11],24, 24);//launches next bomb...
			ships[0].d = shipdsave - spread*1.5; //Rotates the ship to accomodate launchbomb function
			ships[0].launchbomb(playerbombs[12],24, 24); //launches 1st of four bombs
			ships[0].d = shipdsave - spread/2; //rotates to next position in spread...
			ships[0].launchbomb(playerbombs[13],24, 24);//launches next bomb...
			ships[0].d = shipdsave + spread/2;
			ships[0].launchbomb(playerbombs[14],24, 24);
			ships[0].d = shipdsave + spread*1.5;
			ships[0].launchbomb(playerbombs[15],24, 24);		
			ships[0].d = shipdsave + spread*2.5;
			ships[0].launchbomb(playerbombs[16],24, 24);
			ships[0].d = shipdsave + spread*3.5;
			ships[0].launchbomb(playerbombs[17],24, 24);	
			ships[0].d = shipdsave + spread*4.5;
			ships[0].launchbomb(playerbombs[18],24, 24);	
			ships[0].d = shipdsave + spread*5.5;
			ships[0].launchbomb(playerbombs[19],24, 24);				
			ships[0].d = shipdsave;//restores original ship direction
			energy = energy - 64; 
			}
		}
	if (wep == 9){
		if ((energy > 75)&&(w9>0)){ //If ship has energy and weapon 4.
				ships[0].launchbomb(playerbombs[26],16, 120); 
				playerbombs[26].hp = 1000;//weapon 9 uses a special bomb that can bounce of planets				
				energy = energy - 80; 
			}
		}
	if (wep == 0){
		if ((energy > 75)&&(w0>0)){ //If ship has energy and weapon 4.
				ships[0].launchbomb(playerbombs[27],24, 120);  
				energy = energy - 50; 
			}
		}
	}
else if (mousestate==2){//if its the right button
	if (dockstate>0){
		outposts[dockstate-1].undock(ships[0]);
		dockstate = 0;
		}
	if (thruster>0){
		ships[0].thrust = 2*thrustmultiplier;
		var td = 48;
		var tr = 24;
		var x = Math.cos(ships[0].d+Math.PI)*td + canvas.width/2;
		var y = Math.sin(ships[0].d+Math.PI)*td + canvas.height/2;
		context.beginPath();
		context.strokeStyle = "orange";
		context.arc(x, y, tr, 0, 2 * Math.PI, false);
		context.fillStyle = "orange";
		context.fill();
		context.lineWidth = 2;
		context.stroke();	
		}
	} 
}
document.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(e) {
mousestate = e.buttons;
}