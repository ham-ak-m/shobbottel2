const { Telegraf } = require("telegraf");
const LocalSession = require('telegraf-session-local');
const { mainButtons } = require("./utils/ButtonManager");
const keyboardmiddleware = require("./middleware/keyboardmiddleware");
const ActionMiddleware = require("./middleware/ActionMiddleware");
const SessionMiddleware = require("./middleware/SessionMiddleware");
const { START_MESSAGE } = require('./utils/MessageHandler');

let bot;

async function startBot() {
  bot = new Telegraf(process.env.TOKEN);
  await bot.launch();
  /* bot.use((ctx, next) => {
    console.log(ctx.message);
    next();
  }) */
  bot.use((new LocalSession({ database: 'session.json' })))
  bot.use(keyboardmiddleware);
  bot.use(SessionMiddleware);
  bot.use(ActionMiddleware);
  bot.start((ctx) => {
    ctx.reply(START_MESSAGE, mainButtons);
  });
}
module.exports.startBot = startBot;
