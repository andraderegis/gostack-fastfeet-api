import { AWILIX_RESOVE_NAMES } from './constants';
import app from './app';

class Server {
  constructor() {}

  start() {
    app.server.listen(
      app.container.resolve(AWILIX_RESOVE_NAMES.PARAMS.PORT) || 3333
    );
  }
}

new Server().start();
