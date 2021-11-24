function storycheck(){
var dstory = time - storytime;
switch(storystate){//Tutorial missions so far.
	case 0:
		if (dstory>1){
			playerradio.newmsg("Tutorial Dude",storymessages[0],time);//newmsg(sndr, msg, thetime)
			storystate = 1;
			storytime = time;
			}
		break;
	case 1:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[1],time);//newmsg(sndr, msg, thetime)
			task = "Select Merz on your nav computer (N,<,>)";
			storystate = 2;
			storytime = time;
			}
		break;
	case 2:
		if ((navtarget==5)&&(navactive==1)){
			playerradio.newmsg("Tutorial Dude",storymessages[2],time);//newmsg(sndr, msg, thetime)
			task = "Read the tutorial";
			storystate = 3;
			storytime = time;
			}
		break;
	case 3:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[3],time);//newmsg(sndr, msg, thetime)
			task = "Zoom out on the map to show the whole system( - )";
			storystate = 4;
			storytime = time;
			}
		break;
	case 4:
		if ((dstory>5)&&(mapscale>1024)&&(mapactive>0)){
			playerradio.newmsg("Tutorial Dude",storymessages[4],time);
			task = "Zoom in on the map so only the nearby inner planets are shown ( + )";
			storystate=5;
			storytime = time;
			}
	break;
	case 5:
		if ((dstory>5)&&(mapscale<128)&&(mapactive>0)){
			playerradio.newmsg("Tutorial Dude",storymessages[5],time);//newmsg(sndr, msg, thetime)
			task = "Go to Merz";
			storystate=6;
			storytime = time;
			}
	break;
	case 6:
	//	if (dstory==5){
	//		playerradio.newmsg("Tutorial Dude",storymessages[5],time);//newmsg(sndr, msg, thetime)
	//		}
		if ((dstory>5)&&(systems[ps].ships[0].distance(systems[ps].planets[5])<512)){
			playerradio.newmsg("Tutorial Dude",storymessages[6],time);//newmsg(sndr, msg, thetime)
			task = "Dock at the Merry Merzian";
			storystate=7;
			storytime = time;
			}
	break;
	case 7:
		if ((dstory>60)&&(dockstate==1)){
			playerradio.newmsg("Tutorial Dude",storymessages[7],time);//newmsg(sndr, msg, thetime)
			task = "Read the tutorial";
			storystate=8;
			storytime = time;
			money = money + 200;
			}
	break;
		case 8:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[8],time);//newmsg(sndr, msg, thetime)
			task = "Read the tutorial";
			storystate = 9;
			storytime = time;
			}
	break;
	case 9:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[9],time);//newmsg(sndr, msg, thetime)
			task = "Read the tutorial";
			storystate = 10;
			storytime = time;
			}
	break;		
	case 10:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[10],time);//newmsg(sndr, msg, thetime)
			task = "Read the tutorial";
			storystate = 11;
			storytime = time;
			}
	break;		
	case 11:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[11],time);//newmsg(sndr, msg, thetime)
			task = "Read the tutorial";
			storystate = 12;
			storytime = time;
			}
	break;		
	case 12:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[12],time);//newmsg(sndr, msg, thetime)
			task = "Read the tutorial";
			storystate = 13;
			storytime = time;
			}
	break;		
	case 13:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[13],time);//newmsg(sndr, msg, thetime)
			task = "Read the tutorial";
			storystate = 14;
			storytime = time;
			}
	break;		
	case 14:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[14],time);//newmsg(sndr, msg, thetime)
			task = "Read the tutorial";
			storystate = 15;
			storytime = time;
			}
	break;	
	case 15:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[15],time);//newmsg(sndr, msg, thetime)
			task = "Read the tutorial";
			storystate = 16;
			storytime = time;
			}
	break;			
	case 16:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[16]+systems[ps].ships[9].name,time);//newmsg(sndr, msg, thetime)
			task = "Destroy ship "+systems[ps].ships[9].name+" near Merz";
			ships[9].respawn(systems[ps].planets[ships[9].parentid]);
			storystate = 17;
			storytime = time;
			}
	break;		
	case 17:
		if (ships[9].hp==-1000){
			playerradio.newmsg("Tutorial Dude",storymessages[17],time);//newmsg(sndr, msg, thetime)
			task = "Return to the Merry Merzian";
			storystate = 18;
			storytime = time;
			}
	break;	
	case 18:
		if ((dstory>playerradio.msgtime)&&(dockstate==1)){
			playerradio.newmsg("Tutorial Dude",storymessages[18],time);//newmsg(sndr, msg, thetime)
			money = money + 400;
			task = "Read the tutorial";
			storystate = 19;
			storytime = time;
			}
	break;		
	case 19:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[19],time);//newmsg(sndr, msg, thetime)
			task = "Read the tutorial";
			storystate = 20;
			storytime = time;
			}
	break;
	case 20:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[20],time);//newmsg(sndr, msg, thetime)
			task = "Try out the Mine (weapon 2)";
			allblasters[2].phas = true;
			storystate = 21;
			storytime = time;
			}
	break;	
	case 21:
		if ((wep==2) && (allblasters[2].timer > 7)){//If w2 has fired 
			//allblasters[2].timer = 7;
			//wep=1;
			//allblasters[2].phas = false;
			storystate = 22;
			playerradio.newmsg("Tutorial Dude",storymessages[21],time);//newmsg(sndr, msg, thetime)
			task = "Read the tutorial";
			storytime = time;
			}
	break;	
	case 22:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[22],time);//newmsg(sndr, msg, thetime)
			//allblasters[2].phas = true;
			storystate = 23;
			task = "Read the tutorial";
			storytime = time;
			}
	break;	
	case 23:
		if (dstory>playerradio.msgtime){//if player has retuirned to the merry merz
			playerradio.newmsg("Tutorial Dude",storymessages[23],time);//newmsg(sndr, msg, thetime)
			storystate = 24;
			storytime = time;
			}
	break;	
	case 24:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[24],time);//newmsg(sndr, msg, thetime)
			storystate = 25;
			storytime = time;
			}
	break;	
	case 25:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[25],time);//newmsg(sndr, msg, thetime)
			storystate = 26;
			storytime = time;
			}
	break;	
	case 26:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[26],time);//newmsg(sndr, msg, thetime)
			storystate = 27;
			storytime = time;
			}
	break;
	case 27:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[27],time);//newmsg(sndr, msg, thetime)
			storystate = 28;
			storytime = time;
			}
	break;
	case 28:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[28],time);//newmsg(sndr, msg, thetime)
			storystate = 29;
			storytime = time;
			}
	break;
	case 29:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[29],time);//newmsg(sndr, msg, thetime)
			task = "Go to Jojo's and drop off a merry package."
			storystate = 30;
			storytime = time;
			}
	break;
	case 30:
		if (dockstate == 2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			money = money + 800;
			task = "Go to Earf and meet Bill";
			storystate = 35;
			storytime = time;
			}
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[30],time);//newmsg(sndr, msg, thetime)
			storystate = 31;
			storytime = time;
			}
	break;
	case 31:
		if (dockstate == 2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			money = money + 800;
			task = "Go to Earf and meet Bill";
			storystate = 35;
			storytime = time;
			}
			
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[31],time);//newmsg(sndr, msg, thetime)
			storystate = 32;
			storytime = time;
			}
	break;
	case 32:
	
		if (dockstate == 2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			money = money + 800;
			task = "Go to Earf and meet Bill";
			storystate = 35;
			storytime = time;
			}
	
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[32],time);//newmsg(sndr, msg, thetime)
			storystate = 33;
			storytime = time;
			}
	break;
	case 33:
		if (dockstate == 2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			money = money + 800;
			task = "Go to Earf and meet Bill";
			storystate = 35;
			storytime = time;
			}
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[33],time);//newmsg(sndr, msg, thetime)
			storystate = 34;
			storytime = time;
			}
	break;
	case 34:
		if (dockstate==2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			money = money + 800;
			task = "Go to Earf and meet Bill";
			storystate = 35;
			storytime = time;
			}
	break;
	case 35:
		if (dockstate == 0){
			playerradio.newmsg("Tutorial Dude",storymessages[35],time);//newmsg(sndr, msg, thetime)
			task = "Listen to Bill";
			storystate = 36;
			storytime = time;
			}
	break;
	case 36:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[36],time);//newmsg(sndr, msg, thetime)
			storystate = 37;
			storytime = time;
			}
	break;
	case 37:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude37",storymessages[37],time);//newmsg(sndr, msg, thetime)
			storystate = 38;
			storytime = time;
			}
	break;
	case 38:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude38",storymessages[38],time);//newmsg(sndr, msg, thetime)
			storystate = 39;
			storytime = time;
			}
	break;
	case 39:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude39",storymessages[39],time);//newmsg(sndr, msg, thetime)
			storystate = 40;
			storytime = time;
			}
	break;
	case 40:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude40",storymessages[40],time);//newmsg(sndr, msg, thetime)
			storystate = 41;
			storytime = time;
			}
	break;
	case 41:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude41",storymessages[41],time);//newmsg(sndr, msg, thetime)
			storystate = 42;
			storytime = time;
			}
	break;
	case 42:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude42",storymessages[42],time);//newmsg(sndr, msg, thetime)
			storystate = 43;
			storytime = time;
			}
	break;
	case 43:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude43",storymessages[43],time);//newmsg(sndr, msg, thetime)
			storystate = 44;
			storytime = time;
			}
	break;
	case 44:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude44",storymessages[44],time);//newmsg(sndr, msg, thetime)
			storystate = 45;
			storytime = time;
			}
	break;
	case 45:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude45",storymessages[45],time);//newmsg(sndr, msg, thetime)
			task = "Get supplies from Dangustown";
			storystate = 46;
			storytime = time;
			}
	break;
	case 46:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude46",storymessages[46],time);//newmsg(sndr, msg, thetime)
			storystate = 47;
			storytime = time;
			}
	break;
	case 47:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude47",storymessages[47],time);//newmsg(sndr, msg, thetime)
			storystate = 48;
			storytime = time;
			}
	break;
	case 48:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude48",storymessages[48],time);//newmsg(sndr, msg, thetime)
			storystate = 49;
			storytime = time;
			}
	break;
	case 49:
		if (dockstate==3){//Need to add mission cargo handling to this mission code
			playerradio.newmsg("Tutorial Dude49",storymessages[49],time);//newmsg(sndr, msg, thetime)
			var freecargo = playerinventory.maxcargo-playerinventory.totalcargo();
			if (freecargo<10){//case for no crates
				storystate = 50;
			}else if (freecargo>20){//both crates
				storystate=54;
				playerinventory.takecargo(allcargos.length-1,20); //allcargos.length-1 is the last item, which will always be mission cargo.
			}else{
				storystate = 51;//1 crate
				playerinventory.takecargo(allcargos.length-1,10); //allcargos.length-1 is the last item, which will always be mission cargo.
				}
			storytime = time;
			}
	break;
	case 50://no crates taken
		if ((dockstate==3)&&(playerinventory.maxcargo-playerinventory.totalcargo()>=10)){ //if room for crates...
			playerradio.newmsg("Tutorial Dude50",storymessages[50],time);//newmsg(sndr, msg, thetime)
			var freecargo = playerinventory.maxcargo-playerinventory.totalcargo();
			if (freecargo<20){storystate=51;}else{storystate=54;}
			storytime = time;
			}
	break;
	case 51:
		if (dstory>playerradio.msgtime){//took 1 crate
			playerradio.newmsg("Tutorial Dude51",storymessages[51],time);//newmsg(sndr, msg, thetime)
			storystate = 52;
			storytime = time;
			}
	break;
	case 52:
		if (dockstate==0){//if 1 crate taken to bill
			playerradio.newmsg("Tutorial Dude52",storymessages[52],time);//newmsg(sndr, msg, thetime)
			playerinventory.givecargo(allcargos.length-1,10);//global scope
			storystate = 53;//cool story bro go get the other one
			storytime = time;
			}
	break;
	case 53:
		if ((dockstate==3)&&(playerinventory.maxcargo-playerinventory.totalcargo()>=10)){//If back at dangustown with room for 2nd crate...
			playerradio.newmsg("Tutorial Dude53",storymessages[53],time);//newmsg(sndr, msg, thetime)
			playerinventory.takecargo(allcargos.length-1,10);
			storystate = 54;
			storytime = time;
			}
	break;
	case 54:
		if (dockstate==0){
			playerradio.newmsg("Tutorial Dude54",storymessages[54],time);//good job you did it.
			playerinventory.givecargo(allcargos.length-1,10);//global scope
			//need to check if the player took both crates and take away the other 10 units of mission cargo.
			money = money + 5000;
			storystate = 55;
			storytime = time;
			}
	break;
	case 55:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude55",storymessages[55],time);//newmsg(sndr, msg, thetime)
			storystate = 56;
			storytime = time;
			}
	break;
	case 56:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude56",storymessages[56],time);//newmsg(sndr, msg, thetime)
			storystate = 57;
			storytime = time;
			}
	break;
	case 57:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude57",storymessages[57],time);//newmsg(sndr, msg, thetime)
			storystate = 58;
			storytime = time;
			}
	break;
	case 58:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude58",storymessages[58],time);//newmsg(sndr, msg, thetime)
			storystate = 59;
			storytime = time;
			}
	break;
	}
}