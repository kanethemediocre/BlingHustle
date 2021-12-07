//<!DOCTYPE html>
//<html>

//<head>
//    <meta charset="UTF-8"> 
//    <title>Bling Hustle v238 by Andrew Kane </title>
//    <style></style>
//	   <link rel="shortcut icon" href="favicon.ico" >
//   <link rel="icon" type="image/gif" href="animated_favicon1.gif" >
//</link></link></head>
//<body class="myElement" oncontextmenu="return false;">
//<canvas id="gameCanvas" width="1600" height="900"></canvas>

//<script type="text/javascript" src="umo.js"></script>/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Umo = require('./umo.js');

//<script type="text/javascript" src="upgrades.js"></script>/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
var Upgrade = require('./upgrades.js');
allupgrades = [];
allupgrades.push(new Upgrade("Repair","Repairs any damage to your ship.",20,"repair",0));
allupgrades.push(new Upgrade("Armor","Improves your ship's armor.",1000,"armor",0));
allupgrades.push(new Upgrade("Shield","Improves your ship's shield.",4000,"shield",0));
allupgrades.push(new Upgrade("Shield Regen","Improves your ship's shield regeneration rate.",3000,"shieldregen",0));
allupgrades.push(new Upgrade("Radar","Improves your ship's radar range.",3000,"radar",0));
allupgrades.push(new Upgrade("Cargo","Improves your ship's cargo capacity",3000,"cargo",0));
allupgrades.push(new Upgrade("Thrust","Improves your ship's thruster power",3000,"thrust",0));
//allupgrades.push(new Upgrade("Thrust Adjust","Adds adjustibility to your ship's thrusters",3000,"thrustadjust",0));
//allupgrades.push(new Upgrade("Efficient Thrusters","Improves thruster efficiency",3000,"thrusteff",0));

//<script type="text/javascript" src="blasters.js"></script>/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Blaster = require('./blasters.js');
//constructor(name,description,price,type,basedamage,updamage,maxdamage,basespeed,upspeed,maxspeed,baseboom,upboom,maxboom,basen,upn,maxn,basetimer,uptimer,maxtimer,nrg,ID)
let qblaster = new Blaster("joe","a dude",1000,"spread",                                                            
10,4,10,12,2,10,1,0.2,10,6,2,10,40,8,10,11,"red","ID not implemented");//All energy costs set at 11 for now.
let weapon1 = new Blaster("Banger","A simple, energy efficient blaster.  Your ships starting weapon may not be exciting, but it gets the job done. This launches a bomb at a moderate 12 p/f relative velocity, exploding on contact, or after a few seconds, doing damage in a small area",300,"plain",                            
12,6,10,12,2,10,0.8,0.2,10,1,0,0,40,8,10,12,"red","ID not implemented");
weapon1.phas = true; //this is the starter blaster
//weapon1.etier = 1; //testing bounce stuff
let weapon2 = new Blaster("Mine","Powerful but very slow moving bomb.  This blaster needs to be used in conjunction with some combination of thrusters and clever planning.",500,"plain",                                 
40,10,10,1,0,0,2,0.2,10,1,0,0,1800,300,10,40,"purple","ID not implemented");
let weapon3 = new Blaster("Flakker","Quickly detonating, short-range weapon with a wide area of effect.  Damage output and range are low, and it's most suitable for finishing off damaged umos or damaging small groups at close range.",600,"plain",
10,5,10,12,2,10,1.4,0.2,10,1,0,0,16,8,10,25,"green","ID not implemented");
let weapon4 = new Blaster("Railgun","Powerful, fast moving projectile without explosive effect.  The Railgun will almost completely drain your blaster energy in one shot, but it's so fast and powerful you might not need a followup.",1000,"plain",      
40,10,10,20,4,4,0.2,0,0,1,0,0,80,8,10,80,"blue","ID not implemented");
let weapon5 = new Blaster("Scatter Cannon","Fires an adjustable spread of bombs. Good for close range damage and target rich environments. Probably the best weapon.",2000,"spread",               
10,5,10,10,2,5,0.75,0.25,5,4,2,4,80,16,10,30,"white","ID not implemented");
let weapon6 = new Blaster("Blazor","Unique beam weapon damages everything in it's path.  Instead of tapping the mouse, hold the left button down for a continuous beam of... honestly, we don't even know, but it hurts. ",1000,"beam",                                                   
10,4,10,12,2,10,1,0.2,10,1,0,0,384,64,10,11,"white","ID not implemented");
let weapon7 = new Blaster("Double Rainbow","Fires an absurd spread of damaging projectiles.",5000,"fixedspread",          
8,5,10,8,1,10,0.3,0.2,4,12,2,2,80,16,10,50,"white","ID not implemented");
let weapon8 = new Blaster("Disintigrator","Short range, rapid-firing blaster with good damage output.  Hold the left mouse button down instead of tapping it.",3000,"rapid",                         
12,6,10,12,2,10,0.2,0.1,10,6,0,0,16,2,10,11,"white","ID not implemented");
let weapon9 = new Blaster("Boodabeep","Beep Beep BaBoomba, Boomba Be Boppo!  Baboombador bopposobeep, babumble beepapoo.  Beepapop boowopendongle, prodoopsenboboompo bopopob.",20000,"plain",                                           
64,8,10,12,2,10,3,0.25,10,1,0,0,40,8,10,99,"white","ID not implemented");
let weapon0 = new Blaster("Probe","Currently equipped to steal colors or shapes. Upgradeable to provide many other functions. Eventually.",1000,"probe",                      
10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,11,"white","ID not implemented");
let boss1weapon = new Blaster("joe","Simple, but energy efficient blaster",1000,"type variable not used yet",       
10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,11,"white","ID not implemented");
let allblasters = [weapon0,weapon1,weapon2,weapon3,weapon4,weapon5,weapon6,weapon7,weapon8,weapon9,qblaster,boss1weapon];
function baseblastercopy(old){//Creates a new Blaster with same base stats as old Blaster.  Upgrades are not copied.
   let tempblaster = new Blaster(old.name,old.description,old.price,old.type,                                                            
	old.bhurt,old.uphurt,old.maxhurt,old.bspeed,old.upspeed,old.maxspeed,old.bboom,old.upboom,old.maxboom,old.bn,old.upn,old.maxn,
	old.btimer,old.uptimer,old.maxtimer,old.ecost,old.c,old.id);
   return tempblaster;
}

