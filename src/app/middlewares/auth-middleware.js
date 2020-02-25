import { RESOLVER, Lifetime, InjectionMode } from 'awilix';

import { AWILIX_RESOVE_NAMES } from '../../constants';

import { JWT_PARAMS } from '../../config/auth-config';

class AuthMiddleware {
  /**
   *Creates an instance of AuthMiddleware.
   * @param {AwilixContainer} container
   * @memberof AuthMiddleware
   */
  constructor({ container }) {
    this._authService = container.resolve(AWILIX_RESOVE_NAMES.SERVICES.AUTH);
  }

  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof AuthMiddleware
   */
  async authorize(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ error: 'Access token not provided.' });
      }

      const [, token] = authHeader.split(' ');

      const decoded = await this._authService.verify({
        token,
        publicKey: JWT_PARAMS.publicKey,
        options: JWT_PARAMS.options,
      });

      req.userId = decoded.id;

      return next();
    } catch (e) {
      return res.status(401).json({ error: 'Invalid access token.' });
    }
  }
}

AuthMiddleware[RESOLVER] = {
  name: AWILIX_RESOVE_NAMES.MIDDLEWARES.AUTH,
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};

export default AuthMiddleware;
