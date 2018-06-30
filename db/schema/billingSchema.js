const Sequelize = require('sequelize');
const fs = require('fs');
const { db } = require('../config');
const stream = fs.createWriteStream(__dirname + '/billing.csv');
const { seeds } = require('../sql/seed');

const BillingRate = db.define('billing_rates', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  country: Sequelize.STRING,
  basic_rate: Sequelize.DECIMAL(10, 2),
  expedited_rate: Sequelize.DECIMAL(10, 2),
  one_day_rate: Sequelize.DECIMAL(10, 2),
  city_code: Sequelize.BIGINT,
  }, {timestamps: false},
);

var makeCode = function() {
  var num = Math.floor(Math.random() * 1000000000000);
  while (num < 99999999999) { num *= 10 };
  return num + '\n';
}

var sprout = function() {
  var garden = '';
  seeds.forEach(function(seed) { 
    for (var i = 0; i < 500; i++) {  // 500
      for (var key in seed) {
        garden += (seed[key] + ',');
      }
       garden += makeCode();
    }
  });
  return garden;
}

for (var i = 0; i < 10; i++) {  // 104
  console.log(i);
  stream.write(sprout());
}
stream.end();

BillingRate.sync({force: true})
  .then(() => {
    // BillingRate.bulkCreate(stream);
    console.log('Sync successful');
  })
  .catch(err => {
    console.log('Error connecting to database', err);
  });


db.query(`\copy billing_rates(country, basic_rate, expedited_rate, one_day_rate, city_code) from '/Users/salamander/Github/sdc-capstone/shipping-billing-component/db/schema/billing.csv' with csv;`, { type:Sequelize.QueryTypes.UPSERT})
  .then(() => {
    console.log('did');
  })
  .catch(() => {
    console.log('didn\'t');
  })

module.exports = {
  BillingRate: BillingRate
};
