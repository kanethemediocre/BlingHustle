function optionsvkeys(xmax,ymax){   //constructor(key,label,x,y){
	var mvp=new Virtualkey(0,"Music Volume +",250,100);//constructor(key,label,x,y){
	var mvm=new Virtualkey(1,"Music Volume -",450,100);//constructor(key,label,x,y){
	var svp=new Virtualkey(2,"Sound Volume +",250,132);//constructor(key,label,x,y){
	var svm=new Virtualkey(3,"Sound Volume -",450,132);//constructor(key,label,x,y){
	//var hvk=new Virtualkey("h","H",-100,-100);//constructor(key,label,x,y){
	var ss=new Virtualkey(4,"Skip Song",250,164);//constructor(key,label,x,y)
	var ttt=new Virtualkey(5,"Touchscreen Thrust Toggler",250,208);//constructor(key,label,x,y) //disabled by offscreen placement
	var sta=new Virtualkey(6,"Starfield toggle",250,240);//constructor(key,label,x,y)
	var vka=new Virtualkey(7,"VKeys Active",250,272);//constructor(key,label,x,y)
	var vkv=new Virtualkey(8,"VKeys Visible",450,272);//constructor(key,label,x,y){
	var fup=new Virtualkey(9,"Enable Fullscreen",250,304);//constructor(key,label,x,y)
	var fum=new Virtualkey(10,"Exit Fullscreen",450,304);//constructor(key,label,x,y)
	var myp=new Virtualkey(11,"Y Offset +",250,336);//constructor(key,label,x,y)
	var mym=new Virtualkey(12,"Y Offset - ",450,336);//constructor(key,label,x,y)
	var tmt=new Virtualkey(13,"Transparent Menus",250,368);//constructor(key,label,x,y)
	var tmu=new Virtualkey(14,"Transparent UI",250,400);//constructor(key,label,x,y)
	var mhd=new Virtualkey(15,"Mini HUD",250,432);//constructor(key,label,x,y)
	var exit=new Virtualkey(16,"Click here or press o to exit",250,520);//constructor(key,label,x,y)
	return [mvp,mvm,svp,svm,ss,sta,vka,vkv,fup,fum,ttt,myp,mym,tmt,tmu,mhd,exit];
}
function optionsactions(action,theplayer){
	switch(action){
		case 0://music+
			musicvolume = musicvolume + 0.1;
			if (musicvolume>1){musicvolume = 1;}
			setmusicvolume(musicvolume);
			break;
		case 1://music-
			musicvolume = musicvolume - 0.1;
			if (musicvolume<0){musicvolume = 0;}
			setmusicvolume(musicvolume);
			break;
		case 2://sound+
			soundvolume = soundvolume + 0.1;
			if (soundvolume>1){soundvolume = 1;}
			setsoundvolume(soundvolume);
			cashsound1.play();			
			break;
		case 3://sound-
			soundvolume = soundvolume - 0.1;
			if (soundvolume<0){soundvolume = 0;}
			setsoundvolume(soundvolume);
			cashsound1.play();
			break;
		case 4://skip
			pausemusic();
			nextsong();
			break;
		case 5://touch thrust controls
			
			break;
		case 6://starfield
			if (starmode==0){starmode=1;}
			else{starmode=0;}
			break;
		case 7://vk active
			if (theplayer.vkactive){theplayer.vkactive = false;}
			else{theplayer.vkactive = true;}
			break;
		case 8://vk visible
			if (theplayer.vkvisible){theplayer.vkvisible = false;}
			else{theplayer.vkvisible = true;}
			break;
		case 9://fullscreen
			openFullscreen(); //No fullscreen exit.  Javascript feels defective, fullscreen exit code doesn't work.
			theplayer.mousexoffset = fullscreenmousexoffset;
			theplayer.mouseyoffset = fullscreenmouseyoffset; 
			break;
		case 11:
			if (document.fullscreenElement) {
				fullscreenmouseyoffset++;
				theplayer.mouseyoffset = fullscreenmouseyoffset;
	
			} else {
				windowmouseyoffset++;
				theplayer.mouseyoffset = windowmouseyoffset;
				}
			break;
		case 12:
			if (document.fullscreenElement) {
				fullscreenmouseyoffset--;
				theplayer.mouseyoffset = fullscreenmouseyoffset;
	
			} else {
				windowmouseyoffset--;
				theplayer.mouseyoffset = windowmouseyoffset;
				}
			break;
		case 13:
			if (theplayer.transparentmenus){theplayer.transparentmenus=false;}
			else{theplayer.transparentmenus=true;}
			break;
		case 14:
			if (theplayer.transparentui){theplayer.transparentui=false;}
			else{theplayer.transparentui=true;}
			break;
		case 15:
			if (comfy){ comfy = false; }
			else { comfy = true; }
			break;
		case 16:
			theplayer.options = 0;
			break;
		}
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