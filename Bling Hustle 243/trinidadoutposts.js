var Umo = require('./umo.js');
function randcolor(){
	var thecolors = ["hotpink","deeppink","fuchsia","darkviolet","purple","indigo","salmon","crimson","red","darkred","orange","orangered","gold","yellow","khaki","lime","mediumspringgreen","seagreen","green","darkgreen","olive","teal","aqua","steelblue","lightskyblue","deepskyblue","blue","navy","tan","chocolate","sienna","maroon","silver","darkgrey","dimgrey"];
	return thecolors[Math.floor(Math.random()*thecolors.length)];
	}

module.exports = function loadtrinidadoutposts(planets){

let dadaoutpost = new Umo (0,0,128, randcolor());
dadaoutpost.c2 = randcolor();
dadaoutpost.parentid = 0;
dadaoutpost.name = "Ye Olde Spaceship Supply Shoppe";
var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
var toradii = [1,1,1,1]; //rectangle
dadaoutpost.polytheta = totheta;
dadaoutpost.polyradius = toradii;
dadaoutpost.setorbit(planets[0], 32000, 0.4, 1);

let hijooutpost = new Umo(0,0,128, randcolor());
hijooutpost.c2 = randcolor();
hijooutpost.parentid = 0;
hijooutpost.name = "Not Your Dada's Outfitter";
var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
var toradii = [1,1,1,1]; //rectangle
hijooutpost.polytheta = totheta;
hijooutpost.polyradius = toradii;
hijooutpost.setorbit(planets[0], 40000, Math.PI+0.35, 1);

let fantoutpost = new Umo(0,0,128, randcolor());
fantoutpost.c2 = randcolor();
fantoutpost.parentid = 0;
fantoutpost.name = "Want-Fant";
var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
var toradii = [1,1,1,1]; //rectangle
fantoutpost.polytheta = totheta;
fantoutpost.polyradius = toradii;
fantoutpost.setorbit(planets[0], 48000, 0.3, 1);

let stanoutpost = new Umo(0,0,128, randcolor());
stanoutpost.c2 = randcolor();
stanoutpost.parentid = 0;
stanoutpost.name = "Shifty Steve's Questionable Commodities";
var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
var toradii = [1,1,1,1]; //rectangle
stanoutpost.polytheta = totheta;
stanoutpost.polyradius = toradii;
stanoutpost.setorbit(planets[0], 120000, 0.05, -1);

var outposts = [dadaoutpost, hijooutpost, fantoutpost, stanoutpost];

var i=0;
while (i<outposts.length){
	var numberofsides = Math.floor(Math.random()*6+7)*2;
	outposts[i].makeemblem(numberofsides,0.1);
	
	i=i+1;
	}

return outposts;
}