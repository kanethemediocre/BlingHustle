function saveplanet(theplanets,theindex,moreassignments){//Saves orbit radius, size, name and color, plus more assignments as manually added.
	var declaration = "let p"+theindex+" = new Umo(0,0,"+theplanets[theindex].s+",'"+theplanets[theindex].c+"');";
	var thecommand = declaration + '\n';
	var aname = "p"+theindex+".name = '"+theplanets[theindex].name+"';";
	thecommand = thecommand + aname + '\n';
	var aparent = "p"+theindex+".parentid = "+theplanets[theindex].parentid+";";
	thecommand = thecommand + aparent + '\n';
	var acolor2 = "p"+theindex+".c2 = '"+theplanets[theindex].c2+"';";
	thecommand = thecommand + acolor2 + '\n';
	var assignments = [];//list of strings
	if (theindex>0){
		var orbitdistance = Math.floor(theplanets[theindex].distance(theplanets[theplanets[theindex].parentid]));
		var aorbit = "p"+theindex+".setorbit(p"+theplanets[theindex].parentid+","+orbitdistance+",0,1);";
		thecommand = thecommand + aorbit + '\n';
		}
	var i=0;
	while(i<moreassignments.length){
		thecommand = thecommand + moreassignments[i]+'\n';
		i++;
		}
	return thecommand;	
	}
function saveoutpost(theplanets,theoutposts,theindex,moreassignments){//Saves orbit radius, size, name and color, plus more assignments as manually added.
	var declaration = "let o"+theindex+" = new Umo(0,0,"+theoutposts[theindex].s+",'"+theoutposts[theindex].c+"');";
	var thecommand = declaration + '\n';
	var aname = "o"+theindex+".name = '"+theoutposts[theindex].name+"';";
	thecommand = thecommand + aname + '\n';
	var aparent = "o"+theindex+".parentid = "+theoutposts[theindex].parentid+";";
	thecommand = thecommand + aparent + '\n';
	var acolor2 = "o"+theindex+".c2 = '"+theoutposts[theindex].c2+"';";
	thecommand = thecommand + acolor2 + '\n';
	var orbitdistance = Math.floor(theoutposts[theindex].distance(theplanets[theoutposts[theindex].parentid]));
	var bestmatch = 9999999;
	var trailing = 0;
	var i=1;
	while(i<theplanets.length){//Determines what planet it trails
		var solardistance = theplanets[0].distance(theplanets[i]);
		var dd = Math.abs(solardistance-orbitdistance);
		if ((dd<bestmatch)&&(theplanets[i].parentid==0)){
			trailing = i;
			bestmatch = dd;
			}
		i++;
		}
	var aorbit = "o"+theindex+".setorbit(p"+theplanets[theindex].parentid+","+orbitdistance+","+"0.25"+",1);";
	thecommand = thecommand + aorbit + '\n';
	
	var apolytheta = "o"+theindex+".polytheta = [Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4]";//All outposts are the same square.  This code could be better to accomodate other shaped outposts.
	thecommand = thecommand + apolytheta + '\n';
	var apolyradius = "o"+theindex+".polyradius = [1,1,1,1];"
	thecommand = thecommand + apolyradius + '\n';
	var i=0;
	while(i<moreassignments.length){
		thecommand = thecommand + moreassignments[i]+'\n';
		i++;
		}
	thecommand = thecommand + "var numberofsides = Math.floor(Math.random()*6+7)*2;"+'\n';//this re-randomizes the emblem on load.  Could be better and save the emblem.
	thecommand = thecommand + "o"+theindex+".makeemblem(numberofsides,0.1);"+'\n';
	return thecommand;	
	}
function idshopitems(theshopitems){//Takes an array of shop items and returns a string of identifiers to use loading them
	var itemtypes = [];//list of item types, eg upgrade, blaster, blaster upgrade
	var itemindexes = [];
	var blasteritems = bhblasters();
	var cargoitems = bhcargos();
	var upgradeitems = freshupgrades();
	//blasterupgradeitems 
	var i=0;
	while(i<theshopitems.length){
		if (this.type=="blaster"){	}
		if (this.type=="upgrade"){	}
		if (this.type=="cargo"){	}
		if (this.type=="booster"){	}
		if (this.type=="chassis"){	}
			
		i++;
		}
	}
