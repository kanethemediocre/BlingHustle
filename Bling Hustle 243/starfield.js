module.exports = class Starfield{
	constructor(xmax,ymax,zmax,minsize,maxsize, layerstars){
		this.xmax = xmax;
		this.ymax = ymax;
		this.zmax = zmax;
		this.stars = [];
		var i=0;
		while (i<zmax){
			var j=0;
			while (j<layerstars){
				var starx = (Math.random()*2-1)*xmax;
				var stary = (Math.random()*2-1)*ymax ;
				var starsize = 1000 + Math.floor(Math.random()*3000);
				this.stars.push(new Star(starx,stary,i,starsize));
				j++;
				}
			i++;
			}
		}
	draw(viewx,viewy,viewz,zmax){
		var i=0;
		while (i<this.stars.length){
			this.stars[i].draw(viewx,viewy,viewz,zmax)
			i++;
			}
		}
	
	}