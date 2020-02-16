import { createContainer, asClass, asValue, asFunction } from 'awilix';

import enviroment from './config/Enviroment';

class AwilixDIContainer {
  constructor() {
    this.container = createContainer();
    this.init();
  }

  init() {
    console.log('init container');
    console.log('enviroment: ', enviroment.getEnviromentName());

    this.container
      .register({
        container: asFunction(() => this.container),
        databaseConfig: asValue(JSON.parse(process.env.DATABASE_CONFIG)),
      })
      .loadModules(
        [
          './src/*.js',
          './src/app/controllers/**/*.js',
          './src/app/middlewares/*.js',
        ],
        {
          resolverOptions: {
            register: asClass,
          },
        }
      );
  }
}

export default new AwilixDIContainer().container;
