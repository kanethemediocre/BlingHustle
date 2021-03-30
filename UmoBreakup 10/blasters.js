class Blaster{
	constructor(name,description,price,type,bonus,basedamage,basespeed,baseboom,projectilenum,ID){
		this.name = name;//"Super blaster"
		this.description=description; //"The super blaster is super dope"
		this.price = price; //integer cost of blaster at tier 1
		this.bonus = bonus; //["d05","b01","d08"] would add 5 to damage 1st, then 0.1 to boombuff 2nd, and add 8 to damage for every upgrade 3 and up 
		this.hurt = basedamage;//"d" character denotes bonus to this attribute x1
		this.speed = basespeed;//"s" character denotes bonus to this attribute x1
		this.boombuff = baseboom; //"b" character denotes bonus to this attribute x0.1
		this.c = "red"; //"c" character denotes change to this color, like "cpurple" 
		this.n = projectilenum; //"n" denotes bonus to this attribute, "n2" would add 2 projectiles
		this.id = ID;
		}//w signifies weapon, next 2 digits are weapon number, x signifies notjhing, next 2 digits are upgrade tier
	}
allupgrades = [];
allupgrades.push(new Upgrade("Blaster II","Adds a remote detonator to the w1 blaster",1000,"w01x02r",0));
allupgrades.push(new Upgrade("Blaster III","Increases blast radius of w1 blaster",2000,"w01x03b",1));
allupgrades.push(new Upgrade("Blaster IV","Increases damage of w1 blaster",4000,"w01x04d",2));
allupgrades.push(new Upgrade("Blaster V","Increases damage of w1 blaster",8000,"w01x05d",3));
allupgrades.push(new Upgrade("Blaster VI","Increases damage of w1 blaster",16000,"w01x06d",4));
allupgrades.push(new Upgrade("Blaster VII","Increases damage of w1 blaster",32000,"w01x07d",5));
allupgrades.push(new Upgrade("Blaster VIII","Increases damage of w1 blaster",64000,"w01x08d",6));
allupgrades.push(new Upgrade("Blaster IX","Increases damage of w1 blaster",128000,"w01x09d",7));
allupgrades.push(new Upgrade("Blaster X","Increases damage of w1 blaster",256000,"w01x10d",8));
allupgrades.push(new Upgrade("Mine I","Adds w2 Mine Launcher",800,"w02x01u",9));
allupgrades.push(new Upgrade("Mine II","Adds remote detonation to w2 Mine",1600,"w02x02r",10));
allupgrades.push(new Upgrade("Mine III","Adds bouncing to w2 Mine",3200,"w02x03",11));
allupgrades.push(new Upgrade("Mine IV","Adds damage to w2 Mine",6400,"w02x04",12));
allupgrades.push(new Upgrade("Mine V","Adds damage to w2 Mine",12800,"w02x05",13));
allupgrades.push(new Upgrade("Mine VI","Adds damage to w2 Mine",25600,"w02x06",14));
allupgrades.push(new Upgrade("Mine VII","Adds damage to w2 Mine",51200,"w02x07",15));
allupgrades.push(new Upgrade("Mine VIII""Adds damage to w2 Mine",102400,"w02x08",16));
allupgrades.push(new Upgrade("Mine IX","Adds damage to w2 Mine",204800,"w02x09",17));
allupgrades.push(new Upgrade("Mine X","Adds damage to w2 Mine",409600,"w02x10",18));
allupgrades.push(new Upgrade("Flakker I","Adds w3 Flakker",400,"w03x01u",19));
allupgrades.push(new Upgrade("Flakker II","Reduces energy cost of w3 Flakker",800,"w03x02",20));
allupgrades.push(new Upgrade("Flakker III","Adds damage to w3 Flakker ",1600,"w03x03",21));
allupgrades.push(new Upgrade("Flakker IV","Adds damage to w3 Flakker ",3200,"w03x04",22));
allupgrades.push(new Upgrade("Flakker V","Adds damage to w3 Flakker ",6400,"w03x05",23));
allupgrades.push(new Upgrade("Flakker VI","Adds damage to w3 Flakker ",12800,"w03x06",24));
allupgrades.push(new Upgrade("Flakker VII","Adds damage to w3 Flakker ",25600,"w03x07",25));
allupgrades.push(new Upgrade("Flakker VIII","Adds damage to w3 Flakker ",51200,"w03x08",26));
allupgrades.push(new Upgrade("Flakker IX","Adds damage to w3 Flakker ",102400,"w03x09",27));
allupgrades.push(new Upgrade("Flakker X","Adds damage to w3 Flakker ",204800,"w03x010",28));
