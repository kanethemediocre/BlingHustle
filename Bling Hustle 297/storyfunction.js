function storycheck(playerindex){
var myplayer = systems[ps].players[playerindex];
var dstory = time - myplayer.storytime;
switch(myplayer.storystate){//Tutorial missions so far.
	case 0:
		if (dstory>1){
			playerradio.newmsg("Tutorial Dude",storymessages[0],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 1;
			myplayer.storytime = time;
			}
		break;
	case 1:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[1],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Select Merz on your nav computer (N,<,>)";
			myplayer.storystate = 2;
			myplayer.storytime = time;
			}
		break;
	case 2:
		if ((myplayer.navtarget==5)&&(myplayer.navactive==1)){
			playerradio.newmsg("Tutorial Dude",storymessages[2],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate = 3;
			myplayer.storytime = time;
			}
		break;
	case 3:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[3],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Zoom out on the map to show the whole system( - )";
			myplayer.storystate = 4;
			myplayer.storytime = time;
			}
		break;
	case 4:
		if ((dstory>5)&&(myplayer.mapscale>1024)&&(myplayer.mapactive>0)){
			playerradio.newmsg("Tutorial Dude",storymessages[4],time);
			myplayer.task = "Zoom in on the map so only the nearby inner planets are shown ( + )";
			myplayer.storystate=5;
			myplayer.storytime = time;
			}
	break;
	case 5:
		if ((dstory>5)&&(myplayer.mapscale<128)&&(myplayer.mapactive>0)){
			playerradio.newmsg("Tutorial Dude",storymessages[5],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Go to Merz";
			myplayer.storystate=6;
			myplayer.storytime = time;
			}
	break;
	case 6:
	//	if (dstory==5){
	//		playerradio.newmsg("Tutorial Dude",storymessages[5],time);//newmsg(sndr, msg, thetime)
	//		}
		if ((dstory>5)&&(myplayer.ship.distance(systems[ps].planets[5])<512)){
			playerradio.newmsg("Tutorial Dude",storymessages[6],time);//newmsg(sndr, msg, thetime)
			myplayer.money = myplayer.money + 200;
			myplayer.task = "Dock at the Merry Merzian";
			myplayer.storystate=7;
			myplayer.storytime = time;
			}
	break;
	case 7:
		if ((dstory>60)&&(myplayer.dockstate==1)){
			playerradio.newmsg("Tutorial Dude",storymessages[7],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate=8;
			myplayer.storytime = time;
			}
	break;
		case 8:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[8],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate = 9;
			myplayer.storytime = time;
			}
	break;
	case 9:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[9],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate = 10;
			myplayer.storytime = time;
			}
	break;		
	case 10:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[10],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate = 11;
			myplayer.storytime = time;
			}
	break;		
	case 11:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[11],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate = 12;
			myplayer.storytime = time;
			}
	break;		
	case 12:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[12],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate = 13;
			myplayer.storytime = time;
			}
	break;		
	case 13:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[13],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate = 14;
			myplayer.storytime = time;
			}
	break;		
	case 14:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[14],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate = 15;
			myplayer.storytime = time;
			}
	break;	
	case 15:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[15],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate = 16;
			myplayer.storytime = time;
			}
	break;			
	case 16:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[16]+systems[ps].ships[9].name,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Destroy ship "+systems[ps].ships[9].name+" near Merz";
			ships[9].respawn(systems[ps].planets[ships[9].parentid]);
			myplayer.storystate = 17;
			myplayer.storytime = time;
			}
	break;		
	case 17:
		if (ships[9].hp==-1000){
			playerradio.newmsg("Tutorial Dude",storymessages[17],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Return to the Merry Merzian";
			myplayer.money = myplayer.money + 400;
			myplayer.storystate = 18;
			myplayer.storytime = time;
			}
	break;	
	case 18:
		if ((dstory>playerradio.msgtime)&&(myplayer.dockstate==1)){
			playerradio.newmsg("Tutorial Dude",storymessages[18],time);//newmsg(sndr, msg, thetime)
			//myplayer.money = myplayer.money + 400;
			myplayer.task = "Read the tutorial";
			myplayer.storystate = 19;
			myplayer.storytime = time;
			}
	break;		
	case 19:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[19],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate = 20;
			myplayer.storytime = time;
			}
	break;
	case 20:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[20],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Try out the Mine (weapon 2)";
			myplayer.blasters[2].phas = true;
			myplayer.storystate = 21;
			myplayer.storytime = time;
			}
	break;	
	case 21:
		if ((myplayer.wep==2) && (myplayer.blasters[2].bombs[0].timer > 7)){//If w2 has fired 
			//allblasters[2].timer = 7;
			//wep=1;
			//allblasters[2].phas = false;
			myplayer.storystate = 22;
			playerradio.newmsg("Tutorial Dude",storymessages[21],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storytime = time;
			}
	break;	
	case 22:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[22],time);//newmsg(sndr, msg, thetime)
			//allblasters[2].phas = true;
			myplayer.storystate = 23;
			myplayer.task = "Read the tutorial";
			myplayer.storytime = time;
			}
	break;	
	case 23:
		if (dstory>playerradio.msgtime){//if player has retuirned to the merry merz
			playerradio.newmsg("Tutorial Dude",storymessages[23],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 24;
			myplayer.storytime = time;
			}
	break;	
	case 24:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[24],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 25;
			myplayer.storytime = time;
			}
	break;	
	case 25:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[25],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 26;
			myplayer.storytime = time;
			}
	break;	
	case 26:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[26],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 27;
			myplayer.storytime = time;
			}
	break;
	case 27:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[27],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 28;
			myplayer.storytime = time;
			}
	break;
	case 28:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[28],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 29;
			myplayer.storytime = time;
			}
	break;
	case 29:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[29],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Go to Jojo's and drop off a merry package."
			myplayer.storystate = 30;
			myplayer.storytime = time;
			}
	break;
	case 30:
		if (myplayer.dockstate == 2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			myplayer.money = myplayer.money + 800;
			myplayer.task = "Go to Earf and meet Bill";
			myplayer.storystate = 35;
			myplayer.storytime = time;
			}
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[30],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 31;
			myplayer.storytime = time;
			}
	break;
	case 31:
		if (myplayer.dockstate == 2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			myplayer.money = myplayer.money + 800;
			myplayer.task = "Go to Earf and meet Bill";
			myplayer.storystate = 35;
			myplayer.storytime = time;
			}
			
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[31],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 32;
			myplayer.storytime = time;
			}
	break;
	case 32:
		if (myplayer.dockstate == 2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			myplayer.money = myplayer.money + 800;
			myplayer.task = "Go to Earf and meet Bill";
			myplayer.storystate = 35;
			myplayer.storytime = time;
			}
	
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[32],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 33;
			myplayer.storytime = time;
			}
	break;
	case 33:
		if (myplayer.dockstate == 2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			myplayer.money =myplayer. money + 800;
			myplayer.task = "Go to Earf and meet Bill";
			myplayer.storystate = 35;
			myplayer.storytime = time;
			}
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[33],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 34;
			myplayer.storytime = time;
			}
	break;
	case 34:
		if (myplayer.dockstate==2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			myplayer.money = myplayer.money + 800;
			myplayer.task = "Go to Earf and meet Bill";
			myplayer.storystate = 35;
			myplayer.storytime = time;
			}
	break;
	case 35:
		if (myplayer.dockstate == 0){
			playerradio.newmsg("Tutorial Dude",storymessages[35],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Listen to Bill";
			myplayer.storystate = 36;
			myplayer.storytime = time;
			}
	break;
	case 36:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[36],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 37;
			myplayer.storytime = time;
			}
	break;
	case 37:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude37",storymessages[37],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 38;
			myplayer.storytime = time;
			}
	break;
	case 38:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude38",storymessages[38],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 39;
			myplayer.storytime = time;
			}
	break;
	case 39:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude39",storymessages[39],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 40;
			myplayer.storytime = time;
			}
	break;
	case 40:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude40",storymessages[40],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 41;
			myplayer.storytime = time;
			}
	break;
	case 41:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude41",storymessages[41],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 42;
			myplayer.storytime = time;
			}
	break;
	case 42:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude42",storymessages[42],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 43;
			myplayer.storytime = time;
			}
	break;
	case 43:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude43",storymessages[43],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 44;
			myplayer.storytime = time;
			}
	break;
	case 44:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude44",storymessages[44],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 45;
			myplayer.storytime = time;
			}
	break;
	case 45:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude45",storymessages[45],time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Get supplies from Dangustown";
			myplayer.storystate = 46;
			myplayer.storytime = time;
			}
	break;
	case 46:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude46",storymessages[46],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 47;
			myplayer.storytime = time;
			}
	break;
	case 47:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude47",storymessages[47],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 48;
			myplayer.storytime = time;
			}
	break;
	case 48:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude48",storymessages[48],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 49;
			myplayer.storytime = time;
			}
	break;
	case 49:
		if (myplayer.dockstate==3){//Need to add mission cargo handling to this mission code
			playerradio.newmsg("Tutorial Dude49",storymessages[49],time);//newmsg(sndr, msg, thetime)
			var freecargo = myplayer.inventory.maxcargo-myplayer.inventory.totalcargo();
			if (freecargo<10){//case for no crates
				myplayer.storystate = 50;
			}else if (freecargo>20){//both crates
				myplayer.storystate=54;
				myplayer.inventory.takecargo(allcargos.length-1,20); //allcargos.length-1 is the last item, which will always be mission cargo.
			}else{
				myplayer.storystate = 51;//1 crate
				myplayer.inventory.takecargo(allcargos.length-1,10); //allcargos.length-1 is the last item, which will always be mission cargo.
				}
			myplayer.storytime = time;
			}
	break;
	case 50://no crates taken
		if ((myplayer.dockstate==3)&&(playerinventory.maxcargo-playerinventory.totalcargo()>=10)){ //if room for crates...
			playerradio.newmsg("Tutorial Dude50",storymessages[50],time);//newmsg(sndr, msg, thetime)
			var freecargo = myplayer.inventory.maxcargo-myplayer.inventory.totalcargo();
			if (freecargo<20){myplayer.storystate=51;}else{myplayer.storystate=54;}
			myplayer.storytime = time;
			}
	break;
	case 51:
		if (dstory>playerradio.msgtime){//took 1 crate
			playerradio.newmsg("Tutorial Dude51",storymessages[51],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 52;
			myplayer.storytime = time;
			}
	break;
	case 52:
		if (dockstate==0){//if 1 crate taken to bill
			playerradio.newmsg("Tutorial Dude52",storymessages[52],time);//newmsg(sndr, msg, thetime)
			myplayer.inventory.givecargo(allcargos.length-1,10);//global scope
			myplayer.storystate = 53;//cool story bro go get the other one
			myplayer.storytime = time;
			}
	break;
	case 53:
		if ((dockstate==3)&&(playerinventory.maxcargo-playerinventory.totalcargo()>=10)){//If back at dangustown with room for 2nd crate...
			playerradio.newmsg("Tutorial Dude53",storymessages[53],time);//newmsg(sndr, msg, thetime)
			myplayer.inventory.takecargo(allcargos.length-1,10);
			myplayer.storystate = 54;
			myplayer.storytime = time;
			}
	break;
	case 54:
		if (dockstate==0){
			playerradio.newmsg("Tutorial Dude54",storymessages[54],time);//good job you did it.
			myplayer.inventory.givecargo(allcargos.length-1,10);//global scope
			//need to check if the player took both crates and take away the other 10 units of mission cargo.
			myplayer.money = myplayer.money + 5000;
			myplayer.storystate = 55;
			myplayer.storytime = time;
			}
	break;
	case 55:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude55",storymessages[55],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 56;
			myplayer.storytime = time;
			}
	break;
	case 56:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude56",storymessages[56],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 57;
			myplayer.storytime = time;
			}
	break;
	case 57:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude57",storymessages[57],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 58;
			myplayer.storytime = time;
			}
	break;
	case 58:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude58",storymessages[58],time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 59;
			myplayer.storytime = time;
			}
	break;
	}
}