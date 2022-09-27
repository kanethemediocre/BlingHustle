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
    }
