var Umo = require('./umo.js');
module.exports = function loadtrinidadsystem(){
	let trin = new Umo(0, 0, 2048, "orange"); //planet initialization/////////////
	trin.name = "Trin";
//	let volk = new Umo(0,15000,250,"brown");//1//initial position irrelevant
//	volk.name = "Volk";
//	volk.setorbit(trin, 15000, 0, 1);
//	volk.parentid = 0;
//	volk.c2 = "darkred";
	let dada = new Umo(0,32000,1024,"green");//2
	dada.name = "Dada";
	dada.setorbit(trin, 32000, 0, 1);
	dada.parentid = 0;
	dada.c2 = "lime";	
	let hijo = new Umo(0, 40000, 1024, "purple"); //3
	hijo.setorbit(trin, 40000, Math.PI, 1);
	hijo.name = "Hijo";
	hijo.parentid = 0;
	hijo.c2 = "magenta";
	let fant = new Umo(1000, 48000, 1024, "blue"); //4
	fant.name = "Fant";
	fant.setorbit(trin, 48000, 0, 1);
	fant.parentid = 0;
	fant.c2 = "teal";
    //dada moons first
	let pesc = new Umo(0, 32000, 200, "brown");//5
	pesc.name = "Pesc";						
	pesc.setorbit(dada, 1500, 0, 1);
	pesc.parentid = 1;
	pesc.c2 = "red";
	let foob = new Umo(600,32000,240, "grey");//6
	foob.name = "Foob";
	foob.setorbit(dada, 2100, 0, 1);
	foob.parentid = 1;
	foob.c2 = "darkgrey";
	let bire = new Umo(-800,32000,360, "white");//7
	bire.name = "Bire";
	bire.setorbit(dada, 2800, 0, 1);
	bire.parentid = 1;
	bire.c2 = "grey";
	let outo = new Umo(0,0,200,"brown");//8
	outo.name = "Outo";
	outo.setorbit(dada,3600,0,1);
	outo.parentid = 1;
	outo.c2 = "purple";
    let jook = new Umo(0,0,150,"brown");//9
	jook.name = "Jook";
	jook.setorbit(dada,4200,0,1);
	jook.parentid = 1;
	jook.c2 = "purple";
    //now hijo moons
	let juga = new Umo(0,0,240,"yellow");//10
	juga.name = "Juga";
	juga.setorbit(hijo,1500,0,1);
	juga.parentid = 2;
	juga.c2 = "beige";
	let larn = new Umo(0,0,200,"blue");//11
	larn.name = "Larn";
	larn.setorbit(hijo,2000,0,1);
	larn.parentid = 2;
	larn.c2 = "teal";
	let erce = new Umo(0,0,320,"brown");//12
	erce.name = "Erce";
	erce.setorbit(hijo,2500,0,1);
	erce.parentid = 2;
	erce.c2 = "firebrick";
	let frog = new Umo(0,0,120,"tan");//13
	frog.name = "Frog";
	frog.setorbit(hijo,3000,0,1);
	frog.parentid = 2;
	frog.c2 = "goldenrod"
    //now fant moons
	let espi = new Umo(0,0,100,"yellow");//14
	espi.name = "Espi";
	espi.setorbit(fant,1500,0,1);
	espi.parentid = 3;
	espi.c2 = "lightyellow";
	let wisp  = new Umo(0,0,150,"grey");//15
	wisp.name = "Wisp";
	wisp.setorbit(fant,2250,0,1);
	wisp.parentid = 3;
	wisp.c2 = "azure";
	let pult  = new Umo(0,0,200,"grey");//16
	pult.name = "Pult";
	pult.setorbit(fant,3000,0,1);
	pult.parentid = 3;
	pult.c2 = "cadetblue";
	let unde  = new Umo(0,0,130,"darkslategrey");//17
	unde.name = "Unde";
	unde.setorbit(fant,3500,0,1);
	unde.parentid = 3;
	unde.c2 = "dimgrey";
	let hont = new Umo(0,0,240,"grey");//18
	hont.name = "Hont";
	hont.setorbit(fant,4000,0,1);
	hont.parentid = 3;
	hont.c2 = "lightgrey";
	let veng  = new Umo(0,0,180,"grey");//19
	veng.name = "Veng";
	veng.setorbit(fant,4400,0,1);
	veng.parentid = 3;
	veng.c2 = "aliceblue";
//stan minisystem
	let stan = new Umo(0,0,512,"green");//20
	stan.name = "Stan";
	stan.setorbit(trin,120000,0,-1);
	stan.parentid = 0;
	stan.c2 = "aquamarine";
	let luci  = new Umo(0,0,180,"grey");//21
	luci.name = "Luci";
	luci.setorbit(stan,1000,0,-1);
	luci.parentid = 19;		
	luci.c2 = "cyan";
	let devo  = new Umo(0,0,160,"grey");//22
	devo.name = "Devo";
	devo.setorbit(stan,1500,0,-1);
	devo.parentid = 19;	
	devo.c2 = "darkcyan";

	let trinplanets = [trin,dada,hijo,fant,pesc,foob,bire,outo,jook,juga,larn,erce,frog,espi,wisp,pult,unde,hont,veng,stan,luci,devo];
	return trinplanets;
	}