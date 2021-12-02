function storycheck(){
var dstory = time - systems[ps].players[0].storytime;
switch(systems[ps].players[0].storystate){//Tutorial missions so far.
	case 0:
		if (dstory>1){
			playerradio.newmsg("Tutorial Dude",storymessages[0],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 1;
			systems[ps].players[0].storytime = time;
			}
		break;
	case 1:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[1],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Select Merz on your nav computer (N,<,>)";
			systems[ps].players[0].storystate = 2;
			systems[ps].players[0].storytime = time;
			}
		break;
	case 2:
		if ((systems[ps].players[0].navtarget==5)&&(systems[ps].players[0].navactive==1)){
			playerradio.newmsg("Tutorial Dude",storymessages[2],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storystate = 3;
			systems[ps].players[0].storytime = time;
			}
		break;
	case 3:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[3],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Zoom out on the map to show the whole system( - )";
			systems[ps].players[0].storystate = 4;
			systems[ps].players[0].storytime = time;
			}
		break;
	case 4:
		if ((dstory>5)&&(systems[ps].players[0].mapscale>1024)&&(systems[ps].players[0].mapactive>0)){
			playerradio.newmsg("Tutorial Dude",storymessages[4],time);
			systems[ps].players[0].task = "Zoom in on the map so only the nearby inner planets are shown ( + )";
			systems[ps].players[0].storystate=5;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 5:
		if ((dstory>5)&&(systems[ps].players[0].mapscale<128)&&(systems[ps].players[0].mapactive>0)){
			playerradio.newmsg("Tutorial Dude",storymessages[5],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Go to Merz";
			systems[ps].players[0].storystate=6;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 6:
	//	if (dstory==5){
	//		playerradio.newmsg("Tutorial Dude",storymessages[5],time);//newmsg(sndr, msg, thetime)
	//		}
		if ((dstory>5)&&(systems[ps].players[0].ship.distance(systems[ps].planets[5])<512)){
			playerradio.newmsg("Tutorial Dude",storymessages[6],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].money = systems[ps].players[0].money + 200;
			systems[ps].players[0].task = "Dock at the Merry Merzian";
			systems[ps].players[0].storystate=7;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 7:
		if ((dstory>60)&&(systems[ps].players[0].dockstate==1)){
			playerradio.newmsg("Tutorial Dude",storymessages[7],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storystate=8;
			systems[ps].players[0].storytime = time;
			}
	break;
		case 8:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[8],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storystate = 9;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 9:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[9],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storystate = 10;
			systems[ps].players[0].storytime = time;
			}
	break;		
	case 10:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[10],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storystate = 11;
			systems[ps].players[0].storytime = time;
			}
	break;		
	case 11:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[11],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storystate = 12;
			systems[ps].players[0].storytime = time;
			}
	break;		
	case 12:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[12],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storystate = 13;
			systems[ps].players[0].storytime = time;
			}
	break;		
	case 13:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[13],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storystate = 14;
			systems[ps].players[0].storytime = time;
			}
	break;		
	case 14:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[14],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storystate = 15;
			systems[ps].players[0].storytime = time;
			}
	break;	
	case 15:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[15],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storystate = 16;
			systems[ps].players[0].storytime = time;
			}
	break;			
	case 16:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[16]+systems[ps].ships[9].name,time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Destroy ship "+systems[ps].ships[9].name+" near Merz";
			ships[9].respawn(systems[ps].planets[ships[9].parentid]);
			systems[ps].players[0].storystate = 17;
			systems[ps].players[0].storytime = time;
			}
	break;		
	case 17:
		if (ships[9].hp==-1000){
			playerradio.newmsg("Tutorial Dude",storymessages[17],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Return to the Merry Merzian";
			systems[ps].players[0].money = systems[ps].players[0].money + 400;
			systems[ps].players[0].storystate = 18;
			systems[ps].players[0].storytime = time;
			}
	break;	
	case 18:
		if ((dstory>playerradio.msgtime)&&(systems[ps].players[0].dockstate==1)){
			playerradio.newmsg("Tutorial Dude",storymessages[18],time);//newmsg(sndr, msg, thetime)
			//systems[ps].players[0].money = systems[ps].players[0].money + 400;
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storystate = 19;
			systems[ps].players[0].storytime = time;
			}
	break;		
	case 19:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[19],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storystate = 20;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 20:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[20],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Try out the Mine (weapon 2)";
			systems[ps].players[0].blasters[2].phas = true;
			systems[ps].players[0].storystate = 21;
			systems[ps].players[0].storytime = time;
			}
	break;	
	case 21:
		if ((systems[ps].players[0].wep==2) && (systems[ps].players[0].blasters[2].bombs[0].timer > 7)){//If w2 has fired 
			//allblasters[2].timer = 7;
			//wep=1;
			//allblasters[2].phas = false;
			systems[ps].players[0].storystate = 22;
			playerradio.newmsg("Tutorial Dude",storymessages[21],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storytime = time;
			}
	break;	
	case 22:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[22],time);//newmsg(sndr, msg, thetime)
			//allblasters[2].phas = true;
			systems[ps].players[0].storystate = 23;
			systems[ps].players[0].task = "Read the tutorial";
			systems[ps].players[0].storytime = time;
			}
	break;	
	case 23:
		if (dstory>playerradio.msgtime){//if player has retuirned to the merry merz
			playerradio.newmsg("Tutorial Dude",storymessages[23],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 24;
			systems[ps].players[0].storytime = time;
			}
	break;	
	case 24:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[24],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 25;
			systems[ps].players[0].storytime = time;
			}
	break;	
	case 25:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[25],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 26;
			systems[ps].players[0].storytime = time;
			}
	break;	
	case 26:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[26],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 27;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 27:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[27],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 28;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 28:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[28],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 29;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 29:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[29],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Go to Jojo's and drop off a merry package."
			systems[ps].players[0].storystate = 30;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 30:
		if (systems[ps].players[0].dockstate == 2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].money = systems[ps].players[0].money + 800;
			systems[ps].players[0].task = "Go to Earf and meet Bill";
			systems[ps].players[0].storystate = 35;
			systems[ps].players[0].storytime = time;
			}
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[30],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 31;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 31:
		if (systems[ps].players[0].dockstate == 2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].money = systems[ps].players[0].money + 800;
			systems[ps].players[0].task = "Go to Earf and meet Bill";
			systems[ps].players[0].storystate = 35;
			systems[ps].players[0].storytime = time;
			}
			
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[31],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 32;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 32:
		if (systems[ps].players[0].dockstate == 2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].money = systems[ps].players[0].money + 800;
			systems[ps].players[0].task = "Go to Earf and meet Bill";
			systems[ps].players[0].storystate = 35;
			systems[ps].players[0].storytime = time;
			}
	
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[32],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 33;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 33:
		if (systems[ps].players[0].dockstate == 2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].money =systems[ps].players[0]. money + 800;
			systems[ps].players[0].task = "Go to Earf and meet Bill";
			systems[ps].players[0].storystate = 35;
			systems[ps].players[0].storytime = time;
			}
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[33],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 34;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 34:
		if (systems[ps].players[0].dockstate==2){
			playerradio.newmsg("Tutorial Dude",storymessages[34],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].money = systems[ps].players[0].money + 800;
			systems[ps].players[0].task = "Go to Earf and meet Bill";
			systems[ps].players[0].storystate = 35;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 35:
		if (systems[ps].players[0].dockstate == 0){
			playerradio.newmsg("Tutorial Dude",storymessages[35],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Listen to Bill";
			systems[ps].players[0].storystate = 36;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 36:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[36],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 37;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 37:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude37",storymessages[37],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 38;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 38:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude38",storymessages[38],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 39;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 39:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude39",storymessages[39],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 40;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 40:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude40",storymessages[40],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 41;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 41:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude41",storymessages[41],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 42;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 42:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude42",storymessages[42],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 43;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 43:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude43",storymessages[43],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 44;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 44:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude44",storymessages[44],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 45;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 45:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude45",storymessages[45],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].task = "Get supplies from Dangustown";
			systems[ps].players[0].storystate = 46;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 46:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude46",storymessages[46],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 47;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 47:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude47",storymessages[47],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 48;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 48:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude48",storymessages[48],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 49;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 49:
		if (systems[ps].players[0].dockstate==3){//Need to add mission cargo handling to this mission code
			playerradio.newmsg("Tutorial Dude49",storymessages[49],time);//newmsg(sndr, msg, thetime)
			var freecargo = systems[ps].players[0].inventory.maxcargo-systems[ps].players[0].inventory.totalcargo();
			if (freecargo<10){//case for no crates
				systems[ps].players[0].storystate = 50;
			}else if (freecargo>20){//both crates
				systems[ps].players[0].storystate=54;
				systems[ps].players[0].inventory.takecargo(allcargos.length-1,20); //allcargos.length-1 is the last item, which will always be mission cargo.
			}else{
				systems[ps].players[0].storystate = 51;//1 crate
				systems[ps].players[0].inventory.takecargo(allcargos.length-1,10); //allcargos.length-1 is the last item, which will always be mission cargo.
				}
			systems[ps].players[0].storytime = time;
			}
	break;
	case 50://no crates taken
		if ((systems[ps].players[0].dockstate==3)&&(playerinventory.maxcargo-playerinventory.totalcargo()>=10)){ //if room for crates...
			playerradio.newmsg("Tutorial Dude50",storymessages[50],time);//newmsg(sndr, msg, thetime)
			var freecargo = systems[ps].players[0].inventory.maxcargo-systems[ps].players[0].inventory.totalcargo();
			if (freecargo<20){systems[ps].players[0].storystate=51;}else{systems[ps].players[0].storystate=54;}
			systems[ps].players[0].storytime = time;
			}
	break;
	case 51:
		if (dstory>playerradio.msgtime){//took 1 crate
			playerradio.newmsg("Tutorial Dude51",storymessages[51],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 52;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 52:
		if (dockstate==0){//if 1 crate taken to bill
			playerradio.newmsg("Tutorial Dude52",storymessages[52],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].inventory.givecargo(allcargos.length-1,10);//global scope
			systems[ps].players[0].storystate = 53;//cool story bro go get the other one
			systems[ps].players[0].storytime = time;
			}
	break;
	case 53:
		if ((dockstate==3)&&(playerinventory.maxcargo-playerinventory.totalcargo()>=10)){//If back at dangustown with room for 2nd crate...
			playerradio.newmsg("Tutorial Dude53",storymessages[53],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].inventory.takecargo(allcargos.length-1,10);
			systems[ps].players[0].storystate = 54;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 54:
		if (dockstate==0){
			playerradio.newmsg("Tutorial Dude54",storymessages[54],time);//good job you did it.
			systems[ps].players[0].inventory.givecargo(allcargos.length-1,10);//global scope
			//need to check if the player took both crates and take away the other 10 units of mission cargo.
			systems[ps].players[0].money = systems[ps].players[0].money + 5000;
			systems[ps].players[0].storystate = 55;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 55:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude55",storymessages[55],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 56;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 56:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude56",storymessages[56],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 57;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 57:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude57",storymessages[57],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 58;
			systems[ps].players[0].storytime = time;
			}
	break;
	case 58:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude58",storymessages[58],time);//newmsg(sndr, msg, thetime)
			systems[ps].players[0].storystate = 59;
			systems[ps].players[0].storytime = time;
			}
	break;
	}
}