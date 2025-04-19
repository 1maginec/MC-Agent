async function mineWoodLogs(bot) {
  const requiredLogs = 2;

  // Check current inventory for the oak logs
  const collectedLogs = bot.inventory.count(mcData.itemsByName.oak_log.id);
  if (collectedLogs >= requiredLogs) {
    bot.chat("Task completed: 2 oak logs collected!");
    return; // Exit early if we already have enough logs
  }
  bot.chat("Looking for oak logs to mine...");

  // Attempt to find and mine oak logs if required
  const oakLogs = bot.findBlocks({
    matching: mcData.blocksByName.oak_log.id,
    maxDistance: 32,
    count: requiredLogs - collectedLogs
  });
  if (oakLogs.length > 0) {
    await mineBlock(bot, "oak_log", requiredLogs - collectedLogs);
  } else {
    // If no oak logs found, explore until one is found
    await exploreUntil(bot, new Vec3(1, 0, 0), 60, () => {
      const log = bot.findBlock({
        matching: mcData.blocksByName.oak_log.id,
        maxDistance: 32
      });
      return log;
    });
    await mineBlock(bot, "oak_log", requiredLogs - collectedLogs);
  }

  // Final check after mining
  const finalLogsCount = bot.inventory.count(mcData.itemsByName.oak_log.id);
  if (finalLogsCount >= requiredLogs) {
    bot.chat("Task completed: 2 oak logs collected!");
  } else {
    bot.chat("Failed to collect the required oak logs.");
  }
}