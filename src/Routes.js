import { Router } from 'express';
import { RESOLVER, Lifetime, InjectionMode } from 'awilix';

/**
 * Symbols as private methods
 */
const recipientRoutes = Symbol('recipientRoutes');

class Routes {
  constructor({ container }) {
    this._container = container;
    this._routes = new Router();

    this[recipientRoutes]();
  }

  routes() {
    return this._routes;
  }

  [recipientRoutes]() {
    const RecipientController = this._container.resolve('recipientController');

    this._routes.get('/recipients', (req, res, next) =>
      RecipientController.list(req, res, next)
    );

    this._routes.post('/recipients', (req, res, next) =>
      RecipientController.create(req, res, next)
    );
  }
}

Routes[RESOLVER] = {
  name: 'routes',
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};

export default Routes;
