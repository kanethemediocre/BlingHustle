//This file just specifies the help text in the menu.  Actual keyboard controls in keyboard.js and system.js playerkeys function.
function hoverhelp(thekey){
	if (thekey=="a"){return "Autopilot";}	
	else if (thekey=="bb"){return "Booster (Keyboard only)";}		
	else if (thekey=="z"){return "Autobrake";}	
	else if (thekey==" "){return "Skip message";}	
	else if (thekey=="q"){return "Quick planets";}	
	else if (thekey=="n"){return "Navigation mode";}	
	else if (thekey=="m"){return "Map mode";}	
	else if (thekey=="c"){return "Compass mode";}	
	else if (thekey=="d"){return "Diagnostics";}	
	else if (thekey=="p"){return "Probe Mode";}	
	else if (thekey=="vv"){return "Virtual keys toggle (Keyboard only)";}
	else if (thekey=="Backspace"){return "Next menu";}	
	else if (thekey=="j"){return "Journal";}	
	else if ((thekey==",")||(thekey=="<")){return "Previous nav";}	
	else if ((thekey==".")||(thekey==">")){return "Next nav";}	
	else if ((thekey=="ArrowUp")||(thekey=="ArrowDown")||(thekey=="ArrowLeft")||(thekey=="ArrowRight")){return "Change weapon";}		
	else if ((thekey=="=")||(thekey=="+")){return "Map zoom out";}	
	else if (thekey=="-"){return "Map zoom in";}
	else if (thekey=="Enter"){return "Choose item";}	
	else {return "";}
}

			
			