// helper functions (only if needed, try to avoid them)
// No helper functions needed

// main function after the helper functions
async function craftFurnace(bot) {
  const requiredCobblestones = 8;

  // Check if crafting table is available
  const craftingTableItem = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);
  if (craftingTableItem) {
    bot.chat("I have a crafting table, placing it now...");
    // Place the crafting table offset from the bot's position
    await placeItem(bot, "crafting_table", bot.entity.position.offset(1, 0, 0));
  } else {
    // If no crafting table, craft one using oak logs
    bot.chat("I need to craft a crafting table first...");
    const oakLogCount = bot.inventory.count(mcData.itemsByName.oak_log.id);

    // Check if there's enough oak logs to make a crafting table
    if (oakLogCount > 0) {
      await craftItem(bot, "crafting_table", 1); // Craft the crafting table
      // Now place the crafting table
      await placeItem(bot, "crafting_table", bot.entity.position.offset(1, 0, 0));
    } else {
      // Explore and mine for an oak log
      await exploreUntil(bot, new Vec3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1), 60, () => {
        const oakLog = bot.findBlock({
          matching: mcData.blocksByName.oak_log.id,
          maxDistance: 32
        });
        return oakLog;
      });
      await mineBlock(bot, "oak_log", 1); // Mine an oak log
      await craftItem(bot, "crafting_table", 1); // Now craft the crafting table
      await placeItem(bot, "crafting_table", bot.entity.position.offset(1, 0, 0)); // Place the crafting table
    }
  }

  // Now craft the furnace
  bot.chat("Now crafting the furnace...");
  await craftItem(bot, "furnace", 1); // Craft the furnace
  bot.chat("Successfully crafted a furnace!");
}