const {
  productListButton,
} = require("../utils/ButtonManager");
const { COMMENT_SECOND_MESSAGE, adminCommentMessage, COMMENT_THIRD_MESSAGE } = require("../utils/MessageHandler");
const productList = require("../data/product.json");
const config = require("config");



const STATE_LIST = {
  SEARCH: "search",
  COMMENT_TYPE: "commentType",
  COMMENT_ENTER: "commentEnter"
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
  },
  [STATE_LIST.COMMENT_TYPE]: (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.update.callback_query) {
      const data = ctx.update.callback_query.data;
      ctx.session.state = STATE_LIST.COMMENT_ENTER;
      ctx.session.comment = { commentType: data }

      ctx.reply(COMMENT_SECOND_MESSAGE)
    } else next()
  },
  [STATE_LIST.COMMENT_ENTER]: (ctx, next) => {
    ctx.session.state = undefined;
    if (ctx.message) {
      const data = ctx.message.text;
      ctx.reply(COMMENT_THIRD_MESSAGE);
      ctx.telegram.sendMessage(config.get("adminId"), adminCommentMessage({ type: ctx.session.comment.commentType, text: data }, ctx.message.from))
    } else next()
  }

};
module.exports.STATE_LIST = STATE_LIST;