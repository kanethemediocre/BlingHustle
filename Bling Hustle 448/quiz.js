class Emodule{
	constructor(emtype){//type == "blaster" or "upgrade" or "mission"
		this.type = emtype;
		this.question = "";
		this.answer = 0;
		this.parameters1=[];
		this.parameters2=[];
		this.parameters3=[];
		this.parameters4=[];
		this.q = 0; //Which question in the latest block are you working on
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
		this.parameters1 = addends;
		return [thequestion,theanswer];
		}
	draw(x,y){
		context.fillStyle = "lime";
		context.fillText(this.question,x,y);
		}
    }
var testmodule = new Emodule("arithmatic");
console.log(testmodule.makeaddquestion(2,3,true));
console.log(testmodule.makesubquestion(2,2,true,true));
console.log(testmodule.makemultquestion(2,2,true));