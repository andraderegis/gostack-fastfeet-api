import { RESOLVER, Lifetime, InjectionMode } from 'awilix';

import BaseController from '../BaseController';

class RecipientController extends BaseController {
  /**
   * @param {AwilixContainer} container
   * @param {Models} models
   */
  constructor({ container, models }) {
    super({
      container,
      model: models.getModel('Recipient'),
    });
  }

  async list(req, res, next) {
    return this._tryAwaitControllerResponse.tryAwaitProcessResult({
      processResult: {
        count: 0,
        result: [],
      },
      res,
      next,
    });
  }
}

RecipientController[RESOLVER] = {
  name: 'recipientController',
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};

export default RecipientController;
