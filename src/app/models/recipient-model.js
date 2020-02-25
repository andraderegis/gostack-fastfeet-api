import Sequelize, { Model } from 'sequelize';

class RecipientModel extends Model {
  static init(sequelize) {
    super.init(
      {
        destination_name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.NUMBER,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        zipcode: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default RecipientModel;
