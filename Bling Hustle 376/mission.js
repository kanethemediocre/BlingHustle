 
class Mission{
	constructor(missiontype, morigin, mtarget,mmessage,mreward,mstory){
		this.type = missiontype; //string indicating type of mission, such as "Assassinate", "Defend" or "Cargo"
		this.origin = morigin; //Starting point for a cargo mission, in positive integer planet index
		this.target = mtarget; //Target for mission, positive integer list for ship(s) or planet index.
		this.targetlocationname = "unknown";
		this.message = mmessage; //"Kill that guy", "Take cargo to that planet"
		this.reward = mreward; //How much money you get, 0 indicates mission no longer active
		this.storypath = mstory; //What storystate the mission leads to, 0 for no affect on storystate
		this.danger = 0; //This describes how dangerous the mission is thought to be
		this.distance = 0; //This describes how far the mission is thought to be.
		this.taken = false;
		this.taker = "nobody";
		}
	calcdanger(theships,theplanets){ //Also determines distance and targetlocationname
		if (this.type=="destroy"){
			var targetumo = theships[this.target];
			this.danger = targetumo.level;
			this.targetlocationname = theplanets[theships[this.target].parentid].name;
			}
		else if (this.type=="cargo"){
			var targetumo = theplanets[this.target];
			this.targetlocationname = theplanets[this.target].name;
			}
		else {var targetumo = "none";}
		var i=0;
		while ((i<theships.length)&&(targetumo!="none")){
			if (theships[i].ai== "enemy"){
				if (targetumo.distance(theships[i])<10000){
					this.danger = this.danger + theships[i].level/128;
					if (targetumo.distance(theships[i])<5000){
						this.danger = this.danger + theships[i].level/32;
						if (targetumo.distance(theships[i])<1600){
							this.danger = this.danger + theships[i].level/8;	
							}							
						}
					}
				}
			i++
			}
		this.danger = Math.floor(this.danger);
		if (this.type=="cargo"){this.reward = 500+this.danger*25+this.distance*50;}
		if (this.type=="destroy"){this.reward = 500+this.danger*50+this.distance*25;}
		}
	calcdistance(theships,theplanets,theoutposts){ //WWWWWIIIIIIIIPPPPP
		var rawdistance = 0;
		var startumo = theoutposts[this.origin];//Beginning and end umos established
		var endumo = "";
		if (this.type=="destroy"){
			endumo = theships[this.target];
			}
		else if (this.type=="cargo"){
			endumo = theplanets[this.target];
			}
		var leadplanet = -1;//Searching for leading/trailing planet of station
		var i=1;  //No need to check the sun
		while (i<theplanets.length){//Searching for leading/trailing planet
			if (theplanets[i].parentid==0){//Only planets, not moons
				var dr = Math.abs(theplanets[i].distance(theplanets[0])-startumo.distance(theplanets[0]));
				if (dr<200){//Close enough orbit.  Should be nearly 0.
					leadplanet = i;
					}
				}
			i++;
			}
		var localtarget = false;
		if (this.type=="cargo"){
			if ((this.target==leadplanet)||(theplanets[this.target].parentid==leadplanet)){
				localtarget = true;
				rawdistance = startumo.distance(theplanets[leadplanet]);
				}
			}
		if (this.type=="destroy"){
				if ((theships[this.target].parentid==leadplanet)||(theplanets[theships[this.target].parentid].parentid==leadplanet)){
				localtarget = true;
				rawdistance = startumo.distance(theplanets[leadplanet]);
				}
			}
		if (localtarget == false){
			rawdistance = startumo.distance(theplanets[0])+endumo.distance(theplanets[0])
			}	
		this.distance = Math.floor(rawdistance/5000);
		}
	take(theships,theplanets,theplayer){
		if (this.type=="destroy"){
			console.log("try to respawn bot "+this.target+" at planet "+theships[this.target].parentid);
			theships[this.target].respawn(theplanets[theships[this.target].parentid]);
			this.taken = true;
			this.taker = theplayer.name;
			theplayer.job = this.message;
			theplayer.jobs.push(this.message);
			theplayer.jobtarget.match(theships[this.target]);
			}
		if ((this.type=="cargo")&&(theplayer.inventory.maxcargo-theplayer.inventory.totalcargo()>=10)){
			theplayer.inventory.takecargo(allcargos.length-1,10); //global scope
			this.taken = true;
			this.taker = theplayer.name;
			theplayer.job = this.message;
			theplayer.jobs.push(this.message);
			theplayer.jobtarget.match(theplanets[this.target]);
			}
		
		}
	check(theplayer, theships,theplanets,theradio){ //Determines if mission is complete
		var complete = 0;
		if ((this.taken==true)&&(this.taker==theplayer.name)){ //This evaluates to false when this.taken == true.  Not sure why, but I need to fix it.
			//systems[ps].ships[0].hp = 100;
			if (this.type == "destroy"){ //If the mission is to kill a guy
				if (theships[this.target].hp < 0){complete = 1;} //If the ship is dead, the mission is complete.  Doesnt work yet
				}
			else if (this.type == "cargo"){ //If the mission is to take cargo to a planet.  Works on last test.
				if ((theplanets[this.target].distance(theplayer.ship)<theplanets[this.target].s*2+64) && (theplanets[this.target].deltav(theplayer.ship)<4)){
					theplayer.inventory.givecargo(allcargos.length-1,10);//global scope shame
					complete = 1; //Requires that you get close, and get slow relative to target planet.
					}
				}
			else if (this.type == "courier"){ //If the mission is to take cargo to a ship.  Untested, unused, but updated anyways with theplayers scheme			
				if ((theships[this.target].distance(theplayers[i].ship)<500) && (theships[this.target].deltav(theplayers[i].ship)<10)){
					complete = 1; //Requires that you get close, and get slow relative to target planet.
					}
				}
			if (complete == 1){
				theradio.newmsg("Institute Mission Control",this.type+" mission complete.  Keep doing my thing. Payment of "+this.reward+" has been deposited.",time);//newmsg(sndr, msg, thetime)
				var givenreward = this.reward; //Saves mission reward to be returned
				var givenstory = this.storypath;
				this.type = ""; //Resets to inactive values.
				this.origin = 0;
				this.target = 0;
				this.message = "No mission";
				this.reward = 0;
				this.storypath = 0;
				missioncomplete1.play();
				this.taken=false;
				theplayer.job = "completed";
				return [givenreward,givenstory];//Storypath will be 0 for non-story missions, nonzero values will set the story state of the player in main loop
				}
				else {return [0,0];}
			} else {return [0,0];}
		
		}
	}