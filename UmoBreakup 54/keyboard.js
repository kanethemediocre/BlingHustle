
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (event.key) {  //events for all the keyboard keys
    case "q":
	 qblaster.fire(systems[playersystem].ships[0],time);
	 money = money +1;
	 //qblaster.draw(ships[0].x,ships[0].y);
      break;   
	 case "f":
     qblaster.plusn();
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
			systems[playersystem].ships[0].thrust = 64*2^(boosters[0]); //boost hard
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
			if (navtarget>systems[playersystem].planets.length-2){navtarget=0;}
		} else if (navactive == 1) {
			navactive = 2;
			if (navtarget > systems[playersystem].outposts.length-2){navtarget=0;}
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
				if (navtarget == systems[playersystem].planets.length-1){ navtarget = 0; }
			}else if (navactive == 2){
				navtarget = navtarget+1;
				if (navtarget > systems[playersystem].outposts.length-1){navtarget = 0; }
				}
    	  break;
	case ",": 
		if (navactive == 1){
			navtarget = navtarget-1;
			if (navtarget == -1){ navtarget = systems[playersystem].planets.length-1; }
		}else if (navactive == 2){
			navtarget = navtarget-1;
			if (navtarget == -1){ navtarget = systems[playersystem].outposts.length-1; }
			}
		break;		  
	case "w": 
		systems[playersystem].ships[0].respawn(systems[playersystem].planets[navtarget]);
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
		shopitem = shopitem - 1;
		if ((shopitem<0)&&(shopmode == 0)){shopitem = systems[playersystem].shops[dockstate].inv.length-1;}
		if ((shopitem<0)&&(shopmode == 1)){shopitem = allcargos.length-1;}
      break;
    case "ArrowDown":
		shopitem = shopitem + 1;
		if ((shopitem>systems[playersystem].systems[playersystem].shops[dockstate].inv.length-1)&&(shopmode == 0)){shopitem = 0;}
		if ((shopitem>allcargos.length-1)&&(shopmode == 1)){shopitem = 0;}
      break;   //handled in detail elsewhere
    case "End":
		money = money +10000;
      break;   //handled in detail elsewhere

    case "x":
		var clustercolor = "red";
		//if (time%6==0){clustercolor="red";}
		////if (time%6==1){clustercolor="orange";}
		//if (time%6==2){clustercolor="yellow";}
		//if (time%6==3){clustercolor="green";}
		//if (time%6==4){clustercolor="blue";}
		//if (time%6==5){clustercolor="purple";}

		testcluster = new Clusterbomb(time,ships[0].x+mdx,ships[0].y+mdy,ships[0].vx,ships[0].vy,12,6,32,0.9,clustercolor,233,0.3);
      break;   //handled in detail elsewhere
	case "z":
		if (diagnostic == 3){diagnostic=0;}else {diagnostic=diagnostic+1;}

      break;
	 case "v":
		if (playersystem <15){playersystem = playersystem + 1;}
		else  {playersystem = 1;}
      break;
	 case "Enter": //The enter key purchases the currently selected shop item
	 if ((dockstate >= 0)&&(dockstate<systems[playersystem].shops.length)){//check if docked and shop exists
		if (shopmode == 0){
			 if (shopitem<systems[playersystem].shops[dockstate].inv.length){//check for shopitem exists
				if (systems[playersystem].shops[dockstate].inv[shopitem].itemprice()<=money){ //check if player has enough money
					if (systems[playersystem].shops[dockstate].inv[shopitem].available(systems[playersystem].ships[0],playerinventory)){ //check if player has prerequisites / doesn't already own item
						money = money - systems[playersystem].shops[dockstate].inv[shopitem].itemprice();
						systems[playersystem].shops[dockstate].inv[shopitem].buy(money,systems[playersystem].ships[0],playerinventory);//the buy function is supposed to handle the money transaction as well, but i dont think it can by itself.
					}
				}
			}		 
		}else if (shopmode == 1){
			//if (playerinventory.cargo.length <= shopitem){shopitem = 0;}
			if (playerinventory.cargo[shopitem]>0){
				playerinventory.cargo[shopitem]=playerinventory.cargo[shopitem]-1;
				money = money + Math.floor(allcargos[shopitem].baseprice*systems[playersystem].shops[dockstate].cargoprices[shopitem]);
			}
		}
	 }
      break;
	 case "Backspace": //The enter key purchases the currently selected shop item
		if (shopmode == 0) {
			shopmode = 1;
			shopitem = 0;
		}else{
			shopmode = 0;
			shopitem = 0;
			}
	  break;
    default:
      return; // Quit when this doesn't handle the key event.
  } //end event key handling switch
  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		