//<script type="text/javascript" src="cargo.js"></script>/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Cargo = require('./cargo.js');
let iron = new Cargo("Iron","A common element throughout space, this magnetic and strong metal can form a tremendous number of useful alloys.", 100);
let water = new Cargo("Water","A necessity for life and a lot of useful chemistry, water is in demand despite not being hard to find.", 50);
let phosphorus = new Cargo("Phosphorus","Phosphorus is a necessary element for life as we know it, and unlike water it's also quite rare.",1000);
let oxygen = new Cargo("Oxygen","It's good for breathing.",100);
let cheese = new Cargo("Cheese","A valuable type of spoiled milk, cheese is a delicacy that many humans refuse to live without.",400);
let weet = new Cargo("Weet","Weet is a genetically engineered grain optimized to provide a high calorie density without being too needy to grow in space.",100);
let dankcheese = new Cargo("Dank Cheese","Cheese is already a valuable commodity in deep space, but the dankest of cheeses can fetch even higher prices with the right buyer",1000);
let szyrup = new Cargo("Sweet Juice","Ubiquitous beverage of choice in deep space settlements.  It's pretty good if you don't ask too many questions about it.",150);
let tinywizards = new Cargo("Tiny Wizards","Widely used for tabletop gaming, these figurines are inexplicably valuable in some markets",80);
let missioncargo = new Cargo("Mission cargo","They don't tell you what's in the crates.  They just tell you where to take them.",0);
let allcargos = [iron,water,phosphorus,oxygen,cheese,weet,dankcheese,szyrup,tinywizards,missioncargo];

var Inventory = require('./inventory.js');////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let playerinventory = new Inventory(10,allcargos);
//playerinventory.takecargo(0,4);//for testing

