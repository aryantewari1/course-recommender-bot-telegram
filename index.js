const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const courses = {
  programming: ["Java", "Python", "Cpp", "Javascript", "GoLang"],
  designing: ["UI/UX", "Graphic Designing", "Posters"],
  dsa: ["Java", "Cpp", "python", "Javascript"],
  development: [
    "Frontend-development",
    "Backend-development",
    "Fullstack-development",
  ],
};
const programmingLang = {
  programmingJava: [
    { broCode: "https://youtu.be/xk4_1vDrzzo?si=9XrvwWOk9DGj6VPx" },
    { programmingWithMosh: "https://youtu.be/eIrMbAQSU34?si=qbrEfGxslDEbKkGz" },
  ],
  programmingPython: [],
  programmingJavascript: [],
  programmingCpp: [],
  programmingGoLang: [],
};
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

bot.action(["programming", "development", "designing", "dsa"], (ctx) => {
  const interest = ctx.callbackQuery.data;

  ctx.reply(
    `Select the required ${interest} field`,
    Markup.inlineKeyboard(
      courses[interest].map((c) => Markup.button.callback(c, interest + c))
    )
  );
});

bot.action(
  [
    "programmingJava",
    "programmingCpp", // ✅ Fixed from "programmingC++"
    "programmingGoLang",
    "programmingJavascript",
    "programmingPython",
  ],
  (ctx) => {
    const lang = ctx.callbackQuery.data; // "programmingJava", etc.
    if (programmingLang[lang].length === 0) {
      return ctx.reply("No recommendations available for this language.");
    }

    ctx.reply(
      "These are few recommendations from my end <3",
      Markup.inlineKeyboard(
        programmingLang[lang].map((e) => {
          const [[key, value]] = Object.entries(e);
          return Markup.button.url(key, value);
        })
      )
    );
  }
);

bot.launch();