function saveshop(theshops,theplanets,theoutposts,theindex,moreassignments){//Saves orbit radius, size, name and color, plus more assignments as manually added.
	var ashopitems = "[]";
	var declaration = "let s"+theindex+" = new Shop('"+theshops[theindex].name+"',"+theindex+",'"+theshops[theindex].description+"',"+ashopitems+");";
	//new Shop("The Merry Merzian", 1, "I have these fine tapestries....", merzianshopitems);
	var thecommand = declaration + '\n';
	var aname = "s"+theindex+".name = '"+theshops[theindex].name+"';";
	thecommand = thecommand + aname + '\n';
	

	var i=0;
	while(i<moreassignments.length){
		thecommand = thecommand + moreassignments[i]+'\n';
		i++;
		}
	//thecommand = thecommand + "cs.shops.push(s"+theindex+");"+'\n';
	return thecommand;	
	}
function savesystem(thesystem){
	var functiondeclare = "function mysystem(){";//Declare function to start file
	var thecommand = functiondeclare+"\n";
	var systemdeclare = "var cs = new System(1,'Sool',0,0);";
	var thecommand = thecommand + systemdeclare+"\n";
	//Add planet declarations and assignments
	var i=0;
	while (i<thesystem.planets.length){
		thecommand = thecommand + saveplanet(thesystem.planets,i,[]); 
		thecommand = thecommand + "cs.planets.push(p"+i+");"+"\n";
		i++;
		}
	var i=0;
	
	//Add stations
	var i=0;
	while(i<thesystem.outposts.length){
		thecommand = thecommand + saveoutpost(thesystem.planets,thesystem.outposts,i,[]); 
		thecommand = thecommand + "cs.outposts.push(o"+i+");"+"\n";
		i++;
		}	
	//Add shops
	var i=0;
	while(i<thesystem.shops.length){//Same index as outposts, could be combined loop
		thecommand = thecommand + saveshop(thesystem.shops,thesystem.planets,thesystem.outposts,i,[]);
		thecommand = thecommand + "cs.shops.push(s"+i+");"+"\n";
		i++;
		}

	//Add ecobalance code.  The economies are re-randomized, not saved.  Could be improved to saved.
	//thecommand = thecommand + "var i=0;"+"\n";
	//thecommand = thecommand + "while(i<50){"+"\n";
	//thecommand = thecommand + "cs.ecobalance(.05);"+"\n";
	//thecommand = thecommand + "i++;"+"\n";
	//thecommand = thecommand + "}"+"\n";
	//cs.addcargosales(cargoitems);
	//Add NPCs
	//cs.addrandomgang(1,2,16);
	var lastlevel = -1;
	var lastparent = -1;
	var currentgang = [];
	if (thesystem.npcs.length>0){
		lastlevel = thesystem.npcs[0].ship.level;
		lastparent = thesystem.npcs[0].ai.homeplanet;
		currentgang = [0];
		}
	var i=1;
	while(i<thesystem.npcs.length){
		var nextnpc = thesystem.npcs[i];
		if (((nextnpc.ship.level == lastlevel)&&(nextnpc.ai.homeplanet==lastparent))){
			currentgang.push(i);
			}
		else{
			if (thesystem.npcs[i-1].ai.playerhostile==true){
				if (thesystem.npcs[i-1].ship.s>47){//If they are large, assume they are superboss
					var numturrets = 0;
					var turrethp = 1;
					var turretshield = 1;
					
					var j=0
					while(j<thesystem.turrets.length){
						if (thesystem.turrets[j].a === thesystem.npcs[i-1].ship){//Find matching turrets
							numturrets++;
							turrethp = thesystem.turrets[j].pivot.maxhp;
							turretshield = thesystem.turrets[j].pivot.maxshield;
							}
						j++;
						}
					var abossdeclaration = "addsuperboss("+thesystem.npcs[i-1].ship.s+","+numturrets+",1000+1000*"+numturrets+",1250,"+turrethp+","+turretshield+","+thesystem.npcs[i-1].ai.homeplanet+");";
					//Reverse engineering through all the bonuses is hard, so this is a rough approximation.
					thecommand = thecommand + abossdeclaration + '\n';
					}
				else{	
					thecommand = thecommand + "cs.addrandomgang("+lastparent+","+currentgang.length+","+lastlevel+");"+"\n";		
					currentgang = [i];
					lastlevel = nextnpc.ship.level;
					lastparent = nextnpc.ai.homeplanet;
					}
				}
			else{
				//addrandomgang(planetindex, num,level){
				thecommand = thecommand + "cs.addrandomtraders([5,11,16],"+currentgang.length+","+lastlevel+");"+"\n";//Destinations are fixed.  That needs to be fixed.		
				currentgang = [i];
				lastlevel = nextnpc.ship.level-1;
				lastparent = nextnpc.ai.homeplanet;
				}
			}
		i++;
		}
	thecommand = thecommand + "cs.addcargomissions(4);"+"\n";
	thecommand = thecommand + "return cs;"+"\n";
	thecommand = thecommand + "}"+"\n";
	return thecommand;
	}