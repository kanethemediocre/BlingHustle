class Quiz{
	constructor(qtype, qtitle){//type == "blaster" or "upgrade" or "mission"
		this.type = qtype;
		this.challenges = [];
		this.passtolerance = 2;
		this.title = qtitle;
		this.id = -1;
		this.q = 0; //Which question in the quiz are you working on
		}
	addaddquestion(digits,addendnum,allownegative){
		var newchallenge = new Challenge("arithmatic");
		newchallenge.makeaddquestion(digits,addendnum,allownegative);
		newchallenge.addnumline();
		this.challenges.push(newchallenge);
		//console.log(this.challenges.length);
		}
	addsubquestion(digits,addendnum,allownegative,allownegativeanswer){
		var newchallenge = new Challenge("arithmatic");
		newchallenge.makesubquestion(digits,addendnum,allownegative,allownegativeanswer);
		//newchallenge.addnumline();
		this.challenges.push(newchallenge);	
		//console.log(this.challenges.length);
		}
	addmultquestion(digits,addendnum,allownegative){
		var newchallenge = new Challenge("arithmatic");
		newchallenge.makemultquestion(digits,addendnum,allownegative);
		newchallenge.multplot();
		this.challenges.push(newchallenge);
		//console.log(this.challenges.length);
		}
	addarithmaticquestion(addends,operator){
		var newchallenge = new Challenge("arithmatic");
		newchallenge.addarithmaticquestion(addends,operator)//addarithmaticquestion(addends,operator){
		this.challenges.push(newchallenge);
		}
	addarithmaticquestionpr(alloweddigits,allowedaddends,allowedallownegative, overrides, operator){//overrides is a set equal or less than the minimum length of addends, -999 indicates no override for that addend, all else indicates override to the specified values
		var newchallenge = new Challenge("arithmatic");
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
		newchallenge.addarithmaticquestion(addends,operator)//addarithmaticquestion(addends,operator){
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
