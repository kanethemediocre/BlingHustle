//constructor(name,description,price,type,basedamage,updamage,maxdamage,basespeed,upspeed,maxspeed,baseboom,upboom,maxboom,basen,upn,maxn,basetimer,uptimer,maxtimer,nrg,bombcolor,ID){
 function bhblasters(){
	 let weapon1 = new Blaster("Banger","A simple, energy efficient blaster.  Your ships starting weapon may not be exciting, but it gets the job done and has great upgrade potential.",200,"plain",                            
	 12,6,10,12,4,10,0.5,0.5,10,1,0,0,36,12,10,12,"red","ID not implemented");
	 weapon1.phas = true; //this is the starter blaster
	 //weapon1.etier = 1; //testing bounce stuff
	  weapon1.recoil = -0.15;
	 let weapon2 = new Blaster("Mine","Powerful but very slow moving bomb.  This blaster needs to be used in conjunction with some combination of thrusters and clever planning.",500,"plain",                                 
	 50,25,10,0.5,0,0,2,0.75,10,1,0,0,1800,600,10,40,"purple","ID not implemented");
	 let weapon3 = new Blaster("Flakker","Quickly detonating, short-range weapon with a wide area of effect.  Damage output and range are low, and it's most suitable for finishing off damaged umos or damaging small groups at close range.",600,"fixedspread",
	 8,4,10,12,3,10,1.2,0.3,10,3,2,10,18,8,10,25,"green","ID not implemented");
	 weapon3.recoil = -0.3;
	 let weapon4 = new Blaster("Railgun","Powerful, fast moving projectile without explosive effect.  The Railgun will almost completely drain your blaster energy in one shot, but it's so fast and powerful you might not need a followup.",1000,"plain",      
	 48,16,10,20,4,4,0.2,0,0,1,0,0,96,32,10,95,"blue","ID not implemented");
	 weapon4.recoil = -1.0;
	 let weapon5 = new Blaster("Scatter Cannon","Fires an adjustable spread of bombs. Good for close range damage and target rich environments. Probably the best weapon.",2000,"spread",               
	 8,4,10,9,3,5,0.75,0.25,5,6,2,10,75,25,10,50,"white","ID not implemented");
	 weapon5.recoil = -1.25;
	 let weapon6 = new Blaster("Blazor","Beam weapon damages everything in it's path.  Instead of tapping the mouse, hold the left button down for a continuous beam of... honestly, we don't even know, but it hurts. ",1000,"beam",                                                   
	 6,3,10,1,0,0,1,0,0,1,0,0,320,80,10,2,"white","ID not implemented");
	 let weapon7 = new Blaster("Double Rainbow","Fires an absurd spread of damaging projectiles.",5000,"fixedspread",          
	 10,5,10,10,0,0,0.3,0,0,12,4,10,60,12,10,50,"white","ID not implemented");
	 let weapon8 = new Blaster("Spectral Disintegrator","Short range, rapid-firing blaster with great damage output.  Hold the left mouse button down instead of tapping it.",3000,"rapid",
	 12,6,10,12,2,4,0.25,0.25,10,6,0,0,24,6,4,10,"white","ID not implemented");
	 weapon8.recoil = -0.25;
	 /*
	 let weapon9 = new Blaster("Boodabeep","Beep Beep BaBoomba, Boomba Be Boppo!  Baboombador bopposobeep, babumble beepapoo.  Beepapop boowopendongle, prodoopsenboboompo bopopob.",20000,"spread",                                           
	 16,8,10,12,2,10,0.5,0.25,10,8,1,10,1000,8,10,99,"white","ID not implemented");
	  weapon9.recoil = -2;
	  */
	  let weapon9 = new Blaster("Boodabeep","Beep Beep BaBoomba, Boomba Be Boppo!  Baboombador bopposobeep, babumble beepapoo.  Beepapop boowopendongle, prodoopsenboboompo bopopob.",20000,"semispread",                                           
	 16,8,10,8,4,10,1,0.5,10,48,12,10,60,30,10,25,"white","ID not implemented");
	  weapon9.recoil = -1.5;
	  weapon9.special1 = Math.PI/6;
	  weapon9.special2 = Math.PI/12;
	  weapon9.special3 = 4;
	  
	  
	 let weapon0 = new Blaster("Probe","Currently equipped to steal colors or shapes. Upgradeable to provide many other functions. Eventually.",1000,"plain",                      
	 4,0,0,10,5,10,0.25,0.5,10,1,0,0,100,100,10,11,"white","ID not implemented");
	 weapon0.recoil = -0.05;
	 let weapon10 = new Blaster("P-Clone","This blaster takes characteristics from probe data, and basically copies the blaster of the last bot that it hit.",300,"plain",                            
	 12,6,10,12,2,10,0.8,0.2,10,2,0,0,40,8,10,12,"pink","ID not implemented");
	 weapon10.recoil = -0.3;
	 let weapon11 = new Blaster("Multibanger","Similar to the standard banger, but fires a row of bombs instead of a single bomb.  A great value as-is with even greater upgrade potential.",800,"multiplex",                            
	 12,6,10,12,3,10,0.75,0.25,10,2,1,10,40,8,10,24,"pink","ID not implemented");
	 weapon11.recoil = -0.3;
	 let weapon12 = new Blaster("Multimine","Drops multiple mines in a row.  About half as much damage for a single mine, but four times as many mines BEFORE upgrades.",2500,"multiplex",                            
	 20,10,10,0.5,0,0,1.5,0.5,10,4,2,10,1200,300,10,80,"tan","ID not implemented");
	 let weapon13 = new Blaster("Nova","Fires bombs in all directions.  For the times when you feel like you don't have any friends, and the world is out to get you.",1600,"fixedspread",                            
	 12,6,10,15,3,10,1,0.25,10,16,8,10,24,8,10,60,"tan","ID not implemented");
	 weapon13.special1 = 4*Math.PI/2;
	 weapon13.special2 = 8*Math.PI/4;
	 let weapon14 = new Blaster("Fast Railgun","The new dank cheese.  Fast flying long range bombs, every time you tap the trigger, at a much smaller energy cost than the standard railgun.",2000,"semirapid",                            
	 24,8,10,20,4,4,0.3,0,0,6,0,0,64,16,10,25,"grey","ID not implemented");
	 weapon14.recoil = -0.4;
	 let weapon15 = new Blaster("Gemini Cutter","Hold down the trigger to repeatedly fire pairs of bombs. Good damage, projectile speed, and energy efficiency compensates for a somewhat slow rate of fire.",5000,"rapidmultiplex",                            
	 16,8,10,16,4,10,0.5,0.25,10,24,0,0,50,10,10,20,"white","ID not implemented");
	 weapon15.special1 = 24; //e g a b d e
	 weapon15.recoil = -0.25;
	 let weapon16 = new Blaster("Pulse Blazor","Beam weapon damages everything in it's path.  Unlike the Blazor, this fires a powerful, instantaneous pulse on click.",3500,"beam",                            
	 150,50,10,1,0,0,0.8,0.2,10,1,0,0,640,8,10,75,"lime","ID not implemented");
	 let weapon17 = new Blaster("Squid","Fires a cloud of projectiles backwards, and propels your ship forwards.  A weapon designed for panic.",1500,"fixedspread",                            
	 20,10,10,3,2,10,0.8,0.2,10,12,4,10,100,25,10,90,"darkslategrey","ID not implemented");
	 weapon17.special1 = 3*Math.PI/2;
	 weapon17.special2 = 7*Math.PI/4;
	 weapon17.recoil = 8;
	 let weapon18 = new Blaster("wangus","A rapid-firing blaster akin to the Disintigrator with greatly improved range, but worse energy efficiency and damage. Hold the left mouse button down instead of tapping it.",10000,"rapid",                            
	 10,5,10,12,3,10,0.8,0.2,10,24,0,0,64,8,10,15,"olive","ID not implemented");
	 weapon18.recoil = -0.25;
	 let weapon19 = new Blaster("Denier","Great walls of fire.",42069,"rapidmultiplex",                            
	 6,3,10,4,2,10,0.8,0.2,10,84,24,10,160,8,10,10,"skyblue","ID not implemented");
	weapon19.special1 = 15;
	 return [weapon0,weapon1,weapon2,weapon3,weapon4,weapon5,weapon6,weapon7,weapon8,weapon9,weapon10,weapon11,weapon12,weapon13,weapon14,weapon15,weapon16,weapon17,weapon18,weapon19];
	}//Might not need baseblastercopy function here because each time the bhblasters function is called it creates fresh new weapons.
