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
            callback_data: `CAT_${item._id}`,
          }))
        ),
        [{ text: "جستجو", callback_data: "SEARCH" }],
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
            callback_data: `PRODUCT_${item._id}`,
          }))
        ),
        [{ text: "بازگشت به قبل", callback_data: "BACK_CAT" }],
      ],
    },
  };
};
const productDetailButtons = (
  product,
  caption = "",
  existInFav,
  existInCart
) => {
  return {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [
        [
          {
            text: existInCart ? "❌حذف از سبد خرید" : "افزودن به سبد خرید",
            callback_data: `CART_${product._id}`,
          },
        ],
        [
          {
            text: existInFav
              ? "❌حذف از لیست علاقمندی ها"
              : "افزودن به لیست علاقمندی ها",
            callback_data: `FAV_${product._id}`,
          },
        ],
        [
          {
            text: "بازگشت↪️",
            callback_data: `BACK_PRODUCT_${product.cat}`,
          },
        ],
      ],
    },
    caption,
  };
};
const commentTypeButtons = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [
        {
          text: "انتقاد",
          callback_data: `COMMENT_TYPE_CRIT`,
        },
      ],
      [
        {
          text: "پیشنهاد",
          callback_data: `COMMENT_TYPE_PROP`,
        },
      ],
    ],
  },
};

const sharedUseButtons = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [
        {
          text: "استفاده تکی",
          callback_data: `SHARED-USE_FALSE`,
        },
      ],
      [{ text: "استفاده گروهی", callback_data: `SHARED-USE_TRUE` }],
    ],
  },
};

module.exports = {
  MAIN_BUTTON_TEXT,
  mainButtons,
  categoryListButton,
  productListButton,
  productDetailButtons,
  commentTypeButtons,
  sharedUseButtons,
};
