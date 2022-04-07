const { arrayToColumnConverter } = require("./DataUtil");

const MAIN_BUTTON_TEXT = {
  CATALOG: "کاتالوگ",
  COMMENT: "پیشنهادات و انتقادات",
  ONLINE_BUY: "خرید آنلاین",
  MY_BUYS: "خریدهای من",
  CART: "سبد خرید",
  FAVS: "علاقه مندی‌های من",
};
const mainButtons = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [
        { text: MAIN_BUTTON_TEXT.CATALOG },
        { text: MAIN_BUTTON_TEXT.COMMENT },
        { text: MAIN_BUTTON_TEXT.ONLINE_BUY },
      ],
      [
        { text: MAIN_BUTTON_TEXT.MY_BUYS },
        { text: MAIN_BUTTON_TEXT.CART },
        { text: MAIN_BUTTON_TEXT.FAVS },
      ],
    ],
  },
};

const categoryListButton = (data) => {
  return {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [
        ...arrayToColumnConverter(data, 2).map((item) =>
          item.map((item) => ({
            text: item.title,
            callback_data: `CAT_${item.id}`,
          }))
        ),
        [{ text: "جستجو", callback_data: "search" }],
      ],
    },
  };
};
const productListButton = (data) => {
  return {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [
        ...arrayToColumnConverter(data, 2).map((item) =>
          item.map((item) => ({
            text: item.name,
            callback_data: `PRODUCT_${item.id}`,
          }))
        ),
        [{ text: "بازگشت به قبل", callback_data: "BACK_CAT" }],
      ],
    },
  };
};
const productDetaiButtons = (product) => {
  return {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [
        [{
          text: "افزودن به سبد خرید",
          callback_data: `CART_${product.id}`
        }], [
          {
            text: "افزودن به لیست علاقه‌مندی‌ها",
            callback_data: `FAV_${product.id}`
          },
        ], [
          {
            text: "بازگشت به قبل",
            callback_data: `BACK_PRODUCT_${product.cat}`
          }
        ]
      ]
    }
  }

}
module.exports = {
  MAIN_BUTTON_TEXT,
  mainButtons,
  categoryListButton,
  productListButton,
  productDetaiButtons
};
