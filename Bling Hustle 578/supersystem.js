class Supersystem{
	constructor(linktype,nsystems,msystems,ppopmin,ppopmax,psizemin,psizemax,npopmin,npopmax,difficulty){
		this.systems = []
		this.ppopmin = ppopmin;//max/min number of planets
		this.ppopmax = ppopmax;
		this.n = nsystems;//Total systems are m*n
		this.m = msystems;
		this.linktype = linktype;
		this.systemsize = 20000;
		var clearance = 128;
		if (this.linktype = "3bubble"){
			var i=0;
			while(i<this.n*this.m){
				var numplanets = Math.floor(this.ppopmin+Math.random()*(this.ppopmax-this.ppopmin));
				var asystem = new System(i,"sys1",0,0);
				var localdifficulty = difficulty+Math.floor((this.n*this.m/2)-Math.abs(i-this.n*this.m/2)); //Attempts to vary difficulty by region
				asystem.generatepocket(3,numplanets,this.systemsize,psizemin,psizemax,localdifficulty);//generatepocket(nout,nin,sizeout,minsizein,maxsizein,difficulty){
				asystem.planets[1].name = asystem.planets[1].name +"1";
				asystem.planets[2].name = asystem.planets[2].name +"2";
				asystem.planets[3].name = asystem.planets[3].name +"3";
				asystem.planets[1].s = asystem.planets[1].s - clearance;
				asystem.planets[2].s = asystem.planets[2].s - clearance;
				asystem.planets[3].s = asystem.planets[3].s - clearance;
				if (i%2==1){//Flip every other system
					var j=0;
					while(j<asystem.planets.length){
						asystem.planets[j].x = -1*asystem.planets[j].x;
						j++;
						}
					var j=0;
					while(j<asystem.outposts.length){
						asystem.outposts[j].x = -1*asystem.outposts[j].x;
						asystem.playerspawnx = -1*asystem.playerspawnx;
						j++;
						}
					var j=0;
					while(j<localdifficulty/5){
						asystem.addsuperboss(84+12*j,2+j,1600+400*j,800+200*j,100+50*j,64+32*j,0);//addsuperboss(size,turretnum,hp,shield,turrethp,turretshield,parentid){
						j++;
						}
					}
				this.systems.push(asystem);
				i++;
				}
			//now connect the bubbles
			//var qq = 0;
			//while (qq<2){
				var i=0;
				while(i<this.systems.length){
					if (i%2==0){
						var mplanet1 = this.systems[i].planets[1];
						var mplanet2 = this.systems[i].planets[2];
						var mplanet3 = this.systems[i].planets[3];
						//console.log(mplanet1.c);
						var dir1index = (i+1);
						if (dir1index<0){dir1index = dir1index+this.n*this.m;}
						dir1index = dir1index % (this.n*this.m);
						console.log(dir1index);
						this.systems[dir1index].planets[3].name = mplanet1.name;
						this.systems[dir1index].planets[3].c = mplanet1.c;
						this.systems[dir1index].planets[3].c2 = mplanet1.c2;
						console.log(this.systems[dir1index].planets[3].c2);
						this.systems[dir1index].planets[1].name = mplanet2.name;
						this.systems[dir1index].planets[1].c = mplanet2.c;
						this.systems[dir1index].planets[1].c2 = mplanet2.c2;					
						dir1index = (i-1);
						if (dir1index<0){dir1index = dir1index+this.n*this.m;}
						dir1index = dir1index % (this.n*this.m);
						console.log(dir1index);
						this.systems[dir1index].planets[2].name = mplanet1.name;
						this.systems[dir1index].planets[2].c = mplanet1.c;
						this.systems[dir1index].planets[2].c2 = mplanet1.c2;
						this.systems[dir1index].planets[1].name = mplanet3.name;
						this.systems[dir1index].planets[1].c = mplanet3.c;
						this.systems[dir1index].planets[1].c2 = mplanet3.c2;						
						dir1index = (i-this.n);
						if (dir1index<0){dir1index = dir1index+this.n*this.m;}
						dir1index = dir1index % (this.n*this.m);
						console.log(dir1index);
						this.systems[dir1index].planets[3].name = mplanet3.name;
						this.systems[dir1index].planets[3].c = mplanet3.c;
						this.systems[dir1index].planets[3].c2 = mplanet3.c2;
						this.systems[dir1index].planets[2].name = mplanet2.name;
						this.systems[dir1index].planets[2].c = mplanet2.c;
						this.systems[dir1index].planets[2].c2 = mplanet2.c2;						
						}
					if (i%2==1){
						var mplanet1 = this.systems[i].planets[1];
						var mplanet2 = this.systems[i].planets[2];
						var mplanet3 = this.systems[i].planets[3];
						//console.log(mplanet1.c);
						var dir1index = (i+1);
						if (dir1index<0){dir1index = dir1index+this.n*this.m;}
						dir1index = dir1index % (this.n*this.m);
						console.log(dir1index);
						this.systems[dir1index].planets[3].name = mplanet1.name;
						this.systems[dir1index].planets[3].c = mplanet1.c;
						this.systems[dir1index].planets[3].c2 = mplanet1.c2;
						console.log(this.systems[dir1index].planets[3].c2);
						this.systems[dir1index].planets[1].name = mplanet2.name;
						this.systems[dir1index].planets[1].c = mplanet2.c;
						this.systems[dir1index].planets[1].c2 = mplanet2.c2;					
						dir1index = (i-1);
						if (dir1index<0){dir1index = dir1index+this.n*this.m;}
						dir1index = dir1index % (this.n*this.m);
						console.log(dir1index);
						this.systems[dir1index].planets[2].name = mplanet1.name;
						this.systems[dir1index].planets[2].c = mplanet1.c;
						this.systems[dir1index].planets[2].c2 = mplanet1.c2;
						this.systems[dir1index].planets[1].name = mplanet3.name;
						this.systems[dir1index].planets[1].c = mplanet3.c;
						this.systems[dir1index].planets[1].c2 = mplanet3.c2;						
						dir1index = (i+this.n);
						if (dir1index<0){dir1index = dir1index+this.n*this.m;}
						dir1index = dir1index % (this.n*this.m);
						console.log(dir1index);
						this.systems[dir1index].planets[3].name = mplanet3.name;
						this.systems[dir1index].planets[3].c = mplanet3.c;
						this.systems[dir1index].planets[3].c2 = mplanet3.c2;
						this.systems[dir1index].planets[2].name = mplanet2.name;
						this.systems[dir1index].planets[2].c = mplanet2.c;
						this.systems[dir1index].planets[2].c2 = mplanet2.c2;						
						}
					i++;
					}
				//qq++;
				//}
			}
		}
	checktrans(playerindex,systemindex){
		var newsystem = -1;
		var dirnum = -1;
		if (systemindex<this.systems.length){
			newsystem = systemindex;
			if (playerindex<this.systems[systemindex].players.length){
				if (this.linktype == "3bubble"){
					var pradius = this.systems[systemindex].planets[0].distance(this.systems[systemindex].players[playerindex].ship);
					var threshold = this.systemsize*Math.sin(Math.PI/6);
					var dirnum = -1;
					if (pradius>threshold){
						var truedir = this.systems[systemindex].planets[0].directionof(this.systems[systemindex].players[playerindex].ship);
						var dir = truedir+0.5;//fudge factor to move threshold a bit away from center value
						while (dir>2*Math.PI){dir = dir-2*Math.PI;}
						while (dir<0){dir = dir+2*Math.PI;}
						dirnum = Math.floor((dir/(2*Math.PI))*6);
						if (dirnum == 0){//There is probably a few faster ways to do this but it only executes rarely.
							var centerangle = 0
							var dangle = centerangle - truedir;
							newsystem = systemindex+this.n;
							this.systems[systemindex].players[playerindex].ship.y = Math.sin(truedir+Math.PI+2*dangle)*(threshold-1);//-1*this.systems[systemindex].players[playerindex].ship.y;
							this.systems[systemindex].players[playerindex].ship.x = Math.cos(truedir+Math.PI+2*dangle)*(threshold-1);//-1*this.systems[systemindex].players[playerindex].ship.x;
							}
						if (dirnum == 1){
							var centerangle = Math.PI/3;
							var dangle = centerangle - truedir;
							newsystem = systemindex+1;
							this.systems[systemindex].players[playerindex].ship.y = Math.sin(truedir+Math.PI+2*dangle)*(threshold-1);//-1*this.systems[systemindex].players[playerindex].ship.y;
							this.systems[systemindex].players[playerindex].ship.x = Math.cos(truedir+Math.PI+2*dangle)*(threshold-1);//-1*this.systems[systemindex].players[playerindex].ship.x;
							}
						if (dirnum == 2){
							var centerangle = 2*Math.PI/3;
							var dangle = centerangle - truedir;
							newsystem = systemindex+1;
							this.systems[systemindex].players[playerindex].ship.y = Math.sin(truedir+Math.PI+2*dangle)*(threshold-1);//-1*this.systems[systemindex].players[playerindex].ship.y;
							this.systems[systemindex].players[playerindex].ship.x = Math.cos(truedir+Math.PI+2*dangle)*(threshold-1);//-1*this.systems[systemindex].players[playerindex].ship.x;
							}
						if (dirnum == 3){
							var centerangle = 3*Math.PI/3;
							var dangle = centerangle - truedir;
							newsystem = systemindex-this.n;
							this.systems[systemindex].players[playerindex].ship.y = Math.sin(truedir+Math.PI+2*dangle)*(threshold-1);//-1*this.systems[systemindex].players[playerindex].ship.y;
							this.systems[systemindex].players[playerindex].ship.x = Math.cos(truedir+Math.PI+2*dangle)*(threshold-1);//-1*this.systems[systemindex].players[playerindex].ship.x;
							}
						if (dirnum == 4){
							var centerangle = 4*Math.PI/3;
							var dangle = centerangle - truedir;
							newsystem = systemindex-1;
							this.systems[systemindex].players[playerindex].ship.y = Math.sin(truedir+Math.PI+2*dangle)*(threshold-1);//-1*this.systems[systemindex].players[playerindex].ship.y;
							this.systems[systemindex].players[playerindex].ship.x = Math.cos(truedir+Math.PI+2*dangle)*(threshold-1);//-1*this.systems[systemindex].players[playerindex].ship.x;
							}
						if (dirnum == 5){
							var centerangle = 5*Math.PI/3;
							var dangle = centerangle - truedir;
							newsystem = systemindex-1;
							this.systems[systemindex].players[playerindex].ship.y = Math.sin(truedir+Math.PI+2*dangle)*(threshold-1);//-1*this.systems[systemindex].players[playerindex].ship.y;
							this.systems[systemindex].players[playerindex].ship.x = Math.cos(truedir+Math.PI+2*dangle)*(threshold-1);//-1*this.systems[systemindex].players[playerindex].ship.x;
							}
						console.log(dangle);
						this.systems[systemindex].players[playerindex].navtarget = 0;
						this.systems[systemindex].players[playerindex].shiptarget = 0;
						console.log(newsystem);
						if (newsystem<0){newsystem = newsystem+this.n*this.m;}
						newsystem = newsystem % (this.n*this.m);
						this.systems[systemindex].players[playerindex].navtarget = 0;
						this.systems[systemindex].players[playerindex].shiptarget = 0;
						this.systems[systemindex].players[playerindex].planetarychart = this.systems[newsystem].generateplanetlist();
						console.log(dirnum+" "+newsystem);
						}
					}				
				}
			}
		
		return newsystem;
		}
	}