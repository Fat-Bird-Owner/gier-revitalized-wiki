// Power button class
var lastUpdate = 0
const blocks = [
"gr-button",
"gr-actuator"
];

Events.on(TapEvent, event => {
    try {
        
        if(Vars.state.updateId == lastUpdate || event.player == null || !event.player.team()) return;

        lastUpdate = Vars.state.updateId;
        
        const tile = event.tile;
        if (!tile || !tile.build) return;

        let target = null;
        for (let i = 0; i < blocks.length; i++){
        if (tile.block() == Vars.content.block(blocks[i])) target = Vars.content.block(blocks[i]);
        }

        if (target == null) return; 
        const effect = target.explodeEffect;

        const block = tile.block();
        if (block != target) return;

        const build = tile.build;

        //Vars.ui.showInfoToast(build.team + " " + event.player.team(),1);
        
        if (build.team != event.player.team()) return;
        if (build.power && build.power.graph) {
            const pow = target.powerProduction * 60;

            build.power.graph.transferPower(pow);
            build.power.status = 1;
            build.updatePowerGraph();
            
        }

        if (effect) {
            effect.at(build.x, build.y);
        }

        if (Sounds.click) {
            Sounds.click.at(build.x, build.y);
        }
    } catch (e) {
        // fails silently on iOS instead of crashing
        Vars.ui.showInfoToast("error: " + e,1);
    }
});
