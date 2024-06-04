function menucheck(myplayer){
	var myship = myplayer.ship;
	myplayer.blasters[myplayer.wep].drawsights(myplayer,time);//Normally this is done in hud(), but that is excluded from menu system
	//myship.x = 0;
	//myship.y = -100;
	myship.vx = 0;
	myship.vy = 0;
	context.font = "160px Ariel";
	context.fillStyle = "yellow";
	context.fillText("BLING   HUSTLE",canvas.width/2-550,120);	
	if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[0])){
		//menuabout = true;
		//menucontrols = false;
		myship.x = -10000;
		myship.y = -100;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[1])){//systems[ps].players[0].blasters[1].bombs[0].collide(systems[ps].planets[0])
		ps = 1;
		pausemusic();
		//systems[ps].npcs = testnpcs;
		//var testpolysave = myplayer.savepolygon();
		//myplayer.loadpolygon(testpolysave);
		//systems[ps].npcs[0].ship.setorbit(systems[ps].planets[0], 32100, 0.215, 1);//this actually does work.
		//systems[ps].npcs[1].ship.setorbit(systems[ps].planets[0], 32200, 0.215, 1);
		//systems[ps].npcs[2].ship.setorbit(systems[ps].planets[0], 32300, 0.215, 1);
		//systems[ps].npcs[3].ship.setorbit(systems[ps].planets[0], 32400, 0.215, 1);
		//systems[ps].npcs[3].ai.behavior = "guardbot";//.setorbit(systems[ps].planets[0], 32400, 0.215, 1);
		//systems[ps].npcs[3].ai.homeplanet = 2;//.setorbit(systems[ps].planets[0], 32400, 0.215, 1);
		myship.setorbit(systems[ps].planets[0], 32000, 0.215, 1);
		myplayer.storystate = 0;//adjust for testing of stuff, should be 0 on major releases.
		myplayer.planetarychart = systems[ps].generateplanetlist();
		myplayer.navtarget = 7;
		//testsong.volume = 0.25;
		//testsong.play();
		console.log("npcs: "+systems[ps].npcs.length)
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[2])){
		ps = 1;
		pausemusic();
		myship.setorbit(systems[ps].planets[0], 32000, 0.215, 1);
		myplayer.storystate = 999;
		myplayer.money = 3001;
		myplayer.task = "Profit";
		myplayer.planetarychart = systems[ps].generateplanetlist();
		myplayer.navtarget = 7;
		//var i=0;
		//while(i<10){
		//	rnpc = Math.floor(Math.random()*systems[ps].npcs.length);
		//	systems[ps].npcs[rnpc].ai.behavior = "passassin";//
		//	systems[ps].npcs[rnpc].ai.alltargetplayers = [ 0 ];
		//	console.log(rnpc);
		//	i++;
		//	}
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[3])){
		ps = 7;
		pausemusic();
		myship.setorbit(systems[ps].planets[3], 1000, 0.4, 1);
		var randdir = Math.random()*2*Math.PI;
		xxxx.setorbit(systems[ps].planets[0], 400000, randdir+Math.PI, -1);
		waldo.setorbit(systems[ps].planets[0], 400000, randdir, -1);
		//special system stuff
		myplayer.blasters[5].phas = true;
		myplayer.wep = 5;
		myplayer.storystate = 999;
		myplayer.money = 3001;
		myplayer.task = "Profit";
		myplayer.planetarychart = systems[ps].generateplanetlist();
		myplayer.navtarget = 5;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[4])){
		menuabout = false;
		menucontrols = true;
		menulinks = false;
		menumods = false;
		menumousecontrols = false;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[5])){
		ps = 32;
		myplayer.mapscale = 64;
		pausemusic();
		asteroidsong1.play();
		console.log(systems[ps].planets[0].x);
		myship.setorbit(systems[ps].planets[0], 21000, 0, 1);
		var randdir = Math.random()*2*Math.PI;
		xxxx.setorbit(systems[ps].planets[0], 400000, randdir+Math.PI, -1);
		waldo.x = 1000000;
		waldo.vy = 10;
		//waldo.setorbit(systems[ps].planets[0], 1500, randdir, -1);
		//systems[ps].waldosize = 100000000;
		console.log(myship.x);
		myplayer.blasters[14].phas = true;
		myplayer.wep = 14;
		myplayer.storystate = 999;
		myplayer.money = 3001;
		myplayer.task = "Collect Bling";
		myplayer.planetarychart = systems[ps].generateplanetlist();
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[6])){
		ps = 33;
		myplayer.mapscale = 32;
		pausemusic();
		bubblesong1.play();
		//console.log(systems[ps].planets[0].x);
		//myship.setorbit(systems[ps].planets[0], 21000, 0, 1);
		systems[ps].placenear(myplayer.ship,12000,0);
		//xxxx.setorbit(systems[ps].planets[0], 400000, randdir+Math.PI, -1);
		//waldo.setorbit(systems[ps].planets[0], 400000, randdir, -1);
		console.log(myship.x);
		myplayer.blasters[5].phas = true;
		myplayer.blasters[11].phas = true;
		myplayer.wep = 5;
		myplayer.storystate = 999;
		myplayer.money = 3001;
		myplayer.task = "Collect Bling";
		myplayer.planetarychart = systems[ps].generateplanetlist();
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[7])){
		ps = 34;
		myplayer.mapscale = 32;
		pausemusic();
		bubblesong2.play();
		systems[ps].placenear(myplayer.ship,3000,0);
		//console.log(systems[ps].planets[0].x);
		//myship.setorbit(systems[ps].planets[0], 21000, 0, 1);
		//var randdir = Math.random()*2*Math.PI;
		//xxxx.setorbit(systems[ps].planets[0], 400000, randdir+Math.PI, -1);
		//waldo.setorbit(systems[ps].planets[0], 400000, randdir, -1);
		console.log(myship.x);
		myplayer.blasters[5].phas = true;
		myplayer.blasters[15].phas = true;
		myplayer.wep = 15;
		myplayer.storystate = 999;
		myplayer.money = 3001;
		myplayer.task = "Collect Bling";
		myplayer.planetarychart = systems[ps].generateplanetlist();
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[8])){
		myship.x = 0;
		myship.y = -100;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[9])){
		myship.x = 10000;
		myship.y = -100;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[10])){
		myship.x = 0;
		myship.y = -100;
		menuabout = false;
		menucontrols = false;
		menulinks = false;
		menumods = false;
		menumousecontrols = false;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[11])){
		menuabout = false;
		menucontrols = false;
		menulinks = true;
		menumods = false;
		menumousecontrols = false;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[12])){
		menuabout = true;
		menucontrols = false;
		menulinks = false;
		menumods = false;
		menumousecontrols = false;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[13])){
		menuabout = false;
		menucontrols = false;
		menulinks = false;
		menumods = true;
		menumousecontrols = false;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[14])){
		myship.x = 0;
		myship.y = -100;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[15])){
		if (myplayer.blasters[1].bombs[0].timer>6){	
			musicvolume = musicvolume + 0.1;
			if (musicvolume>1){musicvolume = 1;}
			setmusicvolume(musicvolume);
			}
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[16])){
		if (myplayer.blasters[1].bombs[0].timer>6){
			musicvolume = musicvolume - 0.1;
			if (musicvolume<0){musicvolume = 0;}
			setmusicvolume(musicvolume);
			}
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[17])){
		myship.x = -20000;
		myship.y = -100;
		//menusong1.play();
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[18])){
		menuabout = false;
		menucontrols = false;
		menulinks = false;
		menumods = false;
		menumousecontrols = true;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[19])){
		FPS = 30;
		mytime = Date.now();
		time = 0;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[20])){
		FPS = 60;
		mytime = Date.now();
		time = 0;
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[21])){
		ps = 35;
		testdustfield0.clearhidden(bubbleuniverse.systems[0],3);
		testdustfield1.clearhidden(bubbleuniverse.systems[1],3);
		myplayer.mapscale = 32;
		myplayer.opaquemap = true;
		dustmode = 1;
		supercompass = 2;
		pausemusic();
		bubblesong1.play();
		//testdustfield1.clearhidden(systems[ps]);
		//console.log(systems[ps].planets[0].x);
		//myship.setorbit(systems[ps].planets[0], 21000, 0, 1);
		
		//systems[ps].placenear(myplayer.ship,0,0);
		myplayer.ship.x = systems[ps].outposts[2].x-150;
		myplayer.ship.y = systems[ps].outposts[2].y;
		//myplayer.ship.hp = 999999;
		myplayer.ship.parentid = 0;//oof @respawn
		//xxxx.setorbit(systems[ps].planets[0], 400000, randdir+Math.PI, -1);
		//waldo.setorbit(systems[ps].planets[0], 400000, randdir, -1);
		console.log(myship.x);
		myplayer.blasters[0].phas = true;
		myplayer.blasters[11].phas = true;
		myplayer.wep = 11;
		myplayer.storystate = 999;
		myplayer.money = 3001;
		myplayer.task = "Collect Bling";
		myplayer.planetarychart = systems[ps].generateplanetlist();

		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[22])){
		if (document.fullscreenElement) {
			fullscreenmouseyoffset++;
			myplayer.mouseyoffset = fullscreenmouseyoffset;

		} else {
			windowmouseyoffset++;
			myplayer.mouseyoffset = windowmouseyoffset;
			}
		}
	else if (myplayer.blasters[1].bombs[0].collide(systems[ps].planets[23])){
		if (document.fullscreenElement) {
			fullscreenmouseyoffset--;
			myplayer.mouseyoffset = fullscreenmouseyoffset;

		} else {
			windowmouseyoffset--;
			myplayer.mouseyoffset = windowmouseyoffset;
			}
		}
	else if (menuabout){
		context.fillStyle = "white";
		context.font = "12px Verdana";
		fillwrappedtext(abouttext,128,16, 240,canvas.height-230);//y this different?
		}//display stuff here.
	else if (menucontrols){
		context.fillStyle = "white";
		context.font = "12px Verdana";
		var i=0;
		while (i<controltext.length){ //controltext is an array of strings
			fillwrappedtext(controltext[i],200,16, 240,canvas.height-230+i*16);
			i=i+1;
			}
		}
	else if (menulinks){
		context.fillStyle = "white";
		context.font = "12px Verdana";
		var i=0;
		while (i<linktext.length){ //controltext is an array of strings
			fillwrappedtext(linktext[i],200,16, 240,canvas.height-230+i*16);
			i=i+1;
			}
		}
	else if (menumods){
		context.fillStyle = "white";
		context.font = "12px Verdana";
		var i=0;
		while (i<modtext.length){ //controltext is an array of strings
			fillwrappedtext(modtext[i],200,16, 240,canvas.height-230+i*16);
			i=i+1;
			}
		}
	else if (menumousecontrols){
		context.fillStyle = "white";
		context.font = "12px Verdana";
		fillwrappedtext(mousecontroltext,128,16, 240,canvas.height-230);//
		}
	}//done with menu system handling///////////////////////////////////////////
