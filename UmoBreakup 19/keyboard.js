
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (event.key) {  //events for all the keyboard keys
    case "q":
	 qblaster.fire(ships[0],[playerbombs[0]]);
      break;   
	 case "f":
     qblaster.plusboom(ships[0],[playerbombs[0]]);
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
		if (dockstate == 1){//Only works in shop 1, Earf station
			if ((shopitem == 0)&&(money>19)){ //First item on list
				ships[0].hp = ships[0].maxhp;
				money = money - 20;
			}else if ((shopitem == 1)&&(money>199)){//3rd item is w3
				if (w3 == 0){//Only buy if not already bought
					w3 = 1; //Flakker is weapon 3
					money = money - 200;
					}
			}else if ((shopitem == 2)&&(money>599)){
				if (w1 == 1){//Only buy if w1 present but not upgraded
					w1 = 2; //Values >1 denote upgrades.
					money = money - 600;
					}
			}else if ((shopitem == 3)&&(money>999)){
				if (w3 == 1){//Only buy if w3 present but not upgraded
					w3 = 2; //Values >1 denote upgrades.
					bombs[2].hurt = bombs[2].hurt + 20; //bombs index 2 is player weapon 3
					money = money - 1000;
					}
			}else if ((shopitem == 4)&&(money>999)){
				if (w6 == 0){//Only buy if a1 has no upgrades
					w6 = 1; //Values >1 denote further upgrades.
					money = money - 1000;
					}
			}else if ((shopitem == 5)&&(money>799)){
				ships[0].hp = 2 * ships[0].maxhp;  //Adds hit points beyond maximum -- can't repair it!
			}else if ((shopitem == 6)&&(money>499)){
				boosters[1] = boosters[1]+2; //Adds hit points beyond maximum -- can't repair it!
				money = money - 500;
				}
			}//end of shop 1 handling
//	var shopchart1 = [ ["$20 Repair hull","$400 w2 Mine", "$200 w3 Flakker", "$600 w1 Blaster Upgrade I (detonator)","$1000 Armor Upgrade I","$3000 Radar Upgrade I","$400 Single-use extra hull","EMPTY","EMPTY","EMPTY"]  ];
		if (dockstate == 2){//Only works in shop 2, Merz's station
			if ((shopitem == 0)&&(money>19)){ //First item on list is repair job
				ships[0].hp = ships[0].maxhp;//repair 
				money = money - 20;//bill
			}else if ((shopitem == 1)&&(money>399)){ //Second item...
				if (w2 == 0){//Only buy if not already bought
					w2 = 1; 
					money = money - 400;
					}
			}else if ((shopitem == 2)&&(money>199)){
				if (w3 == 0){//Only buy if not already bought
					w3 = 1; //Flakker is weapon 3
					money = money - 200;
					}
			}else if ((shopitem == 3)&&(money>599)){//upgrade blaster
				if (w1 == 1){//Only buy if w1 present but not upgraded
					w1 = 2; //Values >1 denote upgrades.
					money = money - 600;
					}
			}else if ((shopitem == 4)&&(money>999)){
				if (a1 == 0){//Only buy if a1 has no upgrades
					a1 = 1; //Values >1 denote further upgrades.
					ships[0].maxhp = ships[0].maxhp + 250; //bombs index 2 is player weapon 3
					money = money - 1000;
					}
			}else if ((shopitem == 5)&&(money>2999)){
				if (radarrange == 4000){//Only buy if radar has no upgrades
					radarrange = 6000;
					money = money - 3000;
					}
			}else if ((shopitem == 6)&&(money>399)){
				ships[0].hp = 2 * ships[0].maxhp;  //Adds hit points beyond maximum -- can't repair it!
				money = money - 800;
			}else if ((shopitem == 7)&&(money>499)){
				boosters[1] = boosters[1]+2; //Adds hit points beyond maximum -- can't repair it!
				money = money - 500;
				}
		}//end of shop 2 handling//////////////////////////////////////////////////////////////////////////////

		if (dockstate == 3){//Only works in shop 3, Jupe's station
			if ((shopitem == 0)&&(money>19)){ //First item on list
				ships[0].hp = ships[0].maxhp;
				money = money - 20;
			}else if ((shopitem == 1)&&(money>399)){ //Second item is weapon 2, a mine
				if (w2 == 0){//Only buy if not already bought
					w2 = 1; //enables weapon
					money = money - 400;
					}
			}else if ((shopitem == 2)&&(money>199)){//3rd item is w3
				if (w3 == 0){//Only buy if not already bought
					w3 = 1; //Flakker is weapon 3
					money = money - 200;
					}
			}else if ((shopitem == 3)&&(money>999)){
				if (w4 == 0){//Only buy if not already bought
					w4 = 1; //Railgun is w4
					money = money - 1000;
					}
			}else if ((shopitem == 4)&&(money>599)){
				if (w1 == 1){//Only buy if w1 present but not upgraded
					w1 = 2; //Values >1 denote upgrades.
					money = money - 600;
					}
			}else if ((shopitem == 5)&&(money>1199)){
				if (w2 == 1){//Only buy if w3 present but not upgraded
					w2 = 2; //Values >1 denote upgrades.
					money = money - 1200;
					}
			}else if ((shopitem == 6)&&(money>999)){
				if (w3 == 1){//Only buy if w3 present but not upgraded
					w3 = 2; //Values >1 denote upgrades.
					bombs[2].hurt = bombs[2].hurt + 20; //bombs index 2 is player weapon 3
					money = money - 1000;
					}
			}else if ((shopitem == 7)&&(money>999)){
				if (a1 == 0){//Only buy if a1 has no upgrades
					a1 = 1; //Values >1 denote further upgrades.
					ships[0].maxhp = ships[0].maxhp + 250; //bombs index 2 is player weapon 3
					money = money - 1000;
					}
			}else if ((shopitem == 8)&&(money>1999)){
				if (s1 == 0){//Only buy if s1 has no upgrades
					s1 = 1; //Values >1 denote further upgrades.
					ships[0].maxshield = ships[0].maxshield + 200; //Incrementing allows me to rebalance initial maximum
					money = money - 2000;  //Regen rate is unchanged, will be upgradable soon
					}
			}else if ((shopitem == 9)&&(money>799)){
				ships[0].hp = 2 * ships[0].maxhp;  //Adds hit points beyond maximum -- can't repair it!
				}
		}//end of shop 3 handling///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//[ ["$20 Repair hull","$1000 w4 Railgun","$2400 w5 SpreadShot Cannon","$4000 w6 Lazzor","$6000 w7 Double Rainbow","$4000 w8 Spectral Disintegrator", "$10000 w9 Bapadoop","$2000 Shield Upgrade I","$800 Single-use extra hull","EMPTY"]  ];
		if (dockstate == 4){//Only works in shop 4, Anus's station
			if ((shopitem == 0)&&(money>19)){ //First item on list
				ships[0].hp = ships[0].maxhp;
				money = money - 20;
			}else if ((shopitem == 1)&&(money>999)){ //Second item is weapon 4, railgun
				if (w4 == 0){//Only buy if not already bought
					w4 = 1; //enables weapon
					money = money - 1000;
					}
			}else if ((shopitem == 2)&&(money>2399)){//3rd item is w5, spreadcannon
				if (w5 == 0){//Only buy if not already bought
					w5 = 1;
					money = money - 2400;
					}
			}else if ((shopitem == 3)&&(money>3999)){//w6 lazzzor
				if (w6 == 0){//Only buy if not already bought
					w6 = 1; 
					money = money - 4000;
					}
			}else if ((shopitem == 4)&&(money>5999)){
				if (w7 == 0){//Only buy if w1 present but not upgraded
					w7 = 1; //Values >1 denote upgrades.
					money = money - 6000;
					}
			}else if ((shopitem == 5)&&(money>3999)){
				if (w8 == 0){//Only buy if w3 present but not upgraded
					w8 = 1; //Values >1 denote upgrades.
					money = money - 4000;
					}
			}else if ((shopitem == 6)&&(money>9999)){
				if (w9 == 0){//Only buy if w3 present but not upgraded
					w9 = 1; //Values >1 denote upgrades.
					money = money - 10000;
					}
			}else if ((shopitem == 7)&&(money>1999)){
				if (s1 == 0){//Only buy if a1 has no upgrades
					s1 = 1; //Values >1 denote further upgrades.
					ships[0].maxhp = ships[0].maxhp + 250; //bombs index 2 is player weapon 3
					money = money - 2000;
					}

			}else if ((shopitem == 8)&&(money>799)){
				ships[0].hp = 2 * ships[0].maxhp;  //Adds hit points beyond maximum -- can't repair it!
				money = money - 800;
				}
		}//end of shop 4 handling///////////////////////////////////////////////////////////////////////////////////////////////////////////////
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  } //end event key handling switch
  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		