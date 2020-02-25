import { RESOLVER, Lifetime, InjectionMode } from 'awilix';

import { AWILIX_RESOVE_NAMES } from '../../../constants';

import BaseController from '../base-controller';

/**
 *
 *
 * @class RecipientController
 * @extends {BaseController}
 */
class RecipientController extends BaseController {
  /**
   *Creates an instance of RecipientController.
   * @param {AwilixContainer} container
   * @param {Models} models
   * @memberof RecipientController
   */
  constructor({ container, models }) {
    super({
      container,
      model: models.getModel('Recipient'),
    });
  }

  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof RecipientController
   */
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
  name: AWILIX_RESOVE_NAMES.CONTROLLERS.RECIPIENT_CONTROLLER,
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};

export default RecipientController;
