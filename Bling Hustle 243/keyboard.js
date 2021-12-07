
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (event.key) {  //events for all the keyboard keys
    case "q":
		//unused for now
	//if (cheatmode == 1){ qblaster.fire(systems[ps].ships[0],time); }
      break;   
	 case "Delete":
	 if (cheatmode == 0){cheatmode = 1;}
      break;    
    case " ":
      playerradio.msgtime = 1;
      break;     
	case "b": //Booster selection
		if (systems[ps].players[0].boosters[0]==systems[ps].players[0].boosters.length-1){
			systems[ps].players[0].boosters[0]=0;
		}else{
			systems[ps].players[0].boosters[0]=systems[ps].players[0].boosters[0]+1;
		}
      break;	
	case "g": //Booster activation
		if (systems[ps].players[0].boosters[systems[ps].players[0].boosters[0]]>0){//if selected booster is in stock
			systems[ps].players[0].boosters[systems[ps].players[0].boosters[0]]=systems[ps].players[0].boosters[systems[ps].players[0].boosters[0]]-1; //remove 1 from stock of selected booster
			systems[ps].players[0].ship.thrust = 32*2^(systems[ps].players[0].boosters[0]); //boost hard
			boost1.play();
			}
      break;	  	  
	case "1":    //This is how weapon switching is handled.
		if (systems[ps].players[0].blasters[1].phas){ systems[ps].players[0].wep = 1; } //If weapon is present, switch to it.		
		break; //Nothing happens on keypress otherwise.
	case "2": 
		if (systems[ps].players[0].blasters[2].phas){ systems[ps].players[0].wep = 2; }
	  break;
	case "3": 
		if (systems[ps].players[0].blasters[3].phas){ systems[ps].players[0].wep = 3; }
      	break;
	case "4": 
		if (systems[ps].players[0].blasters[4].phas){ systems[ps].players[0].wep = 4; }
   	 break;
	case "5": 
		if (systems[ps].players[0].blasters[5].phas){ systems[ps].players[0].wep = 5; }
	  break;
	case "6": 
		if (systems[ps].players[0].blasters[6].phas){ systems[ps].players[0].wep = 6; }
   	   break;
	case "7": 
		if (systems[ps].players[0].blasters[7].phas){ systems[ps].players[0].wep = 7; }
	  break;
	case "8": 
		if (systems[ps].players[0].blasters[8].phas){ systems[ps].players[0].wep = 8; }
 	     break;
	case "9": 
		if (systems[ps].players[0].blasters[9].phas){ systems[ps].players[0].wep = 9; }
	  break;
	case "0": 
		if (systems[ps].players[0].blasters[0].phas){ systems[ps].players[0].wep = 0; }
     	 break;
	case "n": 
		if (systems[ps].players[0].navactive == 0){
			systems[ps].players[0].navactive = 1;
			if (systems[ps].players[0].navtarget>systems[ps].planets.length-2){systems[ps].players[0].navtarget=0;}
		} else if (systems[ps].players[0].navactive == 1) {
			systems[ps].players[0].navactive = 2;
			if (systems[ps].players[0].navtarget > systems[ps].outposts.length-2){systems[ps].players[0].navtarget=0;}
		} else if (systems[ps].players[0].navactive == 2){systems[ps].players[0].navactive = 0;}
    	  break;
	case "m": 
		if (systems[ps].players[0].mapactive == 0){systems[ps].players[0].mapactive = 2;} else {systems[ps].players[0].mapactive--;}
    	  break;
	case "j": 
		if (systems[ps].players[0].journalactive<2){systems[ps].players[0].journalactive++;}else{systems[ps].players[0].journalactive = 0;}
    	  break;
	case "+": 
		systems[ps].players[0].mapscale = systems[ps].players[0].mapscale * 0.9;
		if (systems[ps].players[0].mapscale>64){systems[ps].players[0].mapscale = Math.floor(systems[ps].players[0].mapscale);}
    	  break;		  
	case "-": 
		systems[ps].players[0].mapscale = systems[ps].players[0].mapscale * 1.1;
		if (systems[ps].players[0].mapscale>64){systems[ps].players[0].mapscale = Math.floor(systems[ps].players[0].mapscale);}
    	  break;	  
	case ".": 
			if (systems[ps].players[0].navactive == 1){
				systems[ps].players[0].navtarget++;
				if (systems[ps].players[0].navtarget > systems[ps].planets.length-2){ systems[ps].players[0].navtarget = 0; }//Waldo is now excluded
			}else if (systems[ps].players[0].navactive == 2){
				systems[ps].players[0].navtarget++;
				if (systems[ps].players[0].navtarget > systems[ps].outposts.length-1){systems[ps].players[0].navtarget = 0; }
				}
    	  break;
	case ",": 
		if (systems[ps].players[0].navactive == 1){
			systems[ps].players[0].navtarget--;
			if (systems[ps].players[0].navtarget == -1){ systems[ps].players[0].navtarget = systems[ps].planets.length-2; }
		}else if (systems[ps].players[0].navactive == 2){
			systems[ps].players[0].navtarget--;
			if (systems[ps].players[0].navtarget == -1){ systems[ps].players[0].navtarget = systems[ps].outposts.length-1; }
			}
		break;		  
	case "w": 
	if (cheatmode ==1){	systems[ps].players[0].ship.respawn(systems[ps].planets[systems[ps].players[0].navtarget]); }
     	 break;
	case "]": 
		if (systems[ps].players[0].shiptarget == systems[ps].players[0].shipsinrange.length-1){ systems[ps].players[0].shiptarget = 0; }
		else {systems[ps].players[0].shiptarget++;}	                                          
      break;
	case "[": 
		if (systems[ps].players[0].shiptarget == 0){ systems[ps].players[0].shiptarget = systems[ps].players[0].shipsinrange.length-1; }
		else {systems[ps].players[0].shiptarget--;}	                                          
      break;
	case "t": 
		//systems[ps].players[0].shiptarget = closestindex;                                         
      break;
    case "ArrowUp":
		if (systems[ps].players[0].dockstate>=0){
			menuclick1.play();
			systems[ps].players[0].shopitem = systems[ps].players[0].shopitem - 1;
			if ((systems[ps].players[0].shopitem<0)&&(systems[ps].players[0].shopmode == 0))
				{systems[ps].players[0].shopitem = systems[ps].shops[systems[ps].players[0].dockstate].inv.length-1;}
			if ((systems[ps].players[0].shopitem<0)&&(systems[ps].players[0].shopmode == 1))
				{systems[ps].players[0].shopitem = allcargos.length-2;}//-2 instead of -1 because the last item is mission cargo, which shouldn't be bought or sold.
			if ((systems[ps].players[0].shopitem<0)&&(systems[ps].players[0].shopmode == 2))
				{systems[ps].players[0].shopitem = systems[ps].shops[systems[ps].players[0].dockstate].missions.length-1;}
			}
		else if (systems[ps].players[0].journalactive==1){
			systems[ps].players[0].journalitem--;
			if (systems[ps].players[0].journalitem<0){systems[ps].players[0].journalitem = playerradio.log.length-1;}
			}
      break;
    case "ArrowDown":
		if (systems[ps].players[0].dockstate>=0){
			menuclick1.play();
			systems[ps].players[0].shopitem++;
			if ((systems[ps].players[0].shopitem>systems[ps].shops[systems[ps].players[0].dockstate].inv.length-1)&&(systems[ps].players[0].shopmode == 0))
				{systems[ps].players[0].shopitem = 0;}
			if ((systems[ps].players[0].shopitem>allcargos.length-2)&&(systems[ps].players[0].shopmode == 1))
				{systems[ps].players[0].shopitem = 0;}//-2 instead of -1 because the last item is mission cargo, which shouldn't be bought or sold.
			if ((systems[ps].players[0].shopitem>systems[ps].shops[systems[ps].players[0].dockstate].missions.length-1)&&(systems[ps].players[0].shopmode == 2))
				{systems[ps].players[0].shopitem = 0;}
			}
		if (systems[ps].players[0].journalactive==1){
			systems[ps].players[0].journalitem++;
			if (systems[ps].players[0].journalitem>playerradio.log.length-1){systems[ps].players[0].journalitem = 0;}
			}
      break;   
    case "End":
		if (cheatmode == 1){systems[ps].players[0].money = systems[ps].players[0].money +10000;}
      break;  
    case "Insert":
		if (cheatmode == 1){
			var i=0;
			while (i<systems[ps].players[0].blasters.length){
				systems[ps].players[0].blasters[i].phas = true;
				i++;
				}
			}
      break;  
    case "x":
		//if (cheatmode == 1){
		//	var clustercolor = "red";
		//	testcluster = new Clusterbomb(time,ships[0].x+mdx,ships[0].y+mdy,ships[0].vx,ships[0].vy,12,6,32,0.9,clustercolor,233,0.3);
		//	}
      break;   //handled in detail elsewhere
	case "z":
		if (diagnostic == 3){diagnostic=0;}else {diagnostic=diagnostic+1;}

      break;
	 case "v":
	 if (cheatmode == 1){
		if (ps <15){ps++;}
		else  {ps = 1;}
		systems[ps].players[0].navtarget = 0;
		pz = 0;
		var randdir = Math.random()*2*Math.PI;
		xxxx.setorbit(systems[ps].planets[0], 320000, randdir+Math.PI, -1);
		waldo.setorbit(systems[ps].planets[0], 320000, randdir, -1);
		systems[ps].players[0].ship.vx = 0; //Otherwise players inherit the momentum acquired in descent.
		systems[ps].players[0].ship.vy = 0;
		}
      break;
	  case "s":
	  if (starmode == 0){starmode = 1;}else{starmode = 0;}
      break;
	 case "Enter": //The enter key purchases the currently selected shop item
	 if ((systems[ps].players[0].dockstate >= 0)&&(systems[ps].players[0].dockstate<systems[ps].shops.length)){//check if docked and shop exists
		if (systems[ps].players[0].shopmode == 0){
			 if (systems[ps].players[0].shopitem < systems[ps].shops[systems[ps].players[0].dockstate].inv.length){//check for shopitem exists
				if (systems[ps].shops[systems[ps].players[0].dockstate].inv[systems[ps].players[0].shopitem].itemprice() <= systems[ps].players[0].money){ //check if player has enough money
					if (systems[ps].shops[systems[ps].players[0].dockstate].inv[systems[ps].players[0].shopitem].available(systems[ps].players[0])){ //check if player has prerequisites / doesn't already own item
						if (systems[ps].players[0].money > systems[ps].shops[systems[ps].players[0].dockstate].inv[systems[ps].players[0].shopitem].itemprice()){
							systems[ps].players[0].money = systems[ps].players[0].money - systems[ps].shops[systems[ps].players[0].dockstate].inv[systems[ps].players[0].shopitem].itemprice();
							menubuy1.play();
							systems[ps].shops[systems[ps].players[0].dockstate].inv[systems[ps].players[0].shopitem].buy(systems[ps].players[0]);//the buy function is supposed to handle the money transaction as well, but i dont think it can by itself.
						}
					} 
				}
			}		 
		}else if (systems[ps].players[0].shopmode == 1){
			//if (playerinventory.cargo.length <= shopitem){shopitem = 0;}
			if (systems[ps].players[0].inventory.cargo[systems[ps].players[0].shopitem]>0){
				systems[ps].players[0].inventory.cargo[systems[ps].players[0].shopitem]=systems[ps].players[0].inventory.cargo[systems[ps].players[0].shopitem]-1;
				systems[ps].players[0].money = systems[ps].players[0].money + Math.floor(allcargos[systems[ps].players[0].shopitem].baseprice*systems[ps].shops[systems[ps].players[0].dockstate].cargoprices[systems[ps].players[0].shopitem]);
				menubuy1.play();
			}
		}else if (systems[ps].players[0].shopmode == 2){
			//if (systems[ps].shops[dockstate].missions[shopitem].taken == false){//I shouldn't have to comment this if condition.  Side effect is that players can re-take a mission in progress, respawning the bot if it's a destroy mission.  Maybe useful if a bot gets lost just inside the return radius.
				systems[ps].shops[systems[ps].players[0].dockstate].missions[systems[ps].players[0].shopitem].take(systems[ps].ships,systems[ps].planets,systems[ps].players[0]);
				systems[ps].players[0].job = systems[ps].shops[systems[ps].players[0].dockstate].missions[systems[ps].players[0].shopitem].message;
				menuclick3.play();
				//}
			}
		}
      break;
	 case "Backspace": //The enter key purchases the currently selected shop item
		if (systems[ps].players[0].dockstate>=0){
			menuclick2.play();
			systems[ps].players[0].shopmode++;
			if (systems[ps].players[0].shopmode > 2) { systems[ps].players[0].shopmode = 0; }
			systems[ps].players[0].shopitem = 0;
			}
	  break;
	 case "p": 
	 	systems[ps].players[0].probemode = systems[ps].players[0].probemode + 1;
		if (systems[ps].players[0].probemode > 2) { systems[ps].players[0].probemode = 0;}
      break;
	   case "a": 
	   systems[ps].players[0].autopilot++;
		if (systems[ps].players[0].autopilot > 1) { systems[ps].players[0].autopilot = 0;}//disables experimental modes for playability
		//if (autopilot > 4) { autopilot = 0;}
      break;
	  
	   case "k": 
	   //save game
	  //localStorage.setItem('savedgame',systems);
	  break;	

	   case "l": 
	  //load game
	  //localStorage.getItem('savedgame'); //doesn't work, crashes the game.
	  break;	  	  
	  
	  
	  
	  
	  
	  
	  
    default:
      return; // Quit when this doesn't handle the key event.
  } //end event key handling switch
  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		