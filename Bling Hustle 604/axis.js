class Axis{
    constructor(angle,label,ticksize,tickfrequency,axislength,scale){
        this.angle = angle;//Angle for axis to be displayed, normally 0 for x, Math.PI/2 for y or somesuch.
        this.label = label; //Label of axis variable
        this.axislength = axislength; //Length of axis to display in units
        //this.width = width; //Size of tick marks, end arrows etc.
        this.scale = scale; //length in pixels per length in units.
        this.dots = [];//List of entities to be displayed on axis
    }
    draw(x0,y0,axiscolor,dirs){//Dirs indicates positive, negative, or bidirectional axis display
        if (dirs==0){//Bidirectional axis display.  Right now this is all that works at all.
            var displaylength = this.axislength*this.scale;//Length of one side of axis
            var arrowsize = 16;
			var startx = x0+displaylength*Math.cos(this.angle);
            var starty = y0-displaylength*Math.sin(this.angle);//Y is inverted so that positive is up?  Doesnt really matter here
			var startarrowx1 = startx+arrowsize*Math.cos(this.angle+Math.PI+Math.PI/6);
			var startarrowy1 = starty-arrowsize*Math.sin(this.angle+Math.PI+Math.PI/6);
			var startarrowx2 = startx+arrowsize*Math.cos(this.angle+Math.PI-Math.PI/6);
			var startarrowy2 = starty-arrowsize*Math.sin(this.angle+Math.PI-Math.PI/6);
            var endx = x0-displaylength*Math.cos(this.angle);
            var endy = y0+displaylength*Math.sin(this.angle);
			var endarrowx1 = endx+arrowsize*Math.cos(this.angle+Math.PI/6);
			var endarrowy1 = endy-arrowsize*Math.sin(this.angle+Math.PI/6);
			var endarrowx2 = endx+arrowsize*Math.cos(this.angle-Math.PI/6);
			var endarrowy2 = endy-arrowsize*Math.sin(this.angle-Math.PI/6);
			context.strokeStyle = axiscolor;
			context.lineWidth = 2;
            context.beginPath();//This is the main axis line
            context.moveTo(startx,starty);
            context.lineTo(endx,endy);
            context.stroke();
			context.beginPath();//This is the arrows at the ends of the axis
			context.moveTo(startx,starty);
            context.lineTo(startarrowx1,startarrowy1);
			context.moveTo(startx,starty);
            context.lineTo(startarrowx2,startarrowy2);
			context.moveTo(endx,endy);
			context.lineTo(endarrowx1,endarrowy1);
			context.moveTo(endx,endy);
			context.lineTo(endarrowx2,endarrowy2);
			context.stroke();
			context.beginPath();//This is the dot indicating 0 on the axis
			context.arc(x0, y0, 4, 0, 2 * Math.PI, false);
			context.stroke();	
			var positivelabelx = x0+(displaylength+24)*Math.cos(this.angle);
			var positivelabely = y0-(displaylength+24)*Math.sin(this.angle);
			var negativelabelx = x0-(displaylength+40)*Math.cos(this.angle);
			var negativelabely = y0+(displaylength+40)*Math.sin(this.angle);
			context.fillStyle = axiscolor;
			context.fillText("+ "+this.label,positivelabelx,positivelabely)
			context.fillText("- "+this.label,negativelabelx,negativelabely)
            }
		if (dirs==1){}//positive direction only not implemented
		if (dirs==-1){}//negative direction only not implemented
		var i=0;
		while(i<this.dots.length){

			var dotx = x0+this.dots[i].value*Math.cos(this.angle)*this.scale;
			var doty = y0-this.dots[i].value*Math.sin(this.angle)*this.scale;
			context.strokeStyle = this.dots[i].color;
			context.beginPath();
			context.arc(dotx, doty, 3, 0, 2 * Math.PI, false);
			context.stroke();
			i++;
			}
    }
}