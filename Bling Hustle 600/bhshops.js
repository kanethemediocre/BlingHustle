
let repairshopitem = new Shopitem("upgrade",0,"repair",0);
// w1 excluded because player starts with it
let buyw0item = new Shopitem("blaster",0,"buy",0);//Probe weapon
let buyw2item = new Shopitem("blaster",2,"buy",0); //Mine weapon w1 excluded because player starts with it
let buyw3item = new Shopitem("blaster",3,"buy",0); //Flakker weapon
let buyw4item = new Shopitem("blaster",4,"buy",0);//Railgun weapon
let buyw5item = new Shopitem("blaster",5,"buy",0);//Scatter cannon weapon
let buyw6item = new Shopitem("blaster",6,"buy",0);//Beam weapon
let buyw7item = new Shopitem("blaster",7,"buy",0);//Double rainbow
let buyw8item = new Shopitem("blaster",8,"buy",0);//Disintegrator
let buyw9item = new Shopitem("blaster",9,"buy",0);//Beepadoop
//let buyw10item = new Shopitem("blaster",10,"buy",0);//Probe weapon
let buyw11item = new Shopitem("blaster",11,"buy",0);//Probe weapon
let buyw12item = new Shopitem("blaster",12,"buy",0); //Mine weapon w1 excluded because player starts with it
let buyw13item = new Shopitem("blaster",13,"buy",0); //Flakker weapon
let buyw14item = new Shopitem("blaster",14,"buy",0);//Railgun weapon
let buyw15item = new Shopitem("blaster",15,"buy",0);//Scatter cannon weapon
let buyw16item = new Shopitem("blaster",16,"buy",0);//Beam weapon
let buyw17item = new Shopitem("blaster",17,"buy",0);//Double rainbow
let buyw18item = new Shopitem("blaster",18,"buy",0);//Disintegrator
let buyw19item = new Shopitem("blaster",19,"buy",0);//Beepadoop
let blasterbuyitems = [buyw0item,buyw2item,buyw3item,buyw4item,buyw5item,buyw6item,buyw7item,buyw8item,buyw9item,buyw11item,buyw12item,buyw13item,buyw14item,buyw15item,buyw16item,buyw17item,buyw18item,buyw19item];

//No remote detonator for w0, w3,w4,w6,w7,w8 (probe, flakker, railgun, beam, double rainbow, disintigrator)
let remotew1item = new Shopitem("blaster",1,"remote",1);//blaster remote upgrade
let remotew2item = new Shopitem("blaster",2,"remote",1); //Mine remote detonator upgrade
let remotew5item = new Shopitem("blaster",5,"remote",1); //Scatter cannon remote detonator upgrade
let remotew9item = new Shopitem("blaster",9,"remote",1); //Beepadoop remote detonator upgrade
let remotew11item = new Shopitem("blaster",11,"remote",1);
let remotew12item = new Shopitem("blaster",12,"remote",1); //MultiMine remote detonator upgrade

