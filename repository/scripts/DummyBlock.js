Events.on(TapEvent, e => {
try{
const tile = e.tile;
const block = tile.block();
const target = Vars.content.getByName(ContentType.block,"gr-dummy");

if (!e.player || !e.player.team() || block != target || tile.build == null) return;

const player = e.player;
const team = player.team();
const build = tile.build;
const blockTeam = build.team;

Sounds.click.at(build.x,build.y);
Fx.select.at(build.x,build.y);
    
if (blockTeam != team){
build.changeTeam(team);
} else {
build.changeTeam(Team.get(6));
}

     
} catch(e){
Vars.ui.showInfoToast(e,10);
}});
