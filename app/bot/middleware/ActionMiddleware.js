const {
  productListButton,
  productDetailButtons, MAIN_BUTTON_TEXT
} = require("../utils/ButtonManager");
const { PRODUCT_LIST_MESSAGE, PRODUCT_NOT_FOUND_MESSAGE, getProductDetailMessage, SEARCH_MESSAGE } = require("../utils/MessageHandler");
const productList = require("../data/product.json");
const { keyboardEventListener } = require('./KeyboardMiddleware');
const { STATE_LIST } = require('./SessionMiddleware');
const Product = require('../../model/product')

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
  CAT: async (ctx, matches) => {
    const cat = matches[0].split("_")[1];
    const products = await Product.find({ cat: cat })
    console.log(products);
    ctx.reply(PRODUCT_LIST_MESSAGE, productListButton(products));

  },
  PRODUCT: async (ctx, matches) => {
    const productId = matches[0].split("_")[1];
    const data = await Product.findById(productId)
    if (data) {
      if (data.photo) {
        await ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo")
        await ctx.replyWithPhoto(data.photo, productDetailButtons(data, getProductDetailMessage(data)));
      } else
        ctx.reply(getProductDetailMessage(data), productDetailButtons(data))
    } else ctx.reply(PRODUCT_NOT_FOUND_MESSAGE)
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
    ctx.session.state = STATE_LIST.SEARCH;
    ctx.reply(SEARCH_MESSAGE);
  }

};
