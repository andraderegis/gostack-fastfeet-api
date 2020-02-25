import { Router } from 'express';
import { RESOLVER, Lifetime, InjectionMode } from 'awilix';

import { AWILIX_RESOVE_NAMES } from './constants';

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

  /**
   *
   * @returns {Router}
   */
  routes() {
    return this._routes;
  }

  [recipientRoutes]() {
    /**
     * @type {RecipientController}
     */
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
  name: AWILIX_RESOVE_NAMES.ROUTES,
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};

export default Routes;
