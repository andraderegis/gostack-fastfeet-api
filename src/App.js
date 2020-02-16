import Express from 'express';
import awilixContainer from './AwilixDIContainer';
import RecipientController from './app/controllers/impl/RecipientController';

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

export default new App().server;
