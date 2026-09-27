var lastBuild = null;

Events.on(EventType.TapEvent, e => {
try {
if (!e.player || !e.player.team()) return;
    
const tile = e.tile;
const block = tile.block();
const target = Vars.content.getByName(ContentType.block, "gr-fabricator");

if (block != target || tile.build == null) {
lastBuild = null;
return;
}
    
const sorted = tile.build.sorted;
const build = tile.build;

Sounds.click.at(build.x,build.y);
    
if (sorted == null || build == null) return;

if (build != lastBuild){
lastBuild = build;
return;
}
    
if(sorted instanceof UnitType) {
sorted.spawn(tile.team(),build.x,build.y, build.rotation * 90);
Fx.spawn.at(build.x,build.y);
build.kill();

} else if(sorted instanceof Block) {
tile.setBlock(sorted,tile.team(),build.rotation);
target.destroyEffect.at(build.x,build.y);
}

lastBuild = null;
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
