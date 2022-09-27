
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
	if(systems[ps].players[myi].emenu==true){
		var myplayer = systems[ps].players[myi];
		//var myquiz = testquiz;
		var myquiz = myplayer.emtrees[myplayer.emg].emods[myplayer.emh].quizblocks[myplayer.emi].quizzes[myplayer.emj];
		if (event.key=="Enter"){
			myquiz.challenges[myquiz.q].playerhasanswered = true;
			myquiz.q++;
			if (myquiz.q>=myquiz.challenges.length){
				console.log("complete");
				myquiz.q=0;
				myplayer.emj++
				if (myplayer.emj>=myplayer.emtrees[myplayer.emg].emods[myplayer.emh].quizblocks[myplayer.emi].quizzes.length){
					myplayer.emj=0;
					myplayer.emi++;
					if (myplayer.emi>=myplayer.emtrees[myplayer.emg].emods[myplayer.emh].quizblocks.length){
						myplayer.emi=0;
						myplayer.emh++;
						if(myplayer.emh>=myplayer.emi>myplayer.emtrees[myplayer.emg].emods.length){
							myplayer.emh = 0;
							myplayer.emg++;
							if (myplayer.emg>=myplayer.emtrees.length){
								myplayer.emg=0;
								}
							}
						}
					}

			}
		}else if (event.key=="e"){
			systems[ps].players[myi].emenu=false;
			//console.log("etriedtoclose")
		}else{
			testquiz.challenges[testquiz.q].playeranswer=testquiz.challenges[testquiz.q].playeranswer+event.key;
			console.log(testquiz.challenges[testquiz.q].playeranswer);
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
		}
	else if (event.key=='e'){
		//console.log("etriedtoopen");
		if (systems[ps].players[myi].emenu==false){systems[ps].players[myi].emenu=true;}	
		}	 
	var theplayer = systems[ps].players[myi];
	theplayer.input = event.key;
    if (theplayer.input == "="){theplayer.input = "+";}//For ease of use zooming in
	systems[ps].playerkeys();
  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		

