const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "🎉 Welcome to the Course Recommender Bot! 🎉\n\n" +
      "Here’s what you can do:\n" +
      "/recommend - Get course recommendations\n" +
      "/search - Search for a course\n" +
      "/favorites - View your saved courses\n" +
      "/feedback - Share your feedback"
  );
});

bot.command("recommend", (ctx) => {
  ctx.reply(
    "What's your area of interest?",
    Markup.inlineKeyboard([
      [Markup.button.callback("Programming", "programming")],
      [Markup.button.callback("Designing", "designing")],
      [Markup.button.callback("Development", "development")],
      [Markup.button.callback("DSA", "dsa")],
    ])
  );
});

bot.launch();
