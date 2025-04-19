// main function after the helper functions
async function mineTwoIronOres(bot) {
  bot.chat("Starting task: Mine 2 iron ores...");
  const requiredIronOres = 2;
  let minedIronOres = 0;
  while (minedIronOres < requiredIronOres) {
    // Explore until we find an iron ore
    await exploreUntil(bot, new Vec3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1), 60, () => {
      const ironOre = bot.findBlock({
        matching: mcData.blocksByName.iron_ore.id,
        maxDistance: 32
      });
      return ironOre;
    });

    // Mine the found iron ore
    const ironOre = bot.findBlock({
      matching: mcData.blocksByName.iron_ore.id,
      maxDistance: 32
    });
    if (ironOre) {
      bot.chat("Iron ore found! Mining...");
      await mineBlock(bot, "iron_ore", 1);
      minedIronOres++;
      bot.chat(`Mined ${minedIronOres} iron ore(s).`);
    } else {
      bot.chat("No iron ore found during exploration.");
    }
  }
  bot.chat("Task completed: 2 iron ores collected!");
}