//No damage upgrade for w0 (probe)
let upw1damage = new Shopitem("blaster",1,"damage",1); //Damage upgrades
let upw2damage = new Shopitem("blaster",2,"damage",1); 
let upw3damage = new Shopitem("blaster",3,"damage",1); 
let upw4damage = new Shopitem("blaster",4,"damage",1); 
let upw5damage = new Shopitem("blaster",5,"damage",1); 
let upw6damage = new Shopitem("blaster",6,"damage",1); 
let upw7damage = new Shopitem("blaster",7,"damage",1); 
let upw8damage = new Shopitem("blaster",8,"damage",1); 
let upw9damage = new Shopitem("blaster",9,"damage",1); 
let upw11damage = new Shopitem("blaster",11,"damage",1); //Damage upgrades
let upw12damage = new Shopitem("blaster",12,"damage",1); 
let upw13damage = new Shopitem("blaster",13,"damage",1); 
let upw14damage = new Shopitem("blaster",14,"damage",1); 
let upw15damage = new Shopitem("blaster",15,"damage",1); 
let upw16damage = new Shopitem("blaster",16,"damage",1); 
let upw17damage = new Shopitem("blaster",17,"damage",1); 
let upw18damage = new Shopitem("blaster",18,"damage",1); 
let upw19damage = new Shopitem("blaster",19,"damage",1); 
//speed upgrade available to all blasters -- might exclude mine later, maybe also double rainbow
let upw0speed = new Shopitem("blaster",0,"speed",1); //speed  upgrades increase projectile speed
let upw1speed = new Shopitem("blaster",1,"speed",1); 
let upw2speed = new Shopitem("blaster",2,"speed",1); 
let upw3speed = new Shopitem("blaster",3,"speed",1); 
let upw4speed = new Shopitem("blaster",4,"speed",1); 
let upw5speed = new Shopitem("blaster",5,"speed",1); 
let upw7speed = new Shopitem("blaster",7,"speed",1); 
let upw8speed = new Shopitem("blaster",8,"speed",1); 
let upw9speed = new Shopitem("blaster",9,"speed",1); 
//let upw10speed = new Shopitem("blaster",10,"speed",1); //speed  upgrades increase projectile speed
let upw11speed = new Shopitem("blaster",11,"speed",1); 
let upw12speed = new Shopitem("blaster",12,"speed",1); 
let upw13speed = new Shopitem("blaster",13,"speed",1); 
let upw14speed = new Shopitem("blaster",14,"speed",1); 
let upw15speed = new Shopitem("blaster",15,"speed",1); 
let upw17speed = new Shopitem("blaster",17,"speed",1); 
let upw18speed = new Shopitem("blaster",18,"speed",1); 
let upw19speed = new Shopitem("blaster",19,"speed",1); 
//No bounce upgrade for w0, w3, w6, or w7 (probe, flakker, beam double rainbow)
let upw1bounce = new Shopitem("blaster",1,"bounce",1); //bounce upgrades make projectiles bounce of planets--in theory anyways.
let upw2bounce = new Shopitem("blaster",2,"bounce",1); //these are now unused because they dont work, would be nice if they did.
let upw4bounce = new Shopitem("blaster",4,"bounce",1); 
let upw5bounce = new Shopitem("blaster",5,"bounce",1); 
let upw8bounce = new Shopitem("blaster",8,"bounce",1); 
let upw9bounce = new Shopitem("blaster",9,"bounce",1); 
//no bounce for 10-19 because bounce doesnt work anyways.
let upw0timer = new Shopitem("blaster",0,"timer",1); //timer upgrades increase projectile lifespan
let upw1timer = new Shopitem("blaster",1,"timer",1); 
let upw2timer = new Shopitem("blaster",2,"timer",1); 
let upw3timer = new Shopitem("blaster",3,"timer",1); 
let upw4timer = new Shopitem("blaster",4,"timer",1); 
let upw5timer = new Shopitem("blaster",5,"timer",1); 
let upw6timer = new Shopitem("blaster",6,"timer",1); 
let upw7timer = new Shopitem("blaster",7,"timer",1); //No timer upgrade for w6 (beam)
let upw8timer = new Shopitem("blaster",8,"timer",1); 
let upw9timer = new Shopitem("blaster",9,"timer",1); 
//let upw10timer = new Shopitem("blaster",10,"timer",1); //timer upgrades increase projectile lifespan
let upw11timer = new Shopitem("blaster",11,"timer",1); 
let upw12timer = new Shopitem("blaster",12,"timer",1); 
let upw13timer = new Shopitem("blaster",13,"timer",1); 
let upw14timer = new Shopitem("blaster",14,"timer",1); 
let upw15timer = new Shopitem("blaster",15,"timer",1); 
let upw16timer = new Shopitem("blaster",16,"timer",1); 
let upw17timer = new Shopitem("blaster",17,"timer",1); //No timer upgrade for w6 (beam)
let upw18timer = new Shopitem("blaster",18,"timer",1); 
let upw19timer = new Shopitem("blaster",19,"timer",1); 
//No boom upgrade for w0, w4, w6,w7 (probe, railgun, beam, double rainbow)
let upw1boom = new Shopitem("blaster",1,"boom",1);//boom upgrades increase blast radius
let upw2boom = new Shopitem("blaster",2,"boom",1);
let upw3boom = new Shopitem("blaster",3,"boom",1);
let upw5boom = new Shopitem("blaster",5,"boom",1);
let upw8boom = new Shopitem("blaster",8,"boom",1);
let upw9boom = new Shopitem("blaster",9,"boom",1);
let upw11boom = new Shopitem("blaster",11,"boom",1);//boom upgrades increase blast radius
let upw12boom = new Shopitem("blaster",12,"boom",1);
let upw13boom = new Shopitem("blaster",13,"boom",1);
let upw15boom = new Shopitem("blaster",15,"boom",1);
let upw17boom = new Shopitem("blaster",15,"boom",1);
let upw18boom = new Shopitem("blaster",18,"boom",1);
let upw19boom = new Shopitem("blaster",19,"boom",1);
//Only a few blasters get n upgrades (more projectiles). 
let upw3n = new Shopitem("blaster",3,"n",1);
let upw5n = new Shopitem("blaster",5,"n",1);
let upw9n = new Shopitem("blaster",9,"n",1);
let upw11n = new Shopitem("blaster",11,"n",1);
let upw12n = new Shopitem("blaster",12,"n",1);
let upw13n = new Shopitem("blaster",13,"n",1);
//let upw15n = new Shopitem("blaster",15,"n",1);
let upw17n = new Shopitem("blaster",17,"n",1);


