class NPCAI{
	constructor(myteam,mybehavior,myparent,myid){
		this.behavenow = "none";//Describes AI behavior state in terms of immediate response
		//options: "gotoplanet","gotoship","gotoplayer","gotostation","attackship","attackplayer","loiter"
		this.behavior = "none"; //Describes overall motivation to choose different behavenows and targets
		//options: "cargoroute","loiter","attackmission","blockade", 
		this.team = 0;
		this.nearbynpcs=[];
		this.nearbyplanets=[];
		this.id = myid;
		this.enemyteams = [];
		this.friendlyteams =[];
		this.nowtargetplanet = 0;
		this.alltargetplanets = [];
		this.alltargetships = [];
		this.alltargetplayers = [];
		this.nowtargetship = 0;
		this.homeplanet = 0;
		this.homestation = 0;
		this.gang = 0;
		this.route = [];
		this.routei = 0;
		this.navslop = 512;
		this.attacksfirst = true;
		this.followattackers = false;
		this.fleeattackers = false;
		this.playerhostile = true;
		this.traderhostile = true;
		this.coward = 1; //Will run away from matchup where the enemy level * this.coward  > npc level
		this.ai = "na";
		}
	setfixedbehavior(newbehavenow,newteam,newhomeplanet,newteam,newgang){
		this.behavenow = newbehavenow;
		this.behavior = "fixed";
		this.team = newteam;
		this.gang = newgang;
		this.nowtargetplanet = newhomeplanet;
		this.homeplanet = newhomeplanet;
		}
	behave(thesystem){
		if (this.behavenow == "gotoinert"){
			thesystem.npcs[this.id].ship.seek3(thesystem.planets[this.nowtargetplanet]);
			if (thesystem.npcs[this.id].ship.distance(thesystem.planets[this.nowtargetplanet])>(this.navslop+thesystem.planets[this.nowtargetplanet].s)){
				this.routei++;
				if (this.routei>this.route.length){ this.routei=0; }
				this.nowtargetplanet = this.route[this.routei];
				}
			//basic autopilotoid 
			}
		if (this.behavenow == "trackattack"){
			var thetargetdistance = this.ship.distance(thesystem.npcs[this.nowtargetship].ship);
			if (thetargetdistance < 5000){ //Don't do anything if player is far
				this.ship.fasttrack(thesystem.npcs[this.nowtargetship].ship);//point at target ship
				if ((Math.random()>0.95) && (this.botbombs[i].timer < 1)){  //Bots fire occasionally, if bomb isn't out
					this.ships[i].launchbomb(this.botbombs[i], 12, 80);
					}
				}


			//basic point at and shoot sometimes
			}
		if (this.behavenow == "leadattack"){
			//aim better than basic track
			}
		if (this.behavenow == "gototrackattack"){
			//basic autopilotoid 
			//basic point at and shoot sometimes
			}	
		}
	ponder(thesystem){
		if (this.behavior == "fixed"){}//nothing
		else if (this.behavior == "inertpatrol"){}//check if near current target planet, if so cycle target planet
		else if (this.behavior == "soldier"){}//check for nearby enemies, select best target
		else if (this.behavior == "assassin"){}//Goto or attack target
		//Adjust this.behavenow according to this.behavior
		}
	setuptrader(newroute,howclose){}
}
testai = new NPCAI("tradeguild","trader",systems[1].planets[3])
