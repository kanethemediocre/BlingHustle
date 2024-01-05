//A lot of player keyboard controls are handled in system.playerkeys().
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
	if (event.key=="\\"){
		console.log("asdfasdf");
		if (vkeys[vkeys.length-2].x ==99999){vkeys[vkeys.length-2].x = 420;}
		else {vkeys[vkeys.length-2].x=99999;}//disables button by hiding it.
		}
	var myplayer = systems[ps].players[myi];
	if((myplayer.emenu>0)&&(myplayer.alive)){
		myplayer.emtrees[0].handleinput(myplayer,event.key);
		}
	else if (myplayer.alive==false){//if the player is dead
		myplayer.emg = 0;
		myplayer.emh = 0;//this should happen on death, not every keyboard input frame while dead
		myplayer.emi = 0;
		myplayer.emj = 0;
		myplayer.emk = 0;
		myplayer.emenu = 5;
		myplayer.deadtree.handleinput(myplayer,event.key);
		
		var myrating = myplayer.deadtree.emods[0].quizblocks[0].quizzes[0].rating ; //this should cycle through all quizzes in the deadtree, not just repeat the first quiz every time
		console.log(myrating);
		if (myrating == 4){
			myplayer.deadtime = 1;
			myplayer.emenu = 0;
			myplayer.deadtree.emods[0].quizblocks[0].quizzes[myplayer.deaths%myplayer.deadtree.emods[0].quizblocks[0].quizzes.length].rating = 0;
			}
		else if (myrating == 3){
			myplayer.deadtime = Math.floor(0.125*myplayer.ship.deadtime)+1
			myplayer.emenu = 0;//I think this doesn't do anything
			myplayer.deadtree.emods[0].quizblocks[0].quizzes[myplayer.deaths%myplayer.deadtree.emods[0].quizblocks[0].quizzes.length].rating = 0;
			}
		else if (myrating == 2){
			myplayer.deadtime = Math.floor(0.25*myplayer.ship.deadtime)+1
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
		//if (vkeys[vkeys.length-2].x == 420){vkeys[vkeys.length-2].x = 99999;}//Disables mobile support
	}else{
		var theplayer = systems[ps].players[myi];
		theplayer.input = event.key;
		if (theplayer.input == "="){theplayer.input = "+";}//For ease of use zooming in
		systems[ps].playerkeys();
	}	

  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		

