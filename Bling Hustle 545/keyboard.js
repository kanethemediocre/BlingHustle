
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
	var myplayer = systems[ps].players[myi];
	if((myplayer.emenu>0)&&(myplayer.ship.hp>0)){
		myplayer.emtrees[0].handleinput(myplayer,event.key);
		}
	else if (myplayer.ship.hp==-1000){//if the player is dead
		myplayer.emg = 0;
		myplayer.emh = 0;
		myplayer.emi = 0;
		myplayer.emj = 0;
		myplayer.emk = 0;
		myplayer.emenu = 5;
		myplayer.deadtree.handleinput(myplayer,event.key);
		
		var myrating = myplayer.deadtree.emods[0].quizblocks[0].quizzes[myplayer.deaths%myplayer.deadtree.emods[0].quizblocks[0].quizzes.length].rating ; //% operator used to cycle through available quizzes rather than go out of bounds.
		if (myrating == 4){
			myplayer.ship.deadtime = 1;
			myplayer.emenu = 0;
			myplayer.deadtree.emods[0].quizblocks[0].quizzes[myplayer.deaths%myplayer.deadtree.emods[0].quizblocks[0].quizzes.length].rating = 0;
			}
		else if (myrating == 3){
			myplayer.ship.deadtime = Math.floor(0.125*myplayer.ship.deadtime)+1
			myplayer.emenu = 0;
			myplayer.deadtree.emods[0].quizblocks[0].quizzes[myplayer.deaths%myplayer.deadtree.emods[0].quizblocks[0].quizzes.length].rating = 0;
			}
		else if (myrating == 2){
			myplayer.ship.deadtime = Math.floor(0.25*myplayer.ship.deadtime)+1
			myplayer.emenu = 0;
			myplayer.deadtree.emods[0].quizblocks[0].quizzes[myplayer.deaths%myplayer.deadtree.emods[0].quizblocks[0].quizzes.length].rating = 0;
			}
		}
	else if (event.key=="e"){
		myplayer.emenu=1;
		}	
	else if (event.key=="Insert"){
		if (cheatmode == 1){
			var i=0;
			while (i<myplayer.blasters.length){
				myplayer.blasters[i].phas = true;
				i++;
				}
			myplayer.blasters[2].plusremote();
			} 
		}	  
	else if ((event.key == "u")&&(cheatmode==1)){
		myi++;
		if (myi>systems[ps].players.length-1){
			myi=0;
			}
    }else if ((event.key == "i")&&(cheatmode==1)){
		var aplayer = new Player();
		aplayer.initialize(1000,200,1);
		var i=0;
		while(i<systems.length){
			systems[i].players.push(aplayer);
			i++;
			}
		systems[ps].players[systems[ps].players.length-1].ship.setorbit(systems[ps].planets[0], 32000, 0.215+Math.random()*0.01, 1);
		systems[ps].players[systems[ps].players.length-1].storystate = 999;
		systems[ps].players[systems[ps].players.length-1].name = "ID "+ time;
		console.log("there are now "+systems[ps].players.length+" players.");
		console.log("Last players name  "+systems[ps].players[systems[ps].players.length-1].name);
    }else if ((event.key == "o")&&(systems[ps].players.length>1)&&(cheatmode==1)){
		var i=0;
		while(i<systems.length){
			systems[i].players.splice(myi,1);
			i++;
			}
		if (myi >=systems[ps].players.length){ myi = 0; }
		console.log("there are now "+systems[ps].players.length+" players.");
	}else if (event.key=='e'){
		if (systems[ps].players[myi].emenu==0){systems[ps].players[myi].emenu=1;}	
	}else if (event.key=='f'){
		openFullscreen(); //No fullscreen exit.  Javascript feels defective, fullscreen exit code doesn't work.
		//systems[ps].players[myi].vkactive = false; 
		systems[ps].players[myi].mousexoffset = fullscreenmousexoffset;
		systems[ps].players[myi].mouseyoffset = fullscreenmouseyoffset; 
	}else{
		var theplayer = systems[ps].players[myi];
		theplayer.input = event.key;
		if (theplayer.input == "="){theplayer.input = "+";}//For ease of use zooming in
		systems[ps].playerkeys();
	}	

  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		

