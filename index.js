const CTFUtils = require("rg-ctf-utils");
const { CTFEvent } = CTFUtils;

//6

const configureBot = (bot) => {

  bot.allowDigWhilePathing(false);

  const ctfUtils = new CTFUtils(bot);

  bot.on("spawn", () => {
    bot.chat(`Hey, I'm called ${bot.username}!`);
  });

}

module.exports = {
  configureBot
};