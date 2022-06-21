class Player{
    constructor(){
        this.ship = new Umo(0,0,32,"tan");
		this.jobtarget = new Umo (0,0,100,"orange");
		this.storytarget = new Umo (0,0,100,"teal");
        this.blasters = [];//figure that out better
        this.input = "";
        this.money = 100;
        this.name = "-";
        this.upgrades = freshupgrades(); //also figure that out better
        this.inventory = new Inventory(10); //for cargo?
        this.thrustmultiplier = 1; //Adjusts thruster sensitivity
        this.navtarget = 0; // Compass points to planets[navtarget]
        this.navactive = 1; //nav computer starts off, 1 is planetary, 2 is for stations
        this.shiptarget = 1; // Targets ships[1] 
        this.nmeactive = 1;
        this.mapactive = 2; //2 is corner map, 1 is full map, 0 is no map
        this.mapscale = 128; //Map zoom
        this.journalactive = 0; //0 is inactive, 1 is story journal, 2 displays active jobs.
        this.journalitem = 0; //Used to use shopitem, now it has it's own variable.
        this.energy = 100;
		this.energyregen = 0.5;
        this.thruster = 100;
		this.thrustregen = 1;
		this.thrustmode = false;
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
    }
	initialize(hp,shield,thrustmultiplier){
		this.ship.hp=hp;
		this.ship.maxhp=hp;
		this.ship.shield=shield;
		this.ship.maxshield=shield;
		this.thrustmultiplier=thrustmultiplier;
		this.blasters = bhblasters();
		var i = 0;
		while (i<this.blasters.length){
			this.blasters[i].origin = this;
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
    loadblasters(theblasters){
        var i=0;
        while(i<theblasters.length){
            this.blasters.push(baseblastercopy(theblasters[i]));
            i++;
			}
		}
    update1(theplanets){
        if (this.energy<100){ this.energy=this.energy+this.energyregen; }
        else {this.energy = 100;}
        if (this.thruster<100){ this.thruster=this.thruster+this.thrustregen; }
        else {this.thruster = 100;}
        this.ship.updateship(theplanets);//maybe needs planets?
        var i = 0;
        while (i<this.blasters.length){
            this.blasters[i].update1();
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
        savestring = savestring+"name "+this.ship.name+" money "+this.money+" storystate "+this.storystate+" storytime "+this.storytime;
        return savestring;
        }
    saveblasters(){
        var savestring = "";
        var i=0;
        while(i<this.blasters.length){//saves blaster data
            savestring=savestring+" b"+i+" "+this.blasters[i].savetierstring();
            i++;
            }
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
    loadcharacter(playerstring){
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
        if (values[6]!="storytime"){console.log("Format error on index 6");}
        this.storytime = 0;// parseInt(values[7]);      
        }
    loadblastertiers(blasterstring){
        var i=0; //blaster index
        var j = 3; //string index
        var bstart = 0; //blaster string start index;
        var bend = 0; //blaster string end index
        while (i<this.blasters.length){//Normally 10.  
            var ablaster = blasterstring.slice(j,j+18);//blasterstring slice magic goes here
            this.blasters[i].loadtierstring(ablaster);
            j=j+21;
            i++;
            }     
        }
    loadupgrades(upgradestring){
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
                 this.upgrades[i].apply(this);
                 j++;
                 }
             i++;
             }
        }

    }
var testplayer = new Player();

