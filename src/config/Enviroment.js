const path = require('path');

class Enviroment {
  constructor() {
    this.init();
  }

  init() {
    require('dotenv-safe').config({
      allowEmptyValues: false,
      path: path.resolve(
        __dirname,
        process.env.NODE_ENV
          ? `./env/.env.${process.env.NODE_ENV}`
          : './env/.env'
      ),
      example: path.resolve(__dirname, './env/.env.template'),
    });
  }

  /**
   * @returns {string}
   */
  getEnviromentName() {
    return process.env.NODE_ENV;
  }
}

export default new Enviroment();
