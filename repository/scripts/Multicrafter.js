const stats = require("Stats");

Events.on(ClientLoadEvent, () => {
try {
const block = Vars.content.block("gr-sealent-capsule");
Vars.ui.content.show(block);
Vars.ui.content.hide();

const seq = new Seq();
seq.add(Vars.content.item("gr-water-capsule"));
seq.add(Vars.content.item("gr-steam-capsule"));
seq.add(Vars.content.item("gr-oil-capsule"));
  
block.stats.add(stats.Recipe, StatValues.content(seq));
block.stats.remove(Stat.input);
block.stats.remove(Stat.output);

} catch(e){
Vars.ui.showText("Oh no", e);
}});

const blocks = [
"gr-sealent-capsule",
"gr-sealent-capsule-steam",
"gr-sealant-capsule-oil"
];

const items = [
"gr-water-capsule",
"gr-steam-capsule",
"gr-oil-capsule"
];

function build(item){
try {
const button = new Button();
button.image(item.uiIcon).size(Core.graphics.getWidth() * 0.065);
button.row();
button.add(item.localizedName);
  
return button;
} catch(e) {
Vars.ui.showInfoToast(e,5);
}}

Events.on(TapEvent, e => {
try {
const tile = e.tile;
const block = tile.block();
const player = e.player;
  
if (!tile || !block || !tile.build || tile.build.team != player.team() || player.selectedBlock != null || player.unit().plans.size > 0) return;
var valid = false;
const building = tile.build;

for (let i = 0; i < blocks.length; i++){
if (block == Vars.content.block(blocks[i])) valid = true;
}

if (!valid) return;
var count = 0;
const dialog = new BaseDialog(Core.bundle.format("stat.recipes"));
dialog.addCloseButton();

  
for (let i = 0; i < items.length; i++){
const button = build(Vars.content.item(items[i]));
dialog.cont.add(button).size(Core.graphics.getWidth() * 0.1);
let num = i;

button.clicked(() => {
try {
const health = building.health;
building.tile.setBlock(Vars.content.block(blocks[num]), building.team);
tile.build.health = health;

dialog.hide();
} catch(e) {
Vars.ui.showInfoToast(e,5);
}});
  
if (count > 3){
dialog.cont.row();
count = 0;
} else {
count++;
}  
}

dialog.show();
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
