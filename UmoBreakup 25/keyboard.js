
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (event.key) {  //events for all the keyboard keys
    case "q":
	 qblaster.fire(ships[0],time);
	 money = money +1;
	 //qblaster.draw(ships[0].x,ships[0].y);
      break;   
	 case "f":
     qblaster.plusn();
      break;    
    case " ":
      playerradio.msgtime = 1;
      break;   
	case "z": //sort of a secret feature, might become an upgrade later
		if (thrustmultiplier < 2){ thrustmultiplier = thrustmultiplier + .25; }
		else { thrustmultiplier = 0.25; }
      break;
	case "a": //Not really used
		if (launchmultiplier < 2){ launchmultiplier = launchmultiplier + .25; }
		else {	launchmultiplier = 0; }
      break;	  
	case "b": //Booster selection
		if (boosters[0]==boosters.length-1){boosters[0]=0;}else{boosters[0]=boosters[0]+1;}
      break;	
	case "g": //Booster activation
		if (boosters[boosters[0]]>0){//if selected booster is in stock
			boosters[boosters[0]]=boosters[boosters[0]]-1; //remove 1 from stock of selected booster
			ships[0].thrust = 64*2^(boosters[0]); //boost hard
			}
      break;	  	  
	case "1":    //This is how weapon switching is handled.
		if (w1>0){ wep = 1; } //If weapon is present, switch to it.		
		break; //Nothing happens on keypress otherwise.
	case "2": 
		if (w2>0){ wep = 2; }
	  break;
	case "3": 
		if (w3>0){ wep = 3; }
      	break;
	case "4": 
		if (w4>0){ wep = 4; }
   	 break;
	case "5": 
		if (w5>0){ wep = 5; }
	  break;
	case "6": 
		if (w6>0){ wep = 6; }
   	   break;
	case "7": 
		if (w7>0){ wep = 7; }
	  break;
	case "8": 
		if (w8>0){ wep = 8; }
 	     break;
	case "9": 
		if (w9>0){ wep = 9; }
	  break;
	case "0": 
		if (w0>0){ wep = 0; }
     	 break;
	case "n": 
		if (navactive == 0){
			navactive = 1;
			if (navtarget>planets.length-1){navtarget=0;}
		} else if (navactive == 1) {
			navactive = 2;
			if (navtarget > outposts.length-1){navtarget=0;}
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
				if (navtarget == planets.length){ navtarget = 0; }
			}else if (navactive == 2){
				navtarget = navtarget+1;
				if (navtarget == outposts.length){navtarget = 0; }
				}
    	  break;
	case ",": 
		if (navactive == 1){
			navtarget = navtarget-1;
			if (navtarget == -1){ navtarget = planets.length-1; }
		}else if (navactive == 2){
			navtarget = navtarget-1;
			if (navtarget == -1){ navtarget = outposts.length-1; }
			}
		break;		  
	case "w": 
		ships[0].respawn(planets[navtarget]);
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
		if (shopitem<0){shopitem = 9;}
      break;
    case "ArrowDown":
		shopitem = shopitem + 1;
		if (shopitem>9){shopitem = 0;}
      break;   //handled in detail elsewhere
    case "End":
		w1 = 2;
		w2 = 2;
		w3 = 2;
		w4 = 1;
		w5 = 1;
		w6 = 1;
		w7 = 1;
		w8 = 1;
		w9 = 1;
		w0 = 1;
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
	case "s":

      break;
	 case "Enter": //Most of the functional shopping code goes here.
	 
	 
	 //new way here/////////////////////////////////////////////////////////////////
	 if ((dockstate > 0)&&(dockstate<allshops.length)){//check if docked and shop exists
		 if (shopitem<allshops[dockstate].inv.length){//check for shopitem available
			if (allshops[dockstate].inv[shopitem].itemprice()<=money){
				money = money - allshops[dockstate].inv[shopitem].itemprice();
				allshops[dockstate].inv[shopitem].buy(money);//the buy function is supposed to handle the money transaction as well, but i dont think it can by itself.
			}
		 }		 
	 }

      break;
    default:
      return; // Quit when this doesn't handle the key event.
  } //end event key handling switch
  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		