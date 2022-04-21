function loadnapaoutposts(){

let arisoutpost = new Umo (0,0,128, randcolor());
arisoutpost.c2 = randcolor();
arisoutpost.parentid = 0;
arisoutpost.name = "Ye Olde Spaceship Supply Shoppe";
var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
var toradii = [1,1,1,1]; //rectangle
arisoutpost.polytheta = totheta;
arisoutpost.polyradius = toradii;
arisoutpost.setorbit(systems[6].planets[0], 8000, 0.3, 1);

let luxeoutpost = new Umo(0,0,128, randcolor());
luxeoutpost.c2 = randcolor();
luxeoutpost.parentid = 0;
luxeoutpost.name = "Not Your Dada's Outfitter";
var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
var toradii = [1,1,1,1]; //rectangle
luxeoutpost.polytheta = totheta;
luxeoutpost.polyradius = toradii;
luxeoutpost.setorbit(systems[6].planets[0], 12000, 0.25, 1);

var outposts = [arisoutpost, luxeoutpost];

var i=0;
while (i<outposts.length){
	var numberofsides = Math.floor(Math.random()*6+7)*2;
	outposts[i].makeemblem(numberofsides,0.1);
	
	i=i+1;
	}

return outposts;
}