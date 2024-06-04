
let repairshopitem = new Shopitem("upgrade",0,"repair",0);

let blasterbuyitems = bhblasterbuyitems();//[buyw0item,buyw2item,buyw3item,buyw4item,buyw5item,buyw6item,buyw7item,buyw8item,buyw9item,buyw11item,buyw12item,buyw13item,buyw14item,buyw15item,buyw16item,buyw17item,buyw18item,buyw19item];
console.log(blasterbuyitems);

let blasterupgradeitems = bhblasterupgradeitems();
console.log(blasterupgradeitems);

let booster1 = new Shopitem("booster",0,"buy",1); //Tier 0 booster

var cargoitems = bhcargoitems();//[buycargo0,buycargo1,buycargo2,buycargo3,buycargo4,buycargo5,buycargo6,buycargo7,buycargo8,buycargo9,buycargo10,buycargo11,buycargo12];
console.log(cargoitems);

var upgradeshopitems = bhupgradeitems();//[uprepairitem,uparmoritem,upshielditem,upshieldregenitem,upradaritem,upcargoitem,upthrustitem,upsensoritem,upsolaritem,upimpactitem,randomchassisitem];
console.log(upgradeshopitems);
let merzianshopitems = [repairshopitem,blasterbuyitems[1],blasterbuyitems[2],blasterbuyitems[3],blasterupgradeitems[8],booster1,upgradeshopitems[1]];
let merrymerz = new Shop("The Merry Merzian", 1, "I have these fine tapestries....", merzianshopitems);
let billshopitems = [repairshopitem,blasterbuyitems[1],blasterbuyitems[2],blasterupgradeitems[6],blasterupgradeitems[7],upgradeshopitems[2]];
let billbits = new Shop("Bills Billion Bits", 0, "Welcome to Earf", billshopitems);
let jojoshopitems = [repairshopitem,blasterbuyitems[4],blasterbuyitems[5],blasterbuyitems[6],blasterupgradeitems[1],upgradeshopitems[1],upgradeshopitems[2],upgradeshopitems[5]];
let jojocheese = new Shop("JoJo's House of Cheese", 2, "Jupe Fantastico", jojoshopitems);
let dangshopitems = [repairshopitem,blasterbuyitems[3],blasterbuyitems[7],blasterbuyitems[8],blasterupgradeitems[1],blasterupgradeitems[9],blasterupgradeitems[10],blasterupgradeitems[25],upgradeshopitems[6]];
let dangustown = new Shop("Dangustown", 3, "It's YOUR Anus!", dangshopitems);
let sharonshopitems = [repairshopitem,blasterbuyitems[1],blasterbuyitems[0],blasterupgradeitems[40],blasterupgradeitems[24],upgradeshopitems[4],upgradeshopitems[7]];
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

let dadashopitems = [upgradeshopitems[0],blasterbuyitems[1],blasterbuyitems[2],blasterbuyitems[3],blasterbuyitems[9],blasterupgradeitems[6],blasterupgradeitems[72],upgradeshopitems[1]];
let dadashop = new Shop("Ye Olde Space Shoppe",0,"The Gentleman's Outfitter",dadashopitems);

let hijoshopitems = [upgradeshopitems[0],blasterbuyitems[4],blasterbuyitems[10],blasterbuyitems[7],blasterupgradeitems[73],blasterupgradeitems[10],blasterupgradeitems[62]];
let hijoshop = new Shop("Not Your Dada's Spaceport",1,"Welcome to our new location",hijoshopitems);

let fantshopitems = [upgradeshopitems[0],blasterbuyitems[12],blasterbuyitems[13],blasterbuyitems[0],blasterupgradeitems[15],blasterupgradeitems[73],blasterupgradeitems[48]];
let fantshop = new Shop("Want-Fant",2,"You want it, Fant has it.",fantshopitems);

let stanshopitems = [upgradeshopitems[0],blasterbuyitems[13],blasterbuyitems[17],blasterbuyitems[8],blasterupgradeitems[13],,blasterupgradeitems[72],blasterupgradeitems[74]];
let stanshop = new Shop("Shifty Steve's Questionable Commodities",3,"Everything your legitimate business needs.",stanshopitems);
let trinidadshops = [dadashop,hijoshop,fantshop,stanshop];

let arisshopitems = [upgradeshopitems[0],blasterbuyitems[5],blasterbuyitems[6],blasterbuyitems[11],blasterbuyitems[14],blasterupgradeitems[0],blasterupgradeitems[11],blasterupgradeitems[46],blasterupgradeitems[67]];
let arisshop = new Shop("The Foob",0,"yaaaaa",arisshopitems);
let luxeshopitems = [upgradeshopitems[0],blasterbuyitems[10],blasterbuyitems[13],blasterbuyitems[13],blasterupgradeitems[76],blasterupgradeitems[18],blasterupgradeitems[65]];
let luxeshop = new Shop("The Luxemburger",1,"mmmmmm",luxeshopitems);
let napashops = [arisshop,luxeshop];
