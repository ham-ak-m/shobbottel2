const mongoose = require('mongoose');
const { startBot } = require("./bot");
const Product = require('./model/product');
const Category = require('./model/category')


class Application {
  constructor() {
    this.configApp();
    this.setupMongo();
    //this.insertOneProduct();
    startBot();
  }
  async insertOneProduct() {
    /* const cat = new Category({
      title: "رمان"
    })
    const cat2 = new Category({
      title: "ادبیات"
    })
    const cat3 = new Category({
      title: "دانشگاهی"
    })
    const cat4 = new Category({
      title: "فن-فیکشن"
    })
    await cat.save();
    await cat2.save();
    await cat3.save();
    await cat4.save(); */
    const product = new Product({
      name: "بارتیمیوس جلد 1",
      price: "45000",
      meta: [
        {
          key: "نویسنده",
          value: "جاناتان استرود"
        }, {
          key: "مترجم",
          value: "محمد قصاع"
        }, {
          key: "تعداد صفحات",
          value: "672"
        }, {
          key: "قطع",
          value: "رقعی"
        }, {
          key: "نشر",
          value: "افق"
        },
      ],
      cat: "6255498d699a7f32441e70e1",
      exists: true,
      photo: "AgACAgQAAxkBAAIBq2JVTbPbBWwlj0LY8k2LA-MYGHj9AAIkuDEbkxGoUiNxgBDrNWQ6AQADAgADeQADIwQ"
    })
    await product.save();
  }
  setupMongo() {
    mongoose.connect("mongodb://localhost:27017/shopbottel", {
      useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => {
      console.log("db connected");
    }).catch(err => {
      clg(err);
    })
  }
  configApp() {
    require("dotenv").config();
  }
}

module.exports = Application;
