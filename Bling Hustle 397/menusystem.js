function loadmenusystem(){
	let about = new Umo(400, 0, 80, "orange"); //planet initialization/////////////
	about.name = "About";
	about.c2 = "red";
	about.m = 0;
	let playstory = new Umo(-250,-300,140,"brown");//1//initial position irrelevant
	playstory .name = "Play story";
	playstory .c2 = "darkgreen";
	playstory.m = 0;
	let playfree = new Umo(250,-300,120,"red");//2
	playfree.name = "Free play";
	playfree.c2 = "blue";
	playfree.m = 0;
	let playrandom = new Umo(0,-400,110,"purple");//2
	playrandom.name = "Random play";
	playrandom.c2 = "green";
	playrandom.m = 0;
	let controls = new Umo(-400, 0, 100, "blue"); //3
	controls.name = "Controls";
	controls.c2 = "teal";
	controls.m = 0;
	let waldotest = new Umo(-200, 200, 100, "purple"); //3
	waldotest.name = "Waldo Test";
	waldotest.c2 = "red";
	waldotest.m = 0;//Not currently used
	let menuplanets = [about,playstory,playfree,playrandom,controls];
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