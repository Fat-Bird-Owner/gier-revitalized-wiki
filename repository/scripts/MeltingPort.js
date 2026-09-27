// Extra stats
Events.on(BlockInfoEvent, e => {
try{
//Vars.ui.showInfoToast("open",10);
if (!e.player || !e.player.team()) return;
    
const selectBlock = Vars.player.selectedBlock;
const block = Vars.content.block("gr-melting-port");

if (selectBlock != block) return;

const cont = Vars.ui.content.cont;
if (!cont) return;

cont.row();
cont.add("@mpr.recipes").left().row();
cont.add().height(3).row();
cont.image().color(Pal.accent).height(3).width(400).left().row();

cont.add().height(6).row();
cont.add("@mpr.recipes.1").left().row();
cont.add().height(6).row();
cont.add("@mpr.recipes.2").left().row();
cont.add().height(6).row();
cont.add("@mpr.recipes.3").left().row();

    
} catch(e){
Vars.ui.showInfoToast(e,10);
}});

var lastBuild = null;

Events.on(TapEvent, e => {
try{
const tile = e.tile;
const block = tile.block();
const player = e.player;
const build = tile.build;

if (build != lastBuild){
lastBuild = build;
return;
}


// Multicrafter logic  
if (player.team() != tile.team() || player.selectedBlock != null) return;

const crafters = [
Vars.content.block("gr-melting-port"),
Vars.content.block("gr-lead-melting-port"),
Vars.content.block("gr-silicon-melting-port")
];

if (block == crafters[0] || block == crafters[1] || block == crafters[2]){
Sounds.click.at(tile.worldx(),tile.worldy());
}

const buildTeam = build.team;
const health = build.health;

const blockTile = build.tile;
if (block == crafters[0]){
blockTile.setBlock(crafters[1], buildTeam);
} else if (block == crafters[1]) {
blockTile.setBlock(crafters[2], buildTeam);
} else if (block == crafters[2]){
blockTile.setBlock(crafters[0], buildTeam);
} else {
return;
}

if (blockTile.block() != block){
Fx.select.at(blockTile.worldx(),blockTile.worldy());
blockTile.build.health = health;
lastBuild = null;
}
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
