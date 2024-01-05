class Logo{
	constructor(color,linewidth,closed,fill,xpath,ypath){
		this.c = color, //color string
		this.lw = linewidth; //integer
		this.closed = closed; //true or false, will add segment to close polygon between first and last coords
		this.fill = fill; //true or false, ignored if this.close==false
		if (xpath.length != ypath.length){
			console.log("Error xpath.length = "+xpath.length+" ypath.length = "+ypath.length);
			this.xpath = [0];
			this.ypath = [0];
			}
		else {
			this.xpath = xpath; //list of numbers, center is 0
			this.ypath = ypath; //list of numbers, center is 0
			}
		}
	draw(xpos,ypos){
		context.strokeStyle = this.c;
		context.lineWidth = this.lw;
		context.beginPath();
		context.moveTo(xpos+this.xpath[0],ypos+this.ypath[0]);
		var i = 1;
		while(i<this.xpath.length){
			context.lineTo(xpos+this.xpath[i], ypos+this.ypath[i]);
			i++;
			}
		if (this.closed==true){
			context.lineTo(xpos+this.xpath[0],ypos+this.ypath[0])
			}
		context.stroke();
		if (this.fill==true){
			context.fillStyle = this.c;
			context.fill();
			}
		}
	}
