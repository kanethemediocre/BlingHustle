function bhlogos(){
	let armor = new Logo("green",1,true,true,[0,-8,-8,0,8,8],[-5,-8,4,8,4,-8]);//constructor(color,linewidth,closed,fill,xpath,ypath){
	let shield = new Logo("blue",4,true,false,[0,-8,-8,0,8,8],[-5,-8,4,8,4,-8]);//constructor(color,linewidth,closed,fill,xpath,ypath){
	let blaster = new Logo("red",4,true,true,[0,-8,-8,0,8,8],[-5,-8,4,8,4,-8]);//constructor(color,linewidth,closed,fill,xpath,ypath){
	let thrust = new Logo("orange",4,true,true,[0,-8,-8,0,8,8],[-5,-8,4,8,4,-8]);//constructor(color,linewidth,closed,fill,xpath,ypath){
	let cargo = new Logo("yellow",4,true,true,[0,-8,-8,0,8,8],[-5,-8,4,8,4,-8]);//constructor(color,linewidth,closed,fill,xpath,ypath){
	let radar = new Logo("grey",4,true,true,[0,-8,-8,0,8,8],[-5,-8,4,8,4,-8]);//constructor(color,linewidth,closed,fill,xpath,ypath){
	let special = new Logo("purple",4,true,true,[0,-8,-8,0,8,8],[-5,-8,4,8,4,-8]);;//constructor(color,linewidth,closed,fill,xpath,ypath){
	return [armor, shield, blaster, thrust, cargo, radar, special];
	}