//<script type="text/javascript" src="shopitem.js"></script>/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
var Shopitem = require('./shopitem.js');
var Shop = require('./shop.js');
let repairshopitem = new Shopitem("upgrade",0,"repair",0);
// w1 excluded because player starts with it
let buyw0item = new Shopitem("blaster",0,"buy",0);//Probe weapon
let buyw2item = new Shopitem("blaster",2,"buy",0); //Mine weapon w1 excluded because player starts with it
let buyw3item = new Shopitem("blaster",3,"buy",0); //Flakker weapon
let buyw4item = new Shopitem("blaster",4,"buy",0);//Railgun weapon
let buyw5item = new Shopitem("blaster",5,"buy",0);//Scatter cannon weapon
let buyw6item = new Shopitem("blaster",6,"buy",0);//Beam weapon
let buyw7item = new Shopitem("blaster",7,"buy",0);//Double rainbow
let buyw8item = new Shopitem("blaster",8,"buy",0);//Disintegrator
let buyw9item = new Shopitem("blaster",9,"buy",0);//Beepadoop
let blasterbuyitems = [buyw0item,buyw2item,buyw3item,buyw4item,buyw5item,buyw6item,buyw7item,buyw8item,buyw9item];
//No remote detonator for w0, w3,w4,w6,w7,w8 (probe, flakker, railgun, beam, double rainbow, disintigrator)
let remotew1item = new Shopitem("blaster",1,"remote",1);//blaster remote upgrade
let remotew2item = new Shopitem("blaster",2,"remote",1); //Mine remote detonator upgrade
let remotew5item = new Shopitem("blaster",2,"remote",1); //Scatter cannon remote detonator upgrade
let remotew9item = new Shopitem("blaster",2,"remote",1); //Beepadoop remote detonator upgrade
//No damage upgrade for w0 (probe)
let upw1damage = new Shopitem("blaster",1,"damage",1); //Damage upgrades
let upw2damage = new Shopitem("blaster",2,"damage",1); 
let upw3damage = new Shopitem("blaster",3,"damage",1); 
let upw4damage = new Shopitem("blaster",4,"damage",1); 
let upw5damage = new Shopitem("blaster",5,"damage",1); 
let upw6damage = new Shopitem("blaster",6,"damage",1); 
let upw7damage = new Shopitem("blaster",7,"damage",1); 
let upw8damage = new Shopitem("blaster",8,"damage",1); 
let upw9damage = new Shopitem("blaster",9,"damage",1); 
//speed upgrade available to all blasters -- might exclude mine later, maybe also double rainbow
let upw0speed = new Shopitem("blaster",0,"speed",1); //speed  upgrades increase projectile speed
let upw1speed = new Shopitem("blaster",1,"speed",1); 
let upw2speed = new Shopitem("blaster",2,"speed",1); 
let upw3speed = new Shopitem("blaster",3,"speed",1); 
let upw4speed = new Shopitem("blaster",4,"speed",1); 
let upw5speed = new Shopitem("blaster",5,"speed",1); 
let upw7speed = new Shopitem("blaster",7,"speed",1); 
let upw8speed = new Shopitem("blaster",8,"speed",1); 
let upw9speed = new Shopitem("blaster",9,"speed",1); 
//No bounce upgrade for w0, w3, w6, or w7 (probe, flakker, beam double rainbow)
let upw1bounce = new Shopitem("blaster",1,"bounce",1); //bounce upgrades make projectiles bounce of planets--in theory anyways.
let upw2bounce = new Shopitem("blaster",2,"bounce",1); //these are now unused because they dont work, would be nice if they did.
let upw4bounce = new Shopitem("blaster",4,"bounce",1); 
let upw5bounce = new Shopitem("blaster",5,"bounce",1); 
let upw8bounce = new Shopitem("blaster",8,"bounce",1); 
let upw9bounce = new Shopitem("blaster",9,"bounce",1); 
//No timer upgrade for w6 (beam)
let upw0timer = new Shopitem("blaster",0,"timer",1); //timer upgrades increase projectile lifespan
let upw1timer = new Shopitem("blaster",1,"timer",1); 
let upw2timer = new Shopitem("blaster",2,"timer",1); 
let upw3timer = new Shopitem("blaster",3,"timer",1); 
let upw4timer = new Shopitem("blaster",4,"timer",1); 
let upw5timer = new Shopitem("blaster",5,"timer",1); 
let upw6timer = new Shopitem("blaster",6,"timer",1); 
let upw7timer = new Shopitem("blaster",7,"timer",1); 
let upw8timer = new Shopitem("blaster",8,"timer",1); 
let upw9timer = new Shopitem("blaster",9,"timer",1); 
//No boom upgrade for w0, w4, w6,w7 (probe, railgun, beam, double rainbow)
let upw1boom = new Shopitem("blaster",1,"boom",1);//boom upgrades increase blast radius
let upw2boom = new Shopitem("blaster",2,"boom",1);
let upw3boom = new Shopitem("blaster",3,"boom",1);
let upw5boom = new Shopitem("blaster",5,"boom",1);
let upw8boom = new Shopitem("blaster",8,"boom",1);
let upw9boom = new Shopitem("blaster",9,"boom",1);
//Only w5 and w8 get n upgrades (more projectiles). 
let upw5n = new Shopitem("blaster",5,"n",1);
let upw8n = new Shopitem("blaster",8,"n",1);
let blasterupgradeitems = [ //broken up into lines for readability, this is all a single 1 dimensional array.
remotew1item,remotew2item,remotew5item,remotew9item,
upw1damage,upw2damage,upw3damage,upw4damage,upw5damage,upw6damage,upw7damage,upw8damage,upw9damage,
upw0speed,upw1speed,upw2speed,upw3speed,upw4speed,upw5speed,upw7speed,upw8speed,upw9speed,
//upw1bounce,upw2bounce,upw4bounce,upw5bounce,upw8bounce,upw9bounce,//bounce upgrades nonfunctional, removed
upw0timer,upw1timer,upw2timer,upw3timer,upw4timer,upw5timer,upw6timer,upw7timer,upw8timer,upw9timer,
upw1boom,upw2boom,upw3boom,upw5boom,upw8boom,upw9boom
];
let booster1 = new Shopitem("booster",0,"buy",1); //Tier 0 booster
let buycargo0 = new Shopitem("cargo",0,"buy",1);//The upgrade tier variable will used as a price multiplier for cargo
let buycargo1 = new Shopitem("cargo",1,"buy",1); 
let buycargo2 = new Shopitem("cargo",2,"buy",1); 
let buycargo3 = new Shopitem("cargo",3,"buy",1); 
let buycargo4 = new Shopitem("cargo",4,"buy",1);
let buycargo5 = new Shopitem("cargo",5,"buy",1);
let buycargo6 = new Shopitem("cargo",6,"buy",1);
let buycargo7 = new Shopitem("cargo",7,"buy",1);
let buycargo8 = new Shopitem("cargo",8,"buy",1);
let uprepairitem = new Shopitem("upgrade",0,"repair",0);
let uparmoritem = new Shopitem("upgrade",1,"armor",0);
let upshielditem = new Shopitem("upgrade",2,"shield",0);
let upshieldregenitem = new Shopitem("upgrade",3,"shieldregen",0);
let upradaritem = new Shopitem("upgrade",4,"radar",0);
let upcargoitem = new Shopitem("upgrade",5,"cargo",0);
let upthrustitem = new Shopitem("upgrade",6,"thrust",0);
let merzianshopitems = [repairshopitem,buyw2item,buyw3item,buyw4item,remotew1item,booster1,buycargo0,buycargo1,buycargo2,buyw0item];
let merrymerz = new Shop("The Merry Merzian", 1, "I have these fine tapestries....", merzianshopitems);
let billshopitems = [repairshopitem,buyw2item,buyw3item,upw1damage,upw3damage,uparmoritem,buycargo2,buycargo3]
let billbits = new Shop("Bills Billion Bits", 0, "Welcome to Earf", billshopitems);
let jojoshopitems = [repairshopitem,buyw5item,buyw6item,buyw9item,remotew2item,uparmoritem,upshielditem,upradaritem,buycargo2,buycargo5];
let jojocheese = new Shop("JoJo's House of Cheese", 2, "Jupe Fantastico", jojoshopitems);
let dangshopitems = [repairshopitem,buyw4item,buyw7item,buyw8item,upw4speed,upw5bounce,upw1damage,upshieldregenitem,buycargo1,buycargo6,buycargo0];
let dangustown = new Shop("Dangustown", 3, "It's YOUR Anus!", dangshopitems);
let randshopitems1 = [];
var i = 0;
while (i<12){
	var randomblasterupgrade = Math.floor(Math.random()*blasterupgradeitems.length)
	randshopitems1.push(blasterupgradeitems[randomblasterupgrade]);
	i=i+1;
}
let randoshop1 = new Shop("Rando Calrissian's Blaster Upgrades",4, "Randomized items", randshopitems1);
var upgradeshopitems = [uprepairitem,uparmoritem,upshielditem,upshieldregenitem,upradaritem,upcargoitem,upthrustitem];
let upgradeshop = new Shop("All Upgrades Testing Shop",5, "Upgrades", upgradeshopitems);
let allshops = [billbits,merrymerz,jojocheese,dangustown,randoshop1,upgradeshop];//"all" meaning home system
let dadashopitems = [uprepairitem,buyw2item,buyw3item,buyw4item,upw1damage,upw4damage,uparmoritem,buycargo0,buycargo6,buycargo5];
let dadashop = new Shop("Ye Olde Space Shoppe",0,"The Gentleman's Outfitter",dadashopitems);
let hijoshopitems = [uprepairitem,buyw5item,buyw6item,buyw8item,remotew2item,upw3damage,upw5n,buycargo1,buycargo2,buycargo4];
let hijoshop = new Shop("Not Your Dada's Spaceport",1,"Welcome to our new location",hijoshopitems);
let fantshopitems = [uprepairitem,buyw2item,buyw7item,buyw0item,upw2boom,upw5damage,upw8damage,buycargo3,buycargo7,buycargo8];
let fantshop = new Shop("Want-Fant",2,"You want it, Fant's got it.",fantshopitems);
let stanshopitems = [uprepairitem,buyw3item,buyw6item,buyw9item,upw6timer,upw8boom,buycargo6,buycargo7,buycargo8];
let stanshop = new Shop("Shifty Steve's Questionable Commodities",3,"Everything your legitimate business needs.",stanshopitems);
let trinidadshops = [dadashop,hijoshop,fantshop,stanshop];
let arisshopitems = [uprepairitem,buyw4item,buyw6item,buyw7item,upw4speed,upw4timer,upw6damage,upw5n,buycargo1,buycargo2,buycargo4];
let arisshop = new Shop("The Foob",0,"yaaaaa",arisshopitems);
let luxeshopitems = [uprepairitem,buyw2item,buyw5item,buyw8item,upw5damage,upw5boom,upw5n,buycargo1,buycargo2,buycargo4];
let luxeshop = new Shop("The Dirty Luxemburger",1,"mmmmmm",luxeshopitems);
let napashops = [arisshop,luxeshop];

//<script type="text/javascript" src="texthandling.js"></script>/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fillwrappedtextold(text,textlength,textheight,x,y){ //textlength in characters, textheight in pixels 
	var line = 0;
	var alreadydisplayedchars = 0;
	var thechar = "";
	var thelength = 0;
	var i = textlength-1;
	while (i>0){
		thechar = text[i]
		if (thechar == " "){
			thelength = i;
			line = line + 1;
			i = -2;
			}
		i=i-1;
		}
	context.fillText(text.slice(0,thelength),x,(y + line*textheight));	
	line = line + 1;
	context.fillText(text.slice(thelength+1, thelength+textlength),x,(y + line*textheight));
	}

