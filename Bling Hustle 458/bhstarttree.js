function bhstarttree(){
	var protection1em = new Emodule("arithmatic","Protection I");
	var addition1 = new Quizblock("arithmatic","Adding I");
	addition1.addaddquiz([1],[2],[false],12); //addaddquiz(alloweddigits,allowedaddends,allowedallownegative,size){
	addition1.addaddquiz([1],[3],[false],6); //addaddquiz(alloweddigits,allowedaddends,allowedallownegative,size){/
	addition1.addaddquiz([1],[2,3],[false],12);
	addition1.addaddquiz([1],[4,5],[false],6);
	addition1.addaddquiz([1],[2,3,4,5],[false],12);
	var subtraction1 = new Quizblock("arithmatic","Subtracting I");
	subtraction1.prizetype = "maxshield";//Describes what statistic will be upgraded by passing the quiz
	subtraction1.prizesize = 2; //Describes amount statistic will be upgraded with a rating of 1.
	subtraction1.addsubquiz([1],[2],[false],[false],12);
	subtraction1.addsubquiz([1],[2],[false],[true],12);
	subtraction1.addsubquiz([1],[3],[false],[true],6);
	subtraction1.addsubquiz([1],[2,3],[false],[true,false],12);
	var addition2 = new Quizblock("arithmatic","Adding II");
	//addition2.addaddquiz([1],[2,3,4],[false],12);
	addition2.addaddquiz([1],[2],[true],16);
	addition2.addaddquiz([1],[3,4,5],[true],16);
	var subtraction2 = new Quizblock("arithmatic","Subtracting II");
	subtraction2.prizetype = "maxshield";//Describes what statistic will be upgraded by passing the quiz
	subtraction2.prizesize = 2; //Describes amount statistic will be upgraded with a rating of 1.
	subtraction2.addsubquiz([1],[2],[true],[true],16);
	subtraction2.addsubquiz([1],[2,3,4],[true],[true],16);

	protection1em.quizblocks = [addition1,subtraction1,addition2,subtraction2];


	var protection2em = new Emodule("arithmatic","Protection II");
	protection2em.level = 1;
	var addition3 = new Quizblock("arithmatic","Adding III");
	addition3.addaddquiz([1],[2],[false],5);//Placeholder for custom quizzes that step through multidigit adding process
	addition3.addaddquiz([1],[2],[false],4);
	var subtraction3 = new Quizblock("arithmatic","Subtracting III");
	subtraction1.prizetype = "maxshield";//Describes what statistic will be upgraded by passing the quiz
	subtraction1.prizesize = 2; //Describes amount statistic will be upgraded with a rating of 1.
	subtraction3.addsubquiz([1],[2],[true],[true],16);//placeholder for custom quizzes that step throguh multidigit subtraction process.
	subtraction3.addsubquiz([1],[2,3,4],[true],[true],16);
	var addition4 = new Quizblock("arithmatic","Adding IV");
	addition4.addaddquiz([2],[2],[false],12);
	addition4.addaddquiz([3],[2],[false],12);
	addition4.addaddquiz([4,5,6],[2],[false],6);
	addition4.addaddquiz([2,3],[3],[false],6);
	var subtraction4 = new Quizblock("arithmatic","Subtracting IV");
	subtraction1.prizetype = "maxshield";//Describes what statistic will be upgraded by passing the quiz
	subtraction1.prizesize = 2; //Describes amount statistic will be upgraded with a rating of 1.
	subtraction4.addsubquiz([2],[2],[false],[false],12);//placeholder for custom quizzes that step throguh multidigit subtraction process.
	subtraction4.addsubquiz([3,4,5],[2],[false],[false],12);
	subtraction4.addsubquiz([2,3,4],[2],[false],[true],12);
	subtraction4.addsubquiz([2,3],[2],[true],[true],12);
	protection2em.quizblocks = [addition3,subtraction3,addition4,subtraction4];


	var speed1em = new Emodule("arithmatic","Speed I");
	speed1em.level = 2;
	var addfast1 = new Quizblock("arithmatic","Adding Fast 1");
	addfast1.addaddquiz([1],[2],[false],16);
	addfast1.addaddquiz([1],[2],[true],16);
	addfast1.addaddquiz([1],[3],[false],16);
	addfast1.addaddquiz([1],[2,3],[true,false],16);
	addfast1.addaddquiz([2],[2],[false],8);
	addfast1.prizetype = "thrustenergy";//Describes what statistic will be upgraded by passing the quiz
	addfast1.prizesize = 10; //Describes amount statistic will be upgraded with a rating of 1.
	var subfast1 = new Quizblock("arithmatic","Subtracting Fast 1");
	subfast1.prizetype = "thrustenergyregen";//Describes what statistic will be upgraded by passing the quiz
	subfast1.prizesize = 0.2; //Describes amount statistic will be upgraded with a rating of 1.
	subfast1.addsubquiz([1],[2],[false],[false],16);
	subfast1.addsubquiz([1],[2],[false],[true],16);
	subfast1.addsubquiz([1],[2],[true],[true],16);
	subfast1.addsubquiz([2],[2],[false],[true],8);
	var adaptfast1 = new Quizblock("arithmatic","Adapt!");
	adaptfast1.prizetype = "thrust";//Describes what statistic will be upgraded by passing the quiz
	adaptfast1.prizesize = 0.2; //Describes amount statistic will be upgraded with a rating of 1.
	var mixingbowl = new Quizblock("arithmatic","For Internal Use Only");
	mixingbowl.addaddquiz([1],[2,3,4],[true,false],8);
	mixingbowl.addsubquiz([1],[2,2,3],[true,false],[true],8);
	mixingbowl.mergequizzes();
	mixingbowl.quizzes[0].scramble();
	adaptfast1.quizzes.push(mixingbowl.quizzes[0]);
	var mixingbowl2 = new Quizblock("arithmatic","For Internal Use Only");
	mixingbowl2.addaddquiz([2],[2],[true],4);
	mixingbowl2.addaddquiz([1],[2],[true],4);
	mixingbowl2.addaddquiz([1],[3],[true],4);
	mixingbowl2.addaddquiz([1],[4],[true],4);
	mixingbowl2.addaddquiz([1],[5],[true],4);
	mixingbowl2.addaddquiz([1],[5],[true],4);
	mixingbowl2.addsubquiz([2],[2],[true],[true],4);
	mixingbowl2.addsubquiz([1],[3],[true],[true],4);
	mixingbowl2.addsubquiz([1],[2],[true],[true],8);
	mixingbowl2.mergequizzes();
	mixingbowl2.quizzes[0].scramble();
	adaptfast1.quizzes.push(mixingbowl2.quizzes[0]);
	speed1em.quizblocks = [addfast1,subfast1,adaptfast1];


	var energy1em = new Emodule("arithmatic","Energy I");
	energy1em.level = 3;
	var multiplication1 = new Quizblock("arithmatic","Multiplying I");
	multiplication1.prizetype = "blasterenergy";//Describes what statistic will be upgraded by passing the quiz
	multiplication1.prizesize = 2; //Describes amount statistic will be upgraded with a rating of 1.
	multiplication1.addarithmaticquizpr([1],[2],[false],10,[1,-999],"*");//addarithmaticquizpr(alloweddigits,allowedaddends,allowedallownegative, size,overrides,operator){
	multiplication1.addarithmaticquizpr([1],[2],[false],10,[0,-999],"*");
	multiplication1.addarithmaticquizpr([1],[2],[false],10,[2,-999],"*");
	multiplication1.addarithmaticquizpr([1],[2],[false],10,[3,-999],"*");
	multiplication1.addarithmaticquizpr([1],[2],[false],10,[4,-999],"*");
	var multiplication2 = new Quizblock("arithmatic","Multiplying II");
	multiplication1.prizetype = "blasterenergy";//Describes what statistic will be upgraded by passing the quiz
	multiplication1.prizesize = 3; //Describes amount statistic will be upgraded with a rating of 1.
	multiplication1.addarithmaticquizpr([1],[2],[false],10,[5,-999],"*");
	multiplication2.addarithmaticquizpr([1],[2],[false],10,[9,-999],"*");
	multiplication2.addarithmaticquizpr([1],[2],[false],10,[10,-999],"*");
	multiplication2.addarithmaticquizpr([1],[2],[false],10,[6,-999],"*");
	multiplication2.addarithmaticquizpr([1],[2],[false],10,[7,-999],"*");
	multiplication2.addarithmaticquizpr([1],[2],[false],10,[8,-999],"*");
	multiplication3 = new Quizblock("arithmatic","Multiplying III");
	multiplication3.prizetype = "blasterenergyregen";//Describes what statistic will be upgraded by passing the quiz
	multiplication3.prizesize = 0.25; //Describes amount statistic will be upgraded with a rating of 1.
	var omnimult1 = new Quiz("arithmatic","*** Quiz ***");
	var i=0;
	while(i<11){
		var j=0;
		while(j<11){
			omnimult1.addarithmaticquestionpr([1],[2],[false],[i,j],"*");
			//addarithmaticquestionpr(alloweddigits,allowedaddends,allowedallownegative, overrides, operator){//overrides is a set
			j++;
			}
		i++;
		}
	omnimult1.scramble();
	multiplication3.quizzes.push(omnimult1);
	energy1em.quizblocks = [multiplication1,multiplication2,multiplication3];
	var startertree = new Emtree("Ship");
	startertree.emods = [protection1em, protection2em, speed1em,energy1em ];
	console.log(startertree.emods);
	startertree.setids();
	return startertree;

}
