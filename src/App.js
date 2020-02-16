import Express from 'express';
import awilixContainer from './AwilixDIContainer';
import routes from './Routes';

class App {
  constructor() {
    this.server = Express();

    // this.middlewares();
    // this.routes();
  }

  middlewares() {
    this.server.use(Express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
