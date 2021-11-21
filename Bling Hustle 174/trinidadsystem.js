function loadtrinidadsystem(){
	let trin = new Umo(0, 0, 2048, "orange"); //planet initialization/////////////
	trin.name = "Trin";
	let volk = new Umo(0,15000,250,"brown");//1//initial position irrelevant
	volk.name = "Volk";
	volk.setorbit(trin, 15000, 0, 1);
	volk.parentid = 0;
	volk.c2 = "darkred";
	let dada = new Umo(0,25000,1024,"green");//2
	dada.name = "Dada";
	dada.setorbit(trin, 25000, 0, 1);
	dada.parentid = 0;
	dada.c2 = "lime";	
	let hijo = new Umo(0, 35000, 1024, "purple"); //3
	hijo.setorbit(trin, 35000, 0, 1);
	hijo.name = "Hijo";
	hijo.parentid = 0;
	hijo.c2 = "magenta";
	let fant = new Umo(1000, 45000, 1024, "blue"); //4
	fant.name = "Fant";
	fant.setorbit(trin, 45000, 0, -1);
	fant.parentid = 0;
	fant.c2 = "teal";
    //dada moons first
	let pesc = new Umo(0, 32000, 200, "brown");//5
	pesc.name = "Pesc";						
	pesc.setorbit(dada, 1300, 0, 1);
	pesc.parentid = 2;
	pesc.c2 = "red";
	let foob = new Umo(600,32000,240, "grey");//6
	foob.name = "foob";
	foob.setorbit(dada, 1750, 0, 1);
	foob.parentid = 2;
	foob.c2 = "darkgrey";
	let bire = new Umo(-800,32000,360, "white");//7
	bire.name = "bire";
	bire.setorbit(dada, 2100, 0, 1);
	bire.parentid = 2;
	bire.c2 = "grey";
	let outo = new Umo(0,0,200,"brown");//8
	outo.name = "outo";
	outo.setorbit(dada,2500,0,1);
	outo.parentid = 2;
	outo.c2 = "purple";
    let jook = new Umo(0,0,150,"brown");//8
	outo.name = "outo";
	outo.setorbit(dada,3200,0,1);
	outo.parentid = 2;
	outo.c2 = "purple";
    //now hijo moons
	let juga = new Umo(0,0,240,"yellow");//9
	juga.name = "juga";
	juga.setorbit(hijo,1500,0,1);
	juga.parentid = 3;
	juga.c2 = "beige";
	let larn = new Umo(0,0,200,"blue");//10
	larn.name = "larn";
	larn.setorbit(hijo,2000,0,1);
	larn.parentid = 3;
	larn.c2 = "teal";
	let erce = new Umo(0,0,320,"brown");//11
	erce.name = "erce";
	erce.setorbit(hijo,2500,0,1);
	erce.parentid = 3;
	erce.c2 = "firebrick";
	let frog = new Umo(0,0,120,"tan");//12
	frog.name = "frog";
	frog.setorbit(hijo,2900,0,1);
	frog.parentid = 3;
	frog.c2 = "goldenrod"
    //now fant moons
	let espi = new Umo(0,0,100,"yellow");//13
	espi.name = "Tern";
	espi.setorbit(fant,1250,0,1);
	espi.parentid = 4;
	espi.c2 = "lightyellow";
	let wisp  = new Umo(0,0,150,"grey");//14
	wisp.name = "Thys";
	wisp.setorbit(fant,1600,0,1);
	wisp.parentid = 4;
	wisp.c2 = "azure";
	let pult  = new Umo(0,0,200,"grey");//15
	pult.name = "pult";
	pult.setorbit(fant,2100,0,1);
	pult.parentid = 4;
	pult.c2 = "cadetblue";
	let unde  = new Umo(0,0,130,"darkslategrey");//16
	unde.name = "unde";
	unde.setorbit(fant,2600,0,1);
	unde.parentid = 4;
	unde.c2 = "dimgrey";
	let hont = new Umo(0,0,240,"grey");//17
	hont.name = "hont";
	hont.setorbit(fant,3000,0,1);
	hont.parentid = 4;
	hont.c2 = "lightgrey";
	let veng  = new Umo(0,0,180,"grey");//18
	veng.name = "veng";
	veng.setorbit(fant,3700,0,1);
	veng.parentid = 4;
	veng.c2 = "aliceblue";
//stan minisystem
	let stan = new Umo(0,0,600,"green");//19
	stan.name = "stan";
	stan.setorbit(trin,80000,0,1);
	stan.parentid = 0;
	stan.c2 = "aquamarine";
	let luci  = new Umo(0,0,250,"grey");//20
	luci.name = "luci";
	luci.setorbit(stan,1000,0,1);
	luci.parentid = 19;		
	luci.c2 = "cyan";
	let devo  = new Umo(0,0,350,"grey");//21
	devo.name = "Umbi";
	devo.setorbit(stan,1500,0,1);
	devo.parentid = 19;	
	devo.c2 = "darkcyan";
	
	
	let homeplanets = [trin,volk,dada,hijo,fant,pesc,foob,bire,outo,jook,juga,larn,erce,frog,espi,wisp,pult,unde,hont,veng,stan,luci,devo];
	return homeplanets;
	}