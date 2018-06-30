const fs = require('fs');
const db = require('../config');
const stream = fs.createWriteStream(__dirname + '/rates.csv');
const { seeds } = require('../data/seed');

var makeCode = function() {
  var num = Math.floor(Math.random() * 1000000000000);
  while (num < 99999999999) { num *= 10 };
  return num + '\n';
}

var sprout = function() {
  var garden = '';
  seeds.forEach(function(seed) { 
    for (var i = 0; i < 500; i++) {
      for (var key in seed) {
        garden += (seed[key] + ',');
      }
       garden += makeCode();
    }
  });
  return garden;
}

for (var i = 0; i < 104; i++) {  
  console.log(i);
  stream.write(sprout());
}
stream.end();

var populate = `load data infile "../../../../Users/salamander/Github/sdc-capstone/mysql/db/data/rates.csv" into table rates fields terminated by ","`;

db.query(populate, (err, results) => {
  results ? console.log('populate done') : console.log(err);
});

db.query('create table cities select city_code, country from rates', (err, results) => {
  results ? console.log('create cities done') : console.log(err);
});