class Questline{
	constructor(myquests,myunlock){
		this.quests = myquests;
		this.unlocklevel = -1;
		this.active = false;
		this.complete = false;
		this.qstate = 0;
		this.altquests = [];//Alternate quests are not a simple list of quest.  Each entry should itself be a list with quest and 2 qstate integers
		}//First qstate integer is the qstate at which alternate quest applies, second qstate integer is where the quest leads to.
	check(thesystem,playerindex,thetime,theradio){
		var advance = this.quests[qstate].check(thesystem,playerindex,thetime);
		if (advance){	
			this.qstate++;//Questlines are still linear...
			this.quests[this.qstate].startdialog(theradio,thetime);
			if(this.quests[this.qstate].reqs[0].qtype == "end"){
				this.complete = true;
				this.active = false;//Last quest is essentially a placeholder, its requirements are never checked.
				}
			else if (this.quests[this.qstate].reqs[0].qtype == "pasttime"){//qvar[0] assigned as time to pass after starting , qvar[1] is being assigned the end time.
				this.quests[this.qstate].reqs[0].qvar[1] = thetime + this.quests[this.qstate].reqs[0].qvar[0]; 
				}
			else if (this.quests[this.qstate].reqs[0].qtype == "killnpc"){//qvar[0] assigned as time to pass after starting , qvar[1] is being assigned the end time.
				var npcname = thesystem.npcs[this.qti[0]].ship.name;
				this.quests[this.qstate].startmsg = this.quests[this.qstate].startmsg + npcname + "."; 
				}
			}
		}
	}
class Quest{
	constructor(npcname,dialogstart,dialogend,blingreward,requirements){
		this.dstart = dialogstart;
		this.dend = dialogend;
		this.bling = blingreward;
		this.reqs = requirements;
		this.npcname = npcname;
		this.altreqs = [];//Format is [[reqs0],[reqs1],[reqs2]].  Each set can be fulfilled to complete the mission.
		this.effects = []; //This is used to make quests cause something to happen.
		}
	check(thesystem,playerindex,thetime){
		var passes = [1];
		var i=0;
		while(i<this.reqs.length){
			if (this.reqs[i].check(thesystem,playerindex,thetime)==false){passes[0] = 0;}
			i++;
			}
		var i=0;//altreqs will usually be empty, so normally none of these loops will run.
		while(i<this.altreqs.length){
			passes.push(1);
			var j=0;
			while(j<this.altreqs[i].length){
				if (this.altreqs[i][j].check(thesystem,playerindex,thetime)==false){passes[i+1] = 0;}
				j++;
				}
			i++;
			}
		var pass = passes[0];
		var i=1;
		while(i<passes.length){
			pass = pass * passes[i]
			i++;
			}
		var boolpass = false;
		if (pass>0){boolpass = true;}
		return boolpass;
		}
	startdialog(theradio,thetime){//theradio is a sort of message display system
		var themsg = this.dstart;
		theradio.newmsg(this.npcname,this.dstart,time);//newmsg(sndr, msg, thetime)
		}
	enddialog(theradio,thetime){//theradio is a sort of message display system
		var themsg = this.dstart;
		theradio.newmsg(this.npcname,this.dend,thetime);//newmsg(sndr, msg, thetime)
		}
	}
