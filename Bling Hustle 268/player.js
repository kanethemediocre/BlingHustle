class Player{
    constructor(){
        this.ship = new Umo(0,0,32,"tan");
        this.blasters = [];//figure that out better
        this.input = "";
        this.money = 100;
        this.name = "-";
        this.upgrades = []; //also figure that out better
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
        this.thruster = 100;
        this.gotmoney = [0,0]; //For animation, [$ amount, frames left in animation]
        //this.drawdistance = Math.sqrt(canvas.width*canvas.width/4+canvas.height*canvas.height/4)+200;
        //this.mdx = 0; //I think these were for the mouse?  Not sure if used.
        //this.mdy = 0;
        this.a1 = 0; //armor upgrades
        this.s1 = 0; //Shield upgrades
        this.wep = 1; //Currently selected weapon
        //var moused = 0; //Direction currently indicated by mouse
        //var mousedistance = 0; // Distance to mouse cursor
        this.mousestate = 0; //describes state of mouse buttons
        this.shop = 0; //O indicates not shopping, 1 indicates a shop, 2 might indicate a different shop....
        this.shopitem = 0; //Indicates item selected in the shop.
        this.storystate = -1;//Player progress in story missions
        this.dockstate = -1; //Player dock status, 0 is undocked, 1 is docked at station 1, etc...
        this.shipsinrange = [];//To help guide what ships are targetable by the player, I'm generating a short list / shallow copy of nearby ships.
        this.radarrange = 4000;//Defines distance a ship can be from the player and still be targetable
        //var closestdistance = 999999;//needs to be larger than radarrange 
        //var closestindex = 0; //defaults to self-targeting if no ships in range
        this.storytime = 0;//timestamp of last story event
        //this.storymessages = loadstorymessages();//storytext.js
        this.task = "Read the tutorial"; //main story mission line
        this.job = "None"; //latest task from a station.
        this.jobs = [];
        this.boosters = [0,16,0,0,0];//0 booster selected (boosters[0]==0), 0 tier 1 boosters in inventory (boosters[1]==0), etc.
        //var diagnostic = 1; //0 is not displayed, 1 is weapon stats, 2 is cargo stats, 3 is ship stats.  Might get used for other items.
        this.shopmode = 0; //0 is buy menu, 1 is sell menu, 2 is mission menu
        //var cheatmode = 0; //0 = not a cheater
        this.ps = 1; //Player System.  Had to be abbreviated, systems[ps] is an important keyword
        this.probemode = 0; //Available modes determined by xtier.  Behavior hardcoded in game loop.
        //var starmode = 1; //0 for no starfield.
        //let testfield = new Starfield(30000,20000,64,1000,4000,32);
        //var pz = 0;
        this.autopilot = 0; //0 is off, higher numbers are other modes
        //var menuabout = false;
        //var menucontrols = false;
    }
    loadblasters(theblasters){
        var i=0;
        while(i<theblasters.length){
            this.blasters.push(baseblastercopy(theblasters[i]));
            i++;
        }
    }
    update1(theplanets){
        if (this.energy<100){ this.energy++; }
        else {this.energy = 100;}
        if (this.thruster<100){ this.thruster++; }
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
}
var testplayer = new Player();
