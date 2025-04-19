// Ensure mcData is correctly initialized

async function mineWoodLog(bot) {
  bot.chat("Looking for an oak log to mine...");

  // Find and mine the oak log
  const oakLog = bot.findBlock({
    matching: mcData.blocksByName.oak_log.id,
    maxDistance: 32
  });
  if (oakLog) {
    await mineBlock(bot, "oak_log", 1);
    bot.chat("Successfully mined an oak log.");
  } else {
    // If no oak log was found, explore for it
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const log = bot.findBlock({
        matching: mcData.blocksByName.oak_log.id,
        maxDistance: 32
      });
      return log;
    });
    await mineBlock(bot, "oak_log", 1);
  }

  // Check inventory to ensure the log has been collected
  if (bot.inventory.count(mcData.itemsByName.oak_log.id) >= 1) {
    bot.chat("Task completed: 1 oak log collected!");
  } else {
    bot.chat("Task failed: Oak log was not collected.");
  }
}