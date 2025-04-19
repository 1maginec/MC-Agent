// main function after the helper functions
async function mineTwoCopperOres(bot) {
  bot.chat("Searching for copper ores to mine...");

  // Amount of copper ores needed
  const requiredCopperOres = 2;

  // Keep track of mined copper ores
  let minedCopperOres = 0;
  while (minedCopperOres < requiredCopperOres) {
    // Explore until we find a copper ore
    await exploreUntil(bot, new Vec3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1), 60, () => {
      const copperOre = bot.findBlock({
        matching: mcData.blocksByName.copper_ore.id,
        maxDistance: 32
      });
      return copperOre;
    });

    // Mine the found copper ore
    const copperOre = bot.findBlock({
      matching: mcData.blocksByName.copper_ore.id,
      maxDistance: 32
    });
    if (copperOre) {
      bot.chat("Copper ore found! Mining...");
      await mineBlock(bot, "copper_ore", 1);
      minedCopperOres++;
      bot.chat(`Mined ${minedCopperOres} copper ore(s).`);
    } else {
      bot.chat("No copper ore found during exploration.");
    }
  }
  bot.chat("Task completed: 2 copper ores collected!");
}