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
		this.metaparameters = [];
		this.dps = [];
		this.das = [];
		this.dls = [];
		this.playeranswer = "";
		this.playerhasanswered = false;
		this.playeriscorrect = false;
		}
	makeaddquestion(digits,addendnum,allownegative){
		this.metaparameters = [digits,addendnum,allownegative];
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
		this.metaparameters = [digits,addendnum,allownegative,allownegativeanswer];
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
		this.metaparameters = [digits,addendnum,allownegative];
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
	makedivquestion(digits,forceintegers,decimals,remainder,allownegative){
		this.metaparameters = [digits,forceintegers,decimals,remainder,allownegative];
		var num1 = Math.floor(Math.random()*10**digits);//currently assumes forceintegers is true, decimals is 0, and remainder is false.
		var num2 = Math.floor(Math.random()*10**digits);
		if (allownegative==true){
			if (Math.random()<0.5){num1 = num1*-1;}
			if (Math.random()<0.5){num2 = num2*-1;}
			}
		var num3 = num1 * num2;
		this.parameters1 = [num3];
		this.parameters2 = [num1]
		this.question = num3+" / "+num1+" = ???";
		this.answer = num2;
		return [this.question,this.answer];
		}
	makearithmaticquestion(addends,operator){
		this.metaparameters = [addends,operator];
		this.type = "makearithmaticquestion";
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
		return [this.question,this.answer];
		}
	makerithmaticquestionpr(alloweddigits,allowedaddends,allowedallownegative, overrides, operator){//overrides is a set equal or less than the minimum length of addends, -999 indicates no override for that addend, all else indicates override to the specified values
		this.metaparameters = [alloweddigits,allowedaddends,allowedallownegative, overrides, operator];
		this.type = "makearithmaticquestionpr";
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
		this.makearithmaticquestion(addends,operator)//addarithmaticquestion(addends,operator){
		this.challenges.push(newchallenge);
		}
	makesimplealgebraquestion(addends, vindex, operator, vlabel){
		if (vindex==0){	this.question = vlabel; }
		else { this.question = addends[0]; }
		this.answer = addends[0];
		this.parameters1 = addends;
		var i=1;
		while(i<addends.length){
			this.question = this.question+" "+operator+" ";
			if (vindex==i){ this.question = this.question + vlabel; }
			else { this.question = this.question + addends[i] }
			if (operator=="+"){	this.answer = this.answer + addends[i];	}
			if (operator=="-"){	this.answer = this.answer - addends[i];	}
			if (operator=="*"){	this.answer = this.answer * addends[i];	}
			i++;
			}
		if (vindex==i){ this.question = this.question + " = "+vlabel; }
		else { this.question = this.question + " = "+addends[i] }
		return [this.question,this.answer];
		}
	make1variablealgebraquestion(va, vb, vc, vd, vlabel){
		this.parameters1 = [va,vb,vc,vd];
		//ax+b = cx+d
		this.question = va+"*"+vlabel+" + "+vb+" = "+vc+"*"+vlabel+" + "+vd+"        "+vlabel+" = ???";
		this.answer = (vd-vb)/(va-vc);
		// ax = cx+d-b
		// ax-cx = d-b
		// (a-c)x = d-b
		// x = (d-b) / (a-c)
		}
	make2variablealgebraquestion(va, vb, vc, vd, ve, vf, vg, vh, vlabel1, vlabel2){
		this.parameters1 = [va,vb,vc,vd,ve,vf];//ax+by+c = dx+ey+f
		this.parameters2 = [vg,vh];////x=gy+h
		//ax+by+c = dx+ey+f
		//by+c = dx-ax+ey+f
		//by = dx-ax+ey+f-c
		//by-ey = dx-ax+f-c
		//(b-e)y = (d-a)x+(f-c)
		//y = ( (d-a)x+(f-c) )/(b-e)

		//ax+by+c = dx+ey+f
		//x=gy+h
		//a(gy+h)+by+c = d(gy+h)+ey+f
		//agy+ah+by+c = dgy+dh+ey+f
		//agy+by-dgy+ah+c = dh+ey+f
		//agy+by-dgy-ey+ah+c = dh+f
		//agy+by-dgy-ey = dh+f-ah-c

		this.question = va+"*"+vlabel1+" + "+vb+"*"+vlabel2+" + "+vc+" = "+vd+"*"+vlabel1+" + "+ve+"*"+vlabel2+" + "+vf;
		this.answer = (vd-vb)/(va-vc);
		// ax = cx+d-b
		// ax-cx = d-b
		// (a-c)x = d-b
		// x = (d-b) / (a-c)
		}
	regenerate(){
		if (this.type == "+"){
			this.makeaddquestion(this.metaparameters[0],this.metaparameters[1],this.metaparameters[2]);
			}
		if (this.type == "-"){
			this.makesubquestion(this.metaparameters[0],this.metaparameters[1],this.metaparameters[2],this.metaparameters[3]);
			}
		if (this.type == "*"){
			this.makemultquestion(this.metaparameters[0],this.metaparameters[1],this.metaparameters[2]);
			}
		if (this.type == "/"){
			this.makedivquestion(this.metaparameters[0],this.metaparameters[1],this.metaparameters[2],this.metaparameters[3],this.metaparameters[4]);
			}
		if (this.type == "makearithmaticquestion"){
			this.makearithmaticquestion(this.metaparameters[0],this.metaparameters[1]);
			}
		if (this.type == "makearithmaticquestion"){
			this.makerithmaticquestionpr(this.metaparameters[0],this.metaparameters[1],this.metaparameters[2],this.metaparameters[3],this.metaparameters[4]);
			}
		this.playeranswer = "";
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

