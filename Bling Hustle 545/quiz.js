class Quiz{
	constructor(qtype, qtitle){//type == "blaster" or "upgrade" or "mission"
		this.type = qtype;
		this.instructions = "Instructions might go here eventually.  They can be a few sentences, and eventually might include images and audio options.  For now it's just text."
		this.challenges = [];
		this.passtolerance = 1;
		this.timer = 0;//Can be set >0 to enable timed quizzes.  Rating will be relative to timer value.
		this.completed = false; //player has passed all quizzes
		this.perfected = false; //player has achieved a perfect score on all quizzes
		this.topscore = 0;
		this.rating = 0; //0 to 4, 1 attempted, 2 passed, 3 good, 4 perfect
		this.title = qtitle;
		this.id = -1;
		this.q = 0; //Which question in the quiz are you working on
		this.examples = [];
		}
	addaddquestion(digits,addendnum,allownegative){
		var newchallenge = new Challenge("+");
		newchallenge.makeaddquestion(digits,addendnum,allownegative);
		//newchallenge.addnumline();
		this.challenges.push(newchallenge);
		}
	addsubquestion(digits,addendnum,allownegative,allownegativeanswer){
		var newchallenge = new Challenge("-");
		newchallenge.makesubquestion(digits,addendnum,allownegative,allownegativeanswer);
		//newchallenge.addnumline();
		this.challenges.push(newchallenge);	
		}
	addmultquestion(digits,addendnum,allownegative){
		var newchallenge = new Challenge("*");
		newchallenge.makemultquestion(digits,addendnum,allownegative);
		//newchallenge.multplot();
		this.challenges.push(newchallenge);
		}
	adddivquestion(digits,forceintegers,decimals,remainder,allownegative){
		var newchallenge = new Challenge("/");
		newchallenge.makedivquestion(digits,forceintegers,decimals,remainder,allownegative);
		//newchallenge.multplot();
		this.challenges.push(newchallenge);
		}
	addarithmaticquestion(addends,operator){
		var newchallenge = new Challenge(operator);
		newchallenge.makearithmaticquestion(addends,operator)//addarithmaticquestion(addends,operator){
		this.challenges.push(newchallenge);
		}
	addarithmaticquestionpr(alloweddigits,allowedaddends,allowedallownegative, overrides, operator){//overrides is a set equal or less than the minimum length of addends, -999 indicates no override for that addend, all else indicates override to the specified values
		var newchallenge = new Challenge(operator);
		var addends = []; //Not really addends necessarily
		var digitnum = alloweddigits[ Math.floor( Math.random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
		var addendnum = allowedaddends[ Math.floor( Math.random()*allowedaddends.length ) ];
		var allownegative = allowedallownegative[ Math.floor( Math.random()*allowedallownegative.length ) ];
		var i=0;
		while(i<addendnum){
			if (overrides[i]==-999){
				var addend = Math.floor(Math.random()*10**digitnum);
				if ((allownegative)&&(Math.random()>0.5)){addend = addend*-1;}
				}
			else { var addend = overrides[i]; }
			addends.push(addend);
			i++;
			}
		newchallenge.makearithmaticquestion(addends,operator)//addarithmaticquestion(addends,operator){
		this.challenges.push(newchallenge);
		}
	makesimplealgebraquestion(addends,vindex,operator,vlabel){
		var newchallenge = new Challenge("algebra");
		newchallenge.addarithmaticquestion(addends,operator)//addsimplealgebraquestion(addends, vindex, operator, vlabel){
		this.challenges.push(newchallenge);
		}
	scramble(){
		var i = this.challenges.length - 1;
		while(i > 0){
	        var j = Math.floor(Math.random() * (i + 1));
			var temp = this.challenges[i];
			this.challenges[i] = this.challenges[j];
			this.challenges[j] = temp;
			i--;
			}
		}
	setids(){
		var i=0;
		while(i<this.challenges.length){
			this.challenges[i].id=i;
			i++;
			}
		}
	grade(){
		console.log("triedtograde1");
		var myscore = 0;
		var myrating = 0;
		var i=0;
		while(i<this.challenges.length){
			if (this.challenges[i].answer == this.challenges[i].playeranswer){myscore++;}
			i++;
			}
		console.log(myscore);
		if (myscore>0){
			myrating = 1;
			}
		if (myscore>=this.challenges.length-this.passtolerance){
			myrating = 2;
			this.completed = true;
			}
		if (myscore>=this.challenges.length-Math.floor(this.passtolerance/2)){
			myrating = 3;
			this.completed = true;
			}
		if (myscore>=this.challenges.length){
			myrating = 4;
			this.completed = true;
			this.perfected = true;
			}
		if (myrating>this.rating){this.rating = myrating;}	
		if (this.topscore<myscore){this.topscore = myscore;}
		console.log(myrating);
		var i=0;
		while(i<this.challenges.length){
			this.challenges[i].regenerate();
			i++;
			}
		}
	drawformenu(x,y){
		var color1 = "red";
		if (this.rating == 1){color1 = "orange";}
		if (this.rating == 2){color1 = "yellow";}
		if (this.rating == 3){color1 = "green";}
		if (this.rating == 4){color1 = "blue";}
		context.fillStyle = color1;
		context.font = "16px Arial";
		context.fillText(this.title,x,y);
		context.fillText(this.topscore+"/"+this.challenges.length,x+200,y);
		} 
	draw(x,y){
		this.challenges[this.q].draw(x,y);
		//this.challenges[this.q].drawplots(x+200,y+250);
		var i=1;
		while((this.q-i>=0)&&(i<8)){
			this.challenges[this.q-i].draw(x,y+24*(i));
			i++
			}
		}
	drawplots(x,y){
		this.challenges[this.q].drawplots(x,y);
		}
	drawexamples(x,y){
		var i=0;
		while(i<this.examples.length){
			context.fillStyle = "white";
			context.fillText(this.examples[i],x,y+24*i);
			i++
			}
		}
    }
var testquiz = new Quiz("test math","w00 w00");
testquiz.addaddquestion(1,2,false);
testquiz.addsubquestion(2,2,false,true);
testquiz.addmultquestion(1,2,false);
