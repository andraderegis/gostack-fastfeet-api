import { promisify } from 'util';

import { RESOLVER, Lifetime, InjectionMode } from 'awilix';
import jwt from 'jsonwebtoken';

import { AWILIX_RESOVE_NAMES } from '../../../constants';

class AuthService {
  /**
   *
   *
   * @param {string} token
   * @param {string} publicKey
   * @param {object} options
   * @returns {object}
   * @memberof AuthService
   */
  async verify({ token, publicKey, options }) {
    return promisify(jwt.verify)(token, publicKey, options);
  }

  /**
   *
   *
   * @param {object} payload
   * @param {string} privateKey
   * @param {object} options
   * @returns {string}
   * @memberof AuthService
   */
  async sign({ payload, privateKey, options }) {
    return jwt.sign(payload, privateKey, options);
  }
}

AuthService[RESOLVER] = {
  name: AWILIX_RESOVE_NAMES.SERVICES.AUTH,
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};

export default AuthService;
