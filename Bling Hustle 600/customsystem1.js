function customsystem1(){//Sort of a template?  Recreates sool system in a way that can be generated another function.
	let p0 = new Umo(0, 0, 2048, "orange"); //planet initialization/////////////
	p0.name = "Sool";
	let p1 = new Umo(0,0,150,"brown");//1//initial position irrelevant
	p1.name = "Murc";
	p1.setorbit(p0, 8000, 0, 1);
	p1.parentid = 0;
	p1.c2 = "darkred";
	let p2 = new Umo(0,14000,280,"yellow");//2
	p2.name = "Vnus";
	p2.setorbit(p0, 14000, 0, 1);
	p2.parentid = 0;
	p2.c2 = "tan";	
	let p3 = new Umo(0, 20000, 320, "blue"); //3
	p3.setorbit(p0, 20000, 0, 1);
	p3.name = "Earf";
	p3.parentid = 0;
	p3.c2 = "green";
	let p4 = new Umo(1000, 20000, 100, "white"); //4
	p4.name = "Moon";
	p4.setorbit(p3, 1000, 0, -1);
	p4.parentid = 3;
	p4.c2 = "grey";
	let p5 = new Umo(0, 32000, 220, "brown");//5
	p5.name = "Merz";						
	p5.setorbit(p0, 32000, 0, 1);
	p5.parentid = 0;
	p5.c2 = "red";
	let p6 = new Umo(0,0,32, "grey");//6
	p6.name = "Fobz";
	p6.setorbit(p5, 600, 0, 1);
	p6.parentid = 5;
	p6.c2 = "darkgrey";
	let p7 = new Umo(0,0,32, "white");//7
	p7.name = "Deem";
	p7.setorbit(p5, 800, 0, 1);
	p7.parentid = 5;
	p7.c2 = "grey";
	let p8 = new Umo(0,0,1024,"brown");//8
	p8.name = "Jupe";
	p8.setorbit(p0,80000,0,1);
	p8.parentid = 0;
	p8.c2 = "purple";
	let p9 = new Umo(0,0,120,"yellow");//9
	p9.name = "Heyo";
	p9.setorbit(p8,1280,0,1);
	p9.parentid = 8;
	p9.c2 = "beige";
	let p10 = new Umo(0,0,200,"blue");//10
	p10.name = "Erpa";
	p10.setorbit(p8,3600,0,1);
	p10.parentid = 8;
	p10.c2 = "teal";
	let p11 = new Umo(0,0,280,"brown");//11
	p11.name = "Mede";
	p11.setorbit(p8,5200,0,1);
	p11.parentid = 8;
	p11.c2 = "firebrick"
	let p12 = new Umo(0,0,280,"tan");//12
	p12.name = "Isto";
	p12.setorbit(p8,7200,0,1);
	p12.parentid = 8;
	p12.c2 = "goldenrod"
	let p13 = new Umo(0,0,750,"yellow");//13
	p13.name = "Tern";
	p13.setorbit(p0,130000,0,1);
	p13.parentid = 0;
	p13.c2 = "lightyellow";
	let p14  = new Umo(0,0,120,"grey");//14
	p14.name = "Thys";
	p14.setorbit(p13,1200,0,1);
	p14.parentid = 13;
	p14.c2 = "azure";
	let p15  = new Umo(0,0,150,"grey");//15
	p15.name = "Dion";
	p15.setorbit(p13,1800,0,1);
	p15.parentid = 13;
	p15.c2 = "cadetblue";
	let p16  = new Umo(0,0,200,"darkslategrey");//16
	p16.name = "Raya";
	p16.setorbit(p13,2400,0,1);
	p16.parentid = 13;
	p16.c2 = "dimgrey";
	let p17  = new Umo(0,0,300,"grey");//17
	p17.name = "Itan";
	p17.setorbit(p13,3600,0,1);
	p17.parentid = 13;
	p17.c2 = "lightgrey";
	let p18  = new Umo(0,0,200,"grey");//18
	p18.name = "Peet";
	p18.setorbit(p13,5600,0,1);
	p18.parentid = 13;
	p18.c2 = "aliceblue";
	let p19 = new Umo(0,0,500,"green");//19
	p19.name = "Anus";
	p19.setorbit(p0,170000,0,1);
	p19.parentid = 0;
	p19.c2 = "aquamarine";
	let p20  = new Umo(0,0,150,"grey");//20
	p20.name = "Aril";
	p20.setorbit(p19,1000,0,1);
	p20.parentid = 19;		
	p20.c2 = "cyan";
	let p21 = new Umo(0,0,150,"grey");//21
	p21.name = "Umbi";
	p21.setorbit(p19,1500,0,1);
	p21.parentid = 19;	
	p21.c2 = "darkcyan";
	let p22  = new Umo(0,0,200,"tan");//22
	p22.name = "Titi";
	p22.setorbit(p19,2400,0,1);
	p22.parentid = 19;	
	p22.c2 = "olive"
	let p23  = new Umo(0,0,200,"maroon");//23
	p23.name = "Bron";
	p23.setorbit(p19,3000,0,1);
	p23.parentid = 19;		
	p23.c2 = "brown";
	let p24 = new Umo(0,0,550,"cyan");//24
	p24.name = "Tune";
	p24.setorbit(p0,210000,0,1);
	p24.parentid = 0;
	p24.c2 = "white";
	let p25 = new Umo(0,0,250,"navy");//25
	p25.name = "Tron";
	p25.setorbit(p24,1500,0,1);
	p25.parentid = 24;
	p25.c2 = "lightslategrey";
	let homeplanets = [p0,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p22,p23,p24,p25];
	var i = 0; //This randomizes planetary dots for home system.
	while (i<homeplanets.length){
		var j=0;
		var extradots = Math.floor(Math.random()*3);
		while(extradots>0){
			homeplanets[i].polyradius.push(0);
			homeplanets[i].polytheta.push(0);
			extradots = extradots - 1;
			}
		while (j<homeplanets[i].polytheta.length){
			homeplanets[i].polyradius[j] = Math.random()+0.125;
			homeplanets[i].polytheta[j] = Math.random()*2*Math.PI;
			j=j+1;
			}
		i=i+1;
		}
	var cs = new System(1,"Sool",0,0);
	cs.planets.push(p0);
	cs.planets.push(p1);
	cs.planets.push(p2);
	cs.planets.push(p3);
	cs.planets.push(p4);
	cs.planets.push(p5);
	cs.planets.push(p6);
	cs.planets.push(p7);
	cs.planets.push(p8);
	cs.planets.push(p9);
	cs.planets.push(p10);
	cs.planets.push(p11);
	cs.planets.push(p12);
	cs.planets.push(p13);
	cs.planets.push(p14);
	cs.planets.push(p15);
	cs.planets.push(p16);
	cs.planets.push(p17);
	cs.planets.push(p18);
	cs.planets.push(p19);
	cs.planets.push(p20);
	cs.planets.push(p21);
	cs.planets.push(p22);
	cs.planets.push(p23);
	cs.planets.push(p24);
	cs.planets.push(p25);
	//Outposts
	
	let o0 = new Umo (0,0,128, randcolor());
	o0.c2 = randcolor();
	o0.parentid = 0;
	o0.name = "Bill's Billion Bits";
	var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
	var toradii = [1,1,1,1]; //rectangle
	o0.polytheta = totheta;
	o0.polyradius = toradii;
	o0.setorbit(homeplanets[0], 20000, 0.25, 1);//set in orbit around sun behind earf 

	let o1 = new Umo(0,0,128, randcolor());
	o1.c2 = randcolor();
	o1.parentid = 0;
	o1.name = "The Merry Merzian";
	var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
	var toradii = [1,1,1,1]; //rectangle
	o1.polytheta = totheta;
	o1.polyradius = toradii;
	o1.setorbit(homeplanets[0], 32000, 0.2, 1);//set in orbit around sun behind merz

	let o2 = new Umo(0,0,128, randcolor());
	o2.c2 = randcolor();
	o2.parentid = 0;
	o2.name = "Jojo's House of Cheese";
	var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
	var toradii = [1,1,1,1]; //rectangle
	o2.polytheta = totheta;
	o2.polyradius = toradii;
	o2.setorbit(homeplanets[0], 80000, 0.1, 1);//set in orbit around sun behind jupe

	let o3 = new Umo(0,0,128, randcolor());
	o3.c2 = randcolor();
	o3.parentid = 0;
	o3.name = "Dangustown";
	var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
	var toradii = [1,1,1,1]; //rectangle
	o3.polytheta = totheta;
	o3.polyradius = toradii;
	o3.setorbit(homeplanets[0], 170000, 0.05, 1);//set in orbit around sun behind jupe

	let o4 = new Umo(0,0,128, randcolor());
	o4.c2 = randcolor();
	o4.parentid = 0;
	o4.name = "Sharon's Scientific Supplies";
	var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
	var toradii = [1,1,1,1]; //rectangle
	o4.polytheta = totheta;
	o4.polyradius = toradii;
	o4.setorbit(homeplanets[0], 320000, 0.3, 1);//set in orbit around sun in bufu

	let o5 = new Umo(0,0,128, randcolor());
	o5.c2 = randcolor();
	o5.parentid = 0;
	o5.name = "Randomized Blasters";
	var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
	var toradii = [1,1,1,1]; //rectangle
	o5.polytheta = totheta;
	o5.polyradius = toradii;
	o5.setorbit(homeplanets[0], 32000, 0.3, 1);//set in orbit around sun trailing earf

	let o6 = new Umo(0,0,128, randcolor());
	o6.c2 = randcolor();
	o6.parentid = 0;
	o6.name = "Ship Upgrades";
	var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
	var toradii = [1,1,1,1]; //rectangle
	o6.polytheta = totheta;
	o6.polyradius = toradii;
	o6.setorbit(homeplanets[0], 32000, 0.32, 1);//set in orbit around sun trailing earf

	var outposts = [o0, o1, o2, o3, o4, o5, o6];
	var i=0;
	while (i<outposts.length){
		var numberofsides = Math.floor(Math.random()*6+7)*2;
		outposts[i].makeemblem(numberofsides,0.1);
		i=i+1;
		}
	//shops
	//Items are objects defined in bhshops.js
	let s0items = [repairshopitem,buyw2item,buyw3item,buyw4item,remotew1item,booster1,buyw0item];
	let s0 = new Shop("The Merry Merzian", 1, "I have these fine tapestries....", merzianshopitems);
	let s1items = [repairshopitem,buyw2item,buyw3item,upw1damage,upw3damage,uparmoritem]
	let s1 = new Shop("Bills Billion Bits", 0, "Welcome to Earf", billshopitems);
	let s2items = [repairshopitem,buyw5item,buyw6item,buyw9item,remotew2item,uparmoritem,upshielditem,upradaritem];
	let s2 = new Shop("JoJo's House of Cheese", 2, "Jupe Fantastico", jojoshopitems);
	let s3items = [repairshopitem,buyw4item,buyw7item,buyw8item,upw4speed,upw5n,upw1damage,upshieldregenitem];
	let s3 = new Shop("Dangustown", 3, "It's YOUR Anus!", dangshopitems);
	let s4items = [repairshopitem,buyw2item,buyw0item,upw0speed,upw0timer,upsensoritem];
	let s4 = new Shop("Sharon's Scientific Supplies", 4, "wubbasomethinggoeshere", sharonshopitems);
	let s5items = [];
	var i = 0;
	while (i<12){
		var randomblasterupgrade = Math.floor(Math.random()*blasterupgradeitems.length)
		s5items.push(blasterupgradeitems[randomblasterupgrade]);
		i=i+1;
		}
	let s5 = new Shop("Rando Calrissian's Blaster Upgrades",5, "Randomized upgrades for randomized blasters.  Prices are not random.", randshopitems1);
	//var upgradeshopitems = [uprepairitem,uparmoritem,upshielditem,upshieldregenitem,upradaritem,upcargoitem,upthrustitem,upsensoritem,upsolaritem,upimpactitem,randomchassisitem];
	let s6 = new Shop("All Upgrades Testing Shop",6, "Upgrades", upgradeshopitems);
	let shops = [s0,s1,s2,s3,s4,s5,s6];//"all" meaning for this system system
	//New system is declared and assigned
	//var cs = new System(1,"Sool",0,0);
	//cs.planets = homeplanets;
	cs.outposts = outposts;
	cs.shops = shops;
	var i=0;
	while(i<50){
		cs.ecobalance(.05);
		i++;
		}
	cs.addcargosales(cargoitems);
	cs.addrandomgang(1,2,16);//These addrandomgang statements allow me to define how difficult and how many bots are at each planet
	cs.addrandomgang(2,3,3);//This sequence replicates the sool system in the main game.
	cs.addrandomgang(3,4,2);//
	cs.addrandomgang(5,3,1);
	cs.addrandomgang(10,3,4);
	cs.addrandomgang(11,4,6);
	cs.addrandomgang(12,3,5);
	cs.addrandomgang(14,2,7);
	cs.addrandomgang(15,4,9);
	cs.addrandomgang(16,4,10);
	cs.addrandomgang(17,4,8);
	cs.addrandomgang(18,2,11);
	cs.addrandomgang(21,2,6);
	cs.addrandomgang(22,2,6);
	cs.addrandomgang(23,4,4);
	//cs.addrandomgang(25,5,16); //no XXXX here
	cs.addrandomtraders([5,11,16], 8, 4);
	cs.addcargomissions(4);
	
	//var cs = new System(1,"Sool",0,0);
	//cs.planets = homeplanets;
	return cs;
	}