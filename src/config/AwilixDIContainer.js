import path from 'path';

require('dotenv-safe').config({
  allowEmptyValues: false,
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV ? `./env/.env.${process.env.NODE_ENV}` : './env/.env'
  ),
  example: path.resolve(__dirname, './env/.env.template'),
});

import { createContainer, asClass, asValue, asFunction } from 'awilix';

class AwilixDIContainer {
  constructor() {
    this.container = createContainer();
    this.init();
  }

  init() {
    console.log('init container');

    this.container
      .register({
        databaseConfig: asValue(JSON.parse(process.env.DATABASE_CONFIG)),
      })
      .loadModules(['./models.js'], {
        resolverOptions: {
          register: asClass,
        },
      });
  }
}

export default new AwilixDIContainer().container;
