const blocks = [
"gr-boiler"
];

Events.on(BuildDamageEvent, e => {
try {
const bullet = e.source;
const build = e.build;
let found = false;

for (let i = 0; i < blocks.length; i++){
if (build.block == Vars.content.block(blocks[i])) found = true;
}

if (!found) return;
const heat = build.heat;

if (heat <= build.block.heatRequirement) return;

const damageInc = bullet.damage / 2;
build.damage(damageInc);
const recol = Fx.hitBeam.wrap(Team.crux.color);
recol.at(bullet.x, bullet.y);
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
