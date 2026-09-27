const blocks = [
"gr-extractor-bastion"
];


Events.on(ContentInitEvent, () => {
try{
const drones = new Stat("drones", StatCat.crafting);

function constructDroneBay(string){
    const block = Vars.content.block(string);
    if (!block) return;

     block.stats.add(Stat.output, StatValues.content(block.droneType));
     block.stats.add(drones, block.unitsSpawned);

}
  
for (let i = 0; i < blocks.length; i++){
constructDroneBay(blocks[i]);
}
  
} catch(e){
Vars.ui.showText("bruv",e);
}});
