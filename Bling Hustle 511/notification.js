class Notification{
	constructor(text,font,color,howlong,timenow){
		this.starttime = timenow;
		this.howlong = howlong;
		this.text = text;
		this.font = font;
		this.color = color;
		}
	display(xpos,ypos){
		context.fillStyle = this.color;
		context.font = this.font;
		context.fillText(this.text,xpos,ypos)
		}
}