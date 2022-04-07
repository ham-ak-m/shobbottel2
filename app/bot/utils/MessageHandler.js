module.exports.START_MESSAGE = "سلام به فروشگاه ما خوش آمدید";
module.exports.CATEGORY_LIST = "لطفا یک گروه را برای ادامه انخاب کنید";
module.exports.PRODUCT_LIST_MESSAGE = "یکی از محصولات زیر را برای دریافت اطلاعات بیشتر انتخاب کنید";
module.exports.PRODUCT_NOT_FOUND_MESSAGE = "محصول مورد نظر یافت نشد";
module.exports.getProductDetailMessage = (product) => `*${product.name}*

${product.meta ? product.meta.map(item => (`${item.key}:${item.value}`)).join("\n") : ""}

وضعیت : ${product.exist ? "موجود" : "ناموجود"}
قیمت مقطوع : ${product.price
    }
`



