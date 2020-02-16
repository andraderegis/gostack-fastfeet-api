module.exports = {
  dev: {
    username: 'postgres',
    password: 'postgres',
    database: 'fastfeet_development',
    host: 'localhost',
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'fastfeet_test',
    host: 'localhost',
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  prod: {
    username: 'postgres',
    password: 'postgres',
    database: 'fastfeet',
    host: 'localhost',
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};
