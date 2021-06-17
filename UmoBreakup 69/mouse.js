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
	if (wep < 10){
		if (energy>allblasters[wep].ecost){
			allblasters[wep].fire(systems[ps].ships[0],time);
			energy = energy - allblasters[wep].ecost;
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
		}
	} 
}
document.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(e) {
mousestate = e.buttons;
}