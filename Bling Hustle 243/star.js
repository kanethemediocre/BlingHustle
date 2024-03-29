module.exports = class Star {
	constructor(x,y,z,size){
		this.x = x;
		this.y = y;
		this.z = Math.floor(z);
		this.c = randcolor();
		this.s = size;
	}
	draw(viewx,viewy,viewz, zmax){ //viewx and viewy are scaled differently than star x and y.
		var dz = this.z - viewz;
		while (dz < 0) {
			dz = dz + zmax;//wraps around in the z axis
		}
		var xyscale = 32*dz; //no idea what i did there but ok
		var dx = (this.x-(viewx / xyscale))/dz;
		var dy = (this.y-(viewy / xyscale))/dz;
		//var x = this.x - viewx + canvas.width/2;
		//var y = this.y - viewy + canvas.height/2;
		
		context.beginPath();
		context.strokeStyle = this.c;
		context.arc(canvas.width/2 + dx,canvas.height/2+dy, this.s/(250*dz), 0, 2 * Math.PI, false);
		context.fillStyle = "white";
		context.fill();
		context.lineWidth = 1;
		context.stroke();		 

	}
}