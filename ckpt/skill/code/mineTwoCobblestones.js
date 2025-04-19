// helper functions (only if needed, try to avoid them)
// No helper functions needed for this implementation

// main function after the helper functions
async function mineTwoCobblestones(bot) {
  const requiredCobblestones = 2;

  // Check current inventory for cobblestones
  const collectedCobblestones = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  if (collectedCobblestones >= requiredCobblestones) {
    bot.chat("Task completed: 2 cobblestones collected!");
    return; // Exit early if we already have enough cobblestones
  }
  bot.chat("Looking for stone blocks to mine for cobblestones...");

  // Attempt to find and mine stone blocks if required
  const stoneBlocks = bot.findBlocks({
    matching: mcData.blocksByName.stone.id,
    maxDistance: 32,
    count: requiredCobblestones - collectedCobblestones
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
    // Repeat the mining process after exploration
    await mineBlock(bot, "stone", requiredCobblestones - collectedCobblestones);
  }

  // Final check after mining
  const finalCobblestonesCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  if (finalCobblestonesCount >= requiredCobblestones) {
    bot.chat("Task completed: 2 cobblestones collected!");
  } else {
    bot.chat("Failed to collect the required cobblestones.");
  }
}