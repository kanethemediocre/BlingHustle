class Segment{
    constructor(x1,y1,x2,y2,color){
        this.x1 = x1;
        this.y1 = y1;
		this.x2 = x2;
        this.y2 = y2;
        this.color = color;
    }
	draw(x0,y0,scale){
		context.strokeStyle = this.color;
		context.beginPath();
		context.moveTo(x0+this.x1*scale,y0-this.y1*scale);
		context.lineTo(x0+this.x2*scale,y0-this.y2*scale);
		context.stroke();
		}
}