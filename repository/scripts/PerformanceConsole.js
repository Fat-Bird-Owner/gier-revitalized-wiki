function valid(){
if ((Vars.state.rules.planet != Planets.gier && Vars.state.rules.planet != Planets.sun) || Vars.state.wave != 1) return false;
return true;
}

// left like this incase
function hasCap(string){
try{
if (Vars.content.sector(string) == null) return;
const capped = Vars.content.sector(string).sector.info.wasCaptured;
if (!Vars.state.isCampaign) capped = true;


return capped
} catch(e){
Vars.ui.showInfoToast(e,15);
}}

Events.on(TapEvent, e => {
    try{
        const tile = e.tile;
        const player = e.player;
        if (!tile || !player) return;

        const block = tile.block();
        const console = Vars.content.block("gr-performance-console");

        const buildTeam = tile.team();
        const playerTeam = player.team();
        const selectBlock = player.selectedBlock;

        if (block != console || selectBlock != null || buildTeam != playerTeam) return;

        Vars.ui.showMenu("@performance-console.title", "", 
        [
            ["@performance-console.showStat"],
            [["@performance-console.dedrone"], ["@performance-console.reinforced"]],
            ["@performance-console.delisted"],     
            ["@close"]
        ], p => {
            try{  

                
                if (p == 0){
                    const stat = Vars.state.stats;
                    const points = (stat.enemyUnitsDestroyed + stat.buildingsBuilt) * ((stat.wavesLasted * 0.45) + 1);

                    Vars.ui.showText("@performance-console.option1.title",
                        Core.bundle.get("performance-console.option1.enemyKill") + stat.enemyUnitsDestroyed + "\n" +
                        Core.bundle.get("performance-console.option1.buildingsBuilt") + stat.buildingsBuilt + "\n\n" +
                        Core.bundle.get("performance-console.option1.points") + points
                    );

                } else if (p == 1){
                if (!valid() || !hasCap("gr-fragmented-fix")) return;

                    const facility = Vars.content.block("gr-drone-facility");
                    const dropzone = Vars.content.block("gr-facility-dropzone");

                    Vars.ui.hudfrag.showToast(
                        new TextureRegionDrawable(Core.atlas.find("gr-dedrone")),
                        Core.bundle.get("modifiers.dedrone.enable")
                    );

                    if(facility) Vars.state.rules.bannedBlocks.add(facility);
                    if(dropzone) Vars.state.rules.bannedBlocks.add(dropzone);
                
                } else if (p == 2){
                if (!valid() && !hasCap("gr-fragmented-fix")) return;
                
                Vars.ui.hudfrag.showToast(
                new TextureRegionDrawable(Core.atlas.find("gr-reinforced")),
                Core.bundle.get("modifiers.reinforced.enable")
                );

                Vars.state.rules.teams.get(Team.get(5)).unitHealthMultiplier = 1.45;
                      
                } else if (p == 3){
                if (!valid() || !hasCap("gr-fragmented-fix")) return; 
        
                const outpost = Vars.content.getByName(ContentType.block,"gr-outpost");
            
                Vars.ui.hudfrag.showToast(new TextureRegionDrawable(Core.atlas.find("gr-delisted")), Core.bundle.get("modifiers.delisted.enable"));
                Vars.state.rules.bannedBlocks.add(outpost);
                    
                }

            } catch(err){
                Vars.ui.showInfoToast(err + " - PerformanceConsole - [red]Inner",5); 
            }
        });

    } catch(err){
        Vars.ui.showInfoToast(err + " - PerformanceConsole",5); 
    }
});

/*
@preformance-console.option1.buildingsBuilt
@preformance-console.option1.enemyKill
@preformance-console.title
@preformance-console.showStat
@preformance-console.option1.title
*/
