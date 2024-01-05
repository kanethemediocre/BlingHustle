function allvkeys(xmax,ymax){   //constructor(key,label,x,y){
	var avk=new Virtualkey("a","A",xmax-136,ymax-216);//constructor(key,label,x,y){
	var bvk=new Virtualkey("b","B",120,192);//constructor(key,label,x,y){
	var cvk=new Virtualkey("c","C",xmax/2-112,16);//constructor(key,label,x,y){
	var gvk=new Virtualkey("g","G",24,-999);//B and G are being removed from vkeys, but I didnt want to alter the indexes
	//var hvk=new Virtualkey("h","H",-100,-100);//constructor(key,label,x,y){
	var jvk=new Virtualkey("j","J",xmax/2+100,ymax-30);//constructor(key,label,x,y)
	var mvk=new Virtualkey("m","M",88,ymax-340);//constructor(key,label,x,y)
	var nvk=new Virtualkey("n","N",xmax-104,ymax-216);//constructor(key,label,x,y)
	var qvk=new Virtualkey("q","Q",xmax-168,ymax-216);//constructor(key,label,x,y){
	var dvk=new Virtualkey("d","D",xmax-72,344);//constructor(key,label,x,y)
	var spacebarvk=new Virtualkey(" ","Spacebar",xmax/2-100,ymax-30);//constructor(key,label,x,y)
	var lbracketvk=new Virtualkey("[","[",xmax-332,-160);//constructor(key,label,x,y) //disabled by offscreen placement
	var rbracketvk=new Virtualkey("]","]",xmax-332,-480);//constructor(key,label,x,y)
	var gtvk=new Virtualkey(".",">",xmax-40,ymax-216);//constructor(key,label,x,y)
	var ltvk=new Virtualkey(",","<",xmax-72,ymax-216);//constructor(key,label,x,y)
	var plusvk=new Virtualkey("+","+",24,ymax-340);//constructor(key,label,x,y)
	var minusvk=new Virtualkey("-","-",56,ymax-340);//constructor(key,label,x,y)
	
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
	
	var zvk=new Virtualkey("z","Z",xmax-204,ymax-216);//constructor(key,label,x,y){
	var allkeys = [avk,bvk,cvk,gvk,jvk,mvk,nvk,qvk,dvk,spacebarvk,lbracketvk,rbracketvk,gtvk,ltvk,plusvk,minusvk,upjvk,downjvk,upsvk,downsvk,backspacevk,entervk,upwvk,downwvk,rightwvk,leftwvk,mobilethrust,zvk];
	return allkeys;
}
function minivkeys(xmax,ymax){   //constructor(key,label,x,y){
	var avk=new Virtualkey("a","A",xmax-136,ymax-216);//constructor(key,label,x,y){
	var bvk=new Virtualkey("b","B",24,187);//constructor(key,label,x,y){
	var cvk=new Virtualkey("c","C",xmax/2-112,16);//constructor(key,label,x,y){
	var gvk=new Virtualkey("g","G",24,217);//constructor(key,label,x,y){
	//var hvk=new Virtualkey("h","H",-100,-100);//constructor(key,label,x,y){
	var jvk=new Virtualkey("j","J",xmax/2+100,ymax-30);//constructor(key,label,x,y)
	var mvk=new Virtualkey("m","M",88,ymax-276);//constructor(key,label,x,y)
	var nvk=new Virtualkey("n","N",xmax-104,ymax-216);//constructor(key,label,x,y)
	var qvk=new Virtualkey("q","Q",xmax-168,ymax-216);//constructor(key,label,x,y){
	var dvk=new Virtualkey("d","D",xmax-36,344);//constructor(key,label,x,y)
	var spacebarvk=new Virtualkey(" ","Spacebar",xmax/2-100,ymax-30);//constructor(key,label,x,y)
	var lbracketvk=new Virtualkey("[","[",xmax-332,-160);//constructor(key,label,x,y) //disabled by offscreen placement
	var rbracketvk=new Virtualkey("]","]",xmax-332,-480);//constructor(key,label,x,y)
	var gtvk=new Virtualkey(".",">",xmax-40,ymax-216);//constructor(key,label,x,y)
	var ltvk=new Virtualkey(",","<",xmax-72,ymax-216);//constructor(key,label,x,y)
	var plusvk=new Virtualkey("+","+",24,ymax-276);//constructor(key,label,x,y)
	var minusvk=new Virtualkey("-","-",56,ymax-276);//constructor(key,label,x,y)
	
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
	
	var zvk=new Virtualkey("z","Z",xmax-204,ymax-216);//constructor(key,label,x,y){
	var allkeys = [avk,bvk,cvk,gvk,jvk,mvk,nvk,qvk,dvk,spacebarvk,lbracketvk,rbracketvk,gtvk,ltvk,plusvk,minusvk,upjvk,downjvk,upsvk,downsvk,backspacevk,entervk,upwvk,downwvk,rightwvk,leftwvk,mobilethrust,zvk];
	return allkeys;
}