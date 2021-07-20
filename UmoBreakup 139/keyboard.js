
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (event.key) {  //events for all the keyboard keys
    case "q":
	if (cheatmode == 1){ qblaster.fire(systems[ps].ships[0],time); }
      break;   
	 case "Delete":
	 if (cheatmode == 0){cheatmode = 1;}
      break;    
    case " ":
      playerradio.msgtime = 1;
      break;     
	case "b": //Booster selection
		if (boosters[0]==boosters.length-1){boosters[0]=0;}else{boosters[0]=boosters[0]+1;}
      break;	
	case "g": //Booster activation
		if (boosters[boosters[0]]>0){//if selected booster is in stock
			boosters[boosters[0]]=boosters[boosters[0]]-1; //remove 1 from stock of selected booster
			systems[ps].ships[0].thrust = 64*2^(boosters[0]); //boost hard
			boost1.play();
			}
      break;	  	  
	case "1":    //This is how weapon switching is handled.
		if (allblasters[1].phas){ wep = 1; } //If weapon is present, switch to it.		
		break; //Nothing happens on keypress otherwise.
	case "2": 
		if (allblasters[2].phas){ wep = 2; }
	  break;
	case "3": 
		if (allblasters[3].phas){ wep = 3; }
      	break;
	case "4": 
		if (allblasters[4].phas){ wep = 4; }
   	 break;
	case "5": 
		if (allblasters[5].phas){ wep = 5; }
	  break;
	case "6": 
		if (allblasters[6].phas){ wep = 6; }
   	   break;
	case "7": 
		if (allblasters[7].phas){ wep = 7; }
	  break;
	case "8": 
		if (allblasters[8].phas){ wep = 8; }
 	     break;
	case "9": 
		if (allblasters[9].phas){ wep = 9; }
	  break;
	case "0": 
		if (allblasters[0].phas){ wep = 0; }
     	 break;
	case "n": 
		if (navactive == 0){
			navactive = 1;
			if (navtarget>systems[ps].planets.length-2){navtarget=0;}
		} else if (navactive == 1) {
			navactive = 2;
			if (navtarget > systems[ps].outposts.length-2){navtarget=0;}
		} else if (navactive == 2){navactive = 0;}
    	  break;
	case "m": 
		if (mapactive == 0){mapactive = 2;} else {mapactive = mapactive-1;}
    	  break;
	case "j": 
		if (journalactive){journalactive = false;}else{journalactive = true;}
    	  break;
	case "+": 
		mapscale = mapscale * 0.9;
		if (mapscale>64){mapscale = Math.floor(mapscale);}
    	  break;		  
	case "-": 
		mapscale = mapscale * 1.1;
		if (mapscale>64){mapscale = Math.floor(mapscale);}
    	  break;	  
	case ".": 
			if (navactive == 1){
				navtarget = navtarget+1;
				if (navtarget > systems[ps].planets.length-1){ navtarget = 0; }//This freaks out when you have waldo selected
			}else if (navactive == 2){
				navtarget = navtarget+1;
				if (navtarget > systems[ps].outposts.length-1){navtarget = 0; }
				}
    	  break;
	case ",": 
		if (navactive == 1){
			navtarget = navtarget-1;
			if (navtarget == -1){ navtarget = systems[ps].planets.length-1; }
		}else if (navactive == 2){
			navtarget = navtarget-1;
			if (navtarget == -1){ navtarget = systems[ps].outposts.length-1; }
			}
		break;		  
	case "w": 
	if (cheatmode ==1){	systems[ps].ships[0].respawn(systems[ps].planets[navtarget]); }
     	 break;
	case "]": 
		if (shiptarget == shipsinrange.length-1){ shiptarget = 0; }
		else {shiptarget = shiptarget+1;}	                                          
      break;
	case "[": 
		if (shiptarget == 0){ shiptarget = shipsinrange.length-1; }
		else {shiptarget = shiptarget-1;}	                                          
      break;
	case "t": 
		shiptarget = closestindex;                                         
      break;
    case "ArrowUp":
		if (dockstate>=0){
			menuclick1.play();
			shopitem = shopitem - 1;
			if ((shopitem<0)&&(shopmode == 0)){shopitem = systems[ps].shops[dockstate].inv.length-1;}
			if ((shopitem<0)&&(shopmode == 1)){shopitem = allcargos.length-2;}//-2 instead of -1 because the last item is mission cargo, which shouldn't be bought or sold.
			if ((shopitem<0)&&(shopmode == 2)){shopitem = systems[ps].shops[dockstate].missions.length-1;}
			}
		if (journalactive){
			shopitem = shopitem - 1;
			if (shopitem<0){shopitem = playerradio.log.length-1;}
			}
      break;
    case "ArrowDown":
		if (dockstate>=0){
			menuclick1.play();
			shopitem = shopitem + 1;
			if ((shopitem>systems[ps].shops[dockstate].inv.length-1)&&(shopmode == 0)){shopitem = 0;}
			if ((shopitem>allcargos.length-2)&&(shopmode == 1)){shopitem = 0;}//-2 instead of -1 because the last item is mission cargo, which shouldn't be bought or sold.
			if ((shopitem>systems[ps].shops[dockstate].missions.length-1)&&(shopmode == 2)){shopitem = 0;}
			}
		if (journalactive){
			shopitem = shopitem + 1;
			if (shopitem>playerradio.log.length-1){shopitem = 0;}
			}
      break;   
    case "End":
		if (cheatmode == 1){money = money +10000;}
      break;  
    case "Insert":
		if (cheatmode == 1){
			var i=0;
			while (i<allblasters.length){
				allblasters[i].phas = true;
				i=i+1;
				}
			}
      break;  
    case "x":
		if (cheatmode == 1){
			var clustercolor = "red";
			testcluster = new Clusterbomb(time,ships[0].x+mdx,ships[0].y+mdy,ships[0].vx,ships[0].vy,12,6,32,0.9,clustercolor,233,0.3);
			}
      break;   //handled in detail elsewhere
	case "z":
		if (diagnostic == 3){diagnostic=0;}else {diagnostic=diagnostic+1;}

      break;
	 case "v":
	 if (cheatmode == 1){
		if (ps <15){ps = ps + 1;}
		else  {ps = 1;}
		navtarget = 0;
		pz = 0;
		var randdir = Math.random()*2*Math.PI;
		xxxx.setorbit(systems[ps].planets[0], 320000, randdir+Math.PI, -1);
		waldo.setorbit(systems[ps].planets[0], 320000, randdir, -1);
		systems[ps].ships[0].vx = 0; //Otherwise players inherit the momentum acquired in descent.
		systems[ps].ships[0].vy = 0;
		}
      break;
	  case "s":
	  if (starmode == 0){starmode = 1;}else{starmode = 0;}
      break;
	 case "Enter": //The enter key purchases the currently selected shop item
	 if ((dockstate >= 0)&&(dockstate<systems[ps].shops.length)){//check if docked and shop exists
		if (shopmode == 0){
			 if (shopitem<systems[ps].shops[dockstate].inv.length){//check for shopitem exists
				if (systems[ps].shops[dockstate].inv[shopitem].itemprice()<=money){ //check if player has enough money
					if (systems[ps].shops[dockstate].inv[shopitem].available(systems[ps].ships[0],playerinventory)){ //check if player has prerequisites / doesn't already own item
						if (money > systems[ps].shops[dockstate].inv[shopitem].itemprice()){
							money = money - systems[ps].shops[dockstate].inv[shopitem].itemprice();
							menubuy1.play();
							systems[ps].shops[dockstate].inv[shopitem].buy(money,systems[ps].ships[0],playerinventory);//the buy function is supposed to handle the money transaction as well, but i dont think it can by itself.
						}
					} 
				}
			}		 
		}else if (shopmode == 1){
			//if (playerinventory.cargo.length <= shopitem){shopitem = 0;}
			if (playerinventory.cargo[shopitem]>0){
				playerinventory.cargo[shopitem]=playerinventory.cargo[shopitem]-1;
				money = money + Math.floor(allcargos[shopitem].baseprice*systems[ps].shops[dockstate].cargoprices[shopitem]);
				menubuy1.play();
			}
		}else if (shopmode == 2){
			//if (systems[ps].shops[dockstate].missions[shopitem].taken == false){//I shouldn't have to comment this if condition.  Side effect is that players can re-take a mission in progress, respawning the bot if it's a destroy mission.  Maybe useful if a bot gets lost just inside the return radius.
				systems[ps].shops[dockstate].missions[shopitem].take(systems[ps].ships,systems[ps].planets);
				job = systems[ps].shops[dockstate].missions[shopitem].message;
				menuclick3.play();
				//}
			}
		}
      break;
	 case "Backspace": //The enter key purchases the currently selected shop item
		if (dockstate>=0){
			menuclick2.play();
			shopmode = shopmode +1;
			if (shopmode > 2) { shopmode = 0; }
			shopitem = 0;
			}
	  break;
	 case "p": 
		probemode = probemode + 1;
		if (probemode > 2) { probemode = 0;}
      break;
	   case "a": 
		autopilot = autopilot + 1;
		if (autopilot > 1) { autopilot = 0;}//disables experimental modes for playability
		//if (autopilot > 4) { autopilot = 0;}
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  } //end event key handling switch
  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		