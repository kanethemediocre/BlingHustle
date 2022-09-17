class NPC{
	constructor(npcid){
		//this.behavenow = "none";//Describes AI behavior state in terms of immediate response
		//options: "gotoplanet","gotoship","gotoplayer","gotostation","attackship","attackplayer","loiter"
		//this.behavior = "none"; //Describes overall motivation to choose different behavenows and targets
		this.id = npcid;
		this.umotype = "ship"; //options bigship, planet, station
		this.ship = new Umo(0,0,32,randcolor());
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
		}

	behave(me){
		this.ai.behave();
	}
}