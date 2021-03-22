function storycheck(){
var dstory = time - storytime;
switch(storystate){//Tutorial missions so far.
	case 0:
		if (dstory==1){
			playerradio.newmsg("Tutorial Dude",storymessages[0],time);//newmsg(sndr, msg, thetime)
			}
		if (dstory == 600){
			playerradio.newmsg("Tutorial Dude",storymessages[1],time);//newmsg(sndr, msg, thetime)
			}
		if ((dstory>930)&&(navtarget==5)&&(navactive==1)){
			storystate = 1;
			storytime = time;
			}
		break;
	case 1:
		if (dstory==1){
			playerradio.newmsg("Tutorial Dude",storymessages[2],time);//newmsg(sndr, msg, thetime)
			}
		if (dstory == 600){
			playerradio.newmsg("Tutorial Dude",storymessages[3],time);//newmsg(sndr, msg, thetime)
			}
		if ((dstory>630)&&(mapscale>1024)&&(mapactive>0)){
			storystate=2;
			storytime = time;
			}
	break;
	case 2:
		if (dstory==5){
			playerradio.newmsg("Tutorial Dude",storymessages[4],time);//newmsg(sndr, msg, thetime)
			}
		if ((dstory>60)&&(mapscale<128)&&(mapactive>0)){
			storystate=3;
			storytime = time;
			}
	break;
	case 3:
		if (dstory==5){
			playerradio.newmsg("Tutorial Dude",storymessages[5],time);//newmsg(sndr, msg, thetime)
			}
		if ((dstory>60)&&(ships[0].distance(planets[5])<512)){
			storystate=4;
			storytime = time;
			}
	break;
	case 4:
		if (dstory==5){
			playerradio.newmsg("Tutorial Dude",storymessages[6],time);//newmsg(sndr, msg, thetime)
			}
		if ((dstory>60)&&(dockstate==2)){
			storystate=5;
			storytime = time;
			money = money + 200;
			}
	break;
		case 5:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[7],time);//newmsg(sndr, msg, thetime)
			storystate = 6;
			storytime = time;
			}
	break;
	case 6:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[8],time);//newmsg(sndr, msg, thetime)
			storystate = 7;
			storytime = time;
			}
	break;		
	case 7:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[9],time);//newmsg(sndr, msg, thetime)
			storystate = 8;
			storytime = time;
			}
	break;		
	case 8:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[10],time);//newmsg(sndr, msg, thetime)
			storystate = 9;
			storytime = time;
			}
	break;		
	case 9:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[11],time);//newmsg(sndr, msg, thetime)
			storystate = 10;
			storytime = time;
			}
	break;		
	case 10:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[12],time);//newmsg(sndr, msg, thetime)
			storystate = 11;
			storytime = time;
			}
	break;		
	case 11:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[13],time);//newmsg(sndr, msg, thetime)
			storystate = 12;
			storytime = time;
			}
	break;	
	case 12:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[14],time);//newmsg(sndr, msg, thetime)
			storystate = 13;
			storytime = time;
			}
	break;			
	case 13:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[15],time);//newmsg(sndr, msg, thetime)
			storystate = 14;
			storytime = time;
			}
	break;		
	case 14:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[16]+ships[9].name,time);//newmsg(sndr, msg, thetime)
			ships[9].respawn(planets[ships[9].parentid]);
			storystate = 15;
			storytime = time;
			}
	break;	

	case 15:
		if ((dstory>playerradio.msgtime)&&(ships[9].hp==-1000)){
			playerradio.newmsg("Tutorial Dude",storymessages[17],time);//newmsg(sndr, msg, thetime)
			storystate = 16;
			storytime = time;
			}
	break;		
	case 16:
		if ((dstory>playerradio.msgtime)&&(dockstate==2)){
			playerradio.newmsg("Tutorial Dude",storymessages[18],time);//newmsg(sndr, msg, thetime)
			money = money + 400;
			storystate = 17;
			storytime = time;
			}
	break;
	case 17:
		if (dstory>playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[19],time);//newmsg(sndr, msg, thetime)
			storystate = 18;
			storytime = time;
			}
	break;	
	case 18:
		if (dstory==playerradio.msgtime){
			playerradio.newmsg("Tutorial Dude",storymessages[20],time);//newmsg(sndr, msg, thetime)
			w2=1;
			storystate = 19;
			storytime = time;
			}
	break;	
	case 19:
		if ((wep==2) && (playerbombs[1].s>32)){//If w2 has fired and exploded
			playerradio.newmsg("Tutorial Dude",storymessages[21],time);//newmsg(sndr, msg, thetime)
			wep=1;
			w2=0;
			storystate = 20;
			storytime = time;
			}
	break;	
	case 20:
		if (dockstate==2){//if player has retuirned to the merry merz
			playerradio.newmsg("Tutorial Dude",storymessages[22],time);//newmsg(sndr, msg, thetime)
			w2=1;
			storystate = 21;
			storytime = time;
			}
	break;	
	}
}