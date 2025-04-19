// helper functions (only if needed, try to avoid them)
// No helper functions are defined here

// main function after the helper functions
async function mineFourCobblestones(bot) {
  const requiredCobblestones = 4;

  // Check current inventory for cobblestones
  const collectedCobblestones = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  if (collectedCobblestones >= requiredCobblestones) {
    bot.chat("Task completed: 4 cobblestones collected!");
    return; // Exit early if we already have enough cobblestones
  }
  bot.chat("Looking for stone blocks to mine for cobblestones...");

  // Continue mining until we have the required amount of cobblestones
  while (bot.inventory.count(mcData.itemsByName.cobblestone.id) < requiredCobblestones) {
    const stoneBlocks = bot.findBlocks({
      matching: mcData.blocksByName.stone.id,
      maxDistance: 32,
      count: requiredCobblestones - collectedCobblestones // Only find the needed amount
    });
    if (stoneBlocks.length > 0) {
      await mineBlock(bot, "stone", requiredCobblestones - collectedCobblestones); // Mine the required cobblestones
    } else {
      // If no stone blocks found, explore until one is found
      await exploreUntil(bot, new Vec3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1), 60, () => {
        const stoneBlock = bot.findBlock({
          matching: mcData.blocksByName.stone.id,
          maxDistance: 32
        });
        return stoneBlock;
      });
    }
  }

  // Final check
  const finalCobblestonesCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  if (finalCobblestonesCount >= requiredCobblestones) {
    bot.chat("Task completed: 4 cobblestones collected!");
  } else {
    bot.chat("Failed to collect the required cobblestones.");
  }
}