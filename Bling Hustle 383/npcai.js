class NPCAI{
	constructor(){
		this.behavenow = "none";//Describes AI behavior state in terms of immediate response
		this.behavior = "none"; //Describes overall motivation to choose different behavenows and targets
		this.team = 0;
		this.nowtargetplanet = 0;
		this.nowtargetship = 0;
		this.homeplanet = 0;
		this.homestation = 0;
		this.gang = 0;
		}
	setfixedbehavior(newbehavenow,newteam,newhomeplanet,newteam,newgang){
		this.behavenow = newbehavenow;
		this.behavior = "fixed";
		this.team = newteam;
		this.gang = newgang;
		this.nowtargetplanet = newhomeplanet;
		this.homeplanet = newhomeplanet;
		}
	behave(me){
		
	}
}