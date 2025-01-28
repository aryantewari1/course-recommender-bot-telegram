const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome"));
bot.on("text", (ctx) => {
  const msg = ctx.message;
  ctx.reply(msg.text);
});
bot.launch();
