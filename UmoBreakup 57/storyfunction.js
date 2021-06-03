function storycheck(){
var dstory = time - storytime;
switch(storystate){//Tutorial missions so far.
	case 0:
		if (dstory==1){
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
		if ((dstory>playerradio.msgtime)&&(mapscale>1024)&&(mapactive>0)){
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
		if ((dstory>5)&&(systems[playersystem].ships[0].distance(systems[playersystem].planets[5])<512)){
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
			playerradio.newmsg("Tutorial Dude",storymessages[16]+systems[playersystem].ships[9].name,time);//newmsg(sndr, msg, thetime)
			task = "Destroy ship "+systems[playersystem].ships[9].name+" near Merz";
			ships[9].respawn(systems[playersystem].planets[ships[9].parentid]);
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
			wep=1;
			allblasters[2].phas = false;
			storystate = 22;
			playerradio.newmsg("Tutorial Dude",storymessages[21],time);//newmsg(sndr, msg, thetime)
			task = "Return to the Merzian for service";
			storytime = time;
			}
	break;	
	case 22:
		if (dockstate==1){//if player has retuirned to the merry merz
			playerradio.newmsg("Tutorial Dude",storymessages[22],time);//newmsg(sndr, msg, thetime)
			allblasters[2].phas = true;
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
			storystate = 35;
			storytime = time;
			}
	break;
	
	case 35:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[35],time);//newmsg(sndr, msg, thetime)
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

	}
}