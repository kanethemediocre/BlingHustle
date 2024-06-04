function allvkeys(xmax,ymax){   //constructor(key,label,x,y){
	var avk=new Virtualkey("a","A",xmax-136,ymax-216);//constructor(key,label,x,y){
	var bvk=new Virtualkey("bb","B",144,192);//constructor(key,label,x,y){
	var cvk=new Virtualkey("c","C",xmax/2-112,16);//constructor(key,label,x,y){
	var gvk=new Virtualkey("g","G",24,-999);//B and G are being removed from vkeys, but I didnt want to alter the indexes
	//var hvk=new Virtualkey("h","H",-100,-100);//constructor(key,label,x,y){
	var jvk=new Virtualkey("j","J",xmax/2+100,ymax-30);//constructor(key,label,x,y)
	var mvk=new Virtualkey("m","M",88,ymax-340);//constructor(key,label,x,y)
	var nvk=new Virtualkey("n","N",xmax-104,ymax-216);//constructor(key,label,x,y)
	var qvk=new Virtualkey("q","Q",xmax-168,ymax-216);//constructor(key,label,x,y){
	var dvk=new Virtualkey("d","D",xmax-72,344);//constructor(key,label,x,y)
	var pvk=new Virtualkey("p","P",144,224);//constructor(key,label,x,y)
	var vvk=new Virtualkey("vv","V",188,32);//constructor(key,label,x,y)
	var spacebarvk=new Virtualkey(" ","Spacebar",xmax/2-100,ymax-30);//constructor(key,label,x,y)
	var lbracketvk=new Virtualkey("[","[",xmax-332,-160);//constructor(key,label,x,y) //disabled by offscreen placement
	var rbracketvk=new Virtualkey("]","]",xmax-332,-480);//constructor(key,label,x,y)
	var gtvk=new Virtualkey(".",">",xmax-40,ymax-216);//constructor(key,label,x,y)
	var ltvk=new Virtualkey(",","<",xmax-72,ymax-216);//constructor(key,label,x,y)
	var plusvk=new Virtualkey("+","+",24,ymax-340);//constructor(key,label,x,y)
	var minusvk=new Virtualkey("-","-",56,ymax-340);//constructor(key,label,x,y)
	
	var upwvk = new Virtualkey("ArrowUp","↑",200,104);//constructor(key,label,x,y)
	var downwvk = new Virtualkey("ArrowDown","↓",200,132);//constructor(key,label,x,y)
	var rightwvk = new Virtualkey("ArrowRight","→",228,118);//constructor(key,label,x,y)
	var leftwvk = new Virtualkey("ArrowLeft","←",172,118);//constructor(key,label,x,y)
	
	
	var upjvk = new Virtualkey("ArrowUp","Up",684,-999);//constructor(key,label,x,y)
	var downjvk = new Virtualkey("ArrowDown","Down",684,-999);//constructor(key,label,x,y)
	var upsvk = new Virtualkey("ArrowUp","Up",784,-999);//constructor(key,label,x,y)
	var downsvk = new Virtualkey("ArrowDown","Down",784,-999);//constructor(key,label,x,y)
	var backspacevk = new Virtualkey("Backspace","Backspace",472,-999);//constructor(key,label,x,y)
	var entervk = new Virtualkey("Enter","Enter",784,-999);//constructor(key,label,x,y)
	var mobilethrust = new Virtualkey("thrust", "Thrust mode is OFF",420,ymax-64);
	
	var zvk=new Virtualkey("z","Z",xmax-204,ymax-216);//constructor(key,label,x,y){
	var allkeys = [avk,bvk,cvk,gvk,jvk,mvk,nvk,qvk,dvk,pvk,vvk,spacebarvk,lbracketvk,rbracketvk,gtvk,ltvk,plusvk,minusvk,upjvk,downjvk,upsvk,downsvk,backspacevk,entervk,upwvk,downwvk,rightwvk,leftwvk,mobilethrust,zvk];
	return allkeys;
}
function journalkeys(xmax,ymax){
	var upjvk = new Virtualkey("ArrowUp","Up",684,152);//constructor(key,label,x,y)
	var downjvk = new Virtualkey("ArrowDown","Down",684,192);//constructor(key,label,x,y)
	return [upjvk,downjvk];
	}


