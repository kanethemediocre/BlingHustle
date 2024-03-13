function bhupgradeitems(){
	let uprepairitem = new Shopitem("upgrade",0,"repair",0);
	let uparmoritem = new Shopitem("upgrade",1,"armor",0);
	let upshielditem = new Shopitem("upgrade",2,"shield",0);
	let upshieldregenitem = new Shopitem("upgrade",3,"shieldregen",0);
	let upradaritem = new Shopitem("upgrade",4,"radar",0);
	let upcargoitem = new Shopitem("upgrade",5,"cargo",0);
	let upthrustitem = new Shopitem("upgrade",6,"thrust",0);
	let upsensoritem = new Shopitem("upgrade",7,"sensor",0);
	let upsolaritem = new Shopitem("upgrade",8,"solar",0);
	let upimpactitem = new Shopitem("upgrade",9,"impact",0);
	//let brandchassisitem = new Shopitem("chassis",0,"brand",0);
	let randomchassisitem = new Shopitem("chassis",0,"random",0);
	return [uprepairitem,uparmoritem,upshielditem,upshieldregenitem,upradaritem,upcargoitem,upthrustitem,upsensoritem,upsolaritem,upimpactitem,randomchassisitem];
	}
