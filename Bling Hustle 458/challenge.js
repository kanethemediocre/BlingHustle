class Challenge{
	constructor(emtype){//type == "add" or "" or "mission"
		this.type = emtype;
		this.question = "";
		this.answer = 0;
		this.id = -1;
		this.parameters1=[];
		this.parameters2=[];
		this.parameters3=[];
		this.parameters4=[];
		this.dps = [];
		this.das = [];
		this.dls = [];
		this.playeranswer = "";
		this.playerhasanswered = false;
		this.playeriscorrect = false;
		}
	makeaddquestion(digits,addendnum,allownegative){
		var addends = [];
		var i=0;
		while(i<addendnum){
			var addend = Math.floor(Math.random()*10**digits);
			if ((allownegative)&&(Math.random()>0.5)){addend = addend*-1;}
			addends.push(addend);
			i++;
			}
		var thequestion = addends[0]+"";
		var theanswer = addends[0];
		var i=1;
		while(i<addends.length){
			thequestion = thequestion + " + "+addends[i];
			theanswer = theanswer + addends[i];
			i++;
			}
		thequestion = thequestion + " = ???";
		this.question = thequestion;
		this.answer = theanswer;
		this.parameters1=addends;

		return [thequestion,theanswer];
		}
	makesubquestion(digits,addendnum,allownegative,allownegativeanswer){
		var notdone = true;
		while(notdone){
			var addends = []; //Not really addends
			var i=0;
			while(i<addendnum){
				var addend = Math.floor(Math.random()*10**digits);
				if ((allownegative)&&(Math.random()>0.5)){addend = addend*-1;}
				addends.push(addend);
				i++;
				}
			var thequestion = addends[0]+"";
			var theanswer = addends[0];
			var i=1;
			while(i<addends.length){
				thequestion = thequestion + " - "+addends[i];
				theanswer = theanswer - addends[i];
				i++;
				}
			thequestion = thequestion + " = ???";
			if ((allownegativeanswer)||(theanswer>=0)){
				notdone = false;
				}
			}
		this.question = thequestion;
		this.answer = theanswer;
		this.parameters1=addends;
		return [thequestion,theanswer];
		}
	makemultquestion(digits,addendnum,allownegative){
		var addends = []; //Not really addends
		var i=0;
		while(i<addendnum){
			var addend = Math.floor(Math.random()*10**digits);
			if ((allownegative)&&(Math.random()>0.5)){addend = addend*-1;}
			addends.push(addend);
			i++;
			}
		var thequestion = addends[0]+"";
		var theanswer = addends[0];
		var i=1;
		while(i<addends.length){
			thequestion = thequestion + " * "+addends[i];
			theanswer = theanswer * addends[i];
			i++;
			}
		thequestion = thequestion + " = ???";
		this.question = thequestion;
		this.answer = theanswer;
		this.parameters1=addends;
		return [thequestion,theanswer];
		}
	addarithmaticquestion(addends,operator){
		this.answer = addends[0];
		this.parameters1 = addends;
		this.question = addends[0]+" "+operator+" ";
		var i=1;
		while(i<addends.length){
			this.question = this.question+" "+operator+" ";
			if (operator=="+"){	this.answer = this.answer + addends[i];	}
			if (operator=="-"){	this.answer = this.answer - addends[i];	}
			if (operator=="*"){	this.answer = this.answer * addends[i];	}
			i++;
			}
		this.question = this.question+" = ???";
		//return [this.question,this.answer];
		}
	addnumline(){
		var scalemod = 1;
		var scalemax = 20;
		var largestnum = this.answer;
		var i=0;
		while(i<this.parameters1.length){
			if (this.parameters1[i]>largestnum){largestnum=this.parameters1[i];}
			i++;
			}
		while(largestnum>scalemax){
			scalemod = scalemod *2;
			scalemax = scalemax*scalemod
			}	
		var numline = new Axis(0,"",4,4,scalemax,8/scalemod)// constructor(angle,label,ticksize,tickfrequency,axislength,scale){//constructor(angle,label,ticksize,tickfrequency,axislength,scale){
		var numdots = [];
		var i=0;
		while(i<this.parameters1.length){
			var num1dot = new Dot(this.parameters1[i],"red","");  //constructor(value,color,label){
			numdots.push(num1dot);
			i++
			}
		numline.dots = numdots;
		//console.log(this.parameters1.length);
		//console.log(numdots.length);
		this.das = [numline];
		}
	multplot(){
		//this.question = num1+" * "+num2+" = ?";
		//this.answer = num1*num2;
		var scalemod = 1;
		var scalemax = 20;
		while((Math.abs(this.parameters1[0])>scalemax)||(Math.abs(this.parameters1[1])>scalemax)){
			scalemod = scalemod *2;
			scalemax = scalemax*2
			}
		var theplot = new Plot("",scalemax,8/scalemod,scalemax,8/scalemod,"white",4,4);//constructor(label,xaxislength,xscale,yaxislength,yscale,axiscolor,ticksize,tickfrequency){
		theplot.xaxis.dots.push(new Dot(this.parameters1[0],"purple",""));
		theplot.yaxis.dots.push(new Dot(this.parameters1[1],"purple",""));
		this.dps = [theplot];
		var i=0;
		while(i<=this.parameters1[1]){ //This will work for a fairly limited case subset.  Draws grid including
			this.dls.push(new Segment(0,i,this.parameters1[0],i,"gray")); //    constructor(x1,y1,x2,y2,color){
			i++;
			}
		var i=0;
		while(i<=this.parameters1[0]){ 
			this.dls.push(new Segment(i,0,i,this.parameters1[1],"gray")); //    constructor(x1,y1,x2,y2,color){
			i++;
			}
		//this.operator = " * ";
		//this.kv1 = num1;
		//this.kv2 = num2;
		}
	draw(x,y){
		context.font = "20px Courier";
		context.fillStyle = "lime";
		context.fillText(this.question,x,y);
		context.fillStyle = "yellow";
		if (this.playerhasanswered == true){
			if (this.playeranswer == this.answer){context.fillStyle = "lime";}
			else {context.fillStyle = "red";}
			}
		context.fillText(this.playeranswer,x+16*this.question.length+20,y);
		}
	drawplots(x0,y0){
		//console.log(this.das);
		var i=0;
		while(i<this.dps.length){
			this.dps[i].draw(x0+i*256, y0);//sets additional plots to the right of the first.
			i++;
			}
		var i=0;
		while(i<this.das.length){ //    draw(x0,y0,axiscolor,dirs){/
			this.das[i].draw(x0,y0,"white",0);//More nuanced handling later, but this is useful for pseudo 3d plots.
			i++;                    //Also want to be able to have multiple parallel number lines (by iterating y).
			}
		var i=0;
		while(i<this.dls.length){
			this.dls[i].draw(x0,y0,this.dps[0].xscale);//Oof need to make line segments deal with 2 axis scaling or remove it from plots.
			i++;
			}
		}
	}
var testmodule = new Challenge("arithmatic");
//console.log(testmodule.makeaddquestion(1,2,true));
//testmodule.addnumline();
//console.log(testmodule.makesubquestion(2,2,true,true));
console.log(testmodule.makemultquestion(1,2,false));
testmodule.multplot();
//testmodule.draw(400,400);
