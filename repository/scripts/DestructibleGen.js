const blocks = [
"gr-steam-turbine"
];

Events.on(BuildDamageEvent, e => {
try {
const source = e.source;
const build = e.build;
const block = build.block;
let valid = false;
  
for (let i = 0; i < blocks.length; i++){
if (block == Vars.content.block(blocks[i])) valid = true;
}

if (valid != true) return;

let damage = (source.damage / 10);
if (damage >= 0.35) damage = 0.35;
build.instability += damage;

} catch(e){
Vars.ui.showInfoToast(e,5);  
}});