function fillwrappedtext(text,textlength,textheight,x,y){ //textlength in characters, textheight in pixels 
	var line = 0;
	var alreadydisplayedchars = 0;
	var thechar = "";
	var thelength = 0;
	var i = textlength-1;
	while (alreadydisplayedchars+textlength<text.length){
		var thelength = 0;
		var i = alreadydisplayedchars+textlength-1;
		while (i>0){
			thechar = text[i]
			if (thechar == " "){
				thelength = i;
				i = -2;
				}
			i=i-1;
			}
		context.fillText(text.slice(alreadydisplayedchars,thelength),x,(y + line*textheight));	
		line = line + 1;
		alreadydisplayedchars = thelength+1;
		}
	context.fillText(text.slice(alreadydisplayedchars, alreadydisplayedchars+textlength),x,(y + line*textheight));
	}

function showchart(chartdataxy, xspace, yspace, x,y){ //displays chart with specified cell dimensions and position
		var i = 0 //assumes each column is same length, otherwise error
		var j = 0;
		while (i<chartdataxy.length){
		var cellposx = x+i*xspace;
		j = 0;
		while (j<chartdataxy[0].length){
			var cellposy = y+j*yspace;
			context.fillText(chartdataxy[i][j],cellposx,cellposy);
			j=j+1;
			}
		i=i+1;
		}
		}
function showchartabbrev(chartdataxy, xspace, yspace, x,y,maxlength){ //displays chart with specified cell dimensions and position
		var i = 0 //assumes each column is same length, otherwise error
		var j = 0;
		while (i<chartdataxy.length){
		var cellposx = x+i*xspace;
		j = 0;
		while (j<chartdataxy[0].length){
			var cellposy = y+j*yspace;
			context.fillText(chartdataxy[i][j].slice(0,maxlength),cellposx,cellposy);
			j=j+1;
			}
		i=i+1;
		}
		}
function showmessage(message){ //Displays a message, breaking it up into multiple lines as needed.  No word continuity or overflow handling yet.
	var maxlength = (canvas.width-820)/11; //estimating font width to 10 px, allotting 150 px margins
	var maxlines = canvas.height/(24*6); //estimating font height to 24 px, allotting 1/6 of screen, only used for overflow handling (eventually)
	var starty = Math.floor(canvas.height*5/6 - 24); //allotting bottom 1/6 of screen + 24 px fudge factor
	var startx = 408;
	var lines = 1 + Math.floor(message.length/maxlength);
	context.font='16px Courier New';
	context.fillStyle = "white";  
	var line = 0;
	while (line<(lines)){//while there are still lines of text to draw...
		context.fillText(message.slice(line*maxlength, (line+1)*(maxlength)),startx,(starty + line*24));
		line = line + 1;
		}//slice(startofline,endofline,startx,startyofline)
	}
function targetchart(targets,xspace,yspace,x,y){
	context.font='12px Courier New';
	var sorttargets = [];//No sorting yet
	var i = 0 //assumes each column is same length, otherwise error
	while(i<targets.length){
		var cellposx = x;
		var cellposy = y+i*yspace;
		context.fillStyle = targets[i][0].c
		context.fillText(targets[i][0].name,cellposx,cellposy);
		var cellposx = x+xspace;
		context.fillText(targets[i][1],cellposx,cellposy);
		i=i+1;
		}
	context.fillStyle = "white";  
	}
function randvowel(){
	var vowels = "aeyuio";
	var vindex = Math.floor(Math.random()*vowels.length);
	return vowels[vindex];
	}
function randconsonant(){
	var consonants = "zxcvbnmsdfghjklqwrtyp";
	var cindex = Math.floor(Math.random()*consonants.length);
	return consonants[cindex];
	}
function randname(namelength){//Creates a random name of length namelength, with no more than 2 vowels or consonants in a row
	var lastchartype = Math.floor(Math.random()*2); //0 for consonant, 1 for vowel;
	var lastchartype2 = Math.floor(Math.random()*2); //2nd to last....
	var thischartype = Math.floor(Math.random()*2); //0 for consonant, 1 for vowel;
	var thename = ""; //Start with an empty name
	if (lastchartype2 == 0){thename=thename+randconsonant();}else{thename=thename+randvowel();}
	if (lastchartype == 0){thename=thename+randconsonant();}else{thename=thename+randvowel();}
	var i = namelength;
	while (i>2){
		i=i-1;
		if (lastchartype == lastchartype2){ //if last two characters are same type,
			if (lastchartype == 0){thischartype = 1;}else{thischartype = 0;} //make other type
			}else {thischartype = Math.floor(Math.random()*2);}//otherwise pick randomly
		if (thischartype == 0){thename=thename+randconsonant();}else{thename=thename+randvowel();}
		lastchartype2 = lastchartype; //Keep track of last two characters
		lastchartype = thischartype; //so we can not have 3 vowels or 3 consonants sequentially
		}
	return thename;
	}
var testname = randname(8);		

var Radio = require('./radio.js');/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//<script type="text/javascript" src="graphics.js"></script>/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//<script type="text/javascript" src="bubblesplosion.js"></script>/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//<script type="text/javascript" src="bling.js"></script>//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Bling = require('./bling.js');

//<script type="text/javascript" src="player.js"></script>/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Player = require('./player.js');
var testplayer = new Player();

//<script type="text/javascript" src="system.js"></script>	
var System = require('./system.js');

//<script type="text/javascript" src="rainbows.js"></script>	

//<script type="text/javascript" src="homesystem.js"></script>
var loadhomesystem = require('./homesystem.js');

//<script type="text/javascript" src="trinidadsystem.js"></script>
var loadtrinidadsystem = require('./trinidadsystem.js');

//<script type="text/javascript" src="napasystem.js"></script>
var loadnapasystem = require('./napasystem.js');

//<script type="text/javascript" src="menusystem.js"></script>
var loadmenusystem = require('./menusystem.js');

//<script type="text/javascript" src="smallworldsystem.js"></script>
var loadsmallworldsystem = require('./smallworldsystem.js');

//<script type="text/javascript" src="storytext.js"></script>	

//<script type="text/javascript" src="mission.js"></script>	

//<script type="text/javascript" src="homeoutposts.js"></script>
var loadhomeoutposts = require('./homeoutposts.js');

//<script type="text/javascript" src="trinidadoutposts.js"></script>
var loadtrinidadoutposts = require('./trinidadoutposts.js');

//<script type="text/javascript" src="napaoutposts.js"></script>
var loadnapaoutposts = require('./napaoutposts.js');

//<script type="text/javascript" src="mouse.js"></script>

//<script type="text/javascript" src="keyboard.js"></script>

//<script type="text/javascript" src="storyfunction.js"></script>

