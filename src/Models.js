import { RESOLVER, Lifetime, InjectionMode } from 'awilix';
import Sequelize from 'sequelize';

import RecipientModel from './app/models/RecipientModel';
import UserModel from './app/models/UserModel';

/**
 * Private methods as symbols
 */
const getModels = Symbol('getModels');
const init = Symbol('init');

class Models {
  constructor({ databaseConfig }) {
    this._databaseConfig = databaseConfig;
    this._models = this[getModels]();

    this[init]();
  }

  [getModels]() {
    return new Map([
      ['RecipientModel', RecipientModel],
      ['UserModel', UserModel],
    ]);
  }

  [init]() {
    Array.from(this._models).map(([, value]) => {
      value.init(new Sequelize(this._databaseConfig));
    });
  }

  models() {
    return this._models;
  }

  getModel(name) {
    return this._models.get(`${name}Model`);
  }
}

Models[RESOLVER] = {
  name: 'models',
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};

export default Models;
