const {
  productListButton,
  productDetaiButtons, MAIN_BUTTON_TEXT
} = require("../utils/ButtonManager");
const { PRODUCT_LIST_MESSAGE, PRODUCT_NOT_FOUND_MESSAGE, getProductDetailMessage, SEARCH_MESSAGE } = require("../utils/MessageHandler");
const productList = require("../data/product.json");
const { keyboardEventListener } = require('./KeyboardMiddleware');

const STATE_LIST = {
  SEARCH: "search"
}

module.exports = (ctx, next) => {
  if (!ctx.session.state) return next();
  const state = ctx.session.state;
  const values = Object.values(STATE_LIST)
  if (values.includes(state) && EventListener[state])
    return EventListener[state](ctx, next)
  next();
}


const EventListener = {
  [STATE_LIST.SEARCH]: (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message) {
      const text = ctx.message.text;
      const list = productList.filter(item => item.name.includes(text))
      ctx.reply(`شما داری دنبال محصول " ${ctx.message.text} "میگردی`, productListButton(list));


    } else next();
  }

};
