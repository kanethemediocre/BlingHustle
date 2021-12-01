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
systems[1].players[0].mousestate = mousestate;
if (mousestate==1){ //if it's the left button
	if (systems[0].players[0].wep < 10){
		if (systems[0].players[0].energy>systems[0].players[0].blasters[systems[0].players[0].wep].ecost){
			if (systems[0].players[0].blasters[systems[0].players[0].wep].type!=="beam"){
				systems[0].players[0].blasters[systems[0].players[0].wep].fire(systems[0].players[0].ship,time);
				systems[0].players[0].energy = systems[0].players[0].energy - systems[0].players[0].blasters[systems[0].players[0].wep].ecost;
				if (systems[0].players[0].wep == 1){blastersound1.play();}
				else if (systems[0].players[0].wep == 2){blastersound2.play();}
				else if (systems[0].players[0].wep == 3){blastersound3.play();}
				else if (systems[0].players[0].wep == 4){blastersound4.play();}
				else if (systems[0].players[0].wep == 5){blastersound5.play();}
				else if (systems[0].players[0].wep == 6){blastersound6.play();}
				else if (systems[0].players[0].wep == 7){blastersound7.play();}
				//else if (wep == 8){blastersound8.play();}
				else if (systems[0].players[0].wep == 9){blastersound9.play();}
				else if (systems[0].players[0].wep == 0){blastersound0.play();}
				}
			}
		}
	}	
else if (mousestate==2){//if its the right button
	if (dockstate>=0){
		systems[ps].outposts[dockstate].undock(systems[ps].ships[0]);//undock function sets relative position and velocity.  Maybe other stuff.
		dockstate = -1;
		}
	if (thruster>0){
		systems[ps].ships[0].thrust = 2*thrustmultiplier;
		var td = 48;
		var tr = 24;
		var x = Math.cos(systems[ps].ships[0].d+Math.PI)*td + canvas.width/2;
		var y = Math.sin(systems[ps].ships[0].d+Math.PI)*td + canvas.height/2;
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







if (systems[ps].players.length>0){
	//console.log("itried5");
	if (systems[ps].players[0].mousestate==1){ //if it's the left button
		//console.log("itried4");
		if (systems[ps].players[0].wep < 10){
			//console.log("itried3");
			//console.log(systems[ps].players[0].energy+"  "+systems[ps].players[0].blasters[1].ecost);//systems[ps].players[0].blasters[systems[ps].players[0].wep].ecost);
			if (systems[ps].players[0].energy>systems[ps].players[0].blasters[systems[ps].players[0].wep].ecost){
				//console.log("itried2");
				if (systems[ps].players[0].blasters[wep].type!=="beam"){
					systems[ps].players[0].blasters[wep].fire(systems[ps].players[0].ship,time);
					systems[ps].players[0].energy = systems[ps].players[0].energy - allblasters[wep].ecost;
					//console.log("itried1");
					//if (systems[ps].players[0].wep == 1){blastersound1.play();}
					//else if (systems[ps].players[0].wep == 2){blastersound2.play();}
					//else if (systems[ps].players[0].wep == 3){blastersound3.play();}
					//else if (systems[ps].players[0].wep == 4){blastersound4.play();}
					//else if (systems[ps].players[0].wep == 5){blastersound5.play();}
					//else if (systems[ps].players[0].wep == 6){blastersound6.play();}
					//else if (systems[ps].players[0].wep == 7){blastersound7.play();}
					//else if (wep == 8){blastersound8.play();}
					//else if (systems[ps].players[0].wep == 9){blastersound9.play();}
					//else if (systems[ps].players[0].wep == 0){blastersound0.play();}
					}
				}
			}
		}	
	else if (systems[ps].players[0].mousestate==2){//if its the right button
		if (systems[ps].players[0].dockstate>=0){
			systems[ps].outposts[systems[ps].players[0].dockstate].undock(systems[ps].players[0].ship);//undock function sets relative position and velocity.  Maybe other stuff.
			systems[ps].players[0].dockstate = -1;
			}
		if (systems[ps].players[0].thruster>0){
			systems[ps].players[0].ship.thrust = 2*thrustmultiplier;
			var td = 48;
			var tr = 24;
			var x = Math.cos(systems[ps].players[0].ship.d+Math.PI)*td + canvas.width/2;
			var y = Math.sin(systems[ps].players[0].ship.d+Math.PI)*td + canvas.height/2;
			context.beginPath();
			context.strokeStyle = "orange";
			context.arc(x, y, tr, 0, 2 * Math.PI, false);
			context.fillStyle = "orange";
			context.fill();
			context.lineWidth = 2;
			context.stroke();	
			//enginesound1.play();
			}
		} 
	}	
}
document.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(e) {
mousestate = e.buttons;
}