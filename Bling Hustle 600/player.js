class Player{
    constructor(){
        this.ship = new Umo(0,0,32,"tan");
		this.jobtarget = new Umo (0,0,100,"orange");
		this.storytarget = new Umo (0,0,100,"teal");
        this.blasters = [];//figure that out better
        this.input = "";
        this.money = 100;
        this.name = "-";
        this.upgrades = freshupgrades(); //
        this.inventory = new Inventory(10); //for cargo?
        this.emtrees = [bhstarttree()];
		this.deadtree = bhdeademtree();
		this.notifications = [];//Notifications are things that will be flashed at the player in the middle of their screen.
        this.emg = 0;//emtree
        this.emh = 0;//emodule
        this.emi = 0;//quizblock
        this.emj = 0;//quiz
        this.emk = 0;//challenge
        this.thrustmultiplier = 1; //Adjusts thruster sensitivity
        this.navtarget = 0; // Compass points to planets[navtarget]
        this.navactive = 1; //nav computer starts off, 1 is planetary, 2 is for stations
        this.shiptarget = 1; // Targets ships[1] 
        this.nmeactive = 1;
        this.mapactive = 2; //2 is corner map, 1 is full map, 0 is no map
		this.planetmenu = 0; //1 is active.  Uses int to support more options as needed.
        this.mapscale = 128; //Map zoom
		this.opaquemap = false;
        this.journalactive = 0; //0 is inactive, 1 is story journal, 2 displays active jobs.
        this.journalitem = 0; //Used to use shopitem, now it has it's own variable.
        this.energy = 100;
		this.energyregen = 0.5;
		this.maxenergy = 100;
        this.thruster = 100;
		this.maxthruster = 100;
		this.thrustregen = 1;
		this.sensor = 0;
		this.thrustmode = false;//For mobile support, switch between click to shoot and click to thrust.
        this.gotmoney = [0,0]; //For animation, [$ amount, frames left in animation]
        this.wep = 1; //Currently selected weapon
        this.moused = 0; //Direction currently indicated by mouse
        this.mousedistance = 0; // Distance to mouse cursor
        this.mousestate = 0; //describes state of mouse buttons
        this.shop = 0; //O indicates not shopping, 1 indicates a shop, 2 might indicate a different shop....
        this.shopitem = 0; //Indicates item selected in the shop.
        this.storystate = -1;//Player progress in story missions
        this.dockstate = -1; //Player dock status, 0 is undocked, 1 is docked at station 1, etc...
        this.shipsinrange = [];//To help guide what ships are targetable by the player, I'm generating a short list / shallow copy of nearby ships.
        this.radarrange = 4000;//Defines distance a ship can be from the player and still be targetable
        this.storytime = 0;//timestamp of last story event
		this.storywarn = 0;
		this.storyreturn = 0;
		this.dialogstate = 0;
        this.task = "Read the tutorial"; //main story mission line
        this.job = "None"; //latest task from a station.
        this.jobs = [];
		this.jobitem = 0;
        this.boosters = [0,16,0,0,0];//0 booster selected (boosters[0]==0), 0 tier 1 boosters in inventory (boosters[1]==0), etc.
        this.shopmode = 0; //0 is buy menu, 1 is sell menu, 2 is mission menu
        this.ps = 1; //Player System.  Had to be abbreviated, systems[ps] is an important keyword.  Not sure if I need this.
        this.probemode = 0; //Available modes determined by xtier.  Behavior hardcoded in game loop.
        this.autopilot = 0; //0 is off, higher numbers are other modes
		this.storyselect = 0;
		this.solarpain = 0;
		this.shieldbonus = "none";
		this.planetarychart = [];//Must be filled by current system
		this.emenu = 0; //0 off, 1 at tree level, 2 at mod level, 3 at block level, 4 at quiz level, 5 at challenge level
		this.answer = "";
		this.deaths = 0;
		this.targetlock = -1;
		this.alive = true;
		this.deadtime = -1; //Timer is set to this.respawntime on death.  Values>0 indicate player is dead.
		this.respawntime = 1500; //number of frames delay between death and respawn
		this.respawning = false;
		this.vkactive = true; //virtual keys state
		this.vkvisible = true;
		this.mouseyoffset = 0;
		this.mousexoffset = 0;
		this.nowarp = false;
		this.options = 0;
		this.transparentmenus = false;
		this.transparentui = true;
    }
	initialize(hp,shield,thrustmultiplier){
		this.ship.hp=hp;
		this.ship.maxhp=hp;
		this.ship.shield=shield;
		this.ship.maxshield=shield;
		this.thrustmultiplier=thrustmultiplier;
		this.blasters = bhblasters();
        this.upgrades = freshupgrades(); //
        this.inventory = new Inventory(10); //for cargo?
		var i = 0;
		while (i<this.blasters.length){
			this.blasters[i].origin = this.ship;
			var j=0;
			while(j<this.blasters[i].bombs.length){
				this.blasters[i].bombs[j].user = 0;//Not OK for multiplayer.
				j++;
				}
			i++;
			}
		//this.blasters = [baseblastercopy(allblasters[0]),baseblastercopy(allblasters[1]),baseblastercopy(allblasters[2]),baseblastercopy(allblasters[3]),baseblastercopy(allblasters[4]),baseblastercopy(allblasters[5]),baseblastercopy(allblasters[6]),baseblastercopy(allblasters[7]),baseblastercopy(allblasters[8]),baseblastercopy(allblasters[9])];
		//the baseblastercopy function comes from blasters.js, after blaster class definition and bh weapons instance definition.
		//this.blasters[1].phas = true;
		this.ship.c = randcolor();
		this.ship.c2 = randcolor();
		var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
		var randomplayerverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
		normalizepoly(randomplayerverts); //Makes the ship have at least 2 vertices at maximum radius (1).
		this.ship.polytheta = randomplayerverts[0];//Assigns randomized polygon
		this.ship.polyradius = randomplayerverts[1]; //to player1 ship
		this.ship.ai = "player";
		this.ship.parentid = 3; //Really too specific to be here. Maybe part of the passed variables.
		}
	levelcheck(){//Updates member .ship.level
		var installedvalue = 0;
		var i=0;
		while(i<this.blasters.length){
			if (this.blasters[i].phas){
				var blastervalue = this.blasters[i].price*(Math.pow(2,this.blasters[i].level));
				installedvalue = installedvalue + blastervalue;
				}
			i++;
			}
		var i=1;//skip repair
		while(i<this.upgrades.length){
			var upgradevalue = this.upgrades[i].price*(Math.pow(2,this.upgrades[i].tier)-1);
			installedvalue = installedvalue + upgradevalue;
			i++;
			}
		var rawlevel = Math.sqrt(installedvalue) / 20;
		this.ship.level = Math.floor(rawlevel);// shep level = (sqrt installed value) /50  ship level ^2 = (sqrt installed value)^2 / 50^2  = installed value /2500
		var nextlevelvalue = 400*Math.pow(this.ship.level+1,2);  //installed value = ship level ^2 *2500
		var prevlevelvalue = 400*Math.pow(this.ship.level,2);
		var levelupvalue = nextlevelvalue - prevlevelvalue;
		var almostthere = (installedvalue-prevlevelvalue)/levelupvalue;
		return almostthere;
		}
	emodaward(theprize){
		if (theprize[1]=="armor"){
			console.log(theprize[0]+" "+theprize[1]);
			this.ship.maxhp = this.ship.maxhp + theprize[0];
			this.ship.hp = this.ship.maxhp;
		}else if (theprize[1]=="maxshield"){
			console.log(theprize[0]+" "+theprize[1]);
			this.ship.maxshield = this.ship.maxshield + theprize[0];
			this.ship.shield = this.ship.maxshield;
		}else if (theprize[1]=="shieldregen"){
			console.log(theprize[0]+" "+theprize[1]);
			this.ship.shieldregen = this.ship.shieldregen + theprize[0];
			this.ship.shield = this.ship.maxshield;
		}else if (theprize[1]=="energy"){
			this.maxenergy = this.maxenergy + theprize[0];
			this.energy = this.maxenergy;
			console.log(theprize[0]+" "+theprize[1]);
		}else if (theprize[1]=="energyregen"){
			this.energyregen = this.energyregen+theprize[0];
			this.energy = this.maxenergy;
			console.log(theprize[0]+" "+theprize[1]);
		}else if (theprize[1]=="cargo"){
			this.inventory.maxcargo = this.inventory.maxcargo+theprize[0];
			console.log(theprize[0]+" "+theprize[1]);
		}else if (theprize[1]=="radar"){
			this.radarrange = this.radarrange + theprize[0];
			console.log(theprize[0]+" "+theprize[1]);
		}else if (theprize[1]=="thrustenergy"){
			this.maxthruster = this.maxthruster + theprize[0];
			console.log(theprize[0]+" "+theprize[1]);
		}else if (theprize[1]=="thrustregen"){
			this.thrustregen = this.thrustregen + theprize[0];
			console.log(theprize[0]+" "+theprize[1]);
			}
		}
    loadblasters(theblasters){//obselete?
		console.log("obselete function player.loadblasters was executed");
        var i=0;
        while(i<theblasters.length){
            this.blasters.push(baseblastercopy(theblasters[i]));
            i++;
			}
		}
    update1(theplanets){
		//console.log(this.ship.hp);
		//console.log(this.alive);
		if ((this.ship.hp<=0)&&(this.alive==true)){
			this.alive = false;
			this.deadtime = this.respawntime;
			this.ship.x = -1000000;//this keeps getting ignored
			this.ship.damagestate = 0;
			this.ship.shielddamagestate = 0;
			this.deaths++;
			}
		if (this.alive==false){
			//console.log(this.deadtime);
			if (this.deadtime>=0){this.deadtime--;}
			else{
				this.alive = true;
				this.ship.hp = this.ship.maxhp;
				console.log(this.ship.hp);
				this.ship.shield = this.ship.maxshield;
				this.respawning = true; //This flag is needed so that the system object knows when to respawn the player
				this.emenu = 0; //This exits the engineering menu, which is technically "on" for the respawn challenges.
				//respawn location will be handled in system update function
				}
			}
		else{
			if (this.energy<100){ this.energy=this.energy+this.energyregen; }
			else {this.energy = 100;}
			if (this.thruster<100){ this.thruster=this.thruster+this.thrustregen; }
			else {this.thruster = 100;}
			this.ship.updateship(theplanets);//maybe needs planets?
			}
        var i = 0;
        while (i<this.blasters.length){
            this.blasters[i].update1();
            i++;
			}
		var i=0;
		while(i<this.notifications.length){
			var nx = canvas.width/2-this.notifications[i].text.length*5;
			var ny = canvas.height/2-32-i*32;
			this.notifications[i].display(nx,ny);
			if (time-this.notifications[i].starttime>this.howlong){
				console.log("need to delete notification "+i+" "+this.notifications[i].text);
				//remove this expired notification
				}
			i++;
			}
		}
    drawship(viewx,viewy){
        this.ship.drawship(viewx,viewy);
		}
    drawbombs(viewx,viewy){//Filter by proximity
        var xtol = 2000; //Edge cases may be a problem for this, like if I use a massive screen resolution or the explosion has a massive radius
        var ytol = 2000;
        var i=0;
        while(i<this.blasters.length){
            var j=0;
            while(j<this.blasters[i].bombs.length){
                //act on this.blasters[i].bombs[j]
                var dx = Math.abs(viewx-this.blasters[i].bombs[j].x);
                var dy = Math.abs(viewy-this.blasters[i].bombs[j].y);
                if ((dx<xtol)&&(dy<ytol)){
                    this.blasters[i].bombs[j].drawbomb(viewx,viewy);
                    }
                    j++;
                }
                i++;
            }
        }
    savecharacter(){//returns a string with all saved character data
        var savestring = "";
        savestring = savestring+"name "+this.ship.name+" money "+this.money+" storystate "+this.storystate+" storytime "+this.storytime+" color1 "+this.ship.c+" color2 "+this.ship.c2+" ";
        console.log(savestring);
		return savestring;
        }
    saveblasters(){
        var savestring = "";
        var i=0;
        while(i<this.blasters.length){//saves blaster data
            savestring=savestring+" b"+i+" "+this.blasters[i].savetierstring();
            i++;
            }
		savestring = savestring + " ";
		console.log(savestring);
        return savestring;
        }
    saveupgrades(){
        var upgradestring = "";
		var i=0;
		while(i<this.upgrades.length){
			upgradestring=upgradestring+this.upgrades[i].tier+" ";
			i++;
			}
		console.log(upgradestring);
        return upgradestring;
		}
	savepolygon(){
		var polygonstring = "";
		var i = 0;
		while (i<this.ship.polytheta.length){
			var morestuff = this.ship.polytheta[i] + " " + this.ship.polyradius[i] + " ";
			polygonstring = polygonstring + morestuff;
			i++;
			}
		polygonstring = polygonstring + " END ";
		return polygonstring;
		}
	
    loadcharacter(playerstring){
		console.log(playerstring);
		var i = 0;
		var lastword = "";
		var values = [];
		while(i<playerstring.length){//This loop parses the string into space separated words
			var thechar = playerstring[i];
			if (thechar!=" "){
				lastword=lastword+thechar;
				}
			else {
				values.push(lastword)
				lastword = "";
				}
			i++;
			}
        if (values[0]!="name"){console.log("Format error on index 0");}
        this.ship.name = values[1];
        if (values[2]!="money"){console.log("Format error on index 2");}
        this.money = parseInt(values[3]);
        if (values[4]!="storystate"){console.log("Format error on index 4");}
        this.storystate = parseInt(values[5]);      
        if (values[6]!="storytime"){console.log("Format error on index 6");}//In hindsight, not actually the variable we want to pass.
        this.storytime = time;//parseInt(values[7]);  //This is overridden to prevent errors between game modes.//global scope used here;
        if (values[8]!="color1"){console.log("Format error on index 8");}
        this.ship.c = values[9];
        if (values[10]!="color2"){console.log("Format error on index 10");}
        this.ship.c2 = values[11];
        }
    loadblastertiers(blasterstring){
		this.blasters = bhblasters();
        var i=0; //blaster index
        var j = 3; //string index
        var bstart = 0; //blaster string start index;
        var bend = 0; //blaster string end index
        while (i<10){//this.blasters.length){//Normally 10.  
            var ablaster = blasterstring.slice(j,j+18);//blasterstring slice magic goes here
            this.blasters[i].loadtierstring(ablaster);
            j=j+21;
            i++;
            }   
		j++;
		while (i<this.blasters.length){//20 blasters last count.  		
            var ablaster = blasterstring.slice(j,j+18);//blasterstring slice magic goes here
            this.blasters[i].loadtierstring(ablaster);
            j=j+22;
            i++;
            }   
        }
    loadupgrades(upgradestring){
		console.log(this.upgrades[2].tier);//Reduce this nonsense.  Sense wasn't working at first.
		this.upgrades = freshupgrades();
		console.log(this.upgrades[2].tier);
		var ug = freshupgrades();
		console.log(ug[2].tier);
		this.upgrades = ug;
		console.log(this.upgrades[2].tier);
		//this.upgrades = freshupgrades();
		//console.log(this.upgrades);
		//this.upgrades = ug;
		//console.log(this.upgrades);
        var i = 0;
        var lastword = "";
        var values = [];
        while(i<upgradestring.length){//This loop parses the string into space separated words
            var thechar = upgradestring[i];
            if (thechar!=" "){
                lastword=lastword+thechar;
                }
            else {
                values.push(lastword)
                lastword = "";
                }
            i++;
            }
         var i=0;
         while(i<values.length){
             var j=0;
             while(j<values[i]){
                 this.upgrades[i].apply(this);////hhhhhhhhhhwwwwwwwwat
                 j++;
                 }
             i++;
             }
        }
	loadpolygon(polygonstring){
		var i = 0;
        var lastword = "";
        var values = [];
        while(i<polygonstring.length){//This loop parses the string into space separated words
            var thechar = polygonstring[i];
            if (thechar!=" "){
                lastword=lastword+thechar;
                }
            else {
                values.push(lastword)
                lastword = "";
                }
            i++;
            }
		var i=0;
		var pt = [];
		var pr = [];
		while (i<values.length){
			if (values[i] == "END"){//This allows the function to accept oversnipped data
				i = values.length;
				}
			else{
				if (i%2==0){pt.push(parseFloat(values[i]));}
				if (i%2==1){pr.push(parseFloat(values[i]));}
				i++;
				}
			}
		this.ship.polyradius = pr;
		this.ship.polytheta = pt;
		}
	
	cyclewep(n){
		if (n>0){
			var newwep = (this.wep + n)%this.blasters.length;//+n blasters, rolling over.  % instead of subtraction prevents errors from unreasonable values of n.
			while (this.blasters[newwep].phas==false){//All else fails try wep = wep - 1 until it works.
				newwep++;
				if (newwep>this.blasters.length-1){newwep = 0;}
				}
			this.wep = newwep
			}
		else {
			var newwep = (this.wep + n);//+n blasters, where n is negative...
			while (newwep<0){ newwep = newwep + this.blasters.length; } //Similar to how modulus operator was used, but modulus is weird with negative numbers to I did this.
			while (this.blasters[newwep].phas==false){
				newwep--;
				if (newwep<0){newwep = this.blasters.length-1;}
				}
			this.wep = newwep
			}
		}
    }
var testplayer = new Player();

