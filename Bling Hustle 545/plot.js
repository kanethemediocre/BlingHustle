class Plot{
    constructor(label,xaxislength,xscale,yaxislength,yscale,axiscolor,ticksize,tickfrequency){
        this.label = label; //Label of axis variable
        this.xaxislength = xaxislength; //Length of axis to display in units
		this.yaxislength = yaxislength; //Length of axis to display in units
        //this.width = width; //Size of tick marks, end arrows etc.
        this.xscale = xscale; //length in pixels per length in units.
		this.yscale = yscale; //length in pixels per length in units.
        this.spots = [];//List of entities to be displayed on plot
		this.xaxis = new Axis(0,"x",ticksize,tickfrequency,xaxislength,xscale);//    constructor(angle,label,ticksize,tickfrequency,axislength,scale){
		this.yaxis = new Axis(Math.PI/2,"y",ticksize,tickfrequency,yaxislength,yscale);//    constructor(angle,label,ticksize,tickfrequency,axislength,scale){
		this.axiscolor = axiscolor;
    }
    draw(x0,y0){//Dirs indicates positive, negative, or bidirectional axis display
		this.xaxis.draw(x0,y0,this.axiscolor,0);//  draw(x0,y0,axiscolor,dirs){/
		this.yaxis.draw(x0,y0,this.axiscolor,0);
		var i=0;
		while(i<this.spots.length){
			var dotx=x0+this.spots[i].xvalue*this.xscale;
			var doty=y0-this.spots[i].yvalue*this.yscale;
			context.strokeStyle=this.spots[i].color;
			context.fillStyle = this.spots[i].color;
			context.beginPath();
			context.arc(dotx, doty, 3, 0, 2 * Math.PI, false);
			context.stroke();
			i++;
			}
		}
		
	}