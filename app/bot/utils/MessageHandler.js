module.exports.START_MESSAGE = "سلام به فروشگاه ما خوش آمدید";
module.exports.CATEGORY_LIST = "لطفا یک گروه را برای ادامه انخاب کنید";
module.exports.PRODUCT_LIST_MESSAGE =
  "یکی از محصولات زیر را برای دریافت اطلاعات بیشتر انتخاب کنید";
module.exports.PRODUCT_NOT_FOUND_MESSAGE = "محصول مورد نظر یافت نشد";
module.exports.SEARCH_MESSAGE = "نام محصولی که میخواهید را تایپ کنید";
module.exports.COMMENT_FIRST_MESSAGE = "لطفا نوع نظر خود را انتخاب کنید";
module.exports.COMMENT_SECOND_MESSAGE = "هرچه میخواهد دل تنگت بوگو";
module.exports.COMMENT_THIRD_MESSAGE =
  "با تشکر ، نظرتان برای بررسی بیشتر به ادمین ارسال شد";
module.exports.FAV_ADDED_MESSAGE = "محصول فوق به لیست علاقه‌مندی شما افزوده شد";
module.exports.FAV_LIST_MESSAGE =
  " محصولات زیر در لیست علاقه مندیهای شما قرار دارند. در صورت تمایل برای اطلاعات بیشتر و خرید آنها روی هر گزینه کلیک کنید.";
module.exports.FAV_LIST_EMPTY_MESSAGE = "لیست علاقه مندی شما خالیه";

module.exports.getProductDetailMessage = product => `🌸${product.name}🌸

${
  product.meta
    ? product.meta.map(item => `${item.key}:${item.value}`).join("\n")
    : ""
}

وضعیت : ${product.exist ? "موجود" : "ناموجود"}
قیمت مقطوع : ${product.price} تومان

`;
module.exports.adminCommentMessage = (comment, user) => `${
  comment.type === "COMMENT_TYPE_CRIT" ? "یک انتقاد جدید" : "یک پیشنهاد جدید"
}

${comment.text}

کاربر : @${user.username}
`;
