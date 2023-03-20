const { RGBot } = require("rg-bot");
const RGCTFUtils = require("rg-ctf-utils");
const { CTFEvent } = RGCTFUtils;
const { Vec3 } = require("vec3");
//ewrewrwefgrdgd


module.exports = (bot) => {

  bot.allowDigWhilePathing(false);

  const rgctfUtils = new RGCTFUtils(bot);

  let deaths = 0

  bot.on('death', () => {
    console.log("I have died...")
    deaths++;
    try {
      bot.mineflayer().pathfinder.setGoal(null)
      bot.mineflayer().pathfinder.stop()
    } catch (ex) { }
  })

  bot.on('spawn', async () => {
    await rgctfUtils.approachFlag();
  });

  bot.on(CTFEvent.FLAG_OBTAINED, async (collector) => {
    console.log(`${collector} obtained the flag!`)
    if (collector == bot.username()) {
      await rgctfUtils.scoreFlag()
    }
  });

  let isCollectingItems = false;

  bot.on(CTFEvent.FLAG_SCORED, async (teamName) => {
    let previousDeaths = deaths
    const codeStillRunning = () => { return previousDeaths === deaths }
    bot.chat(`Flag scored by ${teamName} team, collecting items until new flag is here`)
    isCollectingItems = true;
    while (rgctfUtils.getFlagLocation() === null && codeStillRunning()) {
      await bot.findAndCollectItemsOnGround();
      await bot.waitForMilliseconds(500);
    }
    isCollectingItems = false;
    if (codeStillRunning()) await rgctfUtils.approachFlag();
  })

  bot.on(CTFEvent.FLAG_AVAILABLE, async (position) => {
    if (!isCollectingItems) {
      bot.chat("Flag is available, going to get it")
      await rgctfUtils.approachFlag();
    }
  })

};