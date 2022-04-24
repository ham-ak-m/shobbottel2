const {
  productListButton,
  productDetailButtons,
  MAIN_BUTTON_TEXT,
  sharedUseButtons,
} = require("../utils/ButtonManager");
const {
  PRODUCT_LIST_MESSAGE,
  PRODUCT_NOT_FOUND_MESSAGE,
  getProductDetailMessage,
  SEARCH_MESSAGE,
  FAV_ADDED_MESSAGE,
  SHARED_USE_MESSAGE,
  PRODUCT_ADDED_TO_CART_MESSAGE,
  REMOVED_FROM_CART_MESSAGE,
} = require("../utils/MessageHandler");
const { keyboardEventListener } = require("./KeyboardMiddleware");
const { STATE_LIST } = require("./SessionMiddleware");
const Product = require("../../model/product");
const User = require("../../model/user");
const { createUser } = require("../../model/user");

const ActionMap = {
  CAT: /^CAT_\w+/,
  PRODUCT: /^PRODUCT_\w+/,
  BACK: /^BACK_\w+/,
  SEARCH: /^SEARCH/,
  FAV: /^FAV_\w+/,
  CART: /^CART_\w+/,
  SHARED_USE: /^SHARED-USE_\w+/,
};

module.exports = (ctx, next) => {
  if (!ctx.update.callback_query) return next();
  const callback_data = ctx.update.callback_query.data;
  if (callback_data) {
    const actionValues = Object.values(ActionMap);
    for (let i = 0; i < actionValues.length; i++) {
      const isMatch = callback_data.match(actionValues[i]);
      if (isMatch && EventListener[Object.keys(ActionMap)[i]])
        EventListener[Object.keys(ActionMap)[i]](ctx, isMatch);
    }
  }
  next();
};

const EventListener = {
  CAT: async (ctx, matches) => {
    const cat = matches[0].split("_")[1];
    const products = await Product.find({ cat: cat });
    ctx.reply(PRODUCT_LIST_MESSAGE, productListButton(products));
  },
  PRODUCT: async (ctx, matches) => {
    const productId = matches[0].split("_")[1];
    const data = await Product.findById(productId);
    const userTel = ctx.update.callback_query.from;
    let user = await User.findOne({ telId: userTel.id });

    if (data) {
      const existInFav = user?.fav?.includes(productId);
      const existInCart = user?.cart?.some((item) => item.product == productId);
      if (data.photo) {
        await ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo");
        await ctx.replyWithPhoto(
          data.photo,
          productDetailButtons(
            data,
            getProductDetailMessage(data),
            existInFav,
            existInCart
          )
        );
      } else
        ctx.reply(getProductDetailMessage(data), productDetailButtons(data));
    } else ctx.reply(PRODUCT_NOT_FOUND_MESSAGE);
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
  },
  FAV: async (ctx, matches) => {
    const productId = matches[0].split("_")[1];
    const userTel = ctx.update.callback_query.from;
    let user = await User.findOne({ telId: userTel.id });
    if (!user) {
      user = await createUser(userTel, false);
      user.fav = [productId];
    } else if (!user.fav.includes(productId)) user.fav.push(productId);
    else user.fav = user.fav.filter((item) => item != productId);
    await user.save();
    const existInCart = user?.fav?.some((item) => item.product == productId);
    ctx.telegram.editMessageReplyMarkup(
      ctx.update.callback_query.message.chat.id,
      ctx.update.callback_query.message.message_id,
      undefined,
      productDetailButtons(
        { _id: productId },
        "",
        user.fav.includes(productId),
        existInCart
      ).reply_markup
    );
  },
  CART: async (ctx, matches) => {
    const productId = matches[0].split("_")[1];
    const userTel = ctx.update.callback_query.from;
    let user = await User.findOne({ telId: userTel.id });
    if (user) {
      const existInCart = user.cart.some((item) => item.product == productId);
      if (existInCart) {
        user.cart = user.cart.filter((item) => item.product != productId);
        ctx.reply(REMOVED_FROM_CART_MESSAGE);
        return await user.save();
      }
    }
    ctx.session.state = STATE_LIST.SHARED_USE;
    ctx.session.stateData = { productId };
    ctx.reply(SHARED_USE_MESSAGE, sharedUseButtons);
  },
  SHARED_USE: async (ctx, matches) => {
    const shareUse = matches[0].split("_")[1];
    const isShareUse = shareUse === "TRUE";
    const userTel = ctx.update.callback_query.from;
    let user = await User.findOne({ telId: userTel.id });
    if (!user) user = await createUser(userTel, false);
    user.cart.push({
      product: ctx.session.stateData.productId,
      shareUse: isShareUse,
    });
    await user.save();
    await ctx.reply(PRODUCT_ADDED_TO_CART_MESSAGE);
    ctx.session.stateData = undefined;
    ctx.session.state = undefined;
  },
};
