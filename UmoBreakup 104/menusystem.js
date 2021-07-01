function loadmenusystem(){
	let about = new Umo(400, 0, 80, "orange"); //planet initialization/////////////
	about.name = "About";
	about.m = 0;
	about.c2 = "red";
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
	let menuplanets = [about,playstory,playfree,playrandom,controls];
	return menuplanets;
	}