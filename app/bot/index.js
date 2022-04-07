const { Telegraf } = require("telegraf");
const { mainButtons } = require("./utils/ButtonManager");
const keyboardmiddleware = require("./middleware/keyboardmiddleware");
const KeyboardMiddleware = require("./middleware/KeyboardMiddleware");
const ActionMiddleware = require("./middleware/ActionMiddleware");

const { START_MESSAGE } = require("./utils/MessageHandler");
let bot;

async function startBot() {
  bot = new Telegraf(process.env.TOKEN);
  await bot.launch();
  bot.use(keyboardmiddleware);
  bot.use(KeyboardMiddleware);
  bot.use(ActionMiddleware);
  bot.start((ctx) => {
    ctx.reply(START_MESSAGE, mainButtons);
  });
}

module.exports.startBot = startBot;
