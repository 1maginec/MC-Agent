async function completeOakLogTask(bot) {
  // Check the number of oak logs in the inventory
  if (bot.inventory.count(mcData.itemsByName.oak_log.id) >= 3) {
    bot.chat("Task completed: 3 oak logs collected!");
  } else {
    bot.chat("You need to collect more oak logs.");
  }
}