class Questrequirement{//qvariables is an array that is used as needed for each qtype.  Sone qtypes will have [] for quindexes or qvariables
	constructor(qtype,qtargetindexes,qvariables){
		this.qtype = qtype;
		this.qti = qtargetindexes;
		this.qvar = qvariables;
		}
	check(thesystem,playerindex,thetime){
		var pass = false;
		var theplayer = thesystem.players[playerindex];
		if (this.qtype == "pasttime"){
			if (thetime>this.qvar[0]){//qvar[0] is set at the time the quest is scheduled to complete.
				pass = true;
				}
			}			
		else if (this.qtype == "hasbling"){
			if (theplayer.money>=this.qvar[0]){//qvar[0] is set at class construction to be the quantity of money needed to pass the quest
				pass = true;
				}
			}
		else if (this.qtype == "hasupgrade"){
			var puptier = theplayer.upgrades[this.qti[0]].tier;//this.qti[0] is passed as the index of the upgrade required.
			if (puptier>=qvar[0]){ //qvar[0] is passed as the minimum upgrade tier to pass distance
				pass = true;
				}
			}
		else if (this.qtype == "hasblaster"){
			var phas = theplayer.blasters[this.qti[0]].phas;//this.qti[0] is passed as the index of the upgrade required.
			if (phas){ 
				pass = true;
				}
			}				
		else if (this.qtype == "nearplanet"){
			var theplanet = thesystem.planets[this.qti[0]];
			var playerdistance = theplayer.ship.distance(theplanet);
			var playerdv = theplayer.ship.deltav(theplanet);
			if (playerdistance<this.qvar[0]){ //qvar[0] is the maximum acceptable distance
				if ((this.qvar[1]<0) || (playerdv<qvar[1])){ //qvar[1] is max acceptable dv, OR <0 acts as a flag to ignore dv
					pass = true;
					}
				}
			}
		else if (this.qtype == "nearnpc"){
			var thenpc = thesystem.npcs[this.qti[0]];
			var playerdistance = theplayer.ship.distance(thenpc.ship);
			var playerdv = theplayer.ship.deltav(thenpc.ship);
			if (playerdistance<this.qvar[0]){ //qvar[0] is the maximum acceptable distance
				if ((this.qvar[1]<0) || (playerdv<qvar[1])){ //qvar[1] is max acceptable dv, OR <0 acts as a flag to ignore dv
					pass = true;
					}
				}
			}			
		else if (this.qtype == "nearstation"){
			var thestation = thesystem.outposts[this.qti[0]];
			var playerdistance = theplayer.ship.distance(thestation);
			var playerdv = theplayer.ship.deltav(thestation);
			if (playerdistance<this.qvar[0]){ //qvar[0] is the maximum acceptable distance
				if ((this.qvar[1]<0) || (playerdv<qvar[1])){ //qvar[1] is max acceptable dv, OR <0 acts as a flag to ignore dv
					pass = true;
					}
				}
			}
		else if (this.qtype == "dockedstation"){
			if (theplayer.dockstate==this.qti[0]){ //qti[0] is the index of docked station and player dockstate.
				pass = true;
				}
			}			
		else if (this.qtype == "selectnavtarget"){
			if ((theplayer.navtarget==this.qti[0])&&(theplayer.navactive == this.qti[1])){ //qti[0] is the index of the nav target, qti[1] is the nav target type (1 for planet, 2 for station)
				pass = true;
				}
			}
		else if (this.qtype == "selectnpctarget"){
			if (theplayer.shiptarget==this.qti[0]){ //qti[0] is the index of the npc targeted
				pass = true;
				}
			}
		else if (this.qtype == "selectblaster"){
			if (theplayer.wep==this.qti[0]){ //qti[0] is the index of the desired blaster
				pass = true;
				}
			}
		else if (this.qtype == "selectprobe"){//Only needed when specifying a specific probe mode, otherwise use selectblaster
			if ((theplayer.wep==0)&&(theplayer.probemode==this.qti[0])){ //qti[0] is the index of the desired probemode
				pass = true;
				}
			}		
		else if (this.qtype == "probingplanet"){//Only needed when specifying a specific probe mode, otherwise use selectblaster
			var theprobe = theplayer.blasters[0].bombs[0];
			var theplanet = thesystem.planets[this.qti[0]];
			if (theprobe.collide(theplanet)){ 
				pass = true;
				}
			}
		else if (this.qtype == "probingnpc"){//Only needed when specifying a specific probe mode, otherwise use selectblaster
			var theprobe = theplayer.blasters[0].bombs[0];
			var theship = thesystem.npcs[this.qti[0]].ship;
			if (theprobe.collide(theship)){ 
				pass = true;
				}
			}
		else if (this.qtype == "minzoom"){//Only needed when specifying a specific probe mode, otherwise use selectblaster
			var thezoom = theplayer.mapscale;
			var minzoom = this.qvar[0];
			if (thezoom>=minzoom){ 
				pass = true;
				}
			}
		else if (this.qtype == "maxzoom"){//Only needed when specifying a specific probe mode, otherwise use selectblaster
			var thezoom = theplayer.mapscale;
			var maxzoom = this.qvar[0];
			if (thezoom<=maxzoom){ 
				pass = true;
				}
			}
		else if (this.qtype == "killnpc"){
			var thenpc = thesystem.npcs[this.qti[0]];
			if (thenpc.ship.hp<=0){ //qvar[0] is the maximum acceptable distance
				pass = true;
				}
			}
		else if (this.qtype == "bombout"){
			var thebomb = theplayer.blasters[this.qti[0]].bombs[0];
			if (thebomb.timer>0){ //qvar[0] is the maximum acceptable distance
				pass = true;
				}
			}	
		return pass;
		}
	}

