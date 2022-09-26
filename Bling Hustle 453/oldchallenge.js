class Oldchallenge{
    constructor(label,question,answer,displayplots,displayaxes){
        this.label = label; //Label of axis variable
        this.question = question; //Length of axis to display in units
		this.answer = answer; //Length of axis to display in units
		this.dps = displayplots;
		this.das = displayaxes;
		this.dls = []; //.dls is "display lines", for any non-plot, non-axis stuff to draw.
		this.operator = " ";
		this.kv1 = 0;
		this.kv2 = 0;
		this.kv3 = 0;
		this.kv4 = 0;
		this.kv1c = "red";
		this.kv2c = "blue";
		this.qoffsetx = 8;
		this.qoffsety = 64;
		}
    draw(x0,y0){//Dirs indicates positive, negative, or bidirectional axis display
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
		//context.fillStyle = "white";
		//context.font = "16px Ariel";
		//context.fillText(this.question,x0+8,y0-64);
		context.fillStyle = this.kv1c;
		context.font = "16px Ariel";
		context.fillText(this.kv1,x0+this.qoffsetx,y0-this.qoffsety);
		context.fillStyle = "white";
		context.font = "16px Ariel";
		context.fillText(this.operator,x0+this.qoffsetx+24,y0-this.qoffsety);
		context.fillStyle = this.kv2c;
		context.font = "16px Ariel";
		context.fillText(this.kv2,x0+this.qoffsetx+48,y0-this.qoffsety);
		context.fillStyle = "white";
		context.font = "16px Ariel";
		context.fillText("=  ?",x0+this.qoffsetx+72,y0-this.qoffsety);
		}
	check(playeranswer){
		if (playeranswer==this.answer){ return true; }
		else { return false; }
		}
	addquestion(num1,num2){
		this.question = num1+" + "+num2+" = ?";
		this.answer = num1 + num2;
		var scalemod = 1;
		var scalemax = 20;
		while((this.answer>scalemax)||(num1>scalemax)||(num2>scalemax)){
			scalemod = scalemod *2;
			scalemax = scalemax*2
			}
		var numline = new Axis(0,"",4,4,scalemax,8/scalemod)//constructor(angle,label,ticksize,tickfrequency,axislength,scale){
		var num1dot = new Dot(num1,this.kv1c,"");  //constructor(value,color,label){
		var num2dot = new Dot(num2,this.kv2c,"");  //constructor(value,color,label){
		var num3dot = new Dot(this.answer,"violet","");  //constructor(value,color,label){
		numline.dots = [num1dot,num2dot,num3dot];
		this.das = [numline];
		this.operator = " + ";
		this.kv1 = num1;
		this.kv2 = num2;
		}
	subquestion(num1,num2){
		this.question = num1+" - "+num2+" = ?";
		this.answer = num1 - num2;
		var scalemod = 1;
		var scalemax = 20;
		while((Math.abs(this.answer)>scalemax)||(Math.abs(num1)>scalemax)||(Math.abs(num2)>scalemax)){
			scalemod = scalemod *2;
			scalemax = scalemax*2
			}
		var numline = new Axis(0,"",4,4,scalemax,8/scalemod)//constructor(angle,label,ticksize,tickfrequency,axislength,scale){
		var num1dot = new Dot(num1,this.kv1c,"");  //constructor(value,color,label){
		var num2dot = new Dot(num2,this.kv2c,"");  //constructor(value,color,label){
		var num3dot = new Dot(this.answer,"violet","");  //constructor(value,color,label){
		numline.dots = [num1dot,num2dot,num3dot];
		this.das = [numline];	
		this.operator = " - ";
		this.kv1 = num1;
		this.kv2 = num2;
		}
	multquestion(num1,num2){
		this.question = num1+" * "+num2+" = ?";
		this.answer = num1*num2;
		var scalemod = 1;
		var scalemax = 20;
		while((Math.abs(num1)>scalemax)||(Math.abs(num2)>scalemax)){
			scalemod = scalemod *2;
			scalemax = scalemax*2
			}
		var theplot = new Plot("",scalemax,8/scalemod,scalemax,8/scalemod,"white",4,4);//constructor(label,xaxislength,xscale,yaxislength,yscale,axiscolor,ticksize,tickfrequency){
		theplot.xaxis.dots.push(new Dot(num1,this.kv1c,""));
		theplot.yaxis.dots.push(new Dot(num2,this.kv2c,""));
		this.dps = [theplot];
		var i=0;
		while(i<=num2){ //This will work for a fairly limited case subset.  Draws grid including
			this.dls.push(new Segment(0,i,num1,i,"gray")); //    constructor(x1,y1,x2,y2,color){
			i++;
			}
		var i=0;
		while(i<=num1){ 
			this.dls.push(new Segment(i,0,i,num2,"gray")); //    constructor(x1,y1,x2,y2,color){
			i++;
			}
		this.operator = " * ";
		this.kv1 = num1;
		this.kv2 = num2;
		}
	randomadd(digits){//Digits is maximum number of nonzero digits in question numbers, display axis is boolean for if number line is included
		var num1 = Math.floor(Math.random()*10);
		var num2 = Math.floor(Math.random()*10);
		var i=1;
		while(i<digits){
			var digit1 = Math.floor(Math.random()*10);
			var digit2 = Math.floor(Math.random()*10);
			num1 = num1 + digit1*(10^i);
			num2 = num2 + digit2*(10^i);
			i++;
			}
		this.addquestion(num1,num2);
		}
	randomsubtract(digits){
		var num1 = Math.floor(Math.random()*10);
		var num2 = Math.floor(Math.random()*10);
		var i=1;
		while(i<digits){
			var digit1 = Math.floor(Math.random()*10);
			var digit2 = Math.floor(Math.random()*10);
			num1 = num1 + digit1*(10^i);
			num2 = num2 + digit2*(10^i);
			i++;
			}
		this.subquestion(num1,num2);
		}
	randommult(digits){
		var num1 = Math.floor(Math.random()*10);;
		var num2 = Math.floor(Math.random()*10);;
		var i=1;
		while(i<digits){
			var digit1 = Math.floor(Math.random()*10);
			var digit2 = Math.floor(Math.random()*10);
			num1 = num1 + digit1*(10^i);
			num2 = num2 + digit2*(10^i);
			i++;
			}
		this.multquestion(num1,num2);
		
		}
	
	}
	