//<script type="text/javascript" src="hud.js"></script>

//<script type="text/javascript" src="starfield.js"></script>

//<script type="text/javascript" src="about.js"></script>

//<script type="text/javascript" src="controls.js"></script>

//<script type="text/javascript" src="turrets.js"></script>
var Turret = require('./turrets.js');

// declare global variables/////////////////////////////////////////////////
const FPS = 60;
setInterval(update, 1000 / FPS);// set up interval (game loop)
//var canvas, context;
//canvas = document.getElementById("gameCanvas"); //canvas is the draw sauce.
//context = canvas.getContext("2d");
//context.canvas.width  = window.innerWidth-24; //This overrides the 1600x900 established in html.
//context.canvas.height = window.innerHeight-24;
var time = 0; //Count of frames elapsed in game time.  Used to track in-game time related stuff.
var nmeactive = 1; //targeting computer starts off
//var mdx = 0; //I think these were for the mouse?  Not sure if used.
//var mdy = 0;
//var a1 = 0; //armor upgrades
//var s1 = 0; //Shield upgrades
//var moused = 0; //Direction currently indicated by mouse
//var mousedistance = 0; // Distance to mouse cursor
//var mousestate = 0; //describes state of mouse buttons
//var storymessages = loadstorymessages();//storytext.js
//var diagnostic = 1; //0 is not displayed, 1 is weapon stats, 2 is cargo stats, 3 is ship stats.  Might get used for other items.
//var cheatmode = 0; //0 = not a cheater
var ps = 1; //Player System.  Had to be abbreviated, systems[ps] is an important keyword
//var starmode = 1; //0 for no starfield.
//let testfield = new Starfield(30000,20000,64,1000,4000,32);
var pz = 0;
//var menuabout = false;
//var menucontrols = false;

//var blastersound1 = new Audio("bubble4_short2.mp3");
//var blastersound2 = new Audio("close_door_12.mp3");
//var blastersound3 = new Audio("Bubble5_trunc.mp3");
//var blastersound4 = new Audio("bottleshortpop2.mp3");
//var blastersound5 = new Audio("bottleshortpop1.mp3");
//var blastersound6 = new Audio("chirpshort1.mp3");
//var blastersound7 = new Audio("shortlaser1.mp3");
//var blastersound8 = new Audio("shortburp.mp3");
//var blastersound9 = new Audio("carchirp1.mp3");
//var blastersound0 = new Audio("chirpshort1.mp3");
//var enginesound1 = new Audio("engine26.mp3");
//var damagesound1 = new Audio("engine3.mp3");
//var cashsound1 = new Audio("cash_register_2.mp3");
//var menuclick1 = new Audio("menuclick1.mp3");
//var menuclick2 = new Audio("simplechnk2.mp3");
//var menuclick3 = new Audio("singleshot1.mp3");
//var menubuy1 = new Audio("buyitem1.mp3");
//var respawn1 = new Audio("respawn.mp3");
//var boost1 =  new Audio("boingpowerup1.mp3");
//var missioncomplete1 = new Audio("JazzStab1.mp3");

function pointingat(objdir,dir,distance,size){ //are you pointing at a thing?
	var as = Math.atan2(size,distance); //how much angle does the thing occupy?
	var dd = dir - objdir; //How much off the actual direction are you pointing?
	while (dd > Math.PI){dd = dd - 2*Math.PI;} //This reduces the angle difference to within +- Math.PI
	while (dd < -1*Math.PI){dd = dd + 2*Math.PI;}
	while (as > Math.PI){as = as - 2*Math.PI;} //This reduces the angle difference to within +- Math.PI
	while (as < -1*Math.PI){as = as + 2*Math.PI;}
	if ((dd<as)&&(dd>-1*as)){//-1*anglesize < deltadir < anglesize
		return 1;
		}else {return 0;}
	}

////////Declarations//////////////////////////////////////////////////////////////////////////////////
////////This is basically the game world/////////////////////////////////////////////////////////////////

//let testsystem = loadsmallworldsystem();
let testsystem = new System(2,randname(4),0,0);
let testsystem2 = new System(3,randname(4),0,0);
let testsystem3 = new System(4,randname(4),0,0);
let testsystem4 = new System(5,randname(4),0,0);
let testsystem5 = new System(6,randname(4),0,0);
let testsystem6 = new System(7,randname(4),0,0);
let testsystem7 = new System(8,randname(4),0,0);
let testsystem8 = new System(9,randname(4),0,0);
let testsystem9 = new System(10,randname(4),0,0);
let testsystem10 = new System(11,randname(4),0,0);
let testsystem11 = new System(12,randname(4),0,0);
let testsystem12 = new System(13,randname(4),0,0);
let testsystem13 = new System(14,randname(4),0,0);
let testsystem14 = new System(15,randname(4),0,0);
let playerradio = new Radio(" ");

let planets = loadhomesystem(); //homesystem.
let menuplanets = loadmenusystem();
let trinidadplanets = loadtrinidadsystem();


var ships = [];
///////Special Station Umos//////////////////////////////////////////////////////////////////////////////
let outposts= loadhomeoutposts(planets);
////////Player Bombs//////////////////////////////////////////////////////////////////////////////////////////       
let botbombs=[];
let home = new System(1,"Sool",0,0);
home.planets = planets;//these are from loadhomesystem function output, which defines the starter system.
home.ships = ships;
home.botbombs = botbombs;
home.outposts = outposts; 
home.shops = allshops;
let menu = new System(0,"Main Menu",0,0);
menu.planets = menuplanets;

var i = 0; //This randomizes planetary dots for home system.
while (i<home.planets.length){
	var j=0;
	var extradots = Math.floor(Math.random()*3);
	while(extradots>0){
		home.planets[i].polyradius.push(0);
		home.planets[i].polytheta.push(0);
		extradots = extradots - 1;
		}
	while (j<home.planets[i].polytheta.length){
		home.planets[i].polyradius[j] = Math.random()+0.125;
		home.planets[i].polytheta[j] = Math.random()*2*Math.PI;
		j=j+1;
		}
	i=i+1;
	}
var i = 0; //This randomizes planetary dots for menu system.
while (i<menu.planets.length){
	var j=0;
	var extradots = Math.floor(Math.random()*3);
	while(extradots>0){
		menu.planets[i].polyradius.push(0);
		menu.planets[i].polytheta.push(0);
		extradots = extradots - 1;
		}
	while (j<menu.planets[i].polytheta.length){
		menu.planets[i].polyradius[j] = Math.random()+0.125;
		menu.planets[i].polytheta[j] = Math.random()*2*Math.PI;
		j=j+1;
		}
	i=i+1;
	}	

