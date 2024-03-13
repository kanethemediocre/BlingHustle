function loadsmallworldsystem(){
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
	pesc.setorbit(dada, 1600, 0, 1);
	pesc.parentid = 2;
	pesc.c2 = "red";

	let foob = new Umo(600,32000,240, "grey");//6
	foob.name = "foob";
	foob.setorbit(dada, 2200, 0, 1);
	foob.parentid = 2;
	foob.c2 = "darkgrey";

	let bire = new Umo(-800,32000,360, "white");//7
	bire.name = "bire";
	bire.setorbit(dada, 2800, 0, 1);
	bire.parentid = 2;
	bire.c2 = "grey";

	let outo = new Umo(0,0,200,"brown");//8
	outo.name = "outo";
	outo.setorbit(dada,3600,0,1);
	outo.parentid = 2;
	outo.c2 = "purple";

	let jook = new Umo(0,0,150,"brown");//8
	outo.name = "outo";
	outo.setorbit(dada,4200,0,1);
	outo.parentid = 2;
	outo.c2 = "purple";
  
	let homeplanets = [trin,volk,dada,hijo,fant,pesc,foob,bire,outo,jook];
	return homeplanets;
	}