// main function after the helper functions
async function craftStonePickaxe(bot) {
  const requiredCobblestones = 3;
  const requiredSticks = 2;

  // Check the current inventory for required items
  const collectedCobblestones = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  const collectedSticks = bot.inventory.count(mcData.itemsByName.stick.id);

  // If not enough cobblestones, explore and collect the required amount
  if (collectedCobblestones < requiredCobblestones) {
    bot.chat("I need more cobblestones to craft a stone pickaxe.");

    // Explore until cobblestone (stone blocks) is found and mine it
    await exploreUntil(bot, new Vec3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1), 60, () => {
      const stoneBlock = bot.findBlock({
        matching: mcData.blocksByName.stone.id,
        maxDistance: 32
      });
      return stoneBlock;
    });

    // Mine enough stone blocks to collect cobblestones
    await mineBlock(bot, "stone", requiredCobblestones - collectedCobblestones);
  }

  // Update collected cobblestones after mining
  const newCobblestonesCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);

  // After ensuring we have enough cobblestones, check for sticks
  if (newCobblestonesCount < requiredCobblestones) {
    bot.chat("I still don't have enough cobblestones.");
    return; // Exit, as we don't have enough cobblestones
  }
  if (collectedSticks < requiredSticks) {
    bot.chat("I have enough cobblestones, but I still need more sticks.");
    // Collect sticks (assuming oak logs are nearby)
    while (collectedSticks < requiredSticks) {
      const oakTrees = bot.findBlocks({
        matching: mcData.blocksByName.oak_log.id,
        maxDistance: 32,
        count: 10 // Find nearby oak logs to gather sticks
      });
      if (oakTrees.length > 0) {
        await mineBlock(bot, "oak_log", 1); // Mine one oak log to get sticks
        // Update collected sticks after mining
        collectedSticks += 4; // Each oak log drops 2-4 sticks
      } else {
        // Explore until an oak log is found
        await exploreUntil(bot, new Vec3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1), 60, () => {
          const oakLog = bot.findBlock({
            matching: mcData.blocksByName.oak_log.id,
            maxDistance: 32
          });
          return oakLog;
        });
      }
    }
  }

  // Now everything should be ready for crafting the stone pickaxe
  const finalCobblestonesCount = bot.inventory.count(mcData.itemsByName.cobblestone.id);
  const finalSticksCount = bot.inventory.count(mcData.itemsByName.stick.id);
  if (finalCobblestonesCount >= requiredCobblestones && finalSticksCount >= requiredSticks) {
    bot.chat("Placing the crafting table and crafting a stone pickaxe...");
    await placeItem(bot, "crafting_table", bot.entity.position.offset(1, 0, 0)); // Place the crafting table

    // Craft the stone pickaxe
    await craftItem(bot, "stone_pickaxe", 1);
    bot.chat("Successfully crafted a stone pickaxe!");
  } else {
    bot.chat("I don't have enough materials to craft a stone pickaxe.");
  }
}