class Economy{
	constructor(){
		this.btype = "none";
		this.prices = [];
		var thecargos = bhcargos();
		var minescore = 0;
		var nummine = 0;
		var farmscore = 0;
		var numfarm = 0;
		var manuscore = 0;
		var nummanu = 0;
		this.supplies = [];
		this.demands = [];
		this.forsale = [];
		this.forbuy = [];
		var i=0;
		while(i<thecargos.length){
			var supply = Math.random();//New price is a coefficient to be attached to the cargos base price.
			var demand = Math.random()/2;
			this.supplies.push(supply);//this.prices index correlates with thecargos index
			this.demands.push(demand);
			if (thecargos[i].origintype == "mine"){
				minescore = minescore + supply;
				nummine++;
				} //Totals the supply
			else if (thecargos[i].origintype == "farm"){
				farmscore = farmscore + supply;
				numfarm++;
				} 
			else if (thecargos[i].origintype == "manu"){
				manuscore = manuscore + supply;
				nummanu++;
				} 
			i++;
			}
		minescore = minescore / nummine;//Cargos needs at least one of each category to avoid /0
		farmscore = farmscore / numfarm;
		manuscore = manuscore / nummanu;
		if ((minescore>farmscore)&&(minescore>manuscore)){ this.btype = "mine"; }
		else if (farmscore>manuscore){ this.btype = "farm"; }	
		else { this.btype = "manu"; }//All that just to decide this.btype	
		//Now manipulate supplies to exaggerate the base type
		var i=0;
		while(i<thecargos.length){//tweak supply and demand to fit base type more.
			if (this.btype == thecargos[i].origintype){	this.supplies[i] = this.supplies[i]*2; }//double supply of matching archetype
			else {this.supplies[i] = this.supplies[i]*this.supplies[i];}//square supply of non matching archetype (<0, so this reduces the value)
			if (this.btype == thecargos[i].demandtype){
				this.demands[i] = this.demands[i]*2+1;
				}
			else if ((thecargos[i].demandtype == "other")&&(thecargos[i].origintype!=this.btype)){
				this.demands[i] = this.demands[i]*1.5+0.5;
				}
			else {
				this.demands[i] = this.demands[i]*0.5;
				}
			i++;
			}
		var netsupply = [];
		var i=0;
		while (i<thecargos.length){
			netsupply.push( supply[i]-demand[i] );
			i++;
			}
		var i=0;
		while(i<thecargos.length){
			this.prices.push(  thecargos[i].baseprice*(1+netsupply[i])  );
			i++;
			}
		var i = 0;
		while (i<thecargos.length){
			if (netsupply[i]>0.25){this.forsale.push(true);}
			else{this.forsale.push(false);}
			if (netsupply[i]<-0.25){this.forbuy.push(true);}
			else{this.forbuy.push(false);}
			i++;
			}
		
		
		
		}
		
	}