function mysystem(){
var cs = new System(1,'Sool',0,0);
let p0 = new Umo(0,0,3206,'orange');
p0.name = 'moel';
p0.parentid = 0;
p0.c2 = 'yellow';
cs.planets.push(p0);
let p1 = new Umo(0,0,190,'tan');
p1.name = 'jfod';
p1.parentid = 0;
p1.c2 = 'darkgrey';
p1.setorbit(p0,18402,0,1);
cs.planets.push(p1);
let p2 = new Umo(0,0,198,'khaki');
p2.name = 'ciuv';
p2.parentid = 0;
p2.c2 = 'green';
p2.setorbit(p0,120587,0,1);
cs.planets.push(p2);
let p3 = new Umo(0,0,220,'lightskyblue');
p3.name = 'aimx';
p3.parentid = 0;
p3.c2 = 'khaki';
p3.setorbit(p0,56260,0,1);
cs.planets.push(p3);
let p4 = new Umo(0,0,456,'sienna');
p4.name = 'qfoi';
p4.parentid = 0;
p4.c2 = 'gold';
p4.setorbit(p0,87788,0,1);
cs.planets.push(p4);
let p5 = new Umo(0,0,112,'green');
p5.name = 'fiad';
p5.parentid = 0;
p5.c2 = 'indigo';
p5.setorbit(p0,34250,0,1);
cs.planets.push(p5);
let p6 = new Umo(0,0,226,'crimson');
p6.name = 'ogio';
p6.parentid = 0;
p6.c2 = 'maroon';
p6.setorbit(p0,172416,0,1);
cs.planets.push(p6);
let p7 = new Umo(0,0,148,'sienna');
p7.name = 'unym';
p7.parentid = 0;
p7.c2 = 'chocolate';
p7.setorbit(p0,38359,0,1);
cs.planets.push(p7);
let p8 = new Umo(0,0,242,'deeppink');
p8.name = 'fvyr';
p8.parentid = 0;
p8.c2 = 'orange';
p8.setorbit(p0,105049,0,1);
cs.planets.push(p8);
let p9 = new Umo(0,0,364,'mediumspringgreen');
p9.name = 'buom';
p9.parentid = 0;
p9.c2 = 'red';
p9.setorbit(p0,47043,0,1);
cs.planets.push(p9);
let p10 = new Umo(0,0,27,'lightskyblue');
p10.name = 'iuyq';
p10.parentid = 2;
p10.c2 = 'darkgreen';
p10.setorbit(p2,377,0,1);
cs.planets.push(p10);
let p11 = new Umo(0,0,15,'darkviolet');
p11.name = 'pvio';
p11.parentid = 5;
p11.c2 = 'navy';
p11.setorbit(p5,280,0,1);
cs.planets.push(p11);
let p12 = new Umo(0,0,19,'darkviolet');
p12.name = 'eumh';
p12.parentid = 6;
p12.c2 = 'aqua';
p12.setorbit(p6,753,0,1);
cs.planets.push(p12);
let p13 = new Umo(0,0,35,'sienna');
p13.name = 'oofy';
p13.parentid = 6;
p13.c2 = 'navy';
p13.setorbit(p6,619,0,1);
cs.planets.push(p13);
let p14 = new Umo(0,0,14,'lightskyblue');
p14.name = 'oreo';
p14.parentid = 7;
p14.c2 = 'yellow';
p14.setorbit(p7,462,0,1);
cs.planets.push(p14);
let p15 = new Umo(0,0,550,'black');
p15.name = 'Xxxx';
p15.parentid = 0;
p15.c2 = 'red';
p15.setorbit(p0,400000,0,1);
cs.planets.push(p15);
let p16 = new Umo(0,0,1000,'purple');
p16.name = 'Waldo';
p16.parentid = 0;
p16.c2 = 'red';
p16.setorbit(p0,400000,0,1);
cs.planets.push(p16);
cs.addrandomtraders([5,11,16],8,16);
cs.addrandomgang(1,1,12);
cs.addrandomgang(1,4,13);
cs.addrandomgang(2,5,8);
cs.addrandomgang(3,5,16);
cs.addrandomgang(4,5,10);
cs.addrandomgang(5,5,20);
cs.addrandomgang(6,5,9);
cs.addrandomgang(7,5,9);
cs.addrandomgang(8,5,6);
cs.addrandomgang(9,5,5);
cs.addrandomgang(10,5,19);
cs.addrandomgang(11,5,11);
cs.addrandomgang(12,5,14);
cs.addrandomgang(13,5,16);
cs.addsuperboss(49,4,1000+1000*4,1250,320,80,2);
cs.addcargomissions(4);
return cs;
}