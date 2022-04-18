const {
  MAIN_BUTTON_TEXT,
  categoryListButton,
  commentTypeButtons,
  productListButton
} = require("../utils/ButtonManager");
const {
  COMMENT_FIRST_MESSAGE,
  FAV_LIST_MESSAGE,
  FAV_LIST_EMPTY_MESSAGE
} = require("../utils/MessageHandler");
const { CATEGORY_LIST } = require("../utils/MessageHandler");
const { STATE_LIST } = require("./SessionMiddleware");
const Category = require("../../model/category");
const User = require("../../model/user");

module.exports = (ctx, next) => {
  if (!ctx.message) return next();
  const text = ctx.message.text;
  if (text)
    if (Object.values(MAIN_BUTTON_TEXT).includes(text) && EventListener[text])
      return EventListener[text](ctx);
  next();
};

const EventListener = {
  [MAIN_BUTTON_TEXT.ONLINE_BUY]: async ctx => {
    const categoryList = await Category.find();
    ctx.reply(CATEGORY_LIST, categoryListButton(categoryList));
  },
  [MAIN_BUTTON_TEXT.COMMENT]: ctx => {
    ctx.session.state = STATE_LIST.COMMENT_TYPE;
    ctx.reply(COMMENT_FIRST_MESSAGE, commentTypeButtons);
  },
  [MAIN_BUTTON_TEXT.CATALOG]: ctx => {
    ctx.reply("voordon da! 2");
  },
  [MAIN_BUTTON_TEXT.FAVS]: async ctx => {
    const user = await User.findOne({ telId: ctx.message.from.id }).populate(
      "fav"
    );
    if (user) ctx.reply(FAV_LIST_MESSAGE, productListButton(user.fav));
    else ctx.reply(FAV_LIST_EMPTY_MESSAGE);
  },
  [MAIN_BUTTON_TEXT.CART]: ctx => {
    ctx.reply("voordon da! 4");
  },
  [MAIN_BUTTON_TEXT.MY_BUYS]: ctx => {
    ctx.reply("voordon da! 5");
  }
};

module.exports.keyboardEventListener = EventListener;
