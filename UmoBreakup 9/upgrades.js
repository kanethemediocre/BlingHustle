class Upgrade{
	constructor(name,description,price,type,tier,ID){
		this.name = name;//"Super blaster"
		this.description=description; //"The super blaster is super dope"
		this.price = price;
		this.type = type;
		this.id = ID;
		}
	}
allupgrades = [];
allupgrades.push(new Upgrade("Blaster II","Adds a remote detonator to the w1 blaster",1000,"w01x02",0));
allupgrades.push(new Upgrade("Blaster III","Increases blast radius of w1 blaster",2000,"w01x03",1));
allupgrades.push(new Upgrade("Blaster IV","Increases damage of w1 blaster",4000,"w01x04",2));
allupgrades.push(new Upgrade("Blaster V","Increases damage of w1 blaster",8000,"w01x05",3));
allupgrades.push(new Upgrade("Blaster VI","Increases damage of w1 blaster",16000,"w01x06",4));
allupgrades.push(new Upgrade("Blaster VII","Increases damage of w1 blaster",32000,"w01x07",5));
allupgrades.push(new Upgrade("Blaster VIII","Increases damage of w1 blaster",64000,"w01x08",6));
allupgrades.push(new Upgrade("Blaster IX","Increases damage of w1 blaster",128000,"w01x09",7));
allupgrades.push(new Upgrade("Blaster X","Increases damage of w1 blaster",128000,"w01x10",8));
allupgrades.push(new Upgrade("Mine I","Adds w2 Mine Launcher",800,"w02x01",9));
allupgrades.push(new Upgrade("Mine II","Adds remote detonation to w2 Mine",1600,"w02x02",10));
allupgrades.push(new Upgrade("Mine III","Adds bouncing to w2 Mine",3200,"w02x03",11));
allupgrades.push(new Upgrade("Mine IV","Adds damage to w2 Mine",6400,"w02x04",12));
allupgrades.push(new Upgrade("Mine V","Adds damage to w2 Mine",12800,"w02x05",13));
allupgrades.push(new Upgrade("Mine VI","Adds damage to w2 Mine",25600,"w02x06",14));
allupgrades.push(new Upgrade("Mine VII","Adds damage to w2 Mine",51200,"w02x07",15));
allupgrades.push(new Upgrade("Mine VIII""Adds damage to w2 Mine",102400,"w02x08",16));
allupgrades.push(new Upgrade("Mine IX","Adds damage to w2 Mine",204800,"w02x09",17));
allupgrades.push(new Upgrade("Mine X","Adds damage to w2 Mine",409600,"w02x09",18));