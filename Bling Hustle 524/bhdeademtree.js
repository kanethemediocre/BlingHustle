function bhdeademtree(){
	var tier1 = new Emodule("arithmatic","Protection I");
	var easy = new Quizblock("arithmatic","Stuff");
	easy.prizesize = 0;
	easy.prizetype = "armor";
	easy.addaddquiz([2],[2],[false],4); //addaddquiz(alloweddigits,allowedaddends,allowedallownegative,size){
	//addition1.quizzes[addition1.quizzes.length-1].title = "Adding 2 numbers";
	easy.addaddquiz([1],[5],[true],8); //addaddquiz(alloweddigits,allowedaddends,allowedallownegative,size){/
	//addition1.quizzes[addition1.quizzes.length-1].title = "Adding 3 numbers";
	easy.addarithmaticquizpr([1],[2],[true],10,[-999,-999],"*");
	tier1.quizblocks = [easy];
	//addition1.quizzes[addition1.quizzes.length-1].title = "Multiplying";
	var deadtree = new Emtree("Dead");
	deadtree.emods = [tier1];
	//console.log(startertree.emods);
	deadtree.setids();
	return deadtree;
	}