let systems = [menu,home,testsystem,testsystem2,testsystem3,testsystem4,testsystem5,testsystem6,testsystem7,testsystem8,testsystem9,testsystem10,testsystem11,testsystem12,testsystem13,testsystem14];

systems[2].randomplanets();
systems[2].enemypopulate(5,4,17);
systems[2].addrandombling(50);

systems[3].planets = loadtrinidadsystem(); //from trinidadsystem.js
systems[3].outposts = loadtrinidadoutposts(systems[3].planets); //from trinidadoutposts.js
systems[3].shops = trinidadshops;//trinidadshops is defined in shop.js
systems[3].enemypopulate(5,4,16);
systems[3].addrandombling(50);

systems[4].randomplanets();
systems[4].enemypopulate(5,5,18);
systems[4].addrandombling(50);
systems[5].randomplanets();
systems[5].enemypopulate(5,5,19);
systems[5].addrandombling(50);

systems[6].planets = loadnapasystem(); //from napasystem.js
systems[6].outposts = loadnapaoutposts(systems[6].planets); //from napaoutposts.js
systems[6].shops = napashops;//napashops is defined in shop.js
systems[6].enemypopulate(6,2,6);
var aristurret1 = new Turret("friendly",systems[6].planets[2],0,330);
var aristurret2 = new Turret("friendly",systems[6].planets[2],Math.PI/2,330);
var aristurret3 = new Turret("friendly",systems[6].planets[2],Math.PI,330);
var aristurret4 = new Turret("friendly",systems[6].planets[2],Math.PI*1.5,330);
var luxeturret1 = new Turret("friendly",systems[6].planets[3],0,300);
var luxeturret2 = new Turret("friendly",systems[6].planets[3],Math.PI/2,300);
var luxeturret3 = new Turret("friendly",systems[6].planets[3],Math.PI,300);
var luxeturret4 = new Turret("friendly",systems[6].planets[3],Math.PI*1.5,300);
luxeturret1.bombs = [new Umo(0,0,8,"purple"), new Umo(0,0,8,"blue"), new Umo(0,0,8,"green"), new Umo(0,0,8,"yellow"),new Umo(0,0,8,"orange"),new Umo(0,0,8,"red")];
luxeturret2.bombs = [new Umo(0,0,8,"purple"),new Umo(0,0,8,"blue"),new Umo(0,0,8,"green"),new Umo(0,0,8,"yellow"),new Umo(0,0,8,"orange"),new Umo(0,0,8,"red")];
luxeturret3.bombs = [new Umo(0,0,8,"purple"),new Umo(0,0,8,"blue"),new Umo(0,0,8,"green"),new Umo(0,0,8,"yellow"),new Umo(0,0,8,"orange"),new Umo(0,0,8,"red")];
luxeturret4.bombs = [new Umo(0,0,8,"purple"),new Umo(0,0,8,"blue"),new Umo(0,0,8,"green"),new Umo(0,0,8,"yellow"),new Umo(0,0,8,"orange"),new Umo(0,0,8,"red")];
var arstturret1 = new Turret("friendly",systems[6].outposts[0],Math.PI*1.5,150);
var arstturret2 = new Turret("friendly",systems[6].outposts[0],Math.PI*0.5,150);
var lustturret1 = new Turret("friendly",systems[6].outposts[1],Math.PI*1.5,150);
var lustturret2 = new Turret("friendly",systems[6].outposts[1],Math.PI*0.5,150);
var turrets = [aristurret1,aristurret2,aristurret3,aristurret4,luxeturret1,luxeturret2,luxeturret3,luxeturret4,arstturret1,arstturret2,lustturret1,lustturret2];
systems[6].turrets = turrets;
systems[6].addrandombling(50);

systems[7].randomplanets();
systems[7].enemypopulate(5,6,21);
systems[7].addrandombling(50);
systems[8].randomplanets();
systems[8].enemypopulate(5,7,22);
systems[8].addrandombling(50);
systems[9].randomplanets();
systems[9].enemypopulate(5,7,23);
systems[9].addrandombling(50);
systems[10].randomplanets();
systems[10].enemypopulate(5,8,24);	
systems[10].addrandombling(50);		
systems[11].randomplanets();
systems[11].enemypopulate(5,8,25);		
systems[11].addrandombling(50);	
systems[12].randomplanets();
systems[12].enemypopulate(5,9,26);
systems[12].addrandombling(50);
systems[13].randomplanets();
systems[13].enemypopulate(5,9,27);	
systems[13].addrandombling(50);		
systems[14].randomplanets();
systems[14].enemypopulate(5,10,28);	
systems[14].addrandombling(50);		
systems[15].randomplanets();
systems[15].enemypopulate(5,10,29);	
systems[15].addrandombling(50);		
			
//////procedural bot ship generation for home system//////////////////////////////////////////////////////////////////////////////////////////////////
systems[1].addrandomgang(1,2,16);
systems[1].addrandomgang(2,3,3);
systems[1].addrandomgang(3,4,2);//no moon bots
systems[1].addrandomgang(5,3,1);//no deem, fobz, jupe, or heyo bots
systems[1].addrandomgang(10,3,4);
systems[1].addrandomgang(11,4,6);
systems[1].addrandomgang(12,3,5);
systems[1].addrandomgang(14,2,7);
systems[1].addrandomgang(15,4,9);
systems[1].addrandomgang(16,4,10);
systems[1].addrandomgang(17,4,8);
systems[1].addrandomgang(18,2,11);
systems[1].addrandomgang(21,2,6);
systems[1].addrandomgang(22,2,6);
systems[1].addrandomgang(23,4,4);//no tune bots
systems[1].addrandomgang(25,5,16);
//systems[1].addrandomgang(26,8,32);
var i = systems[1].botbombs.length;
while (i>0){  ////For all bot bombs, set them up as a bomb Umos.
	i=i-1;
	systems[1].botbombs[i].hp = 1;  //Set hitpoints to 1 so they explode on contact
	systems[1].botbombs[i].maxhp = 1; //with planets 
	systems[1].botbombs[i].shield = 0;  
	}

var i = 0;
while (i<4){
	var j = 0;
	while (j<systems[1].shops.length){
		systems[1].shops[j].addcargomission(systems[1].ships,systems[1].planets,systems[1].outposts);
		j=j+1;
		}
	i=i+1
	}

var i = 0;//Duplicated for trinidad system.  Need to automate this for curated systems.
while (i<4){
	var j = 0;
	while (j<systems[2].shops.length){
		systems[2].shops[j].addcargomission(systems[2].ships,systems[2].planets,systems[2].outposts);
		j=j+1;
		}
	i=i+1
	}	
	var i = 0;//Duplicated for napa system.  Need to automate this for curated systems.
