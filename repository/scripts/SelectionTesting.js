Events.on(Trigger.draw, () => {
try {
const player = Vars.player;
if (player == null) return;
const mx = Core.input.mouseWorldX();
const my = Core.input.mouseWorldY();

const build = Vars.world.tileWorld(mx, my);
if (!build) return;

const block = Blocks.copperWall;
if (block != build.block()) return;

Drawf.dashSquare(Color.valueOf("ffffff"), build.x, build.y, 24);
  
} catch(e){
Vars.ui.showInfoToast(e,5); 
}});
