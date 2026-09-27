Events.on(ContentInitEvent,() => {
try {
const block = Vars.content.block("gr-profusive-distributor");
const itemSeq = [];
const liquidSeq = [];

Vars.content.items().each(t => {
try {
itemSeq.push(new ItemStack(t, 0));
} catch(e){
Vars.ui.showInfoToast(e,5);
}});

Vars.content.liquids().each(t => {
try {
liquidSeq.push(new LiquidStack(t, 0));
} catch(e){
Vars.ui.showInfoToast(e,5);
}});

block.consumers[0] = new ConsumeItems(itemSeq);
block.consumers[1] = new ConsumeLiquids(liquidSeq);

block.outputItems = itemSeq;
block.outputLiquids = liquidSeq;
  
// load stats
Vars.ui.content.show(block);
Vars.ui.content.hide();

block.stats.remove(Stat.output);
block.stats.remove(Stat.input);
  
} catch(e) {
Vars.ui.showText("idk", e);
}});
