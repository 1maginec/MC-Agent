// helper functions (only if needed, try to avoid them)

// main function after the helper functions
async function craftFourOakPlanks(bot) {
  const requiredLogs = 1; // Need 1 oak log to make 4 oak planks

  // Check the current number of oak logs in inventory
  const currentLogs = bot.inventory.count(mcData.itemsByName.oak_log.id);
  if (currentLogs < requiredLogs) {
    bot.chat("I need to collect more oak logs.");

    // Try to find nearby oak logs
    let oakLog = bot.findBlock({
      matching: mcData.blocksByName.oak_log.id,
      maxDistance: 32
    });
    if (oakLog) {
      bot.chat("Found an oak log, mining...");
      await mineBlock(bot, "oak_log", requiredLogs); // Mine the oak log
    } else {
      bot.chat("No nearby oak logs found, exploring...");
      // Explore until an oak log is found
      await exploreUntil(bot, new Vec3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1), 60, () => {
        const log = bot.findBlock({
          matching: mcData.blocksByName.oak_log.id,
          maxDistance: 32
        });
        return log;
      });
      await mineBlock(bot, "oak_log", requiredLogs); // Mine the oak log after finding it
    }
  }

  // Now check if we have enough logs to craft 4 oak planks
  const totalLogs = bot.inventory.count(mcData.itemsByName.oak_log.id);
  if (totalLogs >= 1) {
    bot.chat("Placing crafting table...");
    await placeItem(bot, "crafting_table", bot.entity.position.offset(1, 0, 0)); // Place the crafting table

    bot.chat("Crafting 4 oak planks...");
    await craftItem(bot, "oak_planks", 1); // Craft 4 oak planks
    bot.chat("Crafted 4 oak planks successfully!");
  } else {
    bot.chat("Failed to collect enough oak logs to craft the oak planks.");
  }
}