while (i<4){
	var j = 0;
	while (j<systems[6].shops.length){
		systems[6].shops[j].addcargomission(systems[6].ships,systems[6].planets,systems[6].outposts);
		j=j+1;
		}
	i=i+1
	}	

var i = 0;
while (i<4){
	var j = 0;
	while (j<systems[1].shops.length){
		systems[1].shops[j].addkillmission(systems[1].ships,systems[1].planets,systems[1].outposts);
		j=j+1;
		}
	i=i+1
	}
let xxxx = new Umo(0,0,550,"black");//26
xxxx.name = "Xxxx";
xxxx.setorbit(systems[1].planets[0],320000,0,-1);
xxxx.parentid = 0;
systems[1].planets.push(xxxx);
let waldo = new Umo(0,0,1000,"purple");
waldo.name = "Waldo";
waldo.setorbit(systems[1].planets[0], 320000, Math.PI, -1);
waldo.parentid = 0;
systems[1].planets.push(waldo);
var i = 2;
while (i<systems.length){
	systems[i].planets.push(xxxx);
	systems[i].planets.push(waldo);
	i=i+1;
	}
ps = 0;


var aplayer = new Player();
aplayer.ship.hp = 1000;
aplayer.ship.maxhp = 1000;
aplayer.ship.shield = 200;
aplayer.ship.maxshield = 200;
aplayer.ship.parentid = 3;
aplayer.blasters.push(baseblastercopy(allblasters[0]),baseblastercopy(allblasters[1]),baseblastercopy(allblasters[2]),baseblastercopy(allblasters[3]),baseblastercopy(allblasters[4]),baseblastercopy(allblasters[5]),baseblastercopy(allblasters[6]),baseblastercopy(allblasters[7]),baseblastercopy(allblasters[8]),baseblastercopy(allblasters[9]));
aplayer.blasters[1].phas = true;
function randcolor(){
	var thecolors = ["hotpink","deeppink","fuchsia","darkviolet","purple","indigo","salmon","crimson","red","darkred","orange","orangered","gold","yellow","khaki","lime","mediumspringgreen","seagreen","green","darkgreen","olive","teal","aqua","steelblue","lightskyblue","deepskyblue","blue","navy","tan","chocolate","sienna","maroon","silver","darkgrey","dimgrey"];
	return thecolors[Math.floor(Math.random()*thecolors.length)];
	}
aplayer.ship.c = randcolor();
aplayer.ship.c2 = randcolor();
var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
//var randomplayerverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
//normalizepoly(randomplayerverts); //Makes the ship have at least 2 vertices at maximum radius (1).
//aplayer.ship.polytheta = randomplayerverts[0];//Assigns randomized polygon
//aplayer.ship.polyradius = randomplayerverts[1]; //to player1 ship
aplayer.ship.ai = "player";

