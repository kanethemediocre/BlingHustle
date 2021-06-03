		function loadstorymessages(){
		var storymessages = ["Right click for thrust, left click to shoot, and point the mouse in whatever direction you want to face, and don't forget that you have to slow down at the other end.  Going anywhere in particular is more complicated, and if you wander around without a destination, you'll find what space is really made made of:  Nothing.",
		"You can cycle navigation modes between targeting planets, targeting stations, and off with the N key.  < and > will cycle through available nav targets.  The bottom right compass will point towards your nav target, and indicates name and distance.  The chart to the left gives more information if you're interested.  Try selecting planet Merz.",
			//first check after 2 messages, navtarget==5 and navactive == 1
			"Great!  That's where you'll be going next.  But to help you know your place in the universe, your HUD also has a map.  The M key cycles between a full-screen display, a corner display, and off.  I recommend the corner.  You can zoom in and out with the + and - keys.",
			"The yellow rectangle in the center of the map is where you and the space you can see are located.  Planets, moons, and stations are drawn on the map, and planetary orbits are shown with grey lines.  Try zooming way out (- key) so that the whole system is in view.",
			//second check after 4 messages, zoom > some number
			"Nifty, right?  OK, so we're not going nearly that far away, so zoom back in on us and the inner planets.",
			//3rd check after 5 messages, zoom < some number
			"OK, so thats basically what you need to fly this burrito to Merz.  Just do a close flyby--the rest is automatic--and then head back to The Merry Merzian.",
			//4th check after 6 messages, ships[0].distance(planets[5])<500
			"Good job.  Now get back to the Merry Merzian.  Remember you can use your nav (N, <, >) computer to find the station.  When you're close you'll dock automatically.",
			//5th check after 7 messages, dockstate == 1
			"Alright, good job.  I suppose we should talk about the 'bots.  Most planets and moons have hostile Umobots.  They orbit their host planets and shoot at any ships that come near.  Around Merz they aren't particularly dangerous, but each planet has it's own breed of bot, and most are more dangerous than the Merz bots.",
			"Bots can be destroyed (in fact the Institute pays bounties for this), but replacements are never far behind.  Space stations are built trailing or leading planets in solar orbits to keep them farther away from the Umobots in planetary orbit.",
			"No one knows where they came from, or why they suddenly started appearing 30 years ago.  But life off-world has changed dramatically since they came.  Most of your ships systems are reverse engineered Umobot pieces, and a whole new industry has developed around both fighting and studying the 'bots",
			"You better learn a thing or two about combat before I send you anywhere more dangerous, eh?  The top left corner of your HUD has 4 important indicators.  At the top the green bar indicates your ship's health.  It's a basic measure of how close you are to blowing up.  Don't blow up.",
			"The next blue bar is your shield strength.  Your shield is a fast regenerating energy barrier that prevents your ship from being damaged by occasional minor hits.  Don't enter combat without a full shield, and get out if it ever goes down to 0.  A weak shield will still reduce the damage you take compared to no shield at all.",
			"The next red bar is your weapons energy.  The ship has capacitors to provide the burst current that the ships reactor can't directly provide.  The red bar indicates their energy level.",
			"Finally, the orange bar at the bottom shows your thruster energy level.  Just like your weapons, the ship's thrust capacitors recharge quickly with power from the reactor.  Don't get caught in a fight without any go-juice to spare for escape or evasive maneuvers.",
			"The most important indicator of all is your money, but we'll talk more about that later.  Below the status bars is a weapons indicator highlighting your current weapon in green, and showing available weapons in white (just weapon 1 for now).",
			"The last part of the HUD we need to talk about is the targeting computer.  Your radar can detect enemies within a certain distance (4000p, as shown by the green circle on your map), and tell you useful information about them.  Use the [ and ] keys to select targets.  In visual range, you'll also see a targeting reticle around your target.",
			//respawn a bot in Merz orbit after 16 messages
			"Speaking of which, why don't you do me a favor and destroy a particular bot in Merz orbit?  The name is ",
			//display bots randomized name as part of 17th message.
			//check for ships[notsure].hp == -1000
			"Alright good job.  Now before you get carried away come back to the station and I'll fit your ship with something a little more powerful.",
			//after 18th message, check for dockstate == 1
			"Alright wait here for a moment while I work on your ship.  Your basic blaster, while not having any extraordinary capabilities, is energy efficient and effective for most situations.  The Mine launcher, is extraordinarily powerful but only useful in very special circumstances.",
			"New weapons an upgrades can be purchased at stations like the Merry Merzian, but I'm installing the mine launcher for free.  Go ahead and launch, it should be ready.",
			//after 20th message, check for dockstate ==-1
			"OK now switch to weapon 2 and give it a shot.",
			//after 21st messsge, check for wep==2
			//check for bombs[1].timer>0 or something
			//set w2=0, and wep == 1
			"Hmm, that's not supposed to happen.  Dock back here again and I'll fix it.  I'll even give you a full refund.",
			//after 22nd message, check for dockstate==2
			"Huh, looks like it was a software problem all along.  OK, I promise next time it won't blow up in your face.  If it does I'll give you a double-refund on it. ",
			//check for w2 firing like before
			"Alright so it looks like it's working better.  You still need to not fly into it, or it's blast.  Note that you can switch to a different weapon after you have fired the mine, and it will persist for about a minute.",
			"Good pilots can sometimes use their ships to throw the mine, but if they don't keep an eye on their thrust energy reserves they'll get caught in the blast.  There's also a remote detonator upgrade that helps a lot.",
			"In space, money is everything.  At stations like the Merry Merzian you can spend it on repairs or upgrades.  You get paid by the Institute for destroying umo bots, and of course the institute pays more for more advanced, more dangerous 'bots.",
			"You can also buy cargo at some stations, and sell it somewhere else at a different (hopefully higher) price.  Often the most profitable routes are the most dangerous, and involve delivery at a planet surrounded by 'bots.",
			"If you don't mind being told what to do, missions usually offer more pay for your time than a comparable activity would earn without taking a mission.  You may have noticed an extra $200 after the delivery, and $400 after destroying the bot for me.",
			"Mission payments are paid out in addition to any money you might make from standard institute bounties or other concurrent activities.  Always be on the lookout for ways to get paid twice.",
			"Speaking of which, I've got a package for Jojo's (trailing Jupe), and I'll pay $800 for it to be delivered.  You'll probably want to use boosters.",
			"Boosters provide a single-use burst of speed for faster travel among the outer planets.  They're sold in pairs, because for every one you use to get moving towards your destination, you'll need another to slow down when you get there.",
			"You can cycle between booster types with the B key, and fire the booster with the G key.  Your ship comes with 8 type 1 boosters, and you can buy more at certain traders.",
			"Make sure you're pointing the right way before you fire the booster, and make sure you packed an extra for braking.  You might also need another pair to get back ",
			"Also, Try not to tangle with the local 'bots around Jupe and moons, they're more dangerous than the 'bots around Merz by far.  The station is far enough away that you shouldn't need to engage them.",
			"Nice work.  I'm going to recommend you to Bill.  Bill's Bits trails Earf, 3rd planet from the sun.  You can go there and work for him, or just take time to explore or seek your own fortune.",
			"Yo Yo this is the last message3.",		
			"Yo Yo this is the last message2.",
			"Yo Yo this is the last message1."
			]
			return storymessages
			}