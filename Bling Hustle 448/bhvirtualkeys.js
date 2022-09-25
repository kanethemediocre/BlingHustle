function allvkeys(xmax,ymax){   //constructor(key,label,x,y){
	var avk=new Virtualkey("a","A",xmax-136,ymax-216);//constructor(key,label,x,y){
	var bvk=new Virtualkey("b","B",24,187);//constructor(key,label,x,y){
	var cvk=new Virtualkey("c","C",xmax/2-112,16);//constructor(key,label,x,y){
	var gvk=new Virtualkey("g","G",24,217);//constructor(key,label,x,y){
	//var hvk=new Virtualkey("h","H",-100,-100);//constructor(key,label,x,y){
	var jvk=new Virtualkey("j","J",160,24);//constructor(key,label,x,y)
	var mvk=new Virtualkey("m","M",88,ymax-336);//constructor(key,label,x,y)
	var nvk=new Virtualkey("n","N",xmax-104,ymax-216);//constructor(key,label,x,y)
	var qvk=new Virtualkey("q","Q",xmax-168,ymax-216);//constructor(key,label,x,y){
	var zvk=new Virtualkey("z","Z",xmax-72,344);//constructor(key,label,x,y)
	var spacebarvk=new Virtualkey(" ","Spacebar",xmax/2-136,ymax-40);//constructor(key,label,x,y)
	var lbracketvk=new Virtualkey("[","[",xmax-332,16);//constructor(key,label,x,y)
	var rbracketvk=new Virtualkey("]","]",xmax-332,48);//constructor(key,label,x,y)
	var gtvk=new Virtualkey(".",">",xmax-40,ymax-216);//constructor(key,label,x,y)
	var ltvk=new Virtualkey(",","<",xmax-72,ymax-216);//constructor(key,label,x,y)
	var plusvk=new Virtualkey("+","+",24,ymax-336);//constructor(key,label,x,y)
	var minusvk=new Virtualkey("-","-",56,ymax-336);//constructor(key,label,x,y)
	
	var upwvk = new Virtualkey("ArrowUp","^",200,104);//constructor(key,label,x,y)
	var downwvk = new Virtualkey("ArrowDown","v",200,132);//constructor(key,label,x,y)
	var rightwvk = new Virtualkey("ArrowRight",">",228,118);//constructor(key,label,x,y)
	var leftwvk = new Virtualkey("ArrowLeft","<",172,118);//constructor(key,label,x,y)
	
	
	var upjvk = new Virtualkey("ArrowUp","Up",684,152);//constructor(key,label,x,y)
	upjvk.display = false; //These keys are attached to menus that are not always visible.
	upjvk.active = false;
	var downjvk = new Virtualkey("ArrowDown","Down",684,192);//constructor(key,label,x,y)
	downjvk.display = false;
	downjvk.active = false;
	var upsvk = new Virtualkey("ArrowUp","Up",784,124);//constructor(key,label,x,y)
	upsvk.display = false;
	upsvk.active = false;
	var downsvk = new Virtualkey("ArrowDown","Down",784,204);//constructor(key,label,x,y)
	downsvk.display = false;
	downsvk.active = false;
	var backspacevk = new Virtualkey("Backspace","Backspace",472,20);//constructor(key,label,x,y)
	backspacevk.display = false;
	backspacevk.active = false;
	var entervk = new Virtualkey("Enter","Enter",784,164);//constructor(key,label,x,y)
	entervk.display = false;
	entervk.active = false;
	var mobilethrust = new Virtualkey("thrust", "Thrust mode is OFF",420,ymax-64);
	return [avk,bvk,cvk,gvk,jvk,mvk,nvk,qvk,zvk,spacebarvk,lbracketvk,rbracketvk,gtvk,ltvk,plusvk,minusvk,upjvk,downjvk,upsvk,downsvk,backspacevk,entervk,upwvk,downwvk,rightwvk,leftwvk,mobilethrust];
}
/*
	drawaskey(32,167,"B","white");
	drawaskey(32,197,"G","white");
	drawaskey(canvas.width/2-104,32,"C","white");
	drawaskey(canvas.width/2-128,canvas.height-24," ","white");
	drawaskey(canvas.width/2+128,canvas.height-24,"J","white");
	drawaskey(canvas.width-64,360,"Z","white");
	
	drawaskey(canvas.width-324,32,"[","white");
	drawaskey(canvas.width-324,64,"]","white");
	drawaskey(canvas.width-324,96,"T","white");
	drawaskey(32,canvas.height-320,"+","white");
	drawaskey(64,canvas.height-320,"-","white");
	drawaskey(96,canvas.height-320,"M","white");
	drawaskey(canvas.width-32,canvas.height-200,">","white");
	drawaskey(canvas.width-64,canvas.height-200,"<","white");
	drawaskey(canvas.width-96,canvas.height-200,"N","white");
	
			drawaskeyspecial(700,160,60,24,"Up","white");
		drawaskeyspecial(700,200,60,24,"Down","white");
			drawaskeyspecial(480,32,128,24,"Backspace","white");
		drawaskeyspecial(800,180,80,24,"Enter","white");
		drawaskeyspecial(800,140,60,24,"Up","white");
		drawaskeyspecial(800,220,60,24,"Down","white");
	*/