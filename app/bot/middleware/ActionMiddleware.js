const {
  productListButton,
  productDetaiButtons, MAIN_BUTTON_TEXT
} = require("../utils/ButtonManager");
const { PRODUCT_LIST_MESSAGE, PRODUCT_NOT_FOUND_MESSAGE, getProductDetailMessage, SEARCH_MESSAGE } = require("../utils/MessageHandler");
const productList = require("../data/product.json");
const { keyboardEventListener } = require('./KeyboardMiddleware');

const ActionMap = {
  CAT: /^CAT_\w+/,
  PRODUCT: /^PRODUCT_\w+/,
  BACK: /^BACK_\w+/,
  SEARCH: /^SEARCH/
}

module.exports = (ctx, next) => {
  if (!ctx.update.callback_query) return next();
  const callback_data = ctx.update.callback_query.data;
  if (callback_data) {
    const actionValues = Object.values(ActionMap)
    for (let i = 0; i < actionValues.length; i++) {
      const isMatch = callback_data.match(actionValues[i])
      if (isMatch && EventListener[Object.keys(ActionMap)[i]])
        EventListener[Object.keys(ActionMap)[i]](ctx, isMatch);


    }
  }
  next();
};

const EventListener = {
  CAT: (ctx, matches) => {
    const cat = matches[0].split("_")[1];
    productList.filter(item => item.cat == cat)
    ctx.reply(PRODUCT_LIST_MESSAGE, productListButton(productList.filter(item => item.cat == cat)));

  },
  PRODUCT: (ctx, matches) => {
    const productId = matches[0].split("_")[1];
    const data = productList.find(item => item.id == productId);
    if (data)
      ctx.reply(getProductDetailMessage(data), productDetaiButtons(data))
    else ctx.reply(PRODUCT_NOT_FOUND_MESSAGE)
  },
  BACK: (ctx, matches) => {
    const where = matches[0].split("_")[1];
    switch (where) {
      case "CAT":
        keyboardEventListener[MAIN_BUTTON_TEXT.ONLINE_BUY](ctx);
        break;
      case "PRODUCT":
        const cat = matches[0].split("_")[2];
        EventListener.CAT(ctx, [`CAT_${cat}`]);
        break;
    }
  },
  SEARCH: (ctx) => {
    ctx.session.state = "search";
    ctx.reply(SEARCH_MESSAGE);
  }

};
