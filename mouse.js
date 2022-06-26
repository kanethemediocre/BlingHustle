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
	var i=0;
	while(i<vkeys.length){
		if (vkeys[i].inside(e.clientX,e.clientY)){
			myplayer.input = vkeys[i].key;
			systems[ps].playerkeys();
			i=vkeys.length; //On loop exit i=vkeys.length+1 if triggered, otherwise i=vkeys.length after last iteration.
			}
		i++;
		}
	if (i==vkeys.length){ systems[ps].playermice(); } //If loop exited without vkeys trigger, meaning no buttons were clicked
	}
document.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(e) {
var myplayer = systems[1].players[0];
myplayer.mousestate = e.buttons;
}
document.addEventListener("wheel", mouseWheelHandler, {passive: false});
function mouseWheelHandler(e) {
	var myplayer = systems[1].players[0];
	if (e.deltaY>0){myplayer.cyclewep(1);}
	if (e.deltaY<0){myplayer.cyclewep(-1);}
    e.preventDefault();
    e.stopPropagation();
	return false;
}
/*

document.querySelector('#scrollable').addEventListener('wheel', preventScroll, {passive: false});

function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
}

*/