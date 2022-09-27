class Quizblock{
	constructor(qtype, qtitle){//type == "blaster" or "upgrade" or "mission"
		this.type = qtype;
		this.id = -1;
		this.quizzes = [];//list of quiz objects
		this.title = qtitle;
		this.quizcompletion = [];//List equal in length to this.quizzes with 0 for untried 1 for failed 2 for passed 3 for good passed 4 for perfect passed.
		this.completed = false; //player has passed all quizzes
		this.perfected = false; //player has achieved a perfect score on all quizzes
		this.rating = 0; //float 0 to 1, a players "score" with 0 being all minimum pass or incomplete, 1 being all perfect pass
		this.prizetype = "armor";//Describes what statistic will be upgraded by passing the quiz
		this.prizesize = 10; //Describes amount statistic will be upgraded with a rating of 1.
		}
	addaddquiz(alloweddigits,allowedaddends,allowedallownegative,size){//Arguments are arrays equal to the set of all acceptable values
		var thequiz = new Quiz("arithmatic","+++ Quiz +++");
		var i=0;
		while(i<size){
			var digitnum = alloweddigits[ Math.floor( Math.random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
			var addendnum = allowedaddends[ Math.floor( Math.random()*allowedaddends.length ) ];
			var allownegative = allowedallownegative[ Math.floor( Math.random()*allowedallownegative.length ) ];
			thequiz.addaddquestion(digitnum,addendnum,allownegative);
			i++;
			}
		this.quizzes.push(thequiz);
		}
	addsubquiz(alloweddigits,allowedaddends,allowedallownegative,allowedallownegativeanswer, size){//Arguments are arrays equal to the set of all acceptable values
		var thequiz = new Quiz("arithmatic","--- Quiz ---");
		var i=0;
		while(i<size){
			var digitnum = alloweddigits[ Math.floor( Math.random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
			var addendnum = allowedaddends[ Math.floor( Math.random()*allowedaddends.length ) ];
			var allownegative = allowedallownegative[ Math.floor( Math.random()*allowedallownegative.length ) ];
			var allownegativeanswer = allowedallownegativeanswer[ Math.floor( Math.random()*allowedallownegativeanswer.length ) ];
			thequiz.addsubquestion(digitnum,addendnum,allownegative,allownegativeanswer);
			i++;
			}
		this.quizzes.push(thequiz);
		}
	addmultquiz(alloweddigits,allowedaddends,allowedallownegative, size){//Arguments are arrays equal to the set of all acceptable values
		var thequiz = new Quiz("arithmatic","*** Quiz ***");
		var i=0;
		while(i<size){
			var digitnum = alloweddigits[ Math.floor( Math.random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
			var addendnum = allowedaddends[ Math.floor( Math.random()*allowedaddends.length ) ];
			var allownegative = allowedallownegative[ Math.floor( Math.random()*allowedallownegative.length ) ];
			thequiz.addmultquestion(digitnum,addendnum,allownegative);
			i++;
			}
		this.quizzes.push(thequiz);
		}
	addarithmaticquizpr(alloweddigits,allowedaddends,allowedallownegative, size,overrides,operator){//Arguments are arrays equal to the set of all acceptable values
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
	mergequizzes(){//Combines all member quizzes into a single quiz
		//var omniquiz =new Quiz("arithmatic","+-* Quiz *-+");
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
	draw(x,y){
		console.log(this.challenges.length);
		this.challenges[this.q].draw(x,y);
		this.challenges[this.q].drawplots(x+200,y+250);
		var i=1;
		while(this.q-i>=0){
			//console.log("itried");
			this.challenges[this.q-i].draw(x,y-24*(i));
			i++
			}
		}
    }
var testquiz = new Quiz("test math","w00 w00");
testquiz.addaddquestion(1,2,false);
testquiz.addsubquestion(2,2,false,true);
testquiz.addmultquestion(1,2,false);
