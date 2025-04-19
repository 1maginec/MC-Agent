async function mineThreeOakLogs(bot) {
  // Define required number of oak logs
  const requiredLogs = 3;
  while (bot.inventory.count(mcData.itemsByName.oak_log.id) < requiredLogs) {
    // Check how many logs are already collected
    const collectedLogs = bot.inventory.count(mcData.itemsByName.oak_log.id);
    bot.chat(`Currently collected: ${collectedLogs} oak logs.`);

    // Search for nearby oak logs
    let oakLog = bot.findBlock({
      matching: mcData.blocksByName.oak_log.id,
      maxDistance: 32
    });
    if (oakLog) {
      bot.chat("Found an oak log nearby, mining...");
      await mineBlock(bot, "oak_log", 1); // Mine one oak log at a time
      bot.chat(`Successfully mined 1 oak log. Total logs: ${collectedLogs + 1}.`);
    } else {
      bot.chat("No nearby oak logs found. Exploring...");
      await exploreUntil(bot, new Vec3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1), 60, () => {
        const log = bot.findBlock({
          matching: mcData.blocksByName.oak_log.id,
          maxDistance: 32
        });
        return log;
      });
    }
  }
  bot.chat("Task completed: 3 oak logs collected!");
}