let blasterupgradeitems = [ //broken up into lines for readability, this is all a single 1 dimensional array.
remotew1item,remotew2item,remotew5item,remotew9item,remotew12item,
upw1damage,upw2damage,upw3damage,upw4damage,upw5damage,upw6damage,upw7damage,upw8damage,upw9damage,upw11damage,upw12damage,upw13damage,upw14damage,upw15damage,upw16damage,upw17damage,upw18damage,upw19damage,
upw0speed,upw1speed,upw2speed,upw3speed,upw4speed,upw5speed,upw7speed,upw8speed,upw9speed,upw11speed,upw12speed,upw13speed,upw14speed,upw15speed,upw17speed,upw18speed,upw19speed,
//upw1bounce,upw2bounce,upw4bounce,upw5bounce,upw8bounce,upw9bounce,//bounce upgrades nonfunctional, removed
upw0timer,upw1timer,upw2timer,upw3timer,upw4timer,upw5timer,upw6timer,upw7timer,upw8timer,upw9timer,upw11timer,upw12timer,upw13timer,upw14timer,upw15timer,upw16timer,upw17timer,upw18timer,upw19timer,
upw1boom,upw2boom,upw3boom,upw5boom,upw8boom,upw9boom,upw11boom,upw12boom,upw13boom,upw15boom,upw17boom,upw18boom,upw19boom,
upw3n,upw5n,upw9n,upw11n,upw12n,upw13n,upw17n //upw8n removed
];
let booster1 = new Shopitem("booster",0,"buy",1); //Tier 0 booster

let buycargo0 = new Shopitem("cargo",0,"buy",1);//The upgrade tier variable will used as a price multiplier for cargo
let buycargo1 = new Shopitem("cargo",1,"buy",1); 
let buycargo2 = new Shopitem("cargo",2,"buy",1); 
let buycargo3 = new Shopitem("cargo",3,"buy",1); 
let buycargo4 = new Shopitem("cargo",4,"buy",1);
let buycargo5 = new Shopitem("cargo",5,"buy",1);
let buycargo6 = new Shopitem("cargo",6,"buy",1);
let buycargo7 = new Shopitem("cargo",7,"buy",1);
let buycargo8 = new Shopitem("cargo",8,"buy",1);
let buycargo9 = new Shopitem("cargo",9,"buy",1);
let buycargo10 = new Shopitem("cargo",10,"buy",1);
let buycargo11 = new Shopitem("cargo",11,"buy",1);
let buycargo12 = new Shopitem("cargo",12,"buy",1);
var cargoitems = [buycargo0,buycargo1,buycargo2,buycargo3,buycargo4,buycargo5,buycargo6,buycargo7,buycargo8,buycargo9,buycargo10,buycargo11,buycargo12];

