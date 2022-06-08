function napaturrets(){
var aristurret1 = new Turret("friendly",systems[6].planets[2],0,330);
var aristurret2 = new Turret("friendly",systems[6].planets[2],Math.PI/2,330);
var aristurret3 = new Turret("friendly",systems[6].planets[2],Math.PI,330);
var aristurret4 = new Turret("friendly",systems[6].planets[2],Math.PI*1.5,330);
var luxeturret1 = new Turret("friendly",systems[6].planets[3],0,300);
var luxeturret2 = new Turret("friendly",systems[6].planets[3],Math.PI/2,300);
var luxeturret3 = new Turret("friendly",systems[6].planets[3],Math.PI,300);
var luxeturret4 = new Turret("friendly",systems[6].planets[3],Math.PI*1.5,300);
luxeturret1.bombs = [new Umo(0,0,8,"purple"), new Umo(0,0,8,"blue"), new Umo(0,0,8,"green"), new Umo(0,0,8,"yellow"),new Umo(0,0,8,"orange"),new Umo(0,0,8,"red")];
luxeturret2.bombs = [new Umo(0,0,8,"purple"),new Umo(0,0,8,"blue"),new Umo(0,0,8,"green"),new Umo(0,0,8,"yellow"),new Umo(0,0,8,"orange"),new Umo(0,0,8,"red")];
luxeturret3.bombs = [new Umo(0,0,8,"purple"),new Umo(0,0,8,"blue"),new Umo(0,0,8,"green"),new Umo(0,0,8,"yellow"),new Umo(0,0,8,"orange"),new Umo(0,0,8,"red")];
luxeturret4.bombs = [new Umo(0,0,8,"purple"),new Umo(0,0,8,"blue"),new Umo(0,0,8,"green"),new Umo(0,0,8,"yellow"),new Umo(0,0,8,"orange"),new Umo(0,0,8,"red")];
var arstturret1 = new Turret("friendly",systems[6].outposts[0],Math.PI*1.5,150);
var arstturret2 = new Turret("friendly",systems[6].outposts[0],Math.PI*0.5,150);
var lustturret1 = new Turret("friendly",systems[6].outposts[1],Math.PI*1.5,150);
var lustturret2 = new Turret("friendly",systems[6].outposts[1],Math.PI*0.5,150);
var turrets = [aristurret1,aristurret2,aristurret3,aristurret4,luxeturret1,luxeturret2,luxeturret3,luxeturret4,arstturret1,arstturret2,lustturret1,lustturret2];
return turrets;
}