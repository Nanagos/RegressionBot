const CTFUtils = require("rg-ctf-utils");
const { CTFEvent } = CTFUtils;

//3

module.exports = (bot) => {

  bot.allowDigWhilePathing(false);

  const ctfUtils = new CTFUtils(bot);

  bot.on("spawn", () => {
    bot.chat(`Hey, I'm called ${bot.username}!`);
  });

};