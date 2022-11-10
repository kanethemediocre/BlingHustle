function loadnapasystem(){
	let napa = new Umo(0, 0, 1600, "orange"); //planet initialization/////////////
	napa.name = "Napa";
	let vers = new Umo(0,5000,180,"brown");//1//initial position irrelevant
	vers.name = "vers";
	vers.setorbit(napa, 5000, 0, 1);
	vers.parentid = 0;
	vers.c2 = "darkred";
	let aris = new Umo(0,8000,260,"green");//2
	aris.name = "aris";
	aris.setorbit(napa, 8000, 0, 1);
	aris.parentid = 0;
	aris.c2 = "lime";	
	let luxe = new Umo(0, 12000, 230, "purple"); //3
	luxe.setorbit(napa, 12000, 0, 1);
	luxe.name = "luxe";
	luxe.parentid = 0;
	luxe.c2 = "magenta";
	let elle = new Umo(1000, 16000, 200, "blue"); //4
	elle.name = "elle";
	elle.setorbit(napa, 16000, 0, 1);
	elle.parentid = 0;
	elle.c2 = "teal";


	let napaplanets = [napa,vers,aris,luxe,elle];
	return napaplanets;
	}