let uprepairitem = new Shopitem("upgrade",0,"repair",0);
let uparmoritem = new Shopitem("upgrade",1,"armor",0);
let upshielditem = new Shopitem("upgrade",2,"shield",0);
let upshieldregenitem = new Shopitem("upgrade",3,"shieldregen",0);
let upradaritem = new Shopitem("upgrade",4,"radar",0);
let upcargoitem = new Shopitem("upgrade",5,"cargo",0);
let upthrustitem = new Shopitem("upgrade",6,"thrust",0);
let upsensoritem = new Shopitem("upgrade",7,"sensor",0);
let upsolaritem = new Shopitem("upgrade",8,"solar",0);
let upimpactitem = new Shopitem("upgrade",9,"impact",0);
//let brandchassisitem = new Shopitem("chassis",0,"brand",0);
let randomchassisitem = new Shopitem("chassis",0,"random",0);
var upgradeshopitems = [uprepairitem,uparmoritem,upshielditem,upshieldregenitem,upradaritem,upcargoitem,upthrustitem,upsensoritem,upsolaritem,upimpactitem,randomchassisitem];

let merzianshopitems = [repairshopitem,buyw2item,buyw3item,buyw4item,remotew1item,booster1,buyw0item];
let merrymerz = new Shop("The Merry Merzian", 1, "I have these fine tapestries....", merzianshopitems);
let billshopitems = [repairshopitem,buyw2item,buyw3item,upw1damage,upw3damage,uparmoritem]
let billbits = new Shop("Bills Billion Bits", 0, "Welcome to Earf", billshopitems);
let jojoshopitems = [repairshopitem,buyw5item,buyw6item,buyw9item,remotew2item,uparmoritem,upshielditem,upradaritem];
let jojocheese = new Shop("JoJo's House of Cheese", 2, "Jupe Fantastico", jojoshopitems);
let dangshopitems = [repairshopitem,buyw4item,buyw7item,buyw8item,upw4speed,upw5n,upw1damage,upshieldregenitem];
let dangustown = new Shop("Dangustown", 3, "It's YOUR Anus!", dangshopitems);
let sharonshopitems = [repairshopitem,buyw2item,buyw0item,upw0speed,upw0timer,upsensoritem];
let sharons = new Shop("Sharon's Scientific Supplies", 4, "wubbasomethinggoeshere", sharonshopitems);
let randshopitems1 = [];
var i = 0;
while (i<12){
	var randomblasterupgrade = Math.floor(Math.random()*blasterupgradeitems.length)
	randshopitems1.push(blasterupgradeitems[randomblasterupgrade]);
	i=i+1;
}
let randoshop1 = new Shop("Rando Calrissian's Blaster Upgrades",5, "Randomized items", randshopitems1);
//var upgradeshopitems = [uprepairitem,uparmoritem,upshielditem,upshieldregenitem,upradaritem,upcargoitem,upthrustitem,upsensoritem,upsolaritem,upimpactitem,randomchassisitem];
let upgradeshop = new Shop("All Upgrades Testing Shop",6, "Upgrades", upgradeshopitems);

let allshops = [billbits,merrymerz,jojocheese,dangustown,sharons,randoshop1,upgradeshop];//"all" meaning home system

let dadashopitems = [uprepairitem,buyw2item,buyw3item,buyw4item,upw1damage,upw4damage,uparmoritem];
let dadashop = new Shop("Ye Olde Space Shoppe",0,"The Gentleman's Outfitter",dadashopitems);
let hijoshopitems = [uprepairitem,buyw5item,buyw6item,buyw8item,remotew2item,upw3damage,upw5n];
let hijoshop = new Shop("Not Your Dada's Spaceport",1,"Welcome to our new location",hijoshopitems);
let fantshopitems = [uprepairitem,buyw2item,buyw7item,buyw0item,upw2boom,upw5damage,upw8damage];
let fantshop = new Shop("Want-Fant",2,"You want it, Fant has it.",fantshopitems);
let stanshopitems = [uprepairitem,buyw3item,buyw6item,buyw9item,upw6timer,upw8boom];
let stanshop = new Shop("Shifty Steve's Questionable Commodities",3,"Everything your legitimate business needs.",stanshopitems);
let trinidadshops = [dadashop,hijoshop,fantshop,stanshop];

let arisshopitems = [uprepairitem,buyw4item,buyw6item,buyw7item,upw4speed,upw4timer,upw6damage,upw5n,buycargo1,buycargo2,buycargo4];
let arisshop = new Shop("The Foob",0,"yaaaaa",arisshopitems);
let luxeshopitems = [uprepairitem,buyw2item,buyw5item,buyw8item,upw5damage,upw5boom,upw5n];
let luxeshop = new Shop("The Luxemburger",1,"mmmmmm",luxeshopitems);
let napashops = [arisshop,luxeshop];
