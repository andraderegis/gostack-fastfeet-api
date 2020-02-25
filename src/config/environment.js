import path from 'path';

class Environment {
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
  getEnvironmentName() {
    return process.env.NODE_ENV;
  }
}

export default new Environment();
