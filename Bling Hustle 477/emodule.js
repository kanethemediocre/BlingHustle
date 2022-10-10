class Emodule{
	constructor(qtype, qtitle){//type == "blaster" or "upgrade" or "mission"
		this.level = 0;
		this.xoffset = 0;
		this.yoffset = 0;
		this.prereqs = [];
		this.type = qtype;
		this.quizblocks = [];//list of quiz objects
		this.title = qtitle;
		this.quizblockcompletion = [];//List equal in length to this.quizblocks, bolean true or false.
		this.id = -1; //index in emodules aray
		this.rating = 0;
		this.qc = 0;
		this.accessible =  false;
		this.playerhas = false;//indicates if the player has bought or found this emodule yet
		this.completed = false;
		this.perfected = false;
		}
	iscomplete(){
		var complete = true;
		var i=0;
		while(i<this.quizblocks){
			if (this.quizblocks[i].completed == false){complete = false;}
			i++;
			}
		this.complete == complete;
		return complete;
		}
	isperfect(){
		var perfect = true;
		var i=0;
		while(i<this.quizblocks){
			if (this.quizblocks[i].perfected == false){perfect = false;}
			i++;
			}
		return perfect;
		}
	grade(){
		var newprize = [0,""];
		var aprize = [0,""];
		var passed = true;
		var perfect = true;
		var rating = 4;
		var qc = 0;
		var i=0;
		while (i<this.quizblocks.length){
			aprize = this.quizblocks[i].grade();
			if (this.quizblocks[i].rating<rating){rating = this.quizblocks[i].rating;}
			if (this.quizblocks[i].rating>1){qc++;}
			if (aprize[0]>0){newprize = aprize;}
			if (this.quizblocks[i].completed == false){passed = false;}//these are sort of redundant with the rating system
			if (this.quizblocks[i].perfected == false){perfect = false;}
			i++;
			}
		this.qc = qc;	
		this.rating = rating;
		this.completed = passed;
		this.perfected = perfect;
		return newprize;
		}
	setids(){
		var i=0;
		while(i<this.quizblocks.length){
			this.quizblocks[i].id=i;
			this.quizblocks[i].setids();//sets the ids of the quizzes inside the quizblocks[i]
			i++;
			}
		}
	drawformenu(x,y){
		var color1 = "red";
		if (this.completed == true){color1 = "green";}
		if (this.perfected == true){color1 = "blue";}
		context.fillStyle = color1;
		context.fillText(this.title,x,y);
		context.fillText(this.qc+"/"+this.quizblocks.length,x+200,y);
		} 
	draw(x,y){
		var i = 0;
		while (i<this.quizblocks.length){
			this.quizblocks[i].drawformenu(x,y+24*i);
			i++
			}
		}
	drawasicon(x,y){
		var outlinecolor = "grey";
		var tickcolor = "grey";
		var accessible = this.accessible;
		context.lineWidth = 2; 
		if (accessible == true){
			outlinecolor = "red";
			if (this.completed == true){ outlinecolor = "green";	}
			if (this.perfected == true){ outlinecolor = "blue";	}
			}
		var tickspacing = 48/(this.quizblocks.length+1);
		var tickstart = tickspacing;
		var i=0;
		while(i<this.quizblocks.length){
			//console.log("triedtodrawatick");
			var tickyoffset = tickstart+tickspacing*i;
			if (accessible==true){
				tickcolor = "red";
				if (this.quizblocks[i].completed == true){ tickcolor = "green"; }
				if (this.quizblocks[i].perfected == true){ tickcolor = "blue"; }
				}
			context.strokeStyle = tickcolor;
			context.beginPath();
			context.moveTo(x,y+tickyoffset);
			context.lineTo(x+8,y+tickyoffset);
			context.moveTo(x+48,y+tickyoffset);
			context.lineTo(x+40,y+tickyoffset);
			context.stroke()
			
			/*
			var j=0; //This basically works, but doesn't look good at icon scale.
			while(j<this.quizblocks[i].quizzes.length){
				var minitickyoffset = tickyoffset +((j+1)/(this.quizblocks[i].quizzes.length+1)*tickspacing);
				var minitickcolor = "grey";
				if (accessible==true){
					minitickcolor = "red"
					if (this.quizblocks[i].quizzes[j].rating==1){minitickcolor = "orange";}
					if (this.quizblocks[i].quizzes[j].rating==2){minitickcolor = "yellow";}
					if (this.quizblocks[i].quizzes[j].rating==3){minitickcolor = "green";}
					if (this.quizblocks[i].quizzes[j].rating==4){minitickcolor = "blue";}
					}
				//console.log(minitickcolor);
				//console.log(minitickyoffset);
				context.strokeStyle = minitickcolor;
				context.beginPath();
				context.moveTo(x,y+minitickyoffset);
				context.lineTo(x+6,y+minitickyoffset);
				context.moveTo(x+48,y+minitickyoffset);
				context.lineTo(x+42,y+minitickyoffset);
				context.stroke()
				j++;
				}
			*/
			
			i++;
			}
		//console.log("triedtodrawanicon"+x+","+y);
		context.strokeStyle = outlinecolor;
		context.beginPath();
		context.rect(x,y,48,48);
		context.stroke();
		}    
	}
