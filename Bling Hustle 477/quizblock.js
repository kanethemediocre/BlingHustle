class Quizblock{
	constructor(qtype, qtitle){//type == "blaster" or "upgrade" or "mission"
		this.type = qtype;
		this.id = -1;
		this.quizzes = [];//list of quiz objects
		this.title = qtitle;
		this.qc = 0;
		this.quizcompletion = [];//List equal in length to this.quizzes with 0 for untried 1 for failed 2 for passed 3 for good passed 4 for perfect passed.
		this.completed = false; //player has passed all quizzes
		this.perfected = false; //player has achieved a perfect score on all quizzes
		this.rating = 0; //float 0 to 4, a players "score" with 0 being all minimum pass or incomplete, 4 being all perfect pass
		this.prizetype = "armor";//Describes what statistic will be upgraded by passing the quiz
		this.prizesize = 10; //Describes amount statistic will be upgraded with a rating of 1.
		}
	addaddquiz(alloweddigits,allowedaddends,allowedallownegative,size){//Arguments are arrays equal to the set of all acceptable values
		var thequiz = new Quiz("arithmatic","+++ Quiz +++");
		var otherquiz = new Quiz("arithmatic","*** Quiz ***");//for example generation only
		var i=0;
		while(i<size){
			var digitnum = alloweddigits[ Math.floor( Math.random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
			var addendnum = allowedaddends[ Math.floor( Math.random()*allowedaddends.length ) ];
			var allownegative = allowedallownegative[ Math.floor( Math.random()*allowedallownegative.length ) ];
			thequiz.addaddquestion(digitnum,addendnum,allownegative);
			otherquiz.addaddquestion(digitnum,addendnum,allownegative);
			var lastchallenge = otherquiz.challenges[otherquiz.challenges.length-1];
			thequiz.examples.push(lastchallenge.question+" "+lastchallenge.answer);//Examples added to thequiz, which is put in this.quizzes, not otherquiz, which is discarded
			i++;
			}
		this.quizzes.push(thequiz);
		}
	addsubquiz(alloweddigits,allowedaddends,allowedallownegative,allowedallownegativeanswer, size){//Arguments are arrays equal to the set of all acceptable values
		var thequiz = new Quiz("arithmatic","--- Quiz ---");
		var otherquiz = new Quiz("arithmatic","*** Quiz ***");//for example generation only
		var i=0;
		while(i<size){
			var digitnum = alloweddigits[ Math.floor( Math.random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
			var addendnum = allowedaddends[ Math.floor( Math.random()*allowedaddends.length ) ];
			var allownegative = allowedallownegative[ Math.floor( Math.random()*allowedallownegative.length ) ];
			var allownegativeanswer = allowedallownegativeanswer[ Math.floor( Math.random()*allowedallownegativeanswer.length ) ];
			thequiz.addsubquestion(digitnum,addendnum,allownegative,allownegativeanswer);
			otherquiz.addsubquestion(digitnum,addendnum,allownegative,allownegativeanswer);
			var lastchallenge = otherquiz.challenges[otherquiz.challenges.length-1];
			thequiz.examples.push(lastchallenge.question+" "+lastchallenge.answer);//Examples added to thequiz, which is put in this.quizzes, not otherquiz, which is discarded
			i++;
			}
		this.quizzes.push(thequiz);
		}
	addmultquiz(alloweddigits,allowedaddends,allowedallownegative, size){//Arguments are arrays equal to the set of all acceptable values
		var thequiz = new Quiz("arithmatic","*** Quiz ***");
		var otherquiz = new Quiz("arithmatic","*** Quiz ***");//for example generation only
		var i=0;
		while(i<size){
			var digitnum = alloweddigits[ Math.floor( Math.random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
			var addendnum = allowedaddends[ Math.floor( Math.random()*allowedaddends.length ) ];
			var allownegative = allowedallownegative[ Math.floor( Math.random()*allowedallownegative.length ) ];
			thequiz.addmultquestion(digitnum,addendnum,allownegative);
			otherquiz.addmultquestion(digitnum,addendnum,allownegative);
			var lastchallenge = otherquiz.challenges[otherquiz.challenges.length-1];
			thequiz.examples.push(lastchallenge.question+" "+lastchallenge.answer);//Examples added to thequiz, which is put in this.quizzes, not otherquiz, which is discarded
			i++;
			}
		this.quizzes.push(thequiz);
		}
	adddivquiz(alloweddigits,allowedforceintegers,alloweddecimals,allowedremainder,allowedallownegative, size){//Arguments are arrays equal to the set of all acceptable values
		var thequiz = new Quiz("arithmatic","*** Quiz ***");//(digits,forceintegers,decimals,remainder,allownegative)
		var otherquiz = new Quiz("arithmatic","*** Quiz ***");//for example generation only
		var i=0;
		while(i<size){
			var digitnum = alloweddigits[ Math.floor( Math.random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
			var forceintegers = allowedforceintegers[ Math.floor( Math.random()*allowedforceintegers.length ) ];
			var decimals = alloweddecimals[ Math.floor( Math.random()*alloweddecimals.length ) ];
			var remainder = allowedremainder[ Math.floor( Math.random()*allowedremainder.length ) ];
			var allownegative = allowedallownegative[ Math.floor( Math.random()*allowedallownegative.length ) ];
			thequiz.adddivquestion(digitnum,forceintegers,decimals,remainder,allownegative);
			otherquiz.adddivquestion(digitnum,forceintegers,decimals,remainder,allownegative);
			var lastchallenge = otherquiz.challenges[otherquiz.challenges.length-1];
			thequiz.examples.push(lastchallenge.question+" "+lastchallenge.answer);//Examples added to thequiz, which is put in this.quizzes, not otherquiz, which is discarded
			i++;
			}
		this.quizzes.push(thequiz);
		}
	addarithmaticquizpr(alloweddigits,allowedaddends,allowedallownegative, size,overrides,operator){//Arguments are arrays equal to the set of all acceptable values.
		var thequiz = new Quiz("arithmatic","*** Quiz ***");//Quiz for users
		var otherquiz = new Quiz("arithmatic","*** Quiz ***");//for example generation only
		var i=0;
		while(i<size){
			var digitnum = alloweddigits[ Math.floor( Math.random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
			var addendnum = allowedaddends[ Math.floor( Math.random()*allowedaddends.length ) ];
			var allownegative = allowedallownegative[ Math.floor( Math.random()*allowedallownegative.length ) ];				//addarithmaticquestionpr(alloweddigits,allowedaddends,allowedallownegative, size, overrides, operator){//overrides is a set
			thequiz.addarithmaticquestionpr([digitnum],[addendnum],[allownegative],overrides,operator);
			otherquiz.addarithmaticquestionpr([digitnum],[addendnum],[allownegative],overrides,operator);
			var lastchallenge = otherquiz.challenges[otherquiz.challenges.length-1];
			thequiz.examples.push(lastchallenge.question+"--->"+lastchallenge.answer);//Examples added to thequiz, which is put in this.quizzes, not otherquiz, which is discarded
			i++;
			}
		this.quizzes.push(thequiz);
		}
//addsunokealgebraquiz is broken
	addsimplealgebraquiz(alloweddigits,allowedaddends,allowedallownegative, size,overrides,operator){//Arguments are arrays equal to the set of all acceptable values.
		var thequiz = new Quiz("arithmatic","*** Quiz ***");
		var i=0;
		while(i<size){
			var digitnum = alloweddigits[ Math.floor( Math.random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
			var addendnum = allowedaddends[ Math.floor( Math.random()*allowedaddends.length ) ];
			var allownegative = allowedallownegative[ Math.floor( Math.random()*allowedallownegative.length ) ];				//addarithmaticquestionpr(alloweddigits,allowedaddends,allowedallownegative, size, overrides, operator){//overrides is a set
			thequiz.addarithmaticquestionpr([digitnum],[addendnum],[allownegative],overrides,operator);
			i++;
			}
		this.quizzes.push(thequiz);
		}
	grade(){
		var prizepool = 0;
		var oldrating = this.rating;
		var rating = 0;//maybe new scale, 4 = all perfect, 1 = at least one quiz complete, 2 = all quizzes complete, 3 = all complete + at least one perfect
		var qc = 0;
		var qp = 0;
		var i=0;
		while (i<this.quizzes.length){
			this.quizzes[i].grade();
			//if (this.quizzes[i].rating < rating){rating = this.quizzes[i].rating; }
			if (this.quizzes[i].rating>1){
				qc++;
				rating = 1;
				}
			if (this.quizzes[i].rating>3){
				qp++;
				}
			i++;
			}
		if (qc>=this.quizzes.length){
			rating = 2; 
			if (qp>=this.quizzes.length/2){rating = 3;}
			}
		if (qp>=this.quizzes.length){rating = 4; }
		if (this.rating<rating){//progress has been made
			if (this.rating == 3){prizepool = Math.ceil(this.prizesize/2);}//rating will == 4 here
			else if (rating == 3){prizepool = Math.floor(this.prizesize/2);}//this.rating will be <3 here
			else if ((this.rating <3)&&(rating==4)){prizepool = this.prizesize;}		
			this.rating = rating;
			}
		if (this.rating > 1){this.completed = true;}
		if (this.rating==4){this.perfected = true;}
		this.qc = qc;
		return [prizepool,this.prizetype];
		}


	mergequizzes(){//Combines all member quizzes into a single quiz
		var allchallenges = this.quizzes[0].challenges;
		console.log(allchallenges);
		var i=1;
		while(i<this.quizzes.length){
			allchallenges = allchallenges.concat(this.quizzes[i].challenges);
			i++;
			}
		var omniquiz =new Quiz("arithmatic","+-* Quiz *-+");
		omniquiz.challenges = allchallenges;
		this.quizzes = [omniquiz];
		}
	setids(){
		var i=0;
		while(i<this.quizzes.length){
			this.quizzes[i].id=i;
			this.quizzes[i].setids();//sets the ids of the challenges in Quiz object quizzes[i]
			i++;
			}
		}
	drawformenu(x,y){
		var color1 = "red";
		if (this.rating == 1){ color1 = "orange"; }
		if (this.rating == 2){ color1 = "yellow"; }
		if (this.rating == 3){ color1 = "green"; }			
		if (this.rating == 4){ color1 = "blue"; }
		context.fillStyle = color1;
		context.fillText(this.title,x,y);
		context.fillText(this.qc+"/"+this.quizzes.length,x+200,y);
		context.fillText(this.prizetype+" + "+this.prizesize,x+300,y);
		} 
	draw(x,y){
		var i=0;
		while(i<this.quizzes.length){
			var mycolor = "red";
			if (this.quizzes[i].rating == 1){ mycolor = "orange"; }
			if (this.quizzes[i].rating == 2){ mycolor = "yellow"; }
			if (this.quizzes[i].rating == 3){ mycolor = "green"; }			
			if (this.quizzes[i].rating == 4){ mycolor = "blue"; }
			context.fillStyle = mycolor;
			context.fillText(this.quizzes[i].title,x,y+24*i);
			i++
			}
		}
    }
var testquiz = new Quiz("test math","w00 w00");
testquiz.addaddquestion(1,2,false);
testquiz.addsubquestion(2,2,false,true);
testquiz.addmultquestion(1,2,false);
