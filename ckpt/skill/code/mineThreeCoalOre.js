// main function after the helper functions
async function mineThreeCoalOre(bot) {
  const requiredCoal = 3;

  // Check current inventory for coal
  const collectedCoal = bot.inventory.count(mcData.itemsByName.coal.id);
  if (collectedCoal >= requiredCoal) {
    bot.chat("Task completed: 3 coal collected!");
    return; // Exit early if we already have enough coal
  }
  bot.chat("Looking for coal ore to mine...");

  // Keep track of mined coal ores
  let minedCoal = 0;
  while (minedCoal < requiredCoal) {
    // Explore until we find a coal ore
    await exploreUntil(bot, new Vec3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1), 60, () => {
      const coalOre = bot.findBlock({
        matching: mcData.blocksByName.coal_ore.id,
        maxDistance: 32
      });
      return coalOre;
    });

    // Mine the found coal ore
    const coalOre = bot.findBlock({
      matching: mcData.blocksByName.coal_ore.id,
      maxDistance: 32
    });
    if (coalOre) {
      bot.chat("Coal ore found! Mining...");
      await mineBlock(bot, "coal_ore", 1);
      minedCoal++;
      bot.chat(`Mined ${minedCoal} coal ore(s).`);
    } else {
      bot.chat("No coal ore found during exploration.");
    }
  }
  bot.chat("Task completed: 3 coal collected!");
}