function shopkeys(xmax,ymax){
	var upvk = new Virtualkey("ArrowUp","↑",688,124);//constructor(key,label,x,y)
	var downvk = new Virtualkey("ArrowDown","↓",688,204);//constructor(key,label,x,y)
	//var backspacevk = new Virtualkey("Backspace","Backspace",540,24);//constructor(key,label,x,y)
	var rightvk = new Virtualkey("ArrowRight","→",500,24);//constructor(key,label,x,y)
	var leftvk = new Virtualkey("ArrowLeft","←",300,24);//constructor(key,label,x,y)
	var entervk = new Virtualkey("Enter","Enter",688,164);//constructor(key,label,x,y)
	return [upvk,downvk,rightvk,leftvk,entervk];
	}
function minivkeys(xmax,ymax){   //constructor(key,label,x,y){
	var avk=new Virtualkey("a","A",xmax-136,ymax-216);//constructor(key,label,x,y){
	var bvk=new Virtualkey("bb","B",144,190);//constructor(key,label,x,y){
	var cvk=new Virtualkey("c","C",xmax/2-112,16);//constructor(key,label,x,y){
	var gvk=new Virtualkey("g","G",24,-999);//constructor(key,label,x,y){
	//var hvk=new Virtualkey("h","H",-100,-100);//constructor(key,label,x,y){
	var jvk=new Virtualkey("j","J",xmax/2+100,ymax-30);//constructor(key,label,x,y)
	var mvk=new Virtualkey("m","M",88,ymax-276);//constructor(key,label,x,y)
	var nvk=new Virtualkey("n","N",xmax-104,ymax-216);//constructor(key,label,x,y)
	var qvk=new Virtualkey("q","Q",xmax-168,ymax-216);//constructor(key,label,x,y){
	var dvk=new Virtualkey("d","D",xmax-36,344);//constructor(key,label,x,y)
	var pvk=new Virtualkey("p","P",144,218);//constructor(key,label,x,y)
	var vvk=new Virtualkey("vv","V",188,28);//constructor(key,label,x,y)
	var spacebarvk=new Virtualkey(" ","Spacebar",xmax/2-100,ymax-30);//constructor(key,label,x,y)
	var lbracketvk=new Virtualkey("[","[",xmax-332,-160);//constructor(key,label,x,y) //disabled by offscreen placement
	var rbracketvk=new Virtualkey("]","]",xmax-332,-480);//constructor(key,label,x,y)
	var gtvk=new Virtualkey(".",">",xmax-40,ymax-216);//constructor(key,label,x,y)
	var ltvk=new Virtualkey(",","<",xmax-72,ymax-216);//constructor(key,label,x,y)
	var plusvk=new Virtualkey("+","+",24,ymax-276);//constructor(key,label,x,y)
	var minusvk=new Virtualkey("-","-",56,ymax-276);//constructor(key,label,x,y)
	
	var upwvk = new Virtualkey("ArrowUp","↑",200,104);//constructor(key,label,x,y)
	var downwvk = new Virtualkey("ArrowDown","↓",200,132);//constructor(key,label,x,y)
	var rightwvk = new Virtualkey("ArrowRight","→",228,118);//constructor(key,label,x,y)
	var leftwvk = new Virtualkey("ArrowLeft","←",172,118);//constructor(key,label,x,y)
	
	
	var upjvk = new Virtualkey("ArrowUp","Up",684,-999);//constructor(key,label,x,y)
	var downjvk = new Virtualkey("ArrowDown","Down",684,-999);//constructor(key,label,x,y)
	var upsvk = new Virtualkey("ArrowUp","Up",784,-999);//constructor(key,label,x,y)
	var downsvk = new Virtualkey("ArrowDown","Down",784,-999);//constructor(key,label,x,y)
	var backspacevk = new Virtualkey("Backspace","Backspace",472,-999);//constructor(key,label,x,y)
	var entervk = new Virtualkey("Enter","Enter",784,-999);//constructor(key,label,x,y)
	var mobilethrust = new Virtualkey("thrust", "Thrust mode is OFF",420,ymax-64);
	
	var zvk=new Virtualkey("z","Z",xmax-204,ymax-216);//constructor(key,label,x,y){
	var allkeys = [avk,bvk,cvk,gvk,jvk,mvk,nvk,qvk,dvk,pvk,vvk,spacebarvk,lbracketvk,rbracketvk,gtvk,ltvk,plusvk,minusvk,upjvk,downjvk,upsvk,downsvk,backspacevk,entervk,upwvk,downwvk,rightwvk,leftwvk,mobilethrust,zvk];
	return allkeys;
}