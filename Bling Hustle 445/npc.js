//added test npc in index
//added npc ship and bomb draw functionality to system.draw2
//added update1 call to system.updateall and added time to updateall references
//added gravity functionality to system.gravitateall
//added npc on planet collisions to system.collideself
//other npc collisions added to system.collideself

class NPC{
	constructor(npcid){
		//this.behavenow = "none";//Describes AI behavior state in terms of immediate response
		//options: "gotoplanet","gotoship","gotoplayer","gotostation","attackship","attackplayer","loiter"
		//this.behavior = "none"; //Describes overall motivation to choose different behavenows and targets
		this.id = npcid;
		this.umotype = "ship"; //options bigship, planet, station
		this.ship = new Umo(0,0,32,randcolor());
		this.blasters = [baseblastercopy(allblasters[0])];//allblasters is defined in bhblasters.js
		this.planetarylocation = -1; //Indexes for npcs that are tied to a planet umo
		this.stationlocation = -1; //Indexes for npcs that are tied to a station umo
		//options: "cargoroute","loiter","attackmission","blockade", 
		this.team = "enemy";//More detail on that later, each team will have different behavior towards other teams.
		this.nowtargetplanet = 0;
		this.alltargetplanets = [];
		this.alltargetships = [];
		this.alltargetplayers = [];
		this.nowtargetship = 0;
		this.homeplanet = 0;
		this.homestation = 0;
		this.gang = 0;
		this.ai = new NPCAI(0,"none",this.homeplanet,npcid);
		this.deadtime=-1;
		}
	whatisnear(thesystem,threshhold){
		var nearbyplanets = [];
		var nearbynpcs = [];
		var nearbyplayers = [];
		var i=0;
		while(i<thesystem.npcs.length){
			if (this.ship.distance(thesystem.npcs[i].ship)<threshhold){nearbynpcs.push(i);}
			i++;
			}
		var i=0;
		while(i<thesystem.planets.length){
			if (this.ship.distance(thesystem.planets[i])<threshhold){nearbyplanets.push(i);}
			//check and add
			i++;
			}
		var i=0;
		while(i<thesystem.players.length){
			if (this.ship.distance(thesystem.players[i].ship)<threshhold){nearbyplayers.push(i);}
			//check and add
			i++;
			}
		this.ai.nearbynpcs = nearbynpcs;
		this.ai.nearbyplanets = nearbyplanets;
		this.ai.nearbyplayers = nearbyplayers;
		}
	update1(thesystem,time){
		if (this.deadtime>0){ this.deadtime--; }
		else {
			//this.ship.update1();
			this.ship.updateship(thesystem.planets);
			if (time%15==0){this.ai.ponder(thesystem);}
			if (this.ship.hp!=-1000){this.ai.behave(thesystem,time);}
			this.blasters[0].update1();
			}
		}
	setguardbot(homeindex,hometype,myteam,enemyteams){
		this.ai.enemyteams = enemyteams;
		this.ai.behavior = "guardbot";
		this.ai.team = myteam;
		if (enemyteams.includes("player")){this.ai.playerhostile = true;}
		if (this.hometype == "planet"){
			this.ai.homeplanet = homeindex;
			}
		else if (this.hometype == "station"){
			this.ai.homestation = homeindex;
			}
		}
	//this.npcs[i].drawbombs(viewx,viewy)
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
