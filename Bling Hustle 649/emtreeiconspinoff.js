class Emtree{
	constructor(qtitle){//type == "blaster" or "upgrade" or "mission"
		this.level = 0;
		this.title = qtitle;
		this.emods = [];
		this.playerhas = false;//indicates if the player has bought or found this emodule yet
		this.complete = false;
		this.perfected = false;
		}
	iscomplete(){
		var complete = true;
		var i=0;
		while(i<this.emods){
			if (this.emods[i].completed == false){complete = false;}
			i++;
			}
		this.complete == complete;
		return complete;
		}
	isperfect(){
		var perfect = true;
		var i=0;
		while(i<this.emods){
			if (this.emods[i].perfected == false){perfect = false;}
			i++;
			}
		return perfect;
		}
	setids(){
		var i=0;
		while(i<this.emods.length){
			this.emods[i].id=i;
			this.emods[i].setids();//sets ids of quizblocks inside emods[i]
			i++;
			}
		}
	draw(x,y){

		}
	drawicons(x,y){
		var i = 0;
		while(i<this.emods.length){
			this.emods[i].drawasicon(x+this.xoffset,y+this.yoffset);
			i++;
			}
		}
    }
