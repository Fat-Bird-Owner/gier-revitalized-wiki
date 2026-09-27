Events.on(ResearchEvent, e => {
    try {
        const content = e.content;
        const gier = Planets.gier;

        if (!Vars.state.isGame() || Vars.state.getPlanet() != gier || Vars.state.wave != 1) return;

        const drone = Vars.content.getByName(ContentType.status, "gr-dedrone");
        const reinforced = Vars.content.getByName(ContentType.status, "gr-reinforced");
        const delisted = Vars.content.getByName(ContentType.status, "gr-delisted");
    
        if (content == drone) {
            drone.clearUnlock();
            const facility = Vars.content.getByName(ContentType.block,"gr-drone-facility");
            const dropzone = Vars.content.getByName(ContentType.block,"gr-facility-dropzone");
            
            Vars.ui.hudfrag.showToast(Icon.settings, "[tan]Dedrone[red] Enabled");
            Vars.state.rules.bannedBlocks.add(facility);
            Vars.state.rules.bannedBlocks.add(dropzone);
        }

        if (content == reinforced) {
            Vars.ui.hudfrag.showToast(Icon.settings, "[lightgrey]Reinforced[red] Enabled");

            Vars.state.rules.teams.get(Team.get(5)).unitHealthMultiplier = 1.45;
            reinforced.clearUnlock();
        }

        if (content == delisted) {
            delisted.clearUnlock();
            const outpost = Vars.content.getByName(ContentType.block,"gr-outpost");
            
            Vars.ui.hudfrag.showToast(Icon.settings, "[accent]Delisted[red] Enabled");
            Vars.state.rules.bannedBlocks.add(outpost);
        }

        drone.clearUnlock();
        reinforced.clearUnlock();
        delisted.clearUnlock();   
        
    } catch(err){
        Vars.ui.showInfoToast(err, 5);
    }
});


Events.on(WorldLoadEvent, event => {
try {
//Vars.ui.showInfoToast("planet: " + Vars.state.getPlanet(), 3);
    
const dedrone = Vars.content.getByName(ContentType.status,"gr-dedrone");
dedrone.clearUnlock();

const reinforced = Vars.content.getByName(ContentType.status,"gr-reinforced");
reinforced.clearUnlock();

const delisted = Vars.content.getByName(ContentType.status,"gr-delisted");
delisted.clearUnlock();
    
} catch(e){
Timer.schedule(() => {  
Vars.ui.showText("e",e,Align.center);
},1.5);
}});
