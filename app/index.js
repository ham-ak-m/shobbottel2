const { config } = require("dotenv");
const { startBot } = require("./bot");

class Application {
  constructor() {
    this.configApp();
    startBot();
  }
  configApp() {
    require("dotenv").config();
  }
}

module.exports = Application;
