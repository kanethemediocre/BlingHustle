function loadhomesystem(){
	let sun = new Umo(0, 0, 2048, "orange"); //planet initialization/////////////
	sun.name = "Sool";
	let murc = new Umo(0,8000,150,"brown");//initial position irrelevant
	murc.name = "Murc";
	murc.setorbit(sun, 8000, 0, 1);
	murc.parentid = 0;
	let vnus = new Umo(0,14000,280,"yellow");//2
	vnus.name = "Vnus";
	vnus.setorbit(sun, 14000, 0, 1);
	vnus.parentid = 0;
	let earf = new Umo(0, 20000, 320, "blue"); //3
	earf.setorbit(sun, 20000, 0, 1);
	earf.name = "Earf";
	earf.parentid = 0;
	let moon = new Umo(1000, 20000, 100, "white"); //4
	moon.name = "Moon";
	moon.setorbit(earf, 1000, 0, 1);
	moon.parentid = 3;
	let merz = new Umo(0, 32000, 220, "red");//5
	merz.name = "Merz";						
	merz.setorbit(sun, 32000, 0, 1);
	merz.parentid = 0;
	let fobz = new Umo(600,32000,32, "white");//6
	fobz.name = "Fobz";
	fobz.setorbit(merz, 600, 0, 1);
	fobz.parentid = 5;
	let deem = new Umo(-800,32000,32, "white");//7
	deem.name = "Deem";
	deem.setorbit(merz, 800, 0, 1);
	deem.parentid = 5;
	let jupe = new Umo(0,0,1024,"brown");//8
	jupe.name = "Jupe";
	jupe.setorbit(sun,80000,0,1);
	jupe.parentid = 0;
	let heyo = new Umo(0,0,120,"yellow");//9
	heyo.name = "Heyo";
	heyo.setorbit(jupe,1280,0,1);
	heyo.parentid = 8;
	let erpa = new Umo(0,0,200,"blue");//10
	erpa.name = "Erpa";
	erpa.setorbit(jupe,3600,0,1);
	erpa.parentid = 8;
	let mede = new Umo(0,0,280,"brown");//11
	mede.name = "Mede";
	mede.setorbit(jupe,5200,0,1);
	mede.parentid = 8;
	let isto = new Umo(0,0,280,"tan");//12
	isto.name = "Isto";
	isto.setorbit(jupe,7200,0,1);
	isto.parentid = 8;
	let tern = new Umo(0,0,750,"yellow");//13
	tern.name = "Tern";
	tern.setorbit(sun,130000,0,1);
	tern.parentid = 0;
	let thys  = new Umo(0,0,120,"grey");//14
	thys.name = "Thys";
	thys.setorbit(tern,1200,0,1);
	thys.parentid = 13;
	let dion  = new Umo(0,0,150,"grey");//15
	dion.name = "Dion";
	dion.setorbit(tern,1800,0,1);
	dion.parentid = 13;
	let raya  = new Umo(0,0,200,"grey");//16
	raya.name = "Raya";
	raya.setorbit(tern,2400,0,1);
	raya.parentid = 13;
	let itan  = new Umo(0,0,300,"grey");//17
	itan.name = "Itan";
	itan.setorbit(tern,3600,0,1);
	itan.parentid = 13;
	let peet  = new Umo(0,0,200,"grey");//18
	peet.name = "Peet";
	peet.setorbit(tern,5600,0,1);
	peet.parentid = 13;
	let anus = new Umo(0,0,500,"green");//19
	anus.name = "Anus";
	anus.setorbit(sun,170000,0,1);
	anus.parentid = 0;
	let aril  = new Umo(0,0,150,"grey");//20
	aril.name = "Aril";
	aril.setorbit(anus,1000,0,1);
	aril.parentid = 19;		
	let umbi  = new Umo(0,0,150,"grey");//21
	umbi.name = "Umbi";
	umbi.setorbit(anus,1500,0,1);
	umbi.parentid = 19;				
	let titi  = new Umo(0,0,200,"grey");//22
	titi.name = "Titi";
	titi.setorbit(anus,2400,0,1);
	titi.parentid = 19;			
	let bron  = new Umo(0,0,200,"grey");//23
	bron.name = "Bron";
	bron.setorbit(anus,3000,0,1);
	bron.parentid = 19;		
	let tune = new Umo(0,0,550,"cyan");//24
	tune.name = "Tune";
	tune.setorbit(sun,210000,0,1);
	tune.parentid = 0;
	let tron = new Umo(0,0,250,"cyan");//25
	tron.name = "Tron";
	tron.setorbit(tune,1500,0,1);
	tron.parentid = 24;
	let homeplanets = [sun,murc,vnus,earf,moon,merz,fobz,deem,jupe,heyo,erpa,mede,isto,tern,thys,dion,raya,itan,peet,anus,aril,umbi,titi,bron,tune,tron];
	return homeplanets;
	}