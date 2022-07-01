
function storycheck(playerindex){
var myplayer = systems[ps].players[playerindex];
var dstory = time - myplayer.storytime;
if ((myplayer.storywarn < 1)&&(myplayer.upgrades[7].tier>0)){
	myplayer.storyreturn = myplayer.storystate;
	myplayer.storystate = 1000;
	myplayer.storywarn = 1;
	}
switch(myplayer.storystate){//Tutorial missions so far.
	case 0:
		if (dstory>1){
			var themsg = "Don't touch anything just yet.  Some people think all you need to know is right click zoom left click boom, but getting anywhere in particular is more complicated.  Learn to use your ship's map and nav computer, or you'll find what space is really made made of:  Nothing.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
		break;
	case 1:
		if (dstory>playerradio.msgtime){
			var themsg = "The N key will activate or retask your nav computer, which displays on the bottom right.  The < and > keys will cycle through available nav targets, use them to select Merz.  The nav computer indicates much more than direction and distance if you're interested, but most of the time that's all you need.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Select Merz on your nav computer (N,<,>)";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
		break;
	case 2:
		if ((myplayer.navtarget==5)&&(myplayer.navactive==1)){
			var themsg = "Great!  You'll be going there soon.  But to help you know your place in the universe, your HUD also has the Omnicompass and a map.  The Omnicompass can be activated or retasked with the C key, and the map with the M key. The map features a full-screen display mode and a corner display mode.  The Omnicompass can track planets, ships, or both.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
		break;
	case 3:
		if (dstory>playerradio.msgtime){
			var themsg = "The yellow rectangle in the center of the map represents the area that you can see on the screen without the map.  Planets, moons, and stations are drawn on the map, and planetary orbits are shown with grey lines.   You can zoom in and out with the + and - keys.  Try zooming way out (- key) so that the whole system is in view.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Zoom out with - key to show the whole system.";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
		break;
	case 4:	
		if ((dstory>5)&&(myplayer.mapscale>1024)&&(myplayer.mapactive>0)){
			var themsg = "Nifty, right?  OK, so we're not going nearly that far away, so zoom back in on us and Merz. The number 1 struggle for new pilots is stopping at the destination, which requires about as much thrust as getting there usually.  Some pilots count their pulses, and know that they need that many in the opposite direction to stop.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Zoom out on the map to show the whole system( - )";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
		break;
	case 5:
		if ((dstory>5)&&(myplayer.mapscale<128)&&(myplayer.mapactive>0)){
			var themsg = "The map and nav computer are more than sufficient guide you wherever you need, but some people like the Omnicompass (C key) because it tracks everything at once.  OK, so try applying what you've learned to fly to Merz.  Don't get in any fights, just do a flyby and come back.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Go to Merz";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 6:
		if ((dstory>5)&&(myplayer.ship.distance(systems[ps].planets[5])<512)){
			var themsg = "Now get back to the Merry Merzian.  Remember you can use your nav (N, <, >) computer to find the station.  When you're close you'll dock automatically.  If you're far away, hit the  A key to activate the autopilot, which will get you closer, then hit A again when you're close to resume manual flight.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.money = myplayer.money + 200;
			myplayer.task = "Dock at the Merry Merzian";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 7:
		if ((dstory>60)&&(myplayer.dockstate==1)){
			var themsg = "The autopilot works well between distant objects in empty space, and most trips you'll want it for fit that description well enough.  Most planets and moons have hostile Umobots.  They orbit their host planets and shoot at any ships that come near.  Around Merz they aren't particularly dangerous, but each planet has it's own breed of bot, and most are more dangerous than the Merz bots.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 8:
		if (dstory>playerradio.msgtime){
			var themsg = "Bots can be destroyed easily enough, but replacements are never far behind.  Still, the Institute pays out for each one destroyed, as well as for the resulting salvage.  That salvage, usually called bling, is so universally valued it has become currency.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 9:
		if (dstory>playerradio.msgtime){
			var themsg = "No one knows where they came from, or why they suddenly started appearing 30 years ago.  But life off-world has changed dramatically since they came.  Most of your ships systems are made from Bling, and a whole new industry has developed around both fighting and studying the 'bots";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;		
	case 10:
		if (dstory>playerradio.msgtime){
			var themsg = "You better learn a thing or two about combat before I send you anywhere more dangerous, eh?  The top left corner of your HUD has 4 important indicators.  At the top the green bar indicates your ship's health.  It's a basic measure of how close you are to blowing up.  Don't blow up.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;		
	case 11:
		if (dstory>playerradio.msgtime){
			var themsg = "The next blue bar is your shield strength.  Your shield is a fast regenerating energy barrier that prevents your ship from being damaged by occasional minor hits.  Don't enter combat without a full shield, and get out if it ever goes down to 0.  A weak shield will still reduce the damage you take compared to no shield at all.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;		
	case 12:
		if (dstory>playerradio.msgtime){
			var themsg = "The next red bar is your weapons energy.  The ship has capacitors to provide the burst current that the ships reactor can't directly provide.  The red bar indicates their energy level.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;		
	case 13:
		if (dstory>playerradio.msgtime){			
			var themsg = "Finally, the orange bar at the bottom shows your thruster energy level.  Just like your weapons, the ship's thrust capacitors recharge quickly with power from the reactor.  Don't get caught in a fight without any go-juice to spare for escape or evasive maneuvers.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;		
	case 14:
		if (dstory>playerradio.msgtime){			
			var themsg = "Below the status bars is a weapons indicator highlighting your current weapon in green, and showing available weapons in white (just weapon 1 for now).";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;	
	case 15:
		if (dstory>playerradio.msgtime){
			var themsg = "The last part of the HUD we need to talk about is the targeting computer.  Your radar can detect enemies within a certain distance (4000p, as shown by the green circle on your map), and tell you useful information about them.  Use the [ and ] keys to select targets.  In visual range, you'll also see a targeting reticle around your target.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;			
	case 16:
		if (dstory>playerradio.msgtime){
			var themsg =  "Speaking of which, why don't you do me a favor and destroy a particular bot?  The name is "+systems[ps].ships[9].name+", it should be near Merz";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Destroy ship "+systems[ps].ships[9].name+" near Merz";
			systems[ps].ships[9].respawn(systems[ps].planets[systems[ps].ships[9].parentid]);
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;		
	case 17:
		if (systems[ps].ships[9].hp==-1000){
			var themsg =  "Alright good job.  Now before you get carried away come back to the station and I'll fit your ship with something a little more powerful.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Return to the Merry Merzian";
			myplayer.money = myplayer.money + 400;
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;	
	case 18:
		if ((dstory>playerradio.msgtime)&&(myplayer.dockstate==1)){
			var themsg = "Wait here for a moment while I work on your ship.  Your basic blaster, while not having any extraordinary capabilities, is energy efficient and effective for most situations.  The Mine launcher, is extraordinarily powerful but only useful in very special circumstances.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			//myplayer.money = myplayer.money + 400;
			myplayer.task = "Read the tutorial";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;		
	case 19:
		if (dstory>playerradio.msgtime){
			var themsg = "New weapons an upgrades can be purchased at stations like the Merry Merzian, but I'm installing the mine launcher for free.  Go ahead and launch, it should be ready.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 20:
		if (dstory>playerradio.msgtime){
			var themsg = "OK now switch to weapon 2 and give it a shot.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Try out the Mine (weapon 2)";
			myplayer.blasters[2].phas = true;
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;	
	case 21:
		if ((myplayer.wep==2) && (myplayer.blasters[2].bombs[0].timer > 7)){//If w2 has fired 
			var themsg = "Watch how slowly it launches.  Be careful not to fly into it!  The mine doesn't really get launched so much as dropped off with a gentle push.  It's up to to pilot to fly his ship to whatever momentum the mine needs, release and fly away.  The upshot is that the mine is both powerful and long-lasting.";
			//allblasters[2].timer = 7;
			//wep=1;
			//allblasters[2].phas = false;
			myplayer.storystate++;
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Read the tutorial";
			myplayer.storytime = time;
			}
	break;	
	case 22:
		if (dstory>playerradio.msgtime){
			var themsg = "Pilots sometimes will sometimes drop a mine and fly into combat behind it, or leave a mine in orbit of a planet in a target-rich environment.  Having a mine (or any bomb) active doesn't stop you from switching to and using other weapons without terminating the mine.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			//allblasters[2].phas = true;
			myplayer.storystate++;
			myplayer.task = "Read the tutorial";
			myplayer.storytime = time;
			}
	break;	
	case 23:
		if (dstory>playerradio.msgtime){//if player has retuirned to the merry merz
			var themsg = "Although not usually used for picking off faraway targets, the mine technically has the longest range (by far) of any weapon due to its long timer, provided the pilot provides a bit of speed for the mine.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;	
	case 24:
		if (dstory>playerradio.msgtime){			
			var themsg = "Many weapons, including the mine, have an upgrade that allows you to detonate the mine with a second click.  For the mine this is highly recommended.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;	
	case 25:
		if (dstory>playerradio.msgtime){			
			var themsg = "In space, bling is everything.  At stations like the Merry Merzian you can spend it on repairs or upgrades.  You get paid in bling by the Institute for destroying umo bots, and more for salvaging their bling.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;	
	case 26:
		if (dstory>playerradio.msgtime){			
			var themsg = "Stations have Buy, Sell, and Work menus, which you can cycle through with the Backspace key.  Aside from missions at the Work menu, you can buy and sell commodities for profit.";			
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 27:
		if (dstory>playerradio.msgtime){			
			var themsg = "If you don't mind being told what to do, missions usually offer more bling for your time than a comparable activity would earn without taking a mission.  You may have noticed an extra $200 after the delivery, and $400 after destroying the bot for me.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 28:
		if (dstory>playerradio.msgtime){		
			var themsg = "Mission payments are paid out in addition to any bling you might make from standard institute salvage, bounties, or other concurrent activities.  Always be on the lookout for ways to get paid twice.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 29:
		if (dstory>playerradio.msgtime){			
			var themsg = "Speaking of which, I've got a package for Jojo's (trailing Jupe), and I'll pay $800 for it to be delivered.  You'll probably want to use boosters.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Go to Jojo's and drop off a merry package."
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 30:
		if (myplayer.dockstate == 2){		
		    var themsg = "Thanks.  I'm going to recommend you to Bill.  Bill's Bits trails Earf, 3rd planet from the sun.  You can go there and work for him, or maybe try taking station missions for extra bling.";
			playerradio.newmsg("Mc#s",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.money = myplayer.money + 800;
			myplayer.task = "Go to Earf and meet Bill";
			myplayer.storystate = 35;
			myplayer.storytime = time;
			}
		if (dstory>playerradio.msgtime){			
			var themsg = "Boosters provide a single-use burst of speed for faster travel among the outer planets.  They're sold in pairs, because for every one you use to get moving towards your destination, you'll need another to slow down when you get there.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 31;
			myplayer.storytime = time;
			}
	break;
	case 31:
		if (myplayer.dockstate == 2){
			var themsg = "Thanks.  I'm going to recommend you to Bill.  Bill's Bits trails Earf, 3rd planet from the sun.  You can go there and work for him, or maybe try taking station missions for extra bling.";	
			playerradio.newmsg("Mc#s",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.money = myplayer.money + 800;
			myplayer.task = "Go to Earf and meet Bill";
			myplayer.storystate = 35;
			myplayer.storytime = time;
			}
			
		if (dstory>playerradio.msgtime){
			var themsg = "You can cycle between booster types with the B key, and fire the booster with the G key.  Your ship comes with 8 type 1 boosters, and you can buy more at certain traders.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 32;
			myplayer.storytime = time;
			}
	break;
	case 32:
		if (myplayer.dockstate == 2){
			var themsg = "Thanks.  I'm going to recommend you to Bill.  Bill's Bits trails Earf, 3rd planet from the sun.  You can go there and work for him, or maybe try taking station missions for extra bling.";
			playerradio.newmsg("Mc#s",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.money = myplayer.money + 800;
			myplayer.task = "Go to Earf and meet Bill";
			myplayer.storystate = 35;
			myplayer.storytime = time;
			}
	
		if (dstory>playerradio.msgtime){
			var themsg = "Make sure you're pointing the right way before you fire the booster, and make sure you packed an extra for braking.  You might also need another pair to get back ";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 33;
			myplayer.storytime = time;
			}
	break;
	case 33:
		if (myplayer.dockstate == 2){
			var themsg = "Thanks.  I'm going to recommend you to Bill.  Bill's Bits trails Earf, 3rd planet from the sun.  You can go there and work for him, or maybe try taking station missions for extra bling.";
			playerradio.newmsg("Mc#s",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.money =myplayer. money + 800;
			myplayer.task = "Go to Earf and meet Bill";
			myplayer.storystate = 35;
			myplayer.storytime = time;
			}
		if (dstory>playerradio.msgtime){
			var themsg = "Also, Try not to tangle with the local 'bots around Jupe and moons, they're more dangerous than the 'bots around Merz by far.  The station is far enough away that you shouldn't need to engage them.";
			playerradio.newmsg("Tutorial Dude",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 34;
			myplayer.storytime = time;
			}
	break;
	case 34:
		if (myplayer.dockstate==2){
			var themsg = "Thanks.  I'm going to recommend you to Bill.  Bill's Bits trails Earf, 3rd planet from the sun.  You can go there and work for him, or just take time to explore or seek your own fortune.";
			playerradio.newmsg("Mc#s",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.money = myplayer.money + 800;
			myplayer.task = "Go to Earf and meet Bill";
			myplayer.storystate = 35;
			myplayer.storytime = time;
			}
	break;
	case 35:
		if (myplayer.dockstate == 0){
			var themsg = "Welcome to Earf!  My name is Bill Maker.  Dudeman tells me you're learning to fly, and I'm looking for cheap labor.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Listen to Bill";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 36:
		if (dstory>playerradio.msgtime){
			var themsg = "Now I know Dudeman tends to gloss over the finer points of flying so I'm going to fill in a few details for you.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 37:
		if (dstory>playerradio.msgtime){
			var themsg = "I'm sure you've discovered that stopping at your destination is half the challenge of getting there.  Many pilots will count the number of times they click their thrusters towards their destination, and then click the same number of times facing away from it to stop.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 38:
		if (dstory>playerradio.msgtime){
			var themsg = "This is of course doubly true when using boosters--You need to make sure you have at least as many reserved for stopping as you used to get moving in the first place.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 39:
		if (dstory>playerradio.msgtime){
			var themsg = "As far as your weapons go, most of them can only maintain a single bomb.  If you fire with a bomb already out from that weapon, you'll terminate the existing bomb and create a new one.  So be sure to wait for your bomb to hit and fully explode before shooting again. ";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 40:
		if (dstory>playerradio.msgtime){
			var themsg = "You can, however, switch to a different weapon and fire it without recalling or refreshing the bomb you have out.  This is most useful for the mine, which has a very long timer.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 41:
		if (dstory>playerradio.msgtime){
			var themsg = "A few weapons like w6 and w8 fire continuously when the mouse button is held, and they don't have that limitation.";
			playerradio.newmsg("Tutorial Dude41",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 42:
		if (dstory>playerradio.msgtime){
			var themsg = "Aside from the remote detonator upgrade, there are a myriad of different ways to upgrade weapons, and they can all be combined as you see fit.  However, each time you buy an upgrade, the cost of the next one for that weapon will be double.";
			playerradio.newmsg("Tutorial Dude42",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 43:
		if (dstory>playerradio.msgtime){
			var themsg = "Not every upgrade will be equally beneficial to every weapon, and sometimes it might pay to wait until you encounter a station with the upgrade(s) that you REALLY want before you spend your bling and drive up the costs.";
			playerradio.newmsg("Tutorial Dude43",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 44:
		if (dstory>playerradio.msgtime){
			var themsg = "The bots around the inner planets aren't as dangerous as those around outer planets like Jupe and Tern, but they're bad enough that we can't ignore them completely.  ";
			playerradio.newmsg("Tutorial Dude44",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 45:
		if (dstory>playerradio.msgtime){
			var themsg = "There's been an initiative to build a moon base with blasters to keep their numbers down, but its a costly endeavor and no one wants to see it blown up by bots before it's finished.";
			playerradio.newmsg("Tutorial Dude45",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Get supplies from Dangustown";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 46:
		if (dstory>playerradio.msgtime){
			var themsg = "I've been hoarding materials for a while now, and I'm close to having what I need, but I still need to somehow build the thing without taking any hits until the shield generator comes up. ";
			playerradio.newmsg("Tutorial Dude46",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 47:
		if (dstory>playerradio.msgtime){
			var themsg = "There's a guy I know who shares my enthusiasm for this base, and he's actually built the turret.  It is, however, on his station at on the edge of the system in Dangustown.";
			playerradio.newmsg("Tutorial Dude47",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate=120;//This is a story redirect--Basically, everything above 47 and below 120 is cancelled pending further development.
			myplayer.storytime = time;
			}
	break;
//48-119 are cancelled, but kept in code in case I bring them back in some sense.//////////////////////////////	
	case 48:
		if (dstory>playerradio.msgtime){
			var themsg = "The bots are very dangerous out there, but you probably won't need to fight any to make the pickup.  You will, however need 10 units of cargo space to take a crate, and 20 to bring both crates in one trip.";
			playerradio.newmsg("Tutorial Dude48",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 49:
		if (myplayer.dockstate==3){//Need to add mission cargo handling to this mission code
		var freecargo = myplayer.inventory.maxcargo-myplayer.inventory.totalcargo();
		var themsg = "Bill told me you'd be running some turret parts for us.  Each crate or parts takes 10 inventory space, and I have 2 left to take, You have "+freecargo+" inventory space available.";;
			playerradio.newmsg("Mc#s",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 50:
		if (dstory>playerradio.msgtime){
			var freecargo = myplayer.inventory.maxcargo-myplayer.inventory.totalcargo();
			console.log(freecargo);
			if (freecargo<10){//case for no crates taken ye
				myplayer.storystate = 51;
				var themsg = "No crates loaded:  Insufficient cargo space.";
			}else if (freecargo>=20){//both crates
				myplayer.storystate=56;
				myplayer.inventory.takecargo(allcargos.length-1,20); //allcargos.length-1 is the last item, which will always be mission cargo.
				var themsg = "2 crates loaded.  Take these to Billiam and he should have enough scrt to build his first turret."
			}else{
				myplayer.storystate = 53;//1 crate
				myplayer.inventory.takecargo(allcargos.length-1,10); //allcargos.length-1 is the last item, which will always be mission cargo.
				var themsg = "1 crate loaded.  Take this to Billiam's shop and then come back for the other crate.";
				}
			myplayer.storytime = time;
			//var themsg = "Bill told me you'd be running some turret parts for us.  Each crate or parts takes 10 inventory space, and I have 2 left to take, You have "+freecargo+" inventory space available.";
			playerradio.newmsg("Mc#s",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storytime = time;
			}
	break;
	case 51:
		if (dstory>playerradio.msgtime){// No crates taken from 
			var themsg = "No crates loaded:  Insufficient cargo space.";
			playerradio.newmsg("Mc#s",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 52;
			myplayer.storytime = time;
			}
	break;
	case 52:
		if (myplayer.dockstate==3){
			var freecargo = myplayer.inventory.maxcargo-myplayer.inventory.totalcargo();
			if (freecargo>=20){//If back at Dangustown with space for both crates
				var themsg = "2 crates loaded.  Take these to Billiam and he should have enough scrt to build his first turret."
				myplayer.inventory.takecargo(allcargos.length-1,20);
				myplayer.storystate=56;
				playerradio.newmsg("Mc#s",themsg,time);//newmsg(sndr, msg, thetime)
				myplayer.storytime = time;
				}
			else if (freecargo>=10){
				var themsg = "1 crate loaded.  Take this to Billiam's shop and then come back for the other crate.";
				myplayer.inventory.takecargo(allcargos.length-1,10);
				myplayer.storystate=53;
				playerradio.newmsg("Mc#s",themsg,time);//newmsg(sndr, msg, thetime)
				myplayer.storytime = time;
				}
			}
	break;
	case 53:
		if (myplayer.dockstate==0){
			var themsg = "1 crate delivered.  Bring me one more."
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 54;
			myplayer.storytime = time;
			}
	break;
	case 54:
		if (myplayer.dockstate==3){
			var themsg = "Last crate loaded.  Bring this to Billy";
			playerradio.newmsg("Mc#s",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 55;
			myplayer.storytime = time;
			}
	break;
	case 55:
		if (myplayer.dockstate==0){
			var themsg = "Last crate delivered.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = 57;
			myplayer.storytime = time;
			}
	break;
	case 56:
		if (myplayer.dockstate==0){
			var themsg = "Both crates delivered.";
			var task = "chill bruh";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 57:
		if (dstory>playerradio.msgtime){
			var themsg = "That should be it, let me look through what we've got and get it all ready to install.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 58:
		if (dstory>playerradio.msgtime+600){
			var themsg = "Mofugga used packing peanuts...";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 59:
		if (dstory>playerradio.msgtime+600){
			var themsg = "OK I've got the anchor ready to install. Pivot and blaster are still a pile of parts but we can install the anchor as soon as Earf is clear.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate=62;
			myplayer.storytime = time;
			}
	break;
	case 62:
		if (dstory>playerradio.msgtime+600){
			var themsg = "OK I've got the platform ready to install.  Pivot and blaster are still a pile of parts but we can install the anchor.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 63:
		if (dstory>playerradio.msgtime){
			var themsg = "You'll need to tow the platform from my shop to the moon. If it gets hit by a bot, you'll have to bring it back for me to fix.  So, plan A is don't get in any fights while towing the platform.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 64:
		if (dstory>playerradio.msgtime){
			var themsg = "Once you get the platform in position, you will need to follow the prompts to anchor the platform and activate the shield.  Once the shield is active the platform should be safe enough.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 65:
		if (dstory>playerradio.msgtime){
			var themsg = "Once you get the platform in position, you will need to follow the prompts to anchor the platform and activate the shield.  Once the shield is active the platform should be safe enough.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 70:
		var i=0;
		var closestbotdistance = 8192;
		while (i<systems[ps].ships.length){
			var botdistance = systems[ps].planets[3].distance(systems[ps].ships[i]);
			if (botdistance<closestbotdistance){
				closestbotdistance = botdistance;
				}
			i++;
			}
		if (closestbotdistance<3000){
			var themsg = "Great, now hurry up and place the platform before they come back.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 71:
		if (dstory>playerradio.msgtime){
			var themsg = "Sensors show platform is in position.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 72:
		if (dstory>playerradio.msgtime){
			var themsg = "Installation minigame goes here.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 73:
		if (dstory>playerradio.msgtime){
			var themsg = "Installation successful";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate=80;
			myplayer.storytime = time;
			}
	break;
	case 74:
		if (dstory>playerradio.msgtime){
			var themsg = "Platform has been damaged.  Bring it back to my shop and I'll fix it.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 75:
		if (dstory>playerradio.msgtime){
			var themsg = "OK while I fix the platform why don't you clear out any bots near Earf again.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate=70;
			myplayer.storytime = time;
			}
	break;
	case 80:
		if (dstory>playerradio.msgtime){
			var themsg = "Nice.  The pivot section is ready.  Bring it to the platform and install it.  If the bots haven't come back already, they will soon.  The platform shield can protect the pivot during installation, but not your ship";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 81:
		if (dockstate==0){
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 82:
		if (true){//Need to check for being "in position"
			var themsg = "Sensors show pivot is in position.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 83:
		if (dstory>playerradio.msgtime){
			var themsg = "Pivot installation minigame goes here";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 84:
		if (dstory>playerradio.msgtime){
			var themsg = "Pivot is installed.  It should automatically point towards any bots nearby now.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate=86;
			myplayer.storytime = time;
			}
	break;
		case 85:
		if (dstory>playerradio.msgtime){
			var themsg = "Pivot was damaged.  Return to my shop to get it fixed.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	
	case 100:
		if (dstory>playerradio.msgtime){
			var themsg = "Cargo missions are fairly easy enough, but they require 10 units of cargo space each.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 101:
		if (dstory>playerradio.msgtime){
			var themsg = "Kill missions don't require any cargo space, but you need to hunt down and kill a particular bot, which isn't always found where expected.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 102:
		if (dstory>playerradio.msgtime){
			var themsg = "Courier missions only require one unit of cargo space, but you need to deliver to a ship on the move.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 103:
		if (dstory>playerradio.msgtime){
			var themsg = "Engineering missions require you to dock at a mission destination and complete repairs or upgrades on the mission target, often under fire from bots.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 104:
		if (dstory>playerradio.msgtime){
			var themsg = "Otherwise, you can always sweep up loose bling and destroy bots.  Trading commodities might work if you find a good route and have the bling to get started.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 104:
		if (dstory>playerradio.msgtime){
			var themsg = "One way or another, you've gotta be getting bling, or you don't matter much around here.  I'm sure you've seen all the gear there is to buy, but you might not have noticed that when you upgrade something, there's almost always another better, more expensive upgrade to buy.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 105:
		if (dstory>playerradio.msgtime){
			var themsg = "All that gear matters, and people can tell about how much of it you have from your ship level.  Some jobs might not even be offered to hustlers without a high enough ship level.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 105:
		if (dstory>playerradio.msgtime){
			var themsg = "All that gear matters, and people can tell about how much of it you have from your ship level.  Some jobs might only be offered to hustlers with a high enough ship level.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	////Everything above this was cancelled//////////////
/////Abreviated story continues below at 120	
	case 120:
		if (dstory>playerradio.msgtime){
			var themsg = "It's pretty big, and we don't want to take it apart, so you'll need an upgraded cargo hold with 20 free cargo slots to load it."
			if (myplayer.inventory.maxcargo<20){myplayer.task = "Buy cargo upgrade";}
			else if (myplayer.inventory.maxcargo-myplayer.inventory.totalcargo()<20){ myplayer.task = "Upgrade cargo or free up cargo space"; }
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 121:
		if (myplayer.inventory.maxcargo-myplayer.inventory.totalcargo()>=20){
			myplayer.task = "Pick up turret at Dangustown";
			if (myplayer.dockstate==3){
				myplayer.storystate++;
				}
			}
		else if (myplayer.inventory.maxcargo<20){}//Don't change the task from buy cargo upgrade if it still applies.
		else if (myplayer.inventory.maxcargo-myplayer.inventory.totalcargo()<20){ myplayer.task = "Upgrade cargo or free up cargo space"; }//This should reapply the message if the player picks up too much other cargo to fir the 20u turret.
	break;
	case 122:
		var themsg = "Yo, Billdude says you're picking up the giant-ass turret sitting in the middle of my shop.  It's about time."
		playerradio.newmsg("Mc#s",themsg,time);//newmsg(sndr, msg, thetime)
		myplayer.inventory.takecargo(allcargos.length-1,20);//Last index of allcargos is mission cargo, 20 units taken. 
		myplayer.task = "Deliver turret to Bill";
		myplayer.storystate++;
		myplayer.storytime = time;
	break;
	case 123:
		if (myplayer.dockstate==0){
			var themsg = "Hell yeah this thing looks sweet.  I've got to make a few adaptors to put this all together, but it should be ready in a few minutes.  Feel free to do other work in the meantime.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.inventory.givecargo(allcargos.length-1,20);//Last index of allcargos is mission cargo, 20 units taken. 
			myplayer.task = "Wait for Bill";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 124:
		if (dstory>18000){
			var themsg = "Sorry to keep you waiting.  It's ready when you are, you can tow the turret base into position as soon as you get here.."
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Go to Bills";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 125:
		if (myplayer.dockstate == 0){
			var themsg = "Turret base loaded."
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Unload turret base on Moon";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 126:
		if (myplayer.ship.distance(systems[ps].planets[4])<systems[ps].planets[4].s+32){
			var themsg = "Turret base installed.   Looks good, now come back for the turret";
			//make invisible turret
			//move the turret to systems[ps].planets[4].directionof(myplayer.ship)
			//make turret anchor visible
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Go to Bills";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 127:
		if (myplayer.dockstate == 0){
			var themsg = "Turret loaded";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Unload turret on Moon";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 128:
		if (myplayer.ship.distance(systems[ps].planets[4])<systems[ps].planets[4].s+32){
			var themsg = "Turret installed. Many thanks!  Earf is much safer thanks to you.";
			//make turret pivot visible
			//activate turret
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Go forth and profit";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 129:
		if ((myplayer.ship.level > 7)&&(myplayer.upgrades[7].tier<1)){
			var themsg = "You've got quite a shiny ship these days don'tcha.  Maybe you ought to buy the sensor upgrade from Sharon and see what else is out there.";
			playerradio.newmsg("Bill",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.task = "Buy sensor upgrade from Sharon";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 130:
		if (myplayer.upgrades[7].tier>=1){
			myplayer.task = "Don't investigate Waldo";
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 1000:
		if (dstory>playerradio.msgtime){
			var themsg = "The sensor upgrade you just bought will, among other things, show a new, tiny, faraway planetary signal called Waldo.  Lots of curious people have investigated that signal, none have gotten close enough for a better look and come back.";
			playerradio.newmsg("Sharon",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate++;
			myplayer.storytime = time;
			}
	break;
	case 1001:
		if (dstory>playerradio.msgtime){
			var themsg = "I'm certainly curious as to what happened to them, and I'd love to see what a probe could reveal about Waldo, but under the circumstances I strongly advise you not to go anywhere near it.";
			playerradio.newmsg("Sharon",themsg,time);//newmsg(sndr, msg, thetime)
			myplayer.storystate = myplayer.storyreturn;
			myplayer.storytime = time;
			}
	break;
	}
}
/*
Required info:
How to:
Fly (Thrust, shoot, boost, change weapon)
Map (Zoom, change modes)
Compass (Change modes)
Navigation (Cycle navtarget, cycle nav modes, autopilot)
Targeting (IFF, using compass / map / radar to track enemies)
Fighting (Shooting, changing weapons, basic tactics / mechanics)
Shop (How ship upgrades work, how blaster upgrades work, how cargo works, how repair works)\
Work (How cargo missions work, how destroy missions work, how to get bling without formally taking missions)
Watdo (How journal / jobs journal works,
Waldo and XXXX rumors, myths, legends etc.

Current "plot"
Player has shit explained at them
Player demonstrates nav target selection and map zooming
Player goes to destination and returns
Player has shit explained
Player goes to bot, kills it and returns
Player has shit explained.
Player gets free mine (w2)
Player has shit explained
Player goes to faraway shop Jojos
<encourage story intermission here>
Player goes to shop Bills
Player has shit explained
Player transports 20 mission cargo from faraway shop Dangustown to Bills.  I should cut that to just 1 package so its simple.
Player has shit explained
Player transports base of turret to moon
Player transports pivot of turret to moon
Player has shit explained

Sort of written up to this point

Player "levels up" to maybe 10 or so
Mc#s contacts player about doing a tough job for him.
Player acquires or already has probe for job.
Player does something moderately difficult involving the probe.  Maybe survey a bunch of bots.
Mc#s upgrades something for player.
Mc#s tells the player that he has another job in the pipeline that will involve the probe but also require upgraded sensors.
And that Sharon sells the sensor upgrades needed, but might also trade them for some favors
Player goes to Sharons. 
Short version, player buys sensor upgrade
Short version, Sharon tells player not to go to the new sensor contact, Waldo, because no one has ever returned.
Short version, player goes or doesn't go to Waldo, does or doesn't explore the greater universe.

Longer version
Player does thing for Sharon
Sharon upgrades player's sensors
Player goes to MC#s.
MC#s tells player he wants to probe XXXX.  Advises investing heavily in armor, shields to pull it off.
Sharon contacts player, tells player thant Mc#s doesn't know what he's talking about, and that instead he should buy lots of boosters to avoid the bots.
At least 6 boosts of solar delta V are needed to prevent the blockade bots from matching your speed.  Times four if you do everything perfect, when you account for decelleration and return trip.
Player can upgrade or prepare as the player chooses.  But Sharon's strategy will probably work, and Mc#s probably wont.
XXXX has huge bot swarm.  They do not attack, until player fires a weapon nearby.  
Player probes XXXX
Probe is technically a weapon so player best gtfo.
Player returns with data to Sharons.  Sharon indicates that the probe readings are actually quite mundane, not unusual by standards of other planets.
Talking leads to mission to probe Waldo.
Player needs further sensor upgrade for the job.
Probe upgrades also recommended.
Player attempts to probe waldo.  Player may fall into waldo without probing it, fall into waldo while probing it, or successd in probing it without falling in.
If the last one, player returns to sharon or mc#s and learns that waldo  might be some sort of portal.
Player may or may not enter waldo and explore the larger universe.



Nothing explaining why it's way out there, or why there is an unusual bot swarm around it.  Certainly nothing to explain why the bots are here in the first place, or operating a blockade in the oort cloud.
Sharon asks you will try to probe waldo next.  Mc#s insists that waldo is a fairy tale.  Sharon counters that he needs better sensors, and that she has tracked a faint but persistent signal in deep space.
Opposite XXXX but much harder to detect, Sharon had hoped for answers about both phenomena from the probe.
Also deep space signals from roughly the same direction as the waldo signal will occasionally fade out in concert with a spike in the waldo signal itself.
But people who go looking for waldo have a way of disappearing.  None have even gotten a better sensor reading than what I can detect with my station.

(more stuff goes here)
Player sent to Sharons to buy sensor upgrade
Player uses sensor upgrade to travel to the Waldo event

*/