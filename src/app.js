import Express from 'express';
import awilixContainer from './awilix-di-container';

class App {
  constructor() {
    this.server = Express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(Express.json());
  }

  routes() {
    const routes = awilixContainer.resolve('routes');
    this.server.use(routes.routes());
  }
}

export default {
  server: new App().server,
  container: awilixContainer,
};
