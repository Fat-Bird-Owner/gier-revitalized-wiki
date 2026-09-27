let lastBuild = null;

Events.on(TapEvent, e => {
try{
if (!e.player || !e.player.team()) return;
  
const tile = e.tile;
const block = tile.block();
const target = Vars.content.getByName(ContentType.block,"gr-core-gateway");
const player = e.player;
const team = tile.team();

if (block == target && team == player.team()){
if (tile.build == lastBuild){
player.unit().set(tile.build.x, tile.build.y);
Vars.content.getByName(ContentType.block,"gr-core-gateway-build").destroyEffect.at(tile.build.x,tile.build.y);
lastBuild = null;
}else{
lastBuild = tile.build;
}
Sounds.click.at(tile.build.x,tile.build.y);
}else{
lastBuild = null;
}
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});

    
Events.on(BlockDestroyEvent, e => {
try{

let count = 0;
let target = Vars.content.getByName(ContentType.block,"gr-core-gateway");
let build = Vars.content.getByName(ContentType.block,"gr-core-gateway-build");
let team = e.tile.team();
    
if (e.tile.block() != build) return;
    
Groups.build.each(b => {
    if(b.block === target){
        count++;
    }
});



if (count >= 2) {
Vars.ui.hudfrag.showToast("[#D3DEE4FF]Core count exceeded (2)[]");
return;
}

Timer.schedule(() => {  
e.tile.setBlock(target,team,1);
}, 0.01);
    
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
