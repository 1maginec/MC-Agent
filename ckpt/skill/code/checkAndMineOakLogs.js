async function checkAndMineOakLogs(bot) {
  bot.chat("Checking if I need to mine more oak logs...");

  // Count the number of oak logs in the inventory
  const requiredLogs = 2;
  const collectedLogs = bot.inventory.count(mcData.itemsByName.oak_log.id);
  if (collectedLogs >= requiredLogs) {
    bot.chat(`Task completed: ${collectedLogs} oak logs collected!`);
  } else {
    bot.chat(`You need to collect more oak logs. Currently have: ${collectedLogs}`);

    // Find and mine the missing oak logs if needed
    const oakLog = bot.findBlock({
      matching: mcData.blocksByName.oak_log.id,
      maxDistance: 32
    });
    if (oakLog) {
      await mineBlock(bot, "oak_log", requiredLogs - collectedLogs);
    } else {
      await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
        const log = bot.findBlock({
          matching: mcData.blocksByName.oak_log.id,
          maxDistance: 32
        });
        return log;
      });
      await mineBlock(bot, "oak_log", requiredLogs - collectedLogs);
    }
    bot.chat(`Task completed: ${requiredLogs} oak logs mined!`);
  }
}