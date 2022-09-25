class Quizblock{
	constructor(qtype, qtitle){//type == "blaster" or "upgrade" or "mission"
		this.type = qtype;
		this.quizzes = [];//list of quiz objects
		this.title = qtitle;
		this.quizcompletion = [];//List equal in length to this.quizzes with 0 for untried 1 for failed 2 for passed 3 for good passed 4 for perfect passed.
		}
	addaddquiz(alloweddigits,allowedaddends,allowedallownegative,size){//Arguments are arrays equal to the set of all acceptable values
		var thequiz = new Quiz("arithmatic","+++ Quiz +++");
		var i=0;
		while(i<size){
			var digitnum = alloweddigits[ Math.floor( Math.Random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
			var addendnum = allowedaddends[ Math.floor( Math.Random()*allowedaddends.length ) ];
			var allownegative = allowedallownegative[ Math.floor( Math.Random()*allowedallownegative.length ) ];			
			thequiz.addaddquestion(digitnum,addendnum,allownegative);
			i++;
			}
		this.quizzes.push(thequiz);
		}
	addsubquiz(alloweddigits,allowedaddends,allowedallownegative,allowedallownegativeanswer, size){//Arguments are arrays equal to the set of all acceptable values
		var thequiz = new Quiz("arithmatic","--- Quiz ---");
		var i=0;
		while(i<size){
			var digitnum = alloweddigits[ Math.floor( Math.Random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
			var addendnum = allowedaddends[ Math.floor( Math.Random()*allowedaddends.length ) ];
			var allownegative = allowedallownegative[ Math.floor( Math.Random()*allowedallownegative.length ) ];		
			var allownegativeanswer = allowedallownegativeanswer[ Math.floor( Math.Random()*allowedallownegativeanswer.length ) ];				
			thequiz.addsubquestion(digitnum,addendnum,allownegative,allownegativeanswer);
			i++;
			}
		this.quizzes.push(thequiz);
		}
	addmultquiz(alloweddigits,allowedaddends,allowedallownegative, size){//Arguments are arrays equal to the set of all acceptable values
		var thequiz = new Quiz("arithmatic","*** Quiz ***");
		var i=0;
		while(i<size){
			var digitnum = alloweddigits[ Math.floor( Math.Random()*alloweddigits.length ) ];//This randomly picks one of the acceptable values and applies it
			var addendnum = allowedaddends[ Math.floor( Math.Random()*allowedaddends.length ) ];
			var allownegative = allowedallownegative[ Math.floor( Math.Random()*allowedallownegative.length ) ];					
			thequiz.addmultquestion(digitnum,addendnum,allownegative);
			i++;
			}
		this.quizzes.push(thequiz);
		}
	mergequizzes(){//Combines all member quizzes into a single quiz
		var omniquiz =new Quiz("arithmatic","+-* Quiz *-+");
		var i=0;
		while(i<this.quizzes.length){
			omniquiz = omniquiz.challenges.concat(this.quizzes[i].challenges);
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