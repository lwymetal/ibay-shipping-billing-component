const Sequelize = require('sequelize');

const { db } = require('../config');

const { seeds } = require('../sql/seed');

const BillingRate = db.define('billing_rates', {
  country: Sequelize.STRING,
  basic_rate: Sequelize.DECIMAL(10, 2),
  expedited_rate: Sequelize.DECIMAL(10, 2),
  one_day_rate: Sequelize.DECIMAL(10, 2)
});

BillingRate.sync({force: true})
  .then(() => {
    BillingRate.bulkCreate(seeds);
    console.log('table created for billingrate');
  })
  .catch(err => {
    console.log('error connecting to database ', err);
  });

module.exports = {
  BillingRate: BillingRate
};
