document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    mdx =  e.clientX - canvas.width/2-8;//myplayer.mousexoffset;
	mdy =  e.clientY - canvas.height/2-8;//+myplayer.mouseyoffset;
	if (mdy>0){mdy = mdy*-1;}
	//moused = -1*Math.atan2(mdx,mdy) - Math.PI/2;
	//mousedistance = Math.sqrt(mdx*mdx+mdy*mdy);
	//myplayer.moused = -1*Math.atan2(mdx,mdy) - Math.PI/2;
	//myplayer.mousedistance = Math.sqrt(mdx*mdx+mdy*mdy);
} 
document.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(e) {
	var vkeypressed = false;
	var i=0;
	while(i<mainmenukeys.length){
		//console.log("itried");
		if (mainmenukeys[i].inside(e.clientX-8,e.clientY-8)){//mouseyoffset is needed to help support bad / fake fullscreen browser implementation
			mode = mainmenukeys[i].key;
			i=mainmenukeys.length; //On loop exit i=vkeys.length+1 if triggered, otherwise i=vkeys.length after last iteration.
			vkeypressed = true;
			}
		i++;
		}
	var i=0;
	while(i<submenus[mode].length){
		//console.log("itried");
		if (submenus[mode][i].inside(e.clientX-8,e.clientY-8)){//mouseyoffset is needed to help support bad / fake fullscreen browser implementation
			//mode = mainmenukeys[i].key;

				submenuactions[mode](submenus[mode][i].key,editnpc)
				//appearanceactions(submenus[mode][i].key,editingship);

			i=submenus[mode].length; //On loop exit i=vkeys.length+1 if triggered, otherwise i=vkeys.length after last iteration.
			vkeypressed = true;
			}
		i++;
		}
	console.log(vkeypressed);
	if ((vkeypressed==false)&&(mode==0)){
		mousestate = e.buttons;
		var moused = -1*Math.atan2(mdx,mdy) - Math.PI/2;
		var mousedistance = Math.sqrt(mdx*mdx+mdy*mdy);
		console.log(e.clientX+ " " +e.clientY);
		if ((mousestate == 1)&&(mousedistance<=editingship.s)){
			newradii.push(mousedistance);
			newtheta.push(moused);
			}
		if (mousestate==2){
			var distance = 9999;
			var i = 0;
			while (i<newradii.length){
				var newdistance = Math.abs(newradii[i]-mousedistance)+newradii[i]*Math.abs(newtheta[i]-moused);//Not quite right but close enough.
				if (newdistance<distance){
					distance = newdistance;
					selectedpoint = i;
					selectedmdx = mdx;
					selectedmdy = mdy;
					selectedtime = time;
					}
				i++;
				}
			}
		}
	}
document.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(e) {
	if (mousestate == 2){
		if (time-selectedtime>10){
			var dx = mdx - selectedmdx;
			var dy = mdy - selectedmdy;
			var px = newradii[selectedpoint]*Math.cos(newtheta[selectedpoint]+Math.PI);//+canvas.width/2;
			var py = newradii[selectedpoint]*Math.sin(newtheta[selectedpoint]+Math.PI);//+canvas.height/2;
			var newx = px + dx;
			var newy = py + dy;
			var distance = Math.sqrt(newx*newx+newy*newy);
			if (distance>editingship.s) {   distance = editingship.s; 	}
			newradii[selectedpoint] = distance;
			newtheta[selectedpoint] = -1*Math.atan2(newx,newy) - Math.PI/2;
			}
		}
    mousestate = e.buttons;
}
document.addEventListener("wheel", mouseWheelHandler, {passive: false});
function mouseWheelHandler(e) {
    e.preventDefault();
    e.stopPropagation();
	return false;
}

