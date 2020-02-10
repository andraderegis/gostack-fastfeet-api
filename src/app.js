import Express from 'express';
import awilixContainer from './config/AwilixDIContainer';
import routes from './routes';

class App {
  constructor() {
    this.server = Express();

    // this.middlewares();
    // this.routes();
    console.info('app.js env:', process.env.NODE_ENV);
  }

  middlewares() {
    this.server.use(Express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
