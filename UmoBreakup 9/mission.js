
class Mission{
	constructor(missiontype, morigin, mtarget,mmessage,mreward,mstory){
		this.type = missiontype; //string indicating type of mission, such as "Assassinate", "Defend" or "Cargo"
		this.origin = morigin; //Starting point for a cargo mission, in positive integer planet index
		this.target = mtarget; //Target for mission, positive integer list for ship(s) or planet index.
		this.message = mmessage; //"Kill that guy", "Take cargo to that planet"
		this.reward = mreward; //How much money you get, 0 indicates mission no longer active
		this.storypath = mstory; //What storystate the mission leads to, 0 for no affect on storystate
		}
	check(theships,theplanets,theradio){ //Determines if mission is complete
		var complete = 0;
		if (this.type == "assassinate"){ //If the mission is to kill a guy
			if (theships[this.target].hp < 0){complete = 1;} //If the ship is dead, the mission is complete.  Doesnt work yet
			}
			
		else if (this.type == "cargo"){ //If the mission is to take cargo to a planet.  Works on last test.
			if ((theplanets[this.target].distance(ships[0])<500) && (theplanets[this.target].deltav(ships[0])<10)){
				complete = 1; //Requires that you get close, and get slow relative to target planet.
				}
			}
		else if (this.type == "courier"){ //If the mission is to take cargo to a ship.  Untested
			if ((theships[this.target].distance(theships[0])<500) && (theships[this.target].deltav(theships[0])<10)){
				complete = 1; //Requires that you get close, and get slow relative to target planet.
				}
			}
		if (complete == 1){
			playerradio.newmsg("Dudeman",this.type+" mission complete.  Keep doing my thing. Payment of "+this.reward+" has been deposited.",time);//newmsg(sndr, msg, thetime)
			var givenreward = this.reward; //Saves mission reward to be returned
			var givenstory = this.storypath;
			this.type = ""; //Resets to inactive values.
			this.origin = 0;
			this.target = 0;
			this.message = "No mission";
			this.reward = 0;
			this.storypath = 0;
			return [givenreward,givenstory];//Storypath will be 0 for non-story missions, nonzero values will set the story state of the player in main loop
			}
			else {return [0,0];}
		}
	}