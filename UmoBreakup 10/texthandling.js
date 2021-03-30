		function showchart(chartdataxy, xspace, yspace, x,y){ //displays chart with specified cell dimensions and position
			 var i = 0 //assumes each column is same length, otherwise error
			 var j = 0;
			 while (i<chartdataxy.length){
				var cellposx = x+i*xspace;
				j = 0;
				while (j<chartdataxy[0].length){
					var cellposy = y+j*yspace;
					context.fillText(chartdataxy[i][j],cellposx,cellposy);
					j=j+1;
					}
				i=i+1;
				}
			 }
		//var cxytest = [ ["first", "column", "of", "words"], ["2nd", "column", "of", "words"]       ];
		//showchart(cxytest, 64, 16, 300,300);
		function showmessage(message){ //Displays a message, breaking it up into multiple lines as needed.  No word continuity or overflow handling yet.
			var maxlength = (canvas.width-820)/11; //estimating font width to 10 px, allotting 150 px margins
			var maxlines = canvas.height/(24*6); //estimating font height to 24 px, allotting 1/6 of screen, only used for overflow handling (eventually)
			var starty = Math.floor(canvas.height*5/6 - 24); //allotting bottom 1/6 of screen + 24 px fudge factor
			var startx = 408;
			var lines = 1 + Math.floor(message.length/maxlength);
			context.font='16px Courier New';
			context.fillStyle = "white";  
			var line = 0;
			while (line<(lines)){//while there are still lines of text to draw...
				context.fillText(message.slice(line*maxlength, (line+1)*(maxlength)),startx,(starty + line*24));
				line = line + 1;
				}//slice(startofline,endofline,startx,startyofline)
			}
		function targetchart(targets,xspace,yspace,x,y){
			context.font='12px Courier New';
			var sorttargets = [];//No sorting yet
			var i = 0 //assumes each column is same length, otherwise error
			while(i<targets.length){
				var cellposx = x;
				var cellposy = y+i*yspace;
				context.fillStyle = targets[i][0].c
				context.fillText(targets[i][0].name,cellposx,cellposy);
				var cellposx = x+xspace;
				context.fillText(targets[i][1],cellposx,cellposy);
				i=i+1;
				}
			context.fillStyle = "white";  
			}
		
		
		function randvowel(){
			var vowels = "aeyuio";
			var vindex = Math.floor(Math.random()*vowels.length);
			return vowels[vindex];
			}
		function randconsonant(){
			var consonants = "zxcvbnmsdfghjklqwrtyp";
			var cindex = Math.floor(Math.random()*consonants.length);
			return consonants[cindex];
			}
		function randname(namelength){//Creates a random name of length namelength, with no more than 2 vowels or consonants in a row
			var lastchartype = Math.floor(Math.random()*2); //0 for consonant, 1 for vowel;
			var lastchartype2 = Math.floor(Math.random()*2); //2nd to last....
			var thischartype = Math.floor(Math.random()*2); //0 for consonant, 1 for vowel;
			var thename = ""; //Start with an empty name
			if (lastchartype2 == 0){thename=thename+randconsonant();}else{thename=thename+randvowel();}
			if (lastchartype == 0){thename=thename+randconsonant();}else{thename=thename+randvowel();}
			var i = namelength;
			while (i>2){
				i=i-1;
				if (lastchartype == lastchartype2){ //if last two characters are same type,
					if (lastchartype == 0){thischartype = 1;}else{thischartype = 0;} //make other type
					}else {thischartype = Math.floor(Math.random()*2);}//otherwise pick randomly
				if (thischartype == 0){thename=thename+randconsonant();}else{thename=thename+randvowel();}
				lastchartype2 = lastchartype; //Keep track of last two characters
				lastchartype = thischartype; //so we can not have 3 vowels or 3 consonants sequentially
				}
			return thename;
			}
		var testname = randname(8);		
		class Radio {
		constructor(intromessage){
			this.msgstart = 0; //Time that current message began
			this.sender = ""; //Who sent the message
			this.senderx = 420;//Math.floor(canvas.width/2) - Math.floor(this.sender.length/2);//not used?
			this.sendery = Math.floor(canvas.height*5/6 - 50);
			this.msgnow = intromessage; //Text of message
			this.msgtime = Math.floor(this.msgnow.length*1.25) + 30; //message duration
			this.log = [this.msgnow];
			}
		newmsg(sndr, msg, thetime){//used to put a new message into the object
			this.msgstart = thetime;
			this.sender = sndr;
			this.senderx = Math.floor(canvas.width/2) - Math.floor(this.sender.length/2);
			this.msgnow = msg;
			this.msgtime = Math.floor(this.msgnow.length*1.5) + 120;
			this.log.push(this.msgnow);
			}
		display(thetime){
			if (thetime<(this.msgstart+this.msgtime)){			
				context.font='16px Courier New';
				context.fillStyle = "red";  
				context.fillText(this.sender+":",this.senderx,this.sendery);
				showmessage(this.msgnow.slice(0, (thetime-this.msgstart)*2 ));
				}
			}
		showlog(index){
			var logchart = [ this.log  ];
			context.font = "10px Ariel";
			showchart(logchart, 64, 16, 16,300);	
		}
		}////end class radio