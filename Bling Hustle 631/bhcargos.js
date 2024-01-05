function bhcargos(){
	let iron = new Cargo("Iron","A common element throughout space, this magnetic and strong metal can form a tremendous number of useful alloys.", 100);//0
	iron.origintype = "mine";
	iron.demandtype = "manu";
	let water = new Cargo("Water","A necessity for life and a lot of useful chemistry, water is in demand despite not being hard to find.", 50);//1
	water.origintype = "mine";
	water.demandtype = "farm";
	let phosphorus = new Cargo("Phosphorus","Phosphorus is a necessary element for life as we know it, and unlike water it's also quite rare.",500);//2
	phosphorus.origintype = "mine";
	phosphorus.demandtype = "farm";
	let oxygen = new Cargo("Oxygen","It's good for breathing.",100);//3
	oxygen.origintype = "mine";
	let cheese = new Cargo("Cheese","A valuable type of spoiled milk, cheese is a delicacy that many humans refuse to live without.",200);//4
	cheese.origintype = "farm";
	let weet = new Cargo("Weet","Weet is a genetically engineered grain optimized to provide a high calorie density without being too needy to grow in space.",150);//5
	weet.origintype = "farm";
	let tendies = new Cargo("Tendies","Tendies are a popular snack containing high amounts of salt and protein of unspecified origin.",180);//6
	tendies.origintype = "farm";
	let dankcheese = new Cargo("Dank Cheese","Cheese is already a valuable commodity in deep space, but the dankest of cheeses can fetch even higher prices with the right buyer",600);//7
	dankcheese.origintype = "farm";
	let minebot = new Cargo("Mining robots","Mining robots are optimized for digging and bulk material transportation.",200);//8
	minebot.origintype = "manu";
	minebot.demandtype = "mine";
	let farmbot = new Cargo("Farming robots","Farming robots are optimized for pruning, planting, picking, and ploughing.",200);//9
	farmbot.origintype = "manu";
	farmbot.demandtype = "farm";
	let servebot = new Cargo("Service robots","Service robots are optimized for cooking, cleaning, and carrying.  Ubiquitous in customer-facing businesses",200);//10
	servebot.origintype = "manu";
	let szyrup = new Cargo("Sweet Juice","Ubiquitous beverage of choice in deep space settlements.  It's pretty good if you don't ask too many questions about it.",250);//11
	szyrup.origintype = "misc";
	let tinywizards = new Cargo("Tiny Wizards","Widely used for tabletop gaming, these figurines are inexplicably valuable in some markets",80);//12
	tinywizards.origintype = "misc";
	let missioncargo = new Cargo("Mission cargo","They don't tell you what's in the crates.  They just tell you where to take them.",1);//13
	return [iron,water,phosphorus,oxygen,cheese,weet,tendies,dankcheese,minebot,farmbot,servebot,szyrup,tinywizards,missioncargo];
	}
var allcargos = bhcargos();