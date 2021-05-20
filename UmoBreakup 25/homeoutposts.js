function loadhomeoutposts(){
let terranoutpost = new Umo (0,0,128, randcolor());
terranoutpost.parentid = 0;
terranoutpost.name = "Bill's Billion Bits";
var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
var toradii = [1,1,1,1]; //rectangle
terranoutpost.polytheta = totheta;
terranoutpost.polyradius = toradii;
terranoutpost.setorbit(planets[0], 20000, 0.25, 1);//set in orbit around sun behind earf 

let merzoutpost = new Umo(0,0,128, randcolor());
merzoutpost.parentid = 0;
merzoutpost.name = "The Merry Merzian";
var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
var toradii = [1,1,1,1]; //rectangle
merzoutpost.polytheta = totheta;
merzoutpost.polyradius = toradii;
merzoutpost.setorbit(planets[0], 32000, 0.2, 1);//set in orbit around sun behind merz

let jupeoutpost = new Umo(0,0,128, randcolor());
jupeoutpost.parentid = 0;
jupeoutpost.name = "Jojo's House of Cheese";
var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
var toradii = [1,1,1,1]; //rectangle
jupeoutpost.polytheta = totheta;
jupeoutpost.polyradius = toradii;
jupeoutpost.setorbit(planets[0], 80000, 0.1, 1);//set in orbit around sun behind jupe

let anusoutpost = new Umo(0,0,128, randcolor());
anusoutpost.parentid = 0;
anusoutpost.name = "Dangustown";
var totheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4];
var toradii = [1,1,1,1]; //rectangle
anusoutpost.polytheta = totheta;
anusoutpost.polyradius = toradii;
anusoutpost.setorbit(planets[0], 170000, 0.05, 1);//set in orbit around sun behind jupe

var outposts = [terranoutpost, merzoutpost, jupeoutpost, anusoutpost];
return outposts
}