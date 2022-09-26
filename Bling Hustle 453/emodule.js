class Emodule{
	constructor(qtype, qtitle){//type == "blaster" or "upgrade" or "mission"
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


	draw(x,y){

		}
    }
var protectionem = new Emodule("arithmatic","Protection I");
var addition1 = new Quizblock("arithmatic","Adding I");
addition1.addaddquiz([1],[2],[false],12); //addaddquiz(alloweddigits,allowedaddends,allowedallownegative,size){
addition1.addaddquiz([1],[3],[false],6); //addaddquiz(alloweddigits,allowedaddends,allowedallownegative,size){/
addition1.addaddquiz([1],[2,3],[false],12);
addition1.addaddquiz([1],[4,5],[false],6);
addition1.addaddquiz([1],[2,3,4,5],[false],12);
var subtraction1 = new Quizblock("arithmatic","Subtracting I");
subtraction1.addsubquiz([1],[2],[false],[false],12);
subtraction1.addsubquiz([1],[2],[false],[true],12);
subtraction1.addsubquiz([1],[3],[false],[true],6);
subtraction1.addsubquiz([1],[2,3],[false],[true,false],12);
var addition2 = new Quizblock("arithmatic","Adding II");
//addition2.addaddquiz([1],[2,3,4],[false],12);
addition2.addaddquiz([1],[2],[true],16);
addition2.addaddquiz([1],[3,4,5],[true],16);
var subtraction2 = new Quizblock("arithmatic","Subtracting II");
subtraction2.addsubquiz([1],[2],[true],[true],16);
subtraction2.addsubquiz([1],[2,3,4],[true],[true],16);
var addition3 = new Quizblock("arithmatic","Adding III");
addition3.addaddquiz([1],[2],[false],5);//Placeholder for custom quizzes that step through multidigit adding process
addition3.addaddquiz([1],[2],[false],4);

var addition3 = new Quizblock("arithmatic","Adding III");
addition3.addaddquiz([1],[2],[false],5);//Placeholder for custom quizzes that step through multidigit adding process
addition3.addaddquiz([1],[2],[false],4);

var subtraction3 = new Quizblock("arithmatic","Subtracting III");
subtraction3.addsubquiz([1],[2],[true],[true],16);//placeholder for custom quizzes that step throguh multidigit subtraction process.
subtraction3.addsubquiz([1],[2,3,4],[true],[true],16);

var addition4 = new Quizblock("arithmatic","Adding IV");
addition4.addaddquiz([2],[2],[false],12);
addition4.addaddquiz([3],[2],[false],12);
addition4.addaddquiz([4,5,6],[2],[false],6);
addition4.addaddquiz([2],[3],[false],6);

var subtraction4 = new Quizblock("arithmatic","Subtracting IV");
subtraction4.addsubquiz([2],[2],[false],[false],12);//placeholder for custom quizzes that step throguh multidigit subtraction process.
subtraction4.addsubquiz([3,4,5],[2],[false],[false],12);
subtraction4.addsubquiz([2,3,4],[2],[false],[true],12);
subtraction4.addsubquiz([2,3],[2],[true],[true],12);
protectionem.quizblocks = [addition1,subtraction1,addition2,subtraction2,addition3,subtraction3,addition4,subtraction4];
