import { RESOLVER, Lifetime, InjectionMode } from 'awilix';
import Sequelize from 'sequelize';

import RecipientModel from './app/models/RecipientModel';
import UserModel from './app/models/UserModel';

class Models {
  constructor({ databaseConfig }) {
    this._databaseConfig = databaseConfig;
    this._models = [RecipientModel, UserModel];
    this.init();
  }

  init() {
    this._models.map(model => model.init(new Sequelize(this._databaseConfig)));
  }

  models() {
    return this._models;
  }
}

Models[RESOLVER] = {
  name: 'models',
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};

export default Models;
