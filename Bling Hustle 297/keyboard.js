
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  if (event.key == "u"){
    myi++;
    if (myi>systems[ps].players.length-1){
      myi=0;
      }
    }else if (event.key == "i"){
      var aplayer = new Player();
    aplayer.ship.hp = 1000;
    aplayer.ship.maxhp = 1000;
    aplayer.ship.shield = 200;
    aplayer.ship.maxshield = 200;
    aplayer.ship.parentid = 3;
    aplayer.blasters.push(baseblastercopy(allblasters[0]),baseblastercopy(allblasters[1]),baseblastercopy(allblasters[2]),baseblastercopy(allblasters[3]),baseblastercopy(allblasters[4]),baseblastercopy(allblasters[5]),baseblastercopy(allblasters[6]),baseblastercopy(allblasters[7]),baseblastercopy(allblasters[8]),baseblastercopy(allblasters[9]));
    aplayer.blasters[1].phas = true;
    aplayer.ship.c = randcolor();
    aplayer.ship.c2 = randcolor();
    var randomsides = Math.floor(Math.random()*8)*2+8; //randomized side number
    var randomplayerverts = randpolarpoly(randomsides, 0.25);//sides,  minimum radius
    normalizepoly(randomplayerverts); //Makes the ship have at least 2 vertices at maximum radius (1).
    aplayer.ship.polytheta = randomplayerverts[0];//Assigns randomized polygon
    aplayer.ship.polyradius = randomplayerverts[1]; //to player1 ship
    aplayer.ship.ai = "player";

    var i=0;
    while(i<systems.length){
      systems[i].players.push(aplayer);
      i++;
    }
    systems[ps].players[systems[ps].players.length-1].ship.setorbit(systems[ps].planets[0], 32000, 0.215+Math.random()*0.01, 1);
    systems[ps].players[systems[ps].players.length-1].storystate = 999;
    systems[ps].players[systems[ps].players.length-1].name = "ID "+ time;
    console.log("there are now "+systems[ps].players.length+" players.");
    console.log("Last players name  "+systems[ps].players[systems[ps].players.length-1].name);
    }else if ((event.key == "o")&&(systems[ps].players.length>1)){
      var i=0;
      while(i<systems.length){
        systems[i].players.splice(myi,1);
        i++;
        }
      if (myi >=systems[ps].players.length){ myi = 0; }
      console.log("there are now "+systems[ps].players.length+" players.");
      }
      var theplayer = systems[ps].players[myi];
      theplayer.input = event.key;
      systems[ps].playerkeys();
  event.preventDefault();// Cancel the default action to avoid it being handled twice
}, true);	//end of event key handling, not clear what the ", true);" is about		

