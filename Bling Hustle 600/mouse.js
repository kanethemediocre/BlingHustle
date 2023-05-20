document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
	var myplayer = systems[ps].players[myi];
    mdx =  e.clientX - canvas.width/2+myplayer.mousexoffset;
	mdy =  e.clientY - canvas.height/2+myplayer.mouseyoffset;
	//moused = -1*Math.atan2(mdx,mdy) - Math.PI/2;
	//mousedistance = Math.sqrt(mdx*mdx+mdy*mdy);
	myplayer.moused = -1*Math.atan2(mdx,mdy) - Math.PI/2;
	myplayer.mousedistance = Math.sqrt(mdx*mdx+mdy*mdy);
} 
document.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(e) {
	action = -1;
	var myplayer = systems[1].players[myi];
	if (myplayer.planetmenu == 1){
		myplayer.planetmenu = 0;
		return;
		}
	if (myplayer.options == 1){
		var vkeypressed = false;
		var vkeyaction = -1;
		var i=0;
		while(i<ovkeys.length){
			//console.log("itried");
			if (ovkeys[i].inside(e.clientX-8,e.clientY-8)){//mouseyoffset is needed to help support bad / fake fullscreen browser implementation
				action = ovkeys[i].key;
				i=ovkeys.length; //On loop exit i=vkeys.length+1 if triggered, otherwise i=vkeys.length after last iteration.
				vkeypressed = true;
				}
			i++;
			}
		optionsactions(action,myplayer);
		}
	else{
		myplayer.mousestate = e.buttons;
		myplayer.moused = -1*Math.atan2(mdx,mdy) - Math.PI/2;
		myplayer.mousedistance = Math.sqrt(mdx*mdx+mdy*mdy);
		console.log(e.clientX+ " " +e.clientY);
		if (myplayer.vkactive == true){
			var i=0;
			while(i<vkeys.length){
				if (vkeys[i].inside(e.clientX+myplayer.mousexoffset,e.clientY+myplayer.mouseyoffset)){//mouseyoffset is needed to help support bad / fake fullscreen browser implementation
					myplayer.input = vkeys[i].key;
					systems[ps].playerkeys();
					i=vkeys.length; //On loop exit i=vkeys.length+1 if triggered, otherwise i=vkeys.length after last iteration.
					}
				i++;
				}
			if (i==vkeys.length){ systems[ps].playermice(); } //If loop exited without vkeys trigger, meaning no buttons were clicked
			}
		else { systems[ps].playermice();}
		}
	}
	
	
document.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(e) {
var myplayer = systems[1].players[0];
myplayer.mousestate = e.buttons;
}
document.addEventListener("wheel", mouseWheelHandler, {passive: false});
function mouseWheelHandler(e) {
	var myplayer = systems[ps].players[0];
	if (e.deltaY>0){myplayer.cyclewep(1);}
	if (e.deltaY<0){myplayer.cyclewep(-1);}
    e.preventDefault();
    e.stopPropagation();
	return false;
}


function fullscreenchanged(event) {
	var myplayer = systems[ps].players[0];
  if (document.fullscreenElement) {
    console.log(`entered fullscreen mode.`);
	myplayer.mousexoffset = fullscreenmousexoffset;
	myplayer.mouseyoffset = fullscreenmouseyoffset;
	
  } else {
    console.log('Leaving fullscreen mode.');
	myplayer.mousexoffset = windowmousexoffset;
	myplayer.mouseyoffset = windowmouseyoffset;
  }
}

//const el = document.getElementById('fullscreen-div');
const e1 = document.getElementById('gameCanvas');
e1.addEventListener('fullscreenchange', fullscreenchanged);

/*

document.querySelector('#scrollable').addEventListener('wheel', preventScroll, {passive: false});

function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
}

*/