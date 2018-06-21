const Sequelize = require('sequelize');

const db = new Sequelize({
  database: 'postgresdb',
  username: 'salamander',
  password: 'postgres',
  dialect: 'postgres'
});

db.authenticate()
  .then(() => {
    console.log('connected to database');
  })
  .catch(err => {
    console.log('unable to connect to database ', err);
  })

module.exports = {
  db: db
};
