class Emodule{
	constructor(qtype, qtitle){//type == "blaster" or "upgrade" or "mission"
		this.level = 0;
		this.type = qtype;
		this.quizblocks = [];//list of quiz objects
		this.title = qtitle;
		this.quizblockcompletion = [];//List equal in length to this.quizblocks, bolean true or false.
		this.id = -1; //index in emodules aray
		this.progession = []; //indicates which emodules will be unlocked by finishing this one
		this.playerhas = false;//indicates if the player has bought or found this emodule yet
		this.accessible = false; //indicates if the player has met the prerequisites to begin this emodule
		this.xoffset = 0;
		this.yoffset = 0;
		this.complete = false;
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
	setids(){
		var i=0;
		while(i<this.quizblocks.length){
			this.quizblocks[i].id=i;
			this.quizblocks[i].setids();//sets the ids of the quizzes inside the quizblocks[i]
			i++;
			}
		}

	draw(x,y){

		}
	drawasicon(x,y){
		var outlinecolor = "grey";
		var tickcolor = "grey";
		var accessible = false;

		if (accessible == true){
			outlinecolor = "red";
			if (this.completed == true){ outlinecolor = "green";	}
			if (this.perfected == true){ outlinecolor = "blue";	}
			}
		var tickspacing = 48/(this.quizblocks.length+1);
		var tickstart = tickspacing/2;
		var i=0;
		while(i<this.quizblocks.length){
			var tickyoffset = tickstart+tickspacing*i;
			if (accessible==true){
				tickcolor = red;
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
			i++;
			}
		context.strokeStyle = outlinecolor;
		context.beginPath();
		context.rect(x,y,48,48);
		context.stroke();
		}
    }
