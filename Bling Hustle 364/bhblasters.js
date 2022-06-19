//constructor(name,description,price,type,basedamage,updamage,maxdamage,basespeed,upspeed,maxspeed,baseboom,upboom,maxboom,basen,upn,maxn,basetimer,uptimer,maxtimer,nrg,bombcolor,ID){
 function bhblasters(){
	 let weapon1 = new Blaster("Banger","A simple, energy efficient blaster.  Your ships starting weapon may not be exciting, but it gets the job done. This launches a bomb at a moderate 12 p/f relative velocity, exploding on contact, or after a few seconds, doing damage in a small area",300,"plain",                            
	 12,6,10,12,2,10,0.8,0.2,10,1,0,0,40,8,10,12,"red","ID not implemented");
	 weapon1.phas = true; //this is the starter blaster
	 //weapon1.etier = 1; //testing bounce stuff
	 let weapon2 = new Blaster("Mine","Powerful but very slow moving bomb.  This blaster needs to be used in conjunction with some combination of thrusters and clever planning.",500,"plain",                                 
	 40,10,10,1,0,0,2,0.2,10,1,0,0,1800,300,10,40,"purple","ID not implemented");
	 let weapon3 = new Blaster("Flakker","Quickly detonating, short-range weapon with a wide area of effect.  Damage output and range are low, and it's most suitable for finishing off damaged umos or damaging small groups at close range.",600,"fixedspread",
	 8,4,10,12,2,10,1.2,0.2,10,2,1,10,16,8,10,25,"green","ID not implemented");
	 let weapon4 = new Blaster("Railgun","Powerful, fast moving projectile without explosive effect.  The Railgun will almost completely drain your blaster energy in one shot, but it's so fast and powerful you might not need a followup.",1000,"plain",      
	 40,10,10,20,4,4,0.2,0,0,1,0,0,80,8,10,80,"blue","ID not implemented");
	 let weapon5 = new Blaster("Scatter Cannon","Fires an adjustable spread of bombs. Good for close range damage and target rich environments. Probably the best weapon.",2000,"spread",               
	 8,4,10,10,2,5,0.75,0.25,5,6,2,10,80,16,10,30,"white","ID not implemented");
	 let weapon6 = new Blaster("Blazor","Unique beam weapon damages everything in it's path.  Instead of tapping the mouse, hold the left button down for a continuous beam of... honestly, we don't even know, but it hurts. ",1000,"beam",                                                   
	 8,4,10,12,2,10,1,0.2,10,1,0,0,384,64,10,2,"white","ID not implemented");
	 let weapon7 = new Blaster("Double Rainbow","Fires an absurd spread of damaging projectiles.",5000,"fixedspread",          
	 8,5,10,8,1,10,0.3,0.2,4,12,2,2,80,16,10,50,"white","ID not implemented");
	 let weapon8 = new Blaster("Disintigrator","Short range, rapid-firing blaster with good damage output.  Hold the left mouse button down instead of tapping it.",3000,"rapid",                         
	 12,6,10,12,2,10,0.2,0.1,10,6,0,0,24,2,10,11,"white","ID not implemented");
	 let weapon9 = new Blaster("Boodabeep","Beep Beep BaBoomba, Boomba Be Boppo!  Baboombador bopposobeep, babumble beepapoo.  Beepapop boowopendongle, prodoopsenboboompo bopopob.",20000,"spread",                                           
	 16,8,10,12,2,10,0.5,0.25,10,8,1,10,1000,8,10,99,"white","ID not implemented");
	 let weapon0 = new Blaster("Probe","Currently equipped to steal colors or shapes. Upgradeable to provide many other functions. Eventually.",1000,"probe",                      
	 10,4,10,12,2,10,1,0.2,10,1,0,0,40,8,10,11,"white","ID not implemented");
	 
	 let weapon10 = new Blaster("hmmm","dunno",300,"multiplex",                            
	 12,6,10,12,2,10,0.8,0.2,10,2,0,0,40,8,10,12,"pink","ID not implemented");
	 let weapon11 = new Blaster("DoubleBang","Parallel projectiles",300,"multiplex",                            
	 12,6,10,12,2,10,0.8,0.2,10,2,0,0,40,8,10,12,"pink","ID not implemented");
	 let weapon12 = new Blaster("Multimine","Drops multiple mines in a row",300,"multiplex",                            
	 12,6,10,1,0,0,1.5,0.5,10,4,2,10,1200,300,10,80,"tan","ID not implemented");
	 let weapon13 = new Blaster("Nova","Fires in all directions.",300,"novaspread",                            
	 12,6,10,12,2,10,0.8,0.2,10,9,3,0,40,8,10,48,"tan","ID not implemented");
	 let weapon14 = new Blaster("Fast Railgun","Fires repeatedly",300,"semirapid",                            
	 12,6,10,12,2,10,0.8,0.2,10,1,0,10,40,8,10,40,"grey","ID not implemented");
	 let weapon15 = new Blaster("Multibanger","Fires a row of projectiles",300,"multiplex",                            
	 12,6,10,12,2,10,0.8,0.2,10,3,1,10,40,8,10,33,"white","ID not implemented");
	 let weapon16 = new Blaster("Pulse Blazor","========================================",300,"beam",                            
	 120,30,10,12,2,10,0.8,0.2,10,1,0,0,640,8,10,60,"lime","ID not implemented");
	 let weapon17 = new Blaster("Squid","Fires a cloud of projectiles backwards.",300,"squid",                            
	 12,6,10,12,2,10,0.8,0.2,10,1,0,0,40,8,10,70,"darkslategrey","ID not implemented");
	 let weapon18 = new Blaster("wangus","ZCXZXCa",300,"rapid",                            
	 12,6,10,12,2,10,0.8,0.2,10,24,0,0,64,8,10,15,"olive","ID not implemented");
	 let weapon19 = new Blaster("Banger","A simple, energy efficient blaster.  Your ships starting weapon may not be exciting, but it gets the job done. This launches a bomb at a moderate 12 p/f relative velocity, exploding on contact, or after a few seconds, doing damage in a small area",300,"plain",                            
	 12,6,10,12,2,10,0.8,0.2,10,1,0,0,40,8,10,12,"skyblue","ID not implemented");
	
	 return [weapon0,weapon1,weapon2,weapon3,weapon4,weapon5,weapon6,weapon7,weapon8,weapon9,weapon10,weapon11,weapon12,weapon13,weapon14,weapon15,weapon16,weapon17,weapon18,weapon19];
	}//Might not need baseblastercopy function here because each time the bhblasters function is called it creates fresh new weapons.
let allblasters = bhblasters(); //Sort of legacy support
 function baseblastercopy(old){//Creates a new Blaster with same base stats as old Blaster.  Upgrades are not copied.
	let tempblaster = new Blaster(old.name,old.description,old.price,old.type,                                                            
	old.bhurt,old.uphurt,old.maxhurt,old.bspeed,old.upspeed,old.maxspeed,old.bboom,old.upboom,old.maxboom,old.bn,old.upn,old.maxn,
	old.btimer,old.uptimer,old.maxtimer,old.ecost,old.c,old.id);
	return tempblaster;
 }