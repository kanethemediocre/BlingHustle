class Emtree{
	constructor(qtitle){//type == "blaster" or "upgrade" or "mission"
		this.level = 0;
		this.title = qtitle;
		this.emods = [];
		this.playerhas = false;//indicates if the player has bought or found this emodule yet
		this.completed = false;
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
	isaccessible(){
		//console.log("triedtocheckaccess");
		if (this.emods.length>0){this.emods[0].accessible = true;}
		var i=1;
		while(i<this.emods.length){
			if (this.emods[i].accessible==false){
				//console.log("checking "+i+" for accessibility");
				var prereqscomplete = 0;
				var j=0;
				while(j<this.emods[i].prereqs.length){
					if (this.emods[this.emods[i].prereqs[j]].completed == true){prereqscomplete++;}
					j++;
					}
				if (prereqscomplete == this.emods[i].prereqs.length){this.emods[i].accessible = true;}
				}
			i++;
			}
	}
	draw(theplayer,x,y){
		var mx = 900;
		var my = 600
		context.fillStyle = "#080808";
		context.fillRect(x-8,y-24,mx,my);
		context.strokeStyle = "darkslateblue"
		context.beginPath()
		context.rect(x-8,y-24,mx,my);
		context.stroke()
		//console.log("tryingtodrawemtree");
		theplayer.emtrees[0].drawicons(theplayer,x+100,y+200);
		if (theplayer.emenu==2){
			var i = 0;
			while (i<this.emods.length){
				this.emods[i].drawformenu(x+8,y+24*i);
				i++;
				}
			theplayer.emtrees[0].drawicons(theplayer,x+100,y+200);
			context.strokeStyle = "white";
			context.beginPath()
			context.rect(x+4,y+theplayer.emh*24-14,200,20);
			context.stroke();
			}
		if (theplayer.emenu==3){
			var i = 0;
			while (i<this.emods[theplayer.emh].quizblocks.length){
				this.emods[theplayer.emh].quizblocks[i].drawformenu(x+8,y+24*i);
				i++;
				}
			context.strokeStyle = "white";
			context.beginPath()
			context.rect(x+4,y+theplayer.emi*24-14,200,20);
			context.stroke();
			}		
		if (theplayer.emenu==4){
			var i = 0;
			while (i<this.emods[theplayer.emh].quizblocks[theplayer.emi].quizzes.length){
				this.emods[theplayer.emh].quizblocks[theplayer.emi].quizzes[i].drawformenu(x+4,y+24*i);
				i++;
				}
			context.strokeStyle = "white";
			context.beginPath()
			context.rect(x+4,y+theplayer.emj*24-14,200,20);
			context.stroke();
			}				
		if (theplayer.emenu==5){
			this.emods[theplayer.emh].quizblocks[theplayer.emi].quizzes[theplayer.emj].draw(x,y);
			this.emods[theplayer.emh].quizblocks[theplayer.emi].quizzes[theplayer.emj].drawexamples(x+320,y);
			//also draw examples
			}			
		
		
		
		
		}
	drawicons(theplayer,x,y){
		this.isaccessible();
		var i = 0;
		while(i<this.emods.length){
			this.emods[i].drawasicon(x+this.emods[i].xoffset,y+this.emods[i].yoffset);
			if (theplayer.emh == i){
				context.strokeStyle = "blue";
				context.beginPath();
				context.rect(x+this.emods[i].xoffset-6,y+this.emods[i].yoffset-6,60,60);
				context.stroke();
				var step = 48 / (this.emods[i].quizblocks.length+1);
				//console.log(step+" "+theplayer.emi);
				var xx = x+this.emods[i].xoffset;
				var yy = y+this.emods[i].yoffset+step+step*theplayer.emi;
				context.fillStyle = "purple";
				context.beginPath();
				context.moveTo(xx-4,yy);//pointer of triangle
				context.lineTo(xx-4-8,yy-8);//triangle
				context.lineTo(xx-4-8,yy+8);//triangle
				context.fill();
				context.beginPath();
				context.moveTo(xx+48+4,yy);//pointer of triangle
				context.lineTo(xx+48+4+8,yy+8);//triangle
				context.lineTo(xx+48+4+8,yy-8);//triangle
				context.fill();
				}

			i++;
			}
		}
    }
