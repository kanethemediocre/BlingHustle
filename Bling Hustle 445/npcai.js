class NPCAI{
	constructor(myteam,mybehavior,myparent,myid){
		this.behavenow = "none";//Describes AI behavior state in terms of immediate response
		//options: "gotoplanet","gotoship","gotoplayer","gotostation","attackship","attackplayer","loiter"
		this.behavior = "none"; //Describes overall motivation to choose different behavenows and targets
		//options: "cargoroute","loiter","attackmission","blockade", 
		this.team = 0;
		this.nearbynpcs=[];
		this.nearbyplanets=[];
		this.nearbyplayers = [];
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
		this.hardtether = 10000;
		this.softtether = 2000;
		this.attacksfirst = true;
		this.followattackers = false;
		this.fleeattackers = false;
		this.playerhostile = true;
		this.traderhostile = true;
		this.coward = 1; //Will run away from matchup where the enemy level * this.coward  > npc level
		this.aitype = "na";
		}
	setfixedbehavior(newbehavenow,newhomeplanet,newteam,newgang){
		this.behavenow = newbehavenow;
		this.behavior = "fixed";
		this.team = newteam;
		this.gang = newgang;
		this.nowtargetplanet = newhomeplanet;
		this.homeplanet = newhomeplanet;
		}
	checkrelations(thenpc){//returns +1 for friendly, -1 for enemy, 0 for neutral
		var relationship = 0;
		var i=0;
		while(i<this.enemyteams){
			if (this.enemyteams[i]==thenpc.ai.team){relationship = -1;}
			i++;
			}
		var i=0;
		while(i<this.friendlyteams){
			if (this.friendlyteams[i]==thenpc.ai.team){relationship = 1;}
			i++;
			}
		return relationship;
		}
	closesttarget(thesystem){
		var closestplayerdistance = 999999;
		var closestplayer = -1;
		var me = thesystem.npcs[this.id];
		me.whatisnear(thesystem,2000);//todo 2000 should be more adaptive
		if (this.playerhostile==true){
			console.log(this.nearbyplayers);
			console.log(this.nearbynpcs);
			console.log(this.nearbyplanets);
			var i=0;
			while (i<this.nearbyplayers.length){
				var playerdistance = thesystem.players[ this.nearbyplayers[i] ].ship.distance(me.ship);
				if (playerdistance<closestplayerdistance){
					closestplayer = this.nearbyplayers[i];
					closestplayerdistance = playerdistance;
					}
				i++;
				}
			}
		var closestnpcdistance = 999999;
		var closestnpc = -1;
		var enemynpcs = this.filterrelations(thesystem,-1);
		var i=0;
		while (i<enemynpcs.length){
			var npcdistance = thesystem.npcs[enemynpcs[i]].ship.distance(me.ship);
			if ((npcdistance<closestnpcdistance)&&(this.id!=enemynpcs[i])){
				closestnpc = enemynpcs[i];
				closestnpcdistance = npcdistance;
				}
			i++;
			}
		if ((closestnpc==-1)&&(closestplayer==-1)){
			return [-1,"none"]
			}
		else if (closestnpcdistance<closestplayerdistance){
			return [closestnpc,"npc"];
			}
		else if (closestnpcdistance>closestplayerdistance){
			if (this.playerhostile){
				return [closestplayer,"player"];
				}
			else if (closestnpc>=0){
				return [closestnpc, "npc"];
				}
			else{
				return [-1,"none"];
				}
			}
		}
	filterrelations(thesystem,relationship){//returns a subset of this.nearbynpcs which have the specified relationship (+1,-1,0)
		var npcsubset = [];
		var i=0;
		while(i<this.nearbynpcs.length){
			var thenpc = thesystem.npcs[this.nearbynpcs[i]];
			var myrelationship = this.checkrelations(thenpc);
			if (myrelationship == relationship){npcsubset.push(thenpc);}
			i++;
			}
		return npcsubset;
		}
	behave(thesystem){//Bots decide and act in the current frame
		if (this.behavenow == "gotoinert"){
			thesystem.npcs[this.id].ship.seek3(thesystem.planets[this.nowtargetplanet]);
			if (thesystem.npcs[this.id].ship.distance(thesystem.planets[this.nowtargetplanet])>(this.navslop+thesystem.planets[this.nowtargetplanet].s)){
				this.routei++;
				if (this.routei>this.route.length){ this.routei=0; }
				this.nowtargetplanet = this.route[this.routei];
				}
			//basic autopilotoid 
			}
		if (this.behavenow == "loiter"){
			var homeplanet = thesystem.planets[this.homeplanet];
			var myship = thesystem.npcs[this.id].ship;
			var homedistance = myship.distance(homeplanet);
			if ((homedistance>this.hardtether)&&(myship.hp>0)){
				myship.respawn(thesystem.planets[this.homeplanet]);
				console.log("respawning at planet "+this.homeplanet)
				}
			else if (homedistance>this.softtether){
				console.log("soft tether to "+this.homeplanet)
				var dv = myship.deltav2(homeplanet);
				var deltav = dv[0];
				var cosdv =  Math.cos(dv[1]-myship.directionof(homeplanet))*dv[0];
				var sindv =  Math.sin(dv[1]-myship.directionof(homeplanet))*dv[0];
				var escape = Math.sqrt(homeplanet.m*2*.0003/homedistance);
				if (cosdv<0){//if moving away from the planet

					}
				else if (cosdv>0){//if moving towards the planet

					}
				if (Math.abs(sindv)>1){//if moving askew to the planet, not sure if thats the right word

					}
				}

			}
		if (this.behavenow == "trackattacknpc"){
			var thetargetdistance = thesystem.npcs[this.id].ship.distance(thesystem.npcs[this.nowtargetship].ship);
			thesystem.npcs[this.id].ship.fasttrack(thesystem.npcs[this.nowtargetship].ship);//point at target ship
			if ((Math.random()>0.95) && (thesystem.npcs[this.id].blasters[0].bombs[0].timer < 1)){  //fire occasionally,
				thesystem.npcs[this.id].blasters[0].fire(thesystem.npcs[this.id],0);//fire(theplayer,thetime){
				console.log("firing");
				}//gambling that i wont give npcs a weapon that actually uses the time value.
			}
		if (this.behavenow == "trackattackplayer"){
			var thetargetdistance = thesystem.npcs[this.id].ship.distance(thesystem.players[this.nowtargetship].ship);
			thesystem.npcs[this.id].ship.fasttrack(thesystem.players[this.nowtargetship].ship);//point at target ship
			if ((Math.random()>0.95) && (thesystem.npcs[this.id].blasters[0].bombs[0].timer < 1)){  //fire occasionally,
				thesystem.npcs[this.id].blasters[0].fire(thesystem.npcs[this.id],0);//fire(theplayer,thetime){
				console.log("firing");
				}//gambling that i wont give npcs a weapon that actually uses the time value.
			}
		if (this.behavenow == "leadattack"){
			//aim better than basic track
			}
		if (this.behavenow == "gototrackattack"){
			//basic autopilotoid 
			//basic point at and shoot sometimes
			}	
		}
	ponder(thesystem){//Bots examine their situation and reevaluate this.behavenow
		if (this.behavior == "fixed"){}//nothing
		else if (this.behavior == "guardbot"){//Look for enemies in range, pick closest one and shoot at it
			console.log(this);
			var me = thesystem.npcs[this.id];
			var myclosesttarget = this.closesttarget(thesystem);//todo 2000 should be more adaptive
			console.log(myclosesttarget);
			if (myclosesttarget[0]>=0){
				console.log("found target "+myclosesttarget[0]+" type "+myclosesttarget[1])
				if (myclosesttarget[1]=="player"){this.behavenow = "trackattackplayer";}
				else {this.behavenow = "trackattacknpc";}
				this.nowtargetship = myclosesttarget[0];
				}
			else {this.behavenow = "loiter";}
			}
		else if (this.behavior == "guardbot2"){//Look for enemies in range, pick closest one and shoot at it
			var me = thesystem.npcs[this.id];
			me.whatisnear(thesystem,2000);//todo 2000 should be more adaptive
			console.log(this.nearbyplayers);
			console.log(this.nearbynpcs);
			console.log(this.nearbyplanets);
			var closestplayerdistance = 999999;
			var closestplayer = -1;
			var i=0;
			while (i<this.nearbyplayers.length){
				var playerdistance = thesystem.players[ this.nearbyplayers[i] ].ship.distance(me.ship);
				if (playerdistance<closestplayerdistance){
					closestplayer = this.nearbyplayers[i];
					closestplayerdistance = playerdistance;
					}

				i++;
				}
			if (closestplayer>=0){
				console.log("found target "+closestplayer)
				this.behavenow = "trackattackplayer";
				this.nowtargetship = closestplayer;
				}
			else {this.behavenow = "loiter";}
			}

		else if (this.behavior == "inertpatrol"){}//check if near current target planet, if so cycle target planet
		else if (this.behavior == "soldier"){}//check for nearby enemies, select best target
		else if (this.behavior == "assassin"){}//Goto or attack target
		//Adjust this.behavenow according to this.behavior
		}
	setuptrader(newroute,howclose){}
}
//testai = new NPCAI("tradeguild","trader",systems[1].planets[3])
