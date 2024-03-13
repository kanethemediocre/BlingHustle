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
		this.blasters = [new Blaster("Bot Multibanger","n has veen set to 1.  Should still be upgradeable.",800,"multiplex",                            
	 8,4,10,8,2,10,0.6,0.2,10,1,1,10,25,5,10,24,"pink","ID not implemented")];
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
		this.alive = true;
		this.respawntime = 2000;
		this.deadtime = -1;
		this.respawning = false;
		this.money = 100;
		}
	drawdebug(viewx, viewy){ //Ships are drawn as polar polygons, a triangle is the default.  Viewx/viewy are camera center
		var x = this.ship.x - viewx + canvas.width/2; //normally camera center being the player ship.
		var y = this.ship.y - viewy + canvas.height/2;
		var prop = this.energy / this.maxhp;
		context.fillStyle = "white";
		context.font='16px Arial';
		context.fillText(this.money,x,y+80);
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
		if ((this.ship.hp<=0)&&(this.alive==true)){
			this.alive = false;
			this.deadtime = this.respawntime;
			var boomstages = Math.floor(4+this.ship.level/2);
			thesystem.explosions.push(new Bubblesplosion(boomstages,0.375,"red",this.ship));
			thesystem.bling.push(new Bling(this.ship.x,this.ship.y,this.ship.vx,this.ship.vy,this.ship.level*5));
			this.ship.x = 100000000;
			//maybe do payout here.
			if (this.ai.attackers.length>0){
				var killer = this.ai.attackers[this.ai.attackers.length-1][0];
				if (killer>=1000000){
					//check for friendly fire
					if (this.ai.playerhostile){//Using playerhostile tag for now.  Will eventually shift to team.
						//award player
						thesystem.players[killer-1000000].money = thesystem.players[killer-1000000].money + this.ship.level*16;
						thesystem.players[killer-1000000].gotmoney = [60,this.ship.level*16];
						//if(!cashsound1.paused) {
							cashsound1.pause();
							cashsound1.currentTime = 0;
							cashsound1.play();
							//console.log("wut");
							//}
						}
					else{
						//punish player
						thesystem.players[killer-1000000].money = thesystem.players[killer-1000000].money - (500+this.ship.level*32) ;
						thesystem.players[killer-1000000].gotmoney = [60, -1*(500+this.ship.level*32)];
						}
					}
				else{
					//check for friendly fire
					console.log(killer);
					if (this.ai.team != thesystem.npcs[killer].ai.team){
						//award npc
						thesystem.npcs[killer].money = thesystem.npcs[killer].money + this.ship.level*5;
						}
					else{
						//punish npc
						thesystem.npcs[killer].money = thesystem.npcs[killer].money - (100+this.ship.level*5);
						}
					}
				}
			}
		if (this.alive==false){
			if (this.deadtime>=0){
				this.deadtime--;
				//console.log(this.deadtime);
				}
			else{
				this.alive = true;//shouldn't do anything, why this here
				this.ship.hp = this.ship.maxhp;
				this.ship.shield = this.ship.maxshield;
				this.respawning = true;
				//respawn location will be handled in system update function
				}
			}
		else {
			//this.ship.update1();
			this.ship.updateship(thesystem.planets);
			//console.log(time)
			if (time%15==1){
				//console.log(time);
				this.ai.ponder(thesystem);
				}
			if (time % 300 == 0){
				this.ai.contemplate(thesystem);
				}
			if (this.alive == true){this.ai.behave(thesystem,time);}
			//this.blasters[0].update1();
			}
		this.blasters[0].update1();
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
