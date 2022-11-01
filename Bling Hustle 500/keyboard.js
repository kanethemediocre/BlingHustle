
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
	var myplayer = systems[ps].players[myi];
	if(myplayer.emenu>0){
		//console.log(myplayer.emg+" "+myplayer.emh+" "+myplayer.emi+" "+myplayer.emj);
		//var myplayer = systems[ps].players[myi];
		//var myquiz = testquiz;
		var myquiz = myplayer.emtrees[myplayer.emg].emods[myplayer.emh].quizblocks[myplayer.emi].quizzes[myplayer.emj];
		if ((event.key=="Enter")&&(myplayer.emenu==5)){
			myquiz.challenges[myquiz.q].playerhasanswered = true;
			myquiz.q++;
			if (myquiz.q>=myquiz.challenges.length){
				//myquiz.grade();
				var prize = myplayer.emtrees[myplayer.emg].emods[myplayer.emh].grade();
				console.log(prize);
				if (prize[0]>0){myplayer.emodaward(prize);}
				
				console.log("complete");
				myquiz.q=0;
				myplayer.emenu = 4;
				myplayer.emj++
				if (myplayer.emj>=myplayer.emtrees[myplayer.emg].emods[myplayer.emh].quizblocks[myplayer.emi].quizzes.length){
					myplayer.emtrees[myplayer.emg].emods[myplayer.emh].quizblocks[myplayer.emi].grade();
					myplayer.emenu = 3;
					myplayer.emj=0;
					myplayer.emi++;
					if (myplayer.emi>=myplayer.emtrees[myplayer.emg].emods[myplayer.emh].quizblocks.length){
						myplayer.emenu = 2;
						myplayer.emi=0;
						myplayer.emh++;
						if(myplayer.emh>=myplayer.emi>myplayer.emtrees[myplayer.emg].emods.length){
							myplayer.emenu = 1;
							myplayer.emh = 0;
							myplayer.emg++;
							if (myplayer.emg>=myplayer.emtrees.length){
								myplayer.emg=0;
								}
							}
						}
					}
				}
		}else if (event.key=="ArrowLeft"){	
				//console.log("tryingleft");		
				myplayer.emenu--;
				if (myplayer.emenu<1){myplayer.emenu = 1;}
		}else if (event.key=="ArrowRight"){
			//console.log("tryingright");
				myplayer.emenu++;
				if (myplayer.emenu>5){myplayer.emenu = 5;}
		}else if (event.key=="ArrowUp"){	
			console.log("tryingup");
			if ((myplayer.emenu==4)&&(myplayer.emj>0)){ myplayer.emj--; }
			if ((myplayer.emenu==3)&&(myplayer.emi>0)){ myplayer.emi--; }	
			if ((myplayer.emenu==2)&&(myplayer.emh>0)){ myplayer.emh--; }
			if ((myplayer.emenu==1)&&(myplayer.emg>0)){ myplayer.emg--; }
		}else if (event.key=="ArrowDown"){
			console.log("tryingdown");
			if ((myplayer.emenu==4)
				&&(myplayer.emtrees[myplayer.emg].emods[myplayer.emh].quizblocks[myplayer.emi].quizzes[myplayer.emj].completed==true)
				&&(myplayer.emj<myplayer.emtrees[myplayer.emg].emods[myplayer.emh].quizblocks[myplayer.emi].quizzes.length-1)){ myplayer.emj++; }
			if ((myplayer.emenu==3)
				&&(myplayer.emtrees[myplayer.emg].emods[myplayer.emh].quizblocks[myplayer.emi].completed==true)
				&&(myplayer.emi<myplayer.emtrees[myplayer.emg].emods[myplayer.emh].quizblocks.length-1)){ myplayer.emi++; }
			if ((myplayer.emenu==2)
				&&(myplayer.emtrees[myplayer.emg].emods[myplayer.emh].completed==true)
				&&(myplayer.emh<myplayer.emtrees[myplayer.emg].emods.length-1)){ myplayer.emh++; }
			if ((myplayer.emenu==1)	
				&&(myplayer.emg<myplayer.emtrees.length-1)){ myplayer.emg++; }//not really implemented, just one tree and the menu is bypassed.
		}else if ((event.key=="Backspace")&&(myplayer.emenu==5)){
			console.log("tryingbackspace");
			if (myquiz.challenges[myquiz.q].playeranswer.length>0){
				console.log("tryingbackspacehard");
				myquiz.challenges[myquiz.q].playeranswer=myquiz.challenges[myquiz.q].playeranswer.slice(0,-1);//(myquiz.challenges[myquiz.q].playeranswer.length-1, 1);
				}
			//systems[ps].players[myi].emenu=0;
			//console.log("etriedtoclose")
		}else if (event.key=="e"){
			myplayer.emenu=0;
			//console.log("etriedtoclose")
		}else if (myplayer.emenu==5){
			myquiz.challenges[myquiz.q].playeranswer=myquiz.challenges[myquiz.q].playeranswer+event.key;
			console.log(myquiz.challenges[myquiz.q].playeranswer);
			}
		}//end of emenu stuff
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
		//console.log("etriedtoopen");
		if (systems[ps].players[myi].emenu==0){systems[ps].players[myi].emenu=1;}	
	}else{
		var theplayer = systems[ps].players[myi];
		theplayer.input = event.key;
		if (theplayer.input == "="){theplayer.input = "+";}//For ease of use zooming in
		systems[ps].playerkeys();
	}	

  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		

