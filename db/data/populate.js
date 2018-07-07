const db = require('../config');

var startScript = new Date();

var endScript;

var populate = `load data infile "../../../../Users/salamander/Github/sdc-capstone/ibay-shipping-billing-component/db/data/rates.csv" into table rates fields terminated by ","`;
db.query(populate, (err, results) => {
  err ? console.log(err) :
  endScript = new Date(); 
  console.log('DB populated in ' + ((endScript - startScript) / 1000) + ' seconds');
})

db.query(`create index codes on rates (city_code)`, (err, results) => {
  err ? console.log(err) : console.log('DB indexed');
})