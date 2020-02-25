import { createContainer, asClass, asValue, asFunction } from 'awilix';

import environment from './config/environment';

class AwilixDIContainer {
  constructor() {
    this.container = createContainer();
    this.init();
  }

  init() {
    console.log('Init Awilix DI Container');
    console.log('Environment: ', environment.getEnvironmentName());

    this.container
      .register({
        container: asFunction(() => this.container),
        databaseConfig: asValue(JSON.parse(process.env.DATABASE_CONFIG)),
        port: asValue(process.env.PORT),
        env: asValue(environment.getEnvironmentName()),
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
