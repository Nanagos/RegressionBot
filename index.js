const CTFUtils = require("rg-ctf-utils");
const { CTFEvent } = CTFUtils;

//6

const configureBot = (bot) => {

  bot.allowDigWhilePathing(false);

  //const ctfUtils = new CTFUtils(bot);

  bot.on("spawn", () => {
    bot.chat(`Hey, I'm called ${bot.username}!`);
    bot.findAndCollectItemsOnGround();
  });

  bot.on(CTFEvent.ITEM_COLLECTED, (collector, item) => {
    console.log(`${collector.name} collected an item: ${item.name}!`);
    if(collector.name === bot.username) {
      bot.findAndCollectItemsOnGround();
    }
  });

}

module.exports = {
  configureBot
};