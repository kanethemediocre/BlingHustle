function loadmenusystem(){
	let about = new Umo(400, 0, 80, "orange"); //0//planet initialization/////////////
	about.name = "About";
	about.c2 = "red";
	about.m = 0;
	let playstory = new Umo(-250,-300,130,"brown");//1//initial position irrelevant
	playstory .name = "Play story";
	playstory .c2 = "darkgreen";
	playstory.m = 0;
	let playfree = new Umo(250,-300,110,"red");//2
	playfree.name = "Free play";
	playfree.c2 = "blue";
	playfree.m = 0;
	let playrandom = new Umo(0,-400,100,"purple");//3
	playrandom.name = "Random play";
	playrandom.c2 = "green";
	playrandom.m = 0;
	let controls = new Umo(-10000, -400, 80, "blue"); //4
	controls.name = "Keyboard Controls";
	controls.c2 = "teal";
	controls.m = 0;
	let aatest = new Umo(10000-250, -300, 70, "purple"); //5
	aatest.name = "Asteroid Arena";
	aatest.c2 = "red";
	aatest.m = 0;
	let bp1test = new Umo(10000, -360, 90, "pink"); //6
	bp1test.name = "Bubble Arena 1";
	bp1test.c2 = "teal";
	bp1test.m = 0;
	let bp2test = new Umo(10000+250, -250, 80, "violet"); //7
	bp2test.name = "Bubble Arena 2";
	bp2test.c2 = "lime";
	bp2test.m = 0;
	let menu1 = new Umo(10000-300, 160, 100, "red"); //8
	menu1.name = "Main Menu";
	menu1.c2 = "lime";
	menu1.m = 0;
	let menu2 = new Umo(-360, 000, 100, "violet"); //9
	menu2.name = "Special Game Modes";
	menu2.c2 = "teal";
	menu2.m = 0;
	
	
	
	//let menu3 = new Umo(360, 0, 100, "violet"); //3
	//menu3.name = "About";
	//menu3.c2 = "teal";
	//menu3.m = 0;
	let menu3 = new Umo(-10000+320, 0, 100, "orange"); //10
	menu3.name = "Main Menu";
	menu3.c2 = "red";
	menu3.m = 0;
	let links = new Umo(-10000-280, -300, 85, "green"); //11
	links.name = "links";
	links.c2 = "red";
	links.m = 0;
	let whatis = new Umo(-10000+600, -250, 80, "purple"); //12
	whatis.name = "What is Bling Hustle?";
	whatis.c2 = "violet";
	whatis.m = 0;
	let modding = new Umo(-10000-400, 0, 75, "navy"); //13
	modding.name = "Modding Bling Hustle";
	modding.c2 = "green";
	modding.m = 0;
	
	let menu4 = new Umo(-20000+400, -100, 100, "orange"); //14
	menu4.name = "Main Menu";
	menu4.c2 = "red";
	menu4.m = 0;
	let morejams = new Umo(-20000-280, -300, 85, "green"); //15
	morejams.name = "More jams";
	morejams.c2 = "red";
	morejams.m = 0;
	let lessjams = new Umo(-20000+280, -300, 90, "purple"); //16
	lessjams.name = "Less jams";
	lessjams.c2 = "violet";
	lessjams.m = 0;
	let options1 = new Umo(0, 250, 100, "violet"); //17
	options1.name = "Options";
	options1.c2 = "teal";
	options1.m = 0;	
	
	let mousecontrols = new Umo(-10000+320, -400, 80, "violet"); //18
	mousecontrols.name = "Mouse Controls";
	mousecontrols.c2 = "teal";
	mousecontrols.m = 0;	
	
	
	
	
	let menuplanets = [about,playstory,playfree,playrandom,controls,aatest,bp1test,bp2test,menu1,menu2,menu3,links,whatis,modding,menu4,morejams,lessjams,options1,mousecontrols];
	var i = 0; //This randomizes planetary dots for home system.
	while (i<menuplanets.length){
		var j=0;
		var extradots = Math.floor(Math.random()*3);
		while(extradots>0){
			menuplanets[i].polyradius.push(0);
			menuplanets[i].polytheta.push(0);
			extradots = extradots - 1;
			}
		while (j<menuplanets[i].polytheta.length){
			menuplanets[i].polyradius[j] = Math.random()+0.125;
			menuplanets[i].polytheta[j] = Math.random()*2*Math.PI;
			j=j+1;
			}
		i=i+1;
		}
	return menuplanets;
	}