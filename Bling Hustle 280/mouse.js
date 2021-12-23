document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    mdx =  e.clientX - canvas.width/2;
	mdy =  e.clientY - canvas.height/2;
	moused = -1*Math.atan2(mdx,mdy) - Math.PI/2;
	mousedistance = Math.sqrt(mdx*mdx+mdy*mdy);
} 
document.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(e) {
var myplayer = systems[1].players[0];
myplayer.mousestate = e.buttons;
//systems[1].players[0].mousestate = mousestate;
if (systems[ps].players.length>0){
	//console.log("itried5");
	if (myplayer.mousestate==1){ //if it's the left button
		//console.log("itried4");
		if (myplayer.wep < 10){
			//console.log("itried3");
			//console.log(myplayer.energy+"  "+myplayer.blasters[1].ecost);//myplayer.blasters[myplayer.wep].ecost);
			if (myplayer.energy>myplayer.blasters[myplayer.wep].ecost){
				//console.log("itried2");
				if (myplayer.blasters[myplayer.wep].type!=="beam"){
					myplayer.blasters[myplayer.wep].fire(myplayer.ship,time);
					myplayer.energy = myplayer.energy - myplayer.blasters[myplayer.wep].ecost;
					//console.log("itried1");
					if (myplayer.wep == 1){blastersound1.play();}
					else if (myplayer.wep == 2){blastersound2.play();}
					else if (myplayer.wep == 3){blastersound3.play();}
					else if (myplayer.wep == 4){blastersound4.play();}
					else if (myplayer.wep == 5){blastersound5.play();}
					else if (myplayer.wep == 6){blastersound6.play();}
					else if (myplayer.wep == 7){blastersound7.play();}
					else if (myplayer.wep == 8){blastersound8.play();}
					else if (myplayer.wep == 9){blastersound9.play();}
					else if (myplayer.wep == 0){blastersound0.play();}
					}
				}
			}
		}	
	else if (myplayer.mousestate==2){//if its the right button
		if (myplayer.dockstate>=0){
			systems[ps].outposts[myplayer.dockstate].undock(myplayer.ship);//undock function sets relative position and velocity.  Maybe other stuff.
			myplayer.dockstate = -1;
			}
		if (myplayer.thruster>0){
			myplayer.ship.thrust = 2*myplayer.thrustmultiplier;
			//myplayer.thruster = myplayer.thruster - 24;
			var td = 48;
			var tr = 24;
			var x = Math.cos(myplayer.ship.d+Math.PI)*td + canvas.width/2;
			var y = Math.sin(myplayer.ship.d+Math.PI)*td + canvas.height/2;
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
	}	
}
document.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(e) {
var myplayer = systems[1].players[0];
myplayer.mousestate = e.buttons;
}