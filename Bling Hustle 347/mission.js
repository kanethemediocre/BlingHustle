 
class Mission{
	constructor(missiontype, morigin, mtarget,mmessage,mreward,mstory){
		this.type = missiontype; //string indicating type of mission, such as "Assassinate", "Defend" or "Cargo"
		this.origin = morigin; //Starting point for a cargo mission, in positive integer planet index
		this.target = mtarget; //Target for mission, positive integer list for ship(s) or planet index.
		this.message = mmessage; //"Kill that guy", "Take cargo to that planet"
		this.reward = mreward; //How much money you get, 0 indicates mission no longer active
		this.storypath = mstory; //What storystate the mission leads to, 0 for no affect on storystate
		this.danger = 0; //This describes how dangerous the mission is thought to be
		this.distance = 0; //This describes how far the mission is thought to be.
		this.taken = false;
		this.taker = "nobody";
		}
	take(theships,theplanets,theplayer){
		if (this.type=="destroy"){
			console.log("try to respawn bot "+this.target+" at planet "+theships[this.target].parentid);
			theships[this.target].respawn(theplanets[theships[this.target].parentid]);
			this.taken = true;
			this.taker = theplayer.name;
			theplayer.job = this.message;
			theplayer.jobs.push(this.message);
			}
		if ((this.type=="cargo")&&(theplayer.inventory.maxcargo-theplayer.inventory.totalcargo()>=10)){
			theplayer.inventory.takecargo(allcargos.length-1,10); //global scope
			this.taken = true;
			this.taker = theplayer.name;
			theplayer.job = this.message;
			theplayer.jobs.push(this.message);
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