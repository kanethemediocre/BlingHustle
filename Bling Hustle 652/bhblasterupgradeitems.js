function bhblasterupgradeitems(){
	//No remote detonator for w0, w3,w4,w6,w7,w8 (probe, flakker, railgun, beam, double rainbow, disintigrator)
	let remotew1item = new Shopitem("blaster",1,"remote",1);//0 blaster remote upgrade
	let remotew2item = new Shopitem("blaster",2,"remote",1);//1 Mine remote detonator upgrade
	let remotew5item = new Shopitem("blaster",5,"remote",1);//2 Scatter cannon remote detonator upgrade
	let remotew9item = new Shopitem("blaster",9,"remote",1);//3 Beepadoop remote detonator upgrade
	let remotew11item = new Shopitem("blaster",11,"remote",1);//4
	let remotew12item = new Shopitem("blaster",12,"remote",1); //5 MultiMine remote detonator upgrade
	//No damage upgrade for w0 (probe)
	let upw1damage = new Shopitem("blaster",1,"damage",1); //6 Damage upgrades
	let upw2damage = new Shopitem("blaster",2,"damage",1); //7 
	let upw3damage = new Shopitem("blaster",3,"damage",1); //8
	let upw4damage = new Shopitem("blaster",4,"damage",1); //9
	let upw5damage = new Shopitem("blaster",5,"damage",1); //10
	let upw6damage = new Shopitem("blaster",6,"damage",1); //11
	let upw7damage = new Shopitem("blaster",7,"damage",1); //12
	let upw8damage = new Shopitem("blaster",8,"damage",1); //13
	let upw9damage = new Shopitem("blaster",9,"damage",1); //14
	let upw11damage = new Shopitem("blaster",11,"damage",1); //15 Damage upgrades
	let upw12damage = new Shopitem("blaster",12,"damage",1); //16
	let upw13damage = new Shopitem("blaster",13,"damage",1); //17
	let upw14damage = new Shopitem("blaster",14,"damage",1); //18
	let upw15damage = new Shopitem("blaster",15,"damage",1); //19
	let upw16damage = new Shopitem("blaster",16,"damage",1); //20
	let upw17damage = new Shopitem("blaster",17,"damage",1); //21
	let upw18damage = new Shopitem("blaster",18,"damage",1); //22
	let upw19damage = new Shopitem("blaster",19,"damage",1); //23
	//speed upgrade available to all blasters -- might exclude mine later, maybe also double rainbow
	let upw0speed = new Shopitem("blaster",0,"speed",1); //24 speed  upgrades increase projectile speed
	let upw1speed = new Shopitem("blaster",1,"speed",1); //25
	//let upw2speed = new Shopitem("blaster",2,"speed",1); //26
	let upw3speed = new Shopitem("blaster",3,"speed",1); //26
	let upw4speed = new Shopitem("blaster",4,"speed",1); //27
	let upw5speed = new Shopitem("blaster",5,"speed",1); //28
	let upw7speed = new Shopitem("blaster",7,"speed",1); //29
	let upw8speed = new Shopitem("blaster",8,"speed",1); //30
	let upw9speed = new Shopitem("blaster",9,"speed",1); //31
	//let upw10speed = new Shopitem("blaster",10,"speed",1); //speed  upgrades increase projectile speed
	let upw11speed = new Shopitem("blaster",11,"speed",1); //32
	let upw12speed = new Shopitem("blaster",12,"speed",1); //33
	let upw13speed = new Shopitem("blaster",13,"speed",1); //34
	let upw14speed = new Shopitem("blaster",14,"speed",1); //35
	let upw15speed = new Shopitem("blaster",15,"speed",1); //36
	let upw17speed = new Shopitem("blaster",17,"speed",1); //37
	let upw18speed = new Shopitem("blaster",18,"speed",1); //38
	let upw19speed = new Shopitem("blaster",19,"speed",1); //39
	//No bounce upgrade for w0, w3, w6, or w7 (probe, flakker, beam double rainbow)
	let upw1bounce = new Shopitem("blaster",1,"bounce",1); // bounce upgrades make projectiles bounce of planets--in theory anyways.
	let upw2bounce = new Shopitem("blaster",2,"bounce",1); // these are now unused because they dont work, would be nice if they did.
	let upw4bounce = new Shopitem("blaster",4,"bounce",1); //
	let upw5bounce = new Shopitem("blaster",5,"bounce",1); //
	let upw8bounce = new Shopitem("blaster",8,"bounce",1); //
	let upw9bounce = new Shopitem("blaster",9,"bounce",1); //
	//no bounce for 10-19 because bounce doesnt work anyways.
	let upw0timer = new Shopitem("blaster",0,"timer",1); //40 timer upgrades increase projectile lifespan
	let upw1timer = new Shopitem("blaster",1,"timer",1); //41
	let upw2timer = new Shopitem("blaster",2,"timer",1); //42
	let upw3timer = new Shopitem("blaster",3,"timer",1); //43
	let upw4timer = new Shopitem("blaster",4,"timer",1); //44
	let upw5timer = new Shopitem("blaster",5,"timer",1); //45
	let upw6timer = new Shopitem("blaster",6,"timer",1); //46
	let upw7timer = new Shopitem("blaster",7,"timer",1); //47 
	let upw8timer = new Shopitem("blaster",8,"timer",1); //48
	let upw9timer = new Shopitem("blaster",9,"timer",1); //49
	//let upw10timer = new Shopitem("blaster",10,"timer",1); //timer upgrades increase projectile lifespan
	let upw11timer = new Shopitem("blaster",11,"timer",1); //50
	let upw12timer = new Shopitem("blaster",12,"timer",1); //51
	let upw13timer = new Shopitem("blaster",13,"timer",1); //52
	let upw14timer = new Shopitem("blaster",14,"timer",1); //53
	let upw15timer = new Shopitem("blaster",15,"timer",1); //54
	let upw16timer = new Shopitem("blaster",16,"timer",1); //55
	let upw17timer = new Shopitem("blaster",17,"timer",1); //56 
	let upw18timer = new Shopitem("blaster",18,"timer",1); //57
	let upw19timer = new Shopitem("blaster",19,"timer",1); //58
	//No boom upgrade for w0, w4, w6,w7 (probe, railgun, beam, double rainbow)
	let upw1boom = new Shopitem("blaster",1,"boom",1);//59 boom upgrades increase blast radius
	let upw2boom = new Shopitem("blaster",2,"boom",1);//60
	let upw3boom = new Shopitem("blaster",3,"boom",1);//61
	let upw5boom = new Shopitem("blaster",5,"boom",1);//62
	let upw8boom = new Shopitem("blaster",8,"boom",1);//63
	let upw9boom = new Shopitem("blaster",9,"boom",1);//64
	let upw11boom = new Shopitem("blaster",11,"boom",1);//65 boom upgrades increase blast radius
	let upw12boom = new Shopitem("blaster",12,"boom",1);//66
	let upw13boom = new Shopitem("blaster",13,"boom",1);//67
	let upw15boom = new Shopitem("blaster",15,"boom",1);//68
	let upw17boom = new Shopitem("blaster",15,"boom",1);//69
	let upw18boom = new Shopitem("blaster",18,"boom",1);//70
	let upw19boom = new Shopitem("blaster",19,"boom",1);//71
	//Only a few blasters get n upgrades (more projectiles). 
	let upw3n = new Shopitem("blaster",3,"n",1);//72
	let upw5n = new Shopitem("blaster",5,"n",1);//73
	let upw9n = new Shopitem("blaster",9,"n",1);//74
	let upw11n = new Shopitem("blaster",11,"n",1);//75
	let upw12n = new Shopitem("blaster",12,"n",1);//76
	let upw13n = new Shopitem("blaster",13,"n",1);//77
	//let upw15n = new Shopitem("blaster",15,"n",1);
	let upw17n = new Shopitem("blaster",17,"n",1);//78
	return [ //broken up into lines for readability, this is all a single 1 dimensional array.
	remotew1item,remotew2item,remotew5item,remotew9item,remotew11item,remotew12item,
	upw1damage,upw2damage,upw3damage,upw4damage,upw5damage,upw6damage,upw7damage,upw8damage,upw9damage,upw11damage,upw12damage,upw13damage,upw14damage,upw15damage,upw16damage,upw17damage,upw18damage,upw19damage,
	upw0speed,upw1speed,upw3speed,upw4speed,upw5speed,upw7speed,upw8speed,upw9speed,upw11speed,upw12speed,upw13speed,upw14speed,upw15speed,upw17speed,upw18speed,upw19speed,
	upw0timer,upw1timer,upw2timer,upw3timer,upw4timer,upw5timer,upw6timer,upw7timer,upw8timer,upw9timer,upw11timer,upw12timer,upw13timer,upw14timer,upw15timer,upw16timer,upw17timer,upw18timer,upw19timer,
	upw1boom,upw2boom,upw3boom,upw5boom,upw8boom,upw9boom,upw11boom,upw12boom,upw13boom,upw15boom,upw17boom,upw18boom,upw19boom,
	upw3n,upw5n,upw9n,upw11n,upw12n,upw13n,upw17n ];
	}
