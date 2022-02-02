document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
	var myplayer = systems[1].players[myi];
    mdx =  e.clientX - canvas.width/2;
	mdy =  e.clientY - canvas.height/2;
	//moused = -1*Math.atan2(mdx,mdy) - Math.PI/2;
	//mousedistance = Math.sqrt(mdx*mdx+mdy*mdy);
	myplayer.moused = -1*Math.atan2(mdx,mdy) - Math.PI/2;
	myplayer.mousedistance = Math.sqrt(mdx*mdx+mdy*mdy);
} 
document.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(e) {
var myplayer = systems[1].players[myi];
myplayer.mousestate = e.buttons;
myplayer.moused = -1*Math.atan2(mdx,mdy) - Math.PI/2;
myplayer.mousedistance = Math.sqrt(mdx*mdx+mdy*mdy);
systems[ps].playermice();
}
document.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(e) {
var myplayer = systems[1].players[0];
myplayer.mousestate = e.buttons;
}