let allblasters = bhblasters(); //Sort of legacy support
 function baseblastercopy(old){//Creates a new Blaster with same base stats as old Blaster.  Upgrades are not copied.
	let tempblaster = new Blaster(old.name,old.description,old.price,old.type,                                                            
	old.bhurt,old.uphurt,old.maxhurt,old.bspeed,old.upspeed,old.maxspeed,old.bboom,old.upboom,old.maxboom,old.bn,old.upn,old.maxn,
	old.btimer,old.uptimer,old.maxtimer,old.ecost,old.c,old.id);
	tempblaster.special1 = old.special1;
	tempblaster.special2 = old.special2;
	return tempblaster;
	}
 function fullblastercopy(old){//Creates a new Blaster with same base stats as old Blaster.  Upgrades are copied.
	let tempblaster = new Blaster(old.name,old.description,old.price,old.type,                                                            
	old.bhurt,old.uphurt,old.maxhurt,old.bspeed,old.upspeed,old.maxspeed,old.bboom,old.upboom,old.maxboom,old.bn,old.upn,old.maxn,
	old.btimer,old.uptimer,old.maxtimer,old.ecost,old.c,old.id);
	var i=0;
	while(i<old.dtier){
		tempblaster.plusdamage();
		i++;
		}
	var i=0;
	while(i<old.rtier){
		tempblaster.plusremote();
		i++;
		}
	var i=0;
	while(i<old.etier){
		tempblaster.plusbounce();
		i++;
		}
	var i=0;
	while(i<old.stier){
		tempblaster.plusspeed();
		i++;
		}
	var i=0;
	while(i<old.btier){
		tempblaster.plusboom();
		i++;
		}
	var i=0;
	while(i<old.ntier){
		tempblaster.plusn();
		i++;
		}
	var i=0;
	while(i<old.ttier){
		tempblaster.plustimer();
		i++;
		}
	var i=0;
	while(i<old.xtier){
		tempblaster.plusx();
		i++;
		}
	tempblaster.special1 = old.special1;
	tempblaster.special2 = old.special2;
	return tempblaster;
	}