Events.on(EventType.TapEvent, e => {
    try{
        const tile = e.tile;
        if (!tile) return;

        const build = tile.build;
        if (!build) return;

        const target = Vars.content.getByName(ContentType.block, "gr-the-stem");
        if (tile.block() != target) return;

        Sounds.click.at(build.x, build.y);

        Vars.ui.showCustomConfirm(
            "[green]The Stem[]",
            "[#3a8f64]It's a green router[]",
            "[red]Remove[]",
            "[green]Spare[]",

            () => {
                const unit = Vars.content.getByName(ContentType.unit, "gr-router-god");
                if (!unit){
                    Vars.ui.showInfoToast("Unit null", 2);
                    return;
                }

                //unit.spawn(Team.get(6), build.x, build.y,90);
                Vars.ui.announce("[red]To have known it's wrong and still end up doing it.",4.5);
                build.kill();
            },

            () => {
                Vars.ui.showInfoToast("[#3a8f64]Wise choice.", 5);
            }
        );

    } catch(err){
        Vars.ui.showInfoToast(err + "", 5);
    }
});