var i=0;
while(i<systems.length){
	systems[i].players.push(aplayer);
	i++;
}
//var testboom = new Bubblesplosion(3,30,"red",systems[ps].players[0].ships);
var testturret = new Turret("friendly",systems[1].planets[4],0,150);
var murcturret1 = new Turret("enemy",systems[1].planets[1],0,192);
var murcturret2 = new Turret("enemy",systems[1].planets[1],Math.PI,192);
var murcturret3 = new Turret("enemy",systems[1].planets[1],Math.PI/2,192);   
var murcturret4 = new Turret("enemy",systems[1].planets[1],3*Math.PI/2,192);
var turrets = [testturret,murcturret1,murcturret2,murcturret3,murcturret4];
systems[1].turrets = turrets;
//systems[1].addbling(systems[1].planets[5],20,50,10);
systems[1].addrandombling(50);
////////////////GAME LOOP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////update function this is the game loop bruh///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ps = 1;
systems[ps].players[0].ship.setorbit(systems[ps].planets[3],1000,3,-1);
function update() {
	if (time%30==0){ console.log(time+" EarfX "+Math.floor(systems[ps].planets[3].x)+" EarfY "+Math.floor(systems[ps].planets[3].y)+" P0X "+Math.floor(systems[ps].players[0].ship.x)+" P0Y "+Math.floor(systems[ps].players[0].ship.y)+" P0HP "+systems[ps].players[0].ship.hp+" P0Shield "+systems[ps].players[0].ship.shield+" P0Bling "+systems[ps].players[0].money); }
	time = time + 1;
	
//Outpost stuff all handled here.....
	var i=0;
	while (i<systems[ps].outposts.length){ //for all outposts
		var j=0;
		while (j<systems[ps].players.length){
			if (systems[ps].players[j].ship.distance(systems[ps].outposts[i])<160){
				systems[ps].outposts[i].dock(systems[ps].players[j].ship);
				systems[ps].players[j].dockstate = i;
				}
			j++;
			}
		//var j= 0;
		//while (j<systems[ps].shops[i].missions.length){//for all missions (j) from shop at outpost (i)
		//	var mischeck = systems[ps].shops[i].missions[j].check(systems[ps].ships,systems[ps].planets,playerradio);//theships,theplanets,theradio
		//	if (mischeck[0]>0){
		//		myplayer.money = myplayer.money + mischeck[0];
		//		if (mischeck[1]>0){myplayer.storystate = mischeck[1];}
		//		}
		//	j=j+1;
		//	}
		i=i+1;
		}

	//var tempthing = systems[ps].nextjob();
	//myplayer.job = tempthing[0];
	//myplayer.jobs = tempthing[1];
////////////////////////waldo stuff, special planet/maybe wormhole////////////////////////////
	//if (myship.distance(waldo)>10000){
	//	waldo.s = 100000000000000000 / (myship.distance(waldo)*myship.distance(waldo)*myship.distance(waldo));// hz * hz / dist * dist
	//	}
	//else {waldo.s = 10000;}
	//waldo.m = waldo.s*waldo.s*waldo.s;//Update mass according to size
	//waldo.gravitate(myship); //pull only player ship
	//waldo.c = randcolor(); //groovy
	systems[ps].planets[0].gravitate(waldo);//waldo orbits sun, nothing else affects it.
	waldo.update1();
	//waldo.drawplanet(vwx,vwy);
	//if (waldo.collide(myship)){
	//	ps = ps+1;
	//	if (ps > systems.length-1){
	//		ps = 1;
	//		}
	//	pz = 0;
	//	var randdir = Math.random()*2*Math.PI;
	//	xxxx.setorbit(systems[ps].planets[0], 320000, randdir+Math.PI, -1);
	//	waldo.setorbit(systems[ps].planets[0], 320000, randdir, -1);
	//	myship.vx = 0;
	//	myship.vy = 0;
	//	myplayer.navtarget = 0;
	//	}
	//Size should be inversely related to the distance from event horizon

///////////////////Drawing and updating/////////////////////////////////////////////////////////////////////////////////////
	//systems[ps].draw2(vwx,vwy); //draws home system planets, ships, and bot bombs if close
	systems[ps].updateall(); //Updates everthing in system
	systems[ps].gravitateall(); //gravitates everything in system
	systems[ps].collideself(); //executes all collisions between objects in the system.
////////////collisions/////////////////////////////////////////////////////
///////Respawn handling////////////////////////////////////////////////////////////////////////////////////////////
	j = 0;//bot and old player respawn
	while (j<systems[ps].ships.length){
		if ((systems[ps].ships[j].deadtime < 0) && (systems[ps].ships[j].hp == -1000)){ //Death is handled in the update1
			systems[ps].ships[j].respawn(systems[ps].planets[systems[ps].ships[j].parentid]); 
			}
		j++;
		}
	j = 0;//new player array respawn
	while (j<systems[ps].players.length){
		if ((systems[ps].players[j].ship.deadtime < 0) && (systems[ps].players[j].ship.hp == -1000)){ //Death is handled in the update1
			systems[ps].players[j].ship.respawn(systems[ps].planets[systems[ps].players[j].ship.parentid]); 
			}
		j++;
		}
////////////Autopilot behavior section//Formerly AI section, AI behavior moved to System.updateall()/////////////////////////////////////////////
	var i = 0;
	while(i<systems[ps].players.length){
		var myplayer = systems[ps].players[i];
		if (myplayer.autopilot == 1){
			if (myplayer.navactive==1){myship.seek3(systems[ps].planets[myplayer.navtarget],20,30,time, 1500);}
			if (myplayer.navactive==2){myship.seek3(systems[ps].outposts[myplayer.navtarget],20,30,time, 1500);}
			}
		if (myplayer.autopilot == 2){
			myship.hold(systems[ps].planets[myplayer.navtarget],20,time);
			}
		if (myplayer.autopilot == 3){
			var orbitr = 1000;
			var gravy = systems[ps].planets[myplayer.navtarget].m*.0003 / (orbitr*orbitr);  //gMm/r^2, where m is 1;
			var orbitspeed = Math.sqrt(gravy*orbitr);  //a = v^2/r, a* r = v^2, v = sqrt(a*r)
			myship.seek4(systems[ps].planets[myplayer.navtarget],20,time,orbitr,orbitspeed);
			}
		i++;
		}
//Targeting HUD code in hud.js////////////////////////////////////////////////////////////////////////////////////////////////
	//hud(0);//0 is the player index.  Since this is the single player code it's 0, the only player in the array.
//////////////////////////////////Weapon 6 in-loop code, its special like that////////////////////////////////////////////////////////////////////////////////////
var q = 0;
while (q<systems[ps].players.length){
	var myplayer = systems[ps].players[q];
	var myship = systems[ps].players[q].ship;
	if((myplayer.mousestate==1)&&(myplayer.wep == 6)&&(myplayer.energy>2)){ 
		myplayer.energy = myplayer.energy - 2;
		var i = systems[ps].ships.length;
		while (i>0){//For all ships except 0
			i = i - 1; 
			if (myship.distance(systems[ps].ships[i])<range){
				var ptest = pointingat( myship.directionof(systems[ps].ships[i]), myship.d, myship.distance(systems[ps].ships[i]), systems[ps].ships[i].s)
				if (ptest == 1){
					systems[ps].ships[i].damage(5);
					if (systems[ps].ships[i].hp<0){
						if (systems[ps].ships[i].ai=="enemy"){
							var getcash = Math.floor(Math.random()*21+10)*systems[ps].ships[i].level;
							myplayer.money = myplayer.money + getcash;
							myplayer.gotmoney = [30,getcash];
							//cashsound1.play();
							var boomstages = Math.floor(4+systems[ps].ships[i].level/2);
							systems[ps].explosions.push(new Bubblesplosion(boomstages,0.375,"red",systems[ps].ships[i]));
							systems[ps].bling.push(new Bling(systems[ps].ships[i].x,systems[ps].ships[i].y,systems[ps].ships[i].vx,systems[ps].ships[i].vy,systems[ps].ships[i].level*5));
						}else if (systems[ps].ships[i].ai=="trader"){
							systems[ps].explosions.push(new Bubblesplosion(4,0.375,"red",systems[ps].ships[i]));
							myplayer.money = myplayer.money - 1000;
							myplayer.gotmoney = [30, -1000];
							//somebadsound.play();
							}
						}
					}
				}
			}
		}

//////////////////////////////////Weapon 8 in-loop code, its special like that////////////////////////////////////////////////////////////////////////////////////
	if((myplayer.mousestate==1)&&(time%4==0)&&(myplayer.wep == 8)&&(myplayer.energy>6)){ //mousestate is always evaluating true, so it fires constantly.  oof, why?
		var n = Math.floor(time/4)%6;
		myship.launchbomb(myplayer.blasters[myplayer.wep].bombs[n],myplayer.blasters[myplayer.wep].speed,myplayer.blasters[myplayer.wep].timer);
		myplayer.energy = myplayer.energy - 6;
		if (time%24==0){blastersound8.play();}
	}
///////weapon 10 in-loop code, probe is special//////////////////////////////////////////////////
	if (myplayer.wep==0){//wep == 11 to disable, wep should ==0
		var j = systems[ps].ships.length;
		while (j>1){ //for all ships...
			j=j-1;
			if (myplayer.blasters[0].bombs[0].collide(systems[ps].ships[j])){//Checks for collision only
				if (myplayer.probemode == 0){//clones color
					myship.c = systems[ps].ships[j].c;
					myship.c2 = systems[ps].ships[j].c2;
				}else if (myplayer.probemode == 1){//clones shape
					myship.polytheta = systems[ps].ships[j].polytheta;//Applies enemy polygon to player
					myship.polyradius = systems[ps].ships[j].polyradius;
				}else if (myplayer.probemode == 2){
					//do more cool stuff			
					}
				}
			}
		}
	q++;
	}
//////////////////////////Bling regeneration stuff goes here///////////////////////
if ((systems[ps].bling.length<256)&&(time%16==0)){
	systems[ps].bling.push(new Bling(0,0,0,0,Math.floor(Math.random()*128)));
	systems[ps].bling[systems[ps].bling.length-1].reset(systems[ps].planets);
	}
var i=0;
while(i<systems[ps].bling.length){
	if(systems[ps].bling[i].t>20000){systems[ps].bling[i].reset(systems[ps].planets);}
	i++;
	}
//storycheck(0);//0